/* This script handles pulling data from the Zillow API and making it
available to the Transplantr app

To use handlebars, the data needs to be stored as an array of objects.
 */

(function(module) {

  function MortgageData (data) {
    // Loop through the data and make it into a MortgageData object
    for (key in data) {
      this[key] = data[key];
    }
  }

  // Create the array to hold the objects from the AJAX call
  MortgageData.currentCities = [];
  MortgageData.destinationCities = [];
  MortgageData.currentCityNames = [];
  MortgageData.destinationCityNames = [];
  MortgageData.currentHousePrices = []; // this holds the $ for handlebars
  MortgageData.destinationHousePrices = [];

  MortgageData.prototype.createCurrentMortgageHtml = function() {
    var template = Handlebars.compile($('#curr-mortgage-template').html());
    return template(this);
  };

  MortgageData.prototype.createDestinationMortgageHtml = function() {
    var template = Handlebars.compile($('#dest-mortgage-template').html());
    return template(this);
  };


  MortgageData.fetchZillow = function(isCurrent) {
    // The call to /zillow is routed by page to the node server and out to Zillow
    var currentState = isCurrent ? Census.stateChoiceName : Census.destinationStateChoiceName;
    var currentCounty = isCurrent ? Census.countyChoiceName : Census.destinationCountyChoiceName;

    $.ajax({
      method: 'GET',
      url: '/zillow/' + currentState.toLowerCase() + '/' + currentCounty.toLowerCase(),
      success: function(data, status, xhr) {

        if (isCurrent) {
          MortgageData.currentCitiesList = data.childNodes[0].childNodes[2].childNodes[2].childNodes;
          MortgageData.currentCitiesNodes = data.childNodes[0].childNodes[2].childNodes[2];
        } else {
          MortgageData.destinationCitiesList = data.childNodes[0].childNodes[2].childNodes[2].childNodes;
          MortgageData.destinationCitiesNodes = data.childNodes[0].childNodes[2].childNodes[2];
        }

        // empty the arrays to hold the cities XML objects and the city names as strings
        MortgageData.currentCities = [];
        MortgageData.destinationCities = [];

        //populate the array of city names ignoring the 1st item
        var citiesList = isCurrent ? MortgageData.currentCitiesList : MortgageData.destinationCitiesList;
        var citiesArray = isCurrent ? MortgageData.currentCities : MortgageData.destinationCities;
        for (var i=1; i < citiesList.length; i++) {
          citiesArray.push(data.childNodes[0].childNodes[2].childNodes[2].childNodes[i].childNodes[1]);
        }

        if (isCurrent) {
          MortgageData.currentCityNames = [];
          MortgageData.currentCityNames = MortgageData.currentCities.map(function(city){
            return city.innerHTML;
          });
        } else {
          MortgageData.destinationCityNames = [];
          MortgageData.destinationCityNames = MortgageData.destinationCities.map(function(city){
            return city.innerHTML;
          });
        }
        MortgageData.source = isCurrent;
      },
      error: function(xhr, settings, error) {
        console.log('Server returned a ', xhr.status + ' ' + error + ' error.');
      }
    });
  };

//this function appends cities to the city filter in index.html
  MortgageData.fillCityFilter = function() {
    setTimeout(function(){
      var cityNames = MortgageData.source ? MortgageData.currentCityNames : MortgageData.destinationCityNames;
      cityNames.sort();
      cityNames.forEach(function(city){
        var filterEntry = $('<option value="'+ city +'"></option>').text(city);
        if (MortgageData.source) {
          $('#city-choice').append(filterEntry);
        } else {
          $('#destination-city-choice').append(filterEntry);
        }
      });
    }, 600);
  };

//assigns the user's city choice to the variable MortgageData.cityChoice.
  $('#city-choice').on('change', function(){
    MortgageData.currentCityChoice = $(this).val();
    MortgageData.source = true;
    var isCurrent = true;
    MortgageData.fetchZillow(isCurrent);
    MortgageData.findHomes(isCurrent);

    // this change needs to update the zillow template on the page
    dataController.mortgageReveal(MortgageData.currentHousePrices, isCurrent);
    // Call the rental stuff now that city is populated
    RentalData.fetchStates();
    RentalData.fetchCityMedian();
  });

  //same as above, but for the destination city
  $('#destination-city-choice').on('change', function(){
    MortgageData.destinationCityChoice = $(this).val();
    MortgageData.source = false;
    var isCurrent = false;
    MortgageData.fetchZillow(isCurrent);
    MortgageData.findHomes(isCurrent);

    dataController.mortgageReveal(MortgageData.destinationHousePrices, isCurrent);
    // Call the rental stuff now that city is populated
    RentalData.fetchStates();
    RentalData.fetchCityMedian();
  });


  MortgageData.findHomes = function(isCurrent){
    var citiesNodes = isCurrent ? MortgageData.currentCitiesNodes : MortgageData.destinationCitiesNodes;
    var cityChoice = isCurrent ? MortgageData.currentCityChoice : MortgageData.destinationCityChoice;

    if (isCurrent) {
      var x = MortgageData.currentCityNames.indexOf(cityChoice) + 1;
    } else {
      x = MortgageData.destinationCityNames.indexOf(cityChoice) + 1;
    }

    // This is where the zindex is, if it doesn't return a number, change the message
    if (isNaN(citiesNodes.childNodes[x].childNodes[2].innerHTML)) {
      var houseprice = 'not available for ' + cityChoice + '.';
    } else {
      houseprice = '$' + citiesNodes.childNodes[x].childNodes[2].innerHTML;
    }

    if (isCurrent) {
      MortgageData.currentHousePrices = (new MortgageData({
        'city': MortgageData.currentCityChoice,
        'aveHousePrice': houseprice
      }));
    } else {
      MortgageData.destinationHousePrices = (new MortgageData({
        'city': MortgageData.destinationCityChoice,
        'aveHousePrice': houseprice
      }));
    }

    if (isCurrent) {
      Data.home = new Data.location(Census.stateChoiceName, Census.countyChoiceName, MortgageData.currentCityChoice, houseprice, Data.econIncome, Data.econPoverty);
      Data.storeData(Data.home);
    } else {
      Data.away = new Data.location(Census.destinationStateChoiceName, Census.destinationCountyChoiceName, MortgageData.destinationCityChoice, houseprice, Data.econIncome, Data.econPoverty);
      Data.storeData(Data.away);
    }
  };


  module.MortgageData = MortgageData;
})(window);
