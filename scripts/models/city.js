//IIFE here
(function(module) {
  var census = {};
  var censusKey = '7a3aa9d2f7fafb092b5957d10b65c477719c4c4f';
  var stateChoice;
  var countyChoice;

  //array of all site objects that
  census.allData = [];

  //run census.request when state option changes
  $('#state-choice').on('change', function(){
    $('#county-filter').empty();
    stateChoice = $(this).val();
    console.log(stateChoice);
    census.request();
  });

  //assign countyChoice when county option changes
  $('#county-filter').on('change', function(){
    countyChoice = $(this).val();
    console.log(countyChoice);
  });

  //method to find info for county


  //ajax call here
  census.request = function(callback) {
    $.ajax({
      method: 'GET',
      url: 'http://api.census.gov/data/timeseries/poverty/saipe?get=NAME,SAEMHI_PT,SAEPOVRTALL_PT&for=county:*&in=state:' + stateChoice + '&time=2012&key=7a3aa9d2f7fafb092b5957d10b65c477719c4c4f',
      success: function(data, status, xhr){
        census.allData.push(data);
        data.forEach(function(county){
          if (county[0] !== 'NAME') {
            var $option = $('<option></option>');
            $option.val(county[0]);
            $option.text(county[0]);
            $('#county-filter').append($option);
          }
        });
      },
      error: function(xhr, settings, error){
        console.log('Ajax call failed:', error);
      }
    });
  };

  module.census = census;
})(window);
