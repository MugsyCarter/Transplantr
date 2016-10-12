/* This script handles pulling data from the Zillow API and making it
available to the Transplantr app

To use handlebars, my data needs to be stored as an array of objects.
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

  MortgageData.prototype.createHtml = function() {
    // Grab the handlebars template, compile it
    // return the finished html
  };

  // $('#county-filter').on('change', function(){
  //   $('#city-choice').empty();
  //   Mortgage.countyChoice = $(this).val();
  //   console.log(Mortgage.countyChoice);
    // Census.stateChoiceName = $(this).find('option:selected').text();
    // console.log(Census.stateChoiceName);
    // console.log(Census.stateChoice);
    // Census.findAbbrev(Census.stateChoice);
  //   MortgageData.fetchZillow();
  // });




  MortgageData.fetchZillow = function() {
    // This method does the API call to zillow
    $.ajax({
      method: 'GET',
      url: '/zillow/' + Census.stateChoiceName.toLowerCase() + '/' + Census.countyChoiceName.toLowerCase(),
      success: function(data, status, xhr) {
        console.log('inside the fetch ajax call, data is:', data);
        MortgageData.citiesList = data.childNodes[0].childNodes[2].childNodes[2].childNodes;
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
      $('#city-choice').append(filterEntry);
    });
  };


  module.MortgageData = MortgageData;
})(window);
