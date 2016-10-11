//IIFE here
(function(module) {
  // contructor function to make object out of API response data
  function Census (data) {
    for (key in data) {
      this[key] = data[key];
    }
  }
  // key for census API
  var censusKey = '7a3aa9d2f7fafb092b5957d10b65c477719c4c4f';
  //key for state abbreviations
Census.stateIDKey = {
    02: 'AK',
    04: 'AZ',
    05: "AR",
    06: 'CA',
    08: 'CO'
  };

  //array of all site objects that
  Census.allData = [];
  //run census.request when state option changes
  $('#state-choice').on('change', function(){
    $('#county-filter').empty();
    $('#city-choice').empty();
    Census.stateChoice = $(this).val();
    console.log(Census.stateChoice);
    Census.findAbbrev(Census.stateChoice);
    Census.request();
    Census.findCities();
  });
  //assign countyChoice when county option changes
  $('#county-filter').on('change', function(){
    Census.countyChoice = $(this).val();
    console.log(Census.countyChoice);
  });
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
//ajax call to populate the city filter
  Census.findCities = function(callback) {
    $.ajax({
      method: 'GET',
      url: '../data/city_rents.json',
      success: function(data, status, xhr){
        console.log(data);
      },
      error: function(xhr, settings, error){
        console.log('Ajax call failed:', error);
      }
    });
  };



Census.findAbbrev = function(stateID){
  var stateNum= parseInt(stateID);
  Census.stateAbbreviation = Census.stateIDKey[stateNum];
  console.log(Census.stateAbbreviation);
}


  // method to take returned data from census API request and load it into Census.allData
  Census.loadData = function(data) {
    Census.allData = data.map(function(county) {
      return new Census(county);
    });
  };
  // make Census available globally
  module.Census = Census;
})(window);
