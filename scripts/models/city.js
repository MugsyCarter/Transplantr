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

  //request when state option changes
  $('#state-choice').on('change', function(){
    $('#county-filter').empty();
    Census.stateChoice = $(this).val();
    Census.stateChoiceName = $(this).find('option:selected').text();
    Census.request();
  });

  //assign countyChoice when county option changes
  $('#county-filter').on('change', function(){
    Census.countyChoice = $(this).val();
    Census.countyChoiceName = Census.countyChoice.replace(' County', '');
  });

  //method to find info for county
  Census.getCountyInfo = function() {
    for (var i=0; i < Census.allData.length; i++) {
      if (Census.allData[i][0] === Census.countyChoice) {
        return Census.allData[i];
      }
    }
  };

  //ajax call gets routed to the express server and then out to the census
  Census.request = function() {
    $.ajax({
      method: 'GET',
      url: '/census/' + Census.stateChoice,
      success: function(data, status, xhr){
        Census.loadData(data);    // turn census data into Census objects
        // populate the county filter with the received census data
        data.forEach(function(county){
          if (county[0] !== 'NAME') {
            var $option = $('<option></option>');
            $option.val(county[0]);
            $option.text(county[0]);
            $('#county-filter').append($option);
          }
        });
        // The rental data can't run until census populates, call it here
        RentalData.fetchStates();
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
