//IIFE here
(function(module) {

  // contructor function to make object out of API response data
  function Census (data) {
    for (key in data) {
      this[key] = data[key];
    }
  }

  //array of all site objects that run census.
  Census.allData = [];
  Census.economicData = [];
  Census.destinationEconomicData = [];
  Census.incomeData = [];

  //sets up the source variable true = origin false = destination
  Census.source = true;

  // Handlebars templating to create the html
  Census.prototype.createEconHtml = function() {
    var template = Handlebars.compile($('#county-econ-template').html());
    return template(this);
  };

  //dummy value templates
  var defaultCityEntry = $('<option value=""></option>').text('Choose City');
  var defaultCountyEntry = $('<option value=""></option>').text('Choose County');


/****************** CURRENT CITY INFORMATION ******************/
  //request when state option changes
  $('#state-choice').on('change', function(){
    $('#county-filter').empty();
    $('#county-filter').append(defaultCountyEntry);
    Census.source = true;
    Census.stateChoice = $(this).val();
    Census.stateChoiceName = $(this).find('option:selected').text();
    Census.request();
  });

  //assign countyChoice when county option changes
  $('#county-filter').on('change', function(){
    $('#city-choice').empty();
    $('#city-choice').append(defaultCityEntry);
    Census.countyChoice = $(this).val();
    console.log('you selected ', Census.countyChoice);
    Census.countyChoiceName = Census.countyChoice.replace(' County', '');
    // grab the county's econ data and pass it to the controller
    incomeController.revealEcon(Census.getEconInfo());
    MortgageData.fetchZillow();
  });

  //compute income ration when submit button is pressed
  $('#current-submit').on('click', function() {
    Census.currentIncome = $('#current-income').val();
    for (var i = 0; i < Census.economicData.length; i++) {
      if (Census.economicData[i].county === Census.countyChoice) {
        Census.curIncRatio = (Census.currentIncome)/(parseInt(Census.economicData[i].medianIncome.replace('$', '')));
        console.log(parseInt(Census.economicData[i].medianIncome.replace('$', '')));
        console.log(Census.curIncRatio);
      }
    } // income called here so it waits for the input to load
    dataController.incomeReveal(Census.currentIncome);
  });

/****************** DESTINATION CITY INFORMATION ******************/
  //set destination state option changes
  $('#destination-state-choice').on('change', function(){
    $('#destination-county-filter').empty();
    $('#destination-county-filter').append(defaultCountyEntry);
    Census.source = false;
    Census.destinationStateChoice = $(this).val();
    Census.destinationStateChoiceName = $(this).find('option:selected').text();
    Census.request();
  });

  //set destination city on option change
  $('#destination-county-filter').on('change', function(){
    $('#destination-city-choice').empty();
    $('#destination-city-choice').append(defaultCityEntry);
    Census.source = false;
    Census.destinationCountyChoice = $(this).val();
    Census.destinationCountyChoiceName = Census.destinationCountyChoice.replace(' County', '');
    // grab the county's econ data and pass it to the controller
    incomeController.revealEcon(Census.getEconInfo());
    MortgageData.fetchZillow();
  });


  //method to find info for county
  Census.getCountyInfo = function() {
    for (var i=0; i < Census.allData.length; i++) {
      if (Census.allData[i][0] === Census.countyChoice ||
        Census.allData[i][0] === Census.destinationCountyChoice) {
        return Census.allData[i];
      }
    }
  };

  // method to grab just the county selected and put it's econ data on the page
  Census.getEconInfo = function() {
    // Check which thing was modified, then loop over the related array
    if (Census.source) {
      for (var i = 0; i < Census.economicData.length; i++) {
        if (Census.source && Census.economicData[i]['county'] === Census.countyChoice) {
          Census.econObj = Census.economicData[i];
          return Census.econObj;
        } // close if
      } // close for
    } else {
      for (i = 0; i < Census.destinationEconomicData.length; i++) {
        if (Census.destinationEconomicData[i]['county'] === Census.destinationCountyChoice) {
          Census.destinationEconObj = Census.destinationEconomicData[i];
          return Census.destinationEconObj;
        } // close if
      } // close for
    } // close else
    // pass the correct object to the user data storage
    currentObj = (Census.source) ? Census.econObj : Census.destinationEconObj;
    Data.parseEconData(currentObj);
  };


  //ajax call gets routed to the express server and then out to the census
  Census.request = function() {
    //set a local var for if current or destination called the function
    var currentChoice = Census.source ? Census.stateChoice : Census.destinationStateChoice;
    var currentEcon = Census.source ? Census.economicData : Census.destinationEconomicData;
    $.ajax({
      method: 'GET',
      url: '/census/' + currentChoice,
      success: function(data, status, xhr){
        Census.loadData(data);    // turn census data into Census objects
        // We loop through all the data once, grabbing different things out
        currentEcon = [];
        Census.allData.forEach(function(county) {
          if (county[0] !== 'NAME') {
            // populate the county filter with the received census data
            var $option = $('<option></option>');
            $option.val(county[0]);
            $option.text(county[0]);

            if (Census.source) {
              $('#county-filter').append($option);
            } else {
              $('#destination-county-filter').append($option);
            }
            // grab the income and poverty data, make into a census object
            currentEcon.push(new Census({
              'county': county[0],
              'medianIncome': '$' + county[1],
              'percentPoverty': county[2] + '%'
            }));
          } // close if
        }); // close forEach
        // The rental data can't run until census populates, call it here
        console.log('in the request, ecodata is', currentEcon);
      },
      error: function(xhr, settings, error){
        console.log('Ajax call failed:', error);
      }
    });  // end ajax
  };  // end function

  // method to take returned data from census API request and load it into Census.allData
  Census.loadData = function(data) {
    Census.allData = data.map(function(county) {
      return new Census(county);
    });
  };

  // make Census available globally
  module.Census = Census;
})(window);
