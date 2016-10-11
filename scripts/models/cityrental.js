//IIFE here
(function(module) {


//THE CODE BELOW IS FOR THE MEDIAN DATA

  function CityRentalData (data) {
    // Loop through the data and make it into a RentalData object
    for (key in data) {
      this[key] = data[key];
    }
  }

  // Create the array to hold the objects from the AJAX call
  CityRentalData.cityData = [];

    //run CityRentalData.fetchCities when state option changes
  $('#state-choice').on('change', function(){
    $('#city-choice').empty();
    console.log('Emptying city filter');
    CityRentalData.stateChoice = $(this).val();
    console.log(CityRentalData.countyChoice);
    CityRentalData.fetchCities();
  });

// //Handlebars templating of city median data
//   CityRentalData.prototype.createCityHtml = function() {
//     var cityTemplate = Handlebars.compile($('#city-rental-template').html());
//     return cityTemplate(this);
//   };

    //fetch and process city data here
    CityRentalData.fetchCities = function() {
      $.ajax({
        method: 'GET',
        url: '../data/city_rents.json',
        timeout: 2000,

        success: function(data, status, xhr) {
          console.log(data);
          data.forEach(function(county){
            if (county[0] !== 'NAME') {
              var $option = $('<option></option>');
              $option.val(county[0]);
              $option.text(county[0]);
              $('#county-filter').append($option);
            }


            },
        error: function(xhr, settings, error){
              console.log('Ajax call failed:', error);
            },
          });
        };




        // method to take returned data from ajax request and load it into CityRentalData.cityData
  CityRentalData.loadData = function(data) {
    CityRentalData.cityData = data.map(function(county) {
      return new CityRentalData(county);
    });
  };


          // loop through the json data, turn it into a RentalData object
          // CityRentalData.cityData = data.map(function(city) {
          //   return new RentalData(city);
          // });

          // grab the city name of the selected city
          // selectedCity = $('option[value="'+ Census.cityChoice +'"]').text();

          // grab only the RentalData obj you need:
          // for (var i=0; i < CityRentalData.cityData.length; i++) {
          //   if (CityRentalData.cityData[i]["City"] == selectedCity) {
          //     var cityObj = CityRentalData.cityData[i];
          //     break;
          //   }  // close if
          // } // close for-loop
          // pass the selected RentalData city object off to the controller
        //   rentalController.reveal(cityObj);
        // },

        // error: function(xhr, settings, error) {
        //   var message = 'Server returned a '
        //     + '<b>' + jqXHR.status + ' ' + thrownError + '</b>'
        //     + ' error message on the city rental data request. <br />Please try again later.</div>';
        //   console.log(message);
    //     }
    //   })
    // };













  //method to find info for county
  Census.getCountyInfo = function () {
    for (var i=0; i < Census.allData.length; i++) {
      if (Census.allData[i][0] === Census.countyChoice) {
        return Census.allData[i];
      }
    };
  };
  //ajax call here
  Census.request = function(callback) {
    $.ajax({
      method: 'GET',
      url: 'http://api.census.gov/data/timeseries/poverty/saipe?get=NAME,SAEMHI_PT,SAEPOVRTALL_PT&for=county:*&in=state:' + Census.stateChoice + '&time=2012&key=7a3aa9d2f7fafb092b5957d10b65c477719c4c4f',
      success: function(data, status, xhr){
        Census.loadData(data);
        data.forEach(function(county){
          if (county[0] !== 'NAME') {
            var $option = $('<option></option>');
            $option.val(county[0]);
            $option.text(county[0]);
            $('#county-filter').append($option);
          }
        });
        // The rental data can't run until census populates, callback goes here:
        RentalData.fetchStates();
      },
      error: function(xhr, settings, error){
        console.log('Ajax call failed:', error);
      }
    });
  };
  // method to take returned data from census API request and load it into Census.allData
  Census.loadData = function(data) {
    Census.allData = data.map(function(county) {
      return new Census(county);
    });
  };
  // make Census available globally
  module.Census = Census;
})(window);
