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

  MortgageData.prototype.createHtml = function() {
    // Grab the handlebars template, compile it
    // return the finished html
  };

  MortgageData.fetchZillow = function() {
    // The call to /zillow is routed by page to the node server and out to Zillow
    $.ajax({
      method: 'GET',
      url: '/zillow/' + Census.stateChoiceName.toLowerCase() + '/' + Census.countyChoiceName.toLowerCase(),
      success: function(data, status, xhr) {
        console.log('inside the fetch ajax call, data is:', data);
        /*xmlData.forEach(function(city){
          if (city[0] !== 'NAME') {
            var $option = $('<option></option>');
            $option.val(city[0]);
            $option.text(city[0]);
            $('#county-filter').append($option);
          }
        };*/
      },
      error: function(xhr, settings, error) {
        console.log('Server returned a ', xhr.status + ' ' + error + ' error.');
      }
    });
  };

  module.MortgageData = MortgageData;
})(window);
