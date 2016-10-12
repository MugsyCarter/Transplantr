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
  MortgageData.allData = [];
  MortgageData.cities=[];
  MortgageData.cityNames=[];
  MortgageData.housePrices = []; // this holds the $ for handlebars


  MortgageData.prototype.createMortgageHtml = function() {
    var template = Handlebars.compile($('#mortgage-template').html());
    return template(this);
  };


  MortgageData.fetchZillow = function() {
    // The call to /zillow is routed by page to the node server and out to Zillow
    $.ajax({
      method: 'GET',
      url: '/zillow/' + Census.stateChoiceName.toLowerCase() + '/' + Census.countyChoiceName.toLowerCase(),
      success: function(data, status, xhr) {

        MortgageData.citiesList = data.childNodes[0].childNodes[2].childNodes[2].childNodes;
        MortgageData.citiesNodes = data.childNodes[0].childNodes[2].childNodes[2];

        // create arrays to hold the cities XML objects and the city names as strings
        MortgageData.cities=[];
        MortgageData.cityNames=[];

        //populate the array of city names ignoring the 1st item
        for (var i= 1; i <MortgageData.citiesList.length; i++)
        {
          MortgageData.cities.push(data.childNodes[0].childNodes[2].childNodes[2].childNodes[i].childNodes[1]);
        }
        MortgageData.cityNames = MortgageData.cities.map(function(city){
          return city.innerHTML;
        });
        //call the function to populate the city filter
        MortgageData.fillCityFilter(MortgageData.cityNames);
      },
      error: function(xhr, settings, error) {
        console.log('Server returned a ', xhr.status + ' ' + error + ' error.');
      }
    });
  };

//this function appends cities to the city filter in index.html
  MortgageData.fillCityFilter = function(cityNames){
    cityNames.forEach(function(city){
      var filterEntry = $('<option value="'+ city +'"></option>').text(city);
      if (Census.source === true){
        $('#city-choice').append(filterEntry);
      }
      else {
        $('#destination-city-choice').append(filterEntry);
      }
    });
  };

//assigns the user's city choice to the variable MortgageData.cityChoice.
  $('#city-choice').on('change', function(){
    MortgageData.cityChoice = $(this).val();
    MortgageData.findHomes(MortgageData.cityChoice);
    dataController.mortgageReveal(MortgageData.housePrices);
    RentalData.fetchStates();
    RentalData.fetchCityMedian();
  });

  //same as above, but for the destination city
  $('#destination-city-choice').on('change', function(){
    console.log('changed destination city');
    MortgageData.cityChoice = $(this).val();
    dataController.mortgageReveal(MortgageData.housePrices);
    MortgageData.findHomes(MortgageData.cityChoice);
    RentalData.fetchStates();
    RentalData.fetchCityMedian();
  });


  MortgageData.findHomes = function(cityChoice){
    var x = MortgageData.cityNames.indexOf(MortgageData.cityChoice) + 1;
    // This is where the zindex is, if it doesn't return a number, change the message
    if (isNaN(MortgageData.citiesNodes.childNodes[x].childNodes[2].innerHTML)) {
      var houseprice = "not available for this city."
    } else {
      houseprice = "$" + MortgageData.citiesNodes.childNodes[x].childNodes[2].innerHTML;
    }
    MortgageData.housePrices = (new MortgageData({
      "city": MortgageData.cityChoice,
      "aveHousePrice": houseprice
    }));
  };


  module.MortgageData = MortgageData;
})(window);
