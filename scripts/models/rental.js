/* This file does an AJAX call to the local JSON data in order to make
a useable data structure to display on the main page
 */

(function(module) {

  function RentalData (data) {
    // Loop through the data and make it into a RentalData object
    for (key in data) {
      this[key] = data[key];
    }
  }

  // Create arrays to hold the objects from the three AJAX calls
  RentalData.stateData = [];
  RentalData.cityMeanData = [];
  RentalData.cityMedianData = [];

  // Handlebars templating to create the html
  RentalData.prototype.createStateHtml = function() {
    var template = Handlebars.compile($('#state-rental-template').html());
    return template(this);
  };

  RentalData.prototype.createCityMeanHtml = function() {
    var template = Handlebars.compile($('#city-mean-rental-template').html());
    return template(this);
  };

  RentalData.prototype.createCityMedianHtml = function() {
    var cityTemplate = Handlebars.compile($('#city-median-rental-template').html());
    return cityTemplate(this);
  };

  // All three AJAX calls, one per data source:

  RentalData.fetchStates = function() {
    $.ajax({
      method: 'GET',
      url: '../data/state_rents.json',
      timeout: 2000,

      success: function(data, status, xhr) {

        // loop through the json data, turn it into a RentalData object
        RentalData.stateData = RentalData.loadData(data);

        // grab only the RentalData obj you need:
        for (var i=0; i < RentalData.stateData.length; i++) {
          if (RentalData.stateData[i]['State'] == Census.stateChoiceName) {
            var stateObj = RentalData.stateData[i];
            break;
          }
        }
        // pass the selected RentalData state object off to the controller
        rentalController.revealState(stateObj);
      },

      error: function(xhr, settings, error) {
        var message = 'Server returned a '
          + '<b>' + jqXHR.status + ' ' + thrownError + '</b>'
          + ' error message. <br />Please try again later.</div>';
        console.log(message);
      }
    });
  };

  RentalData.fetchCityMedian = function() {
    $.ajax({
      method: 'GET',
      url: '../data/city_rents-median.json',
      timeout: 2000,

      success: function(data, status, xhr) {
        // loop through the json data, turn it into a RentalData object
        RentalData.cityMedianData = RentalData.loadData(data);

        // grab only the RentalData obj you need:
        for (var i=0; i < RentalData.cityMedianData.length; i++) {
          if (RentalData.cityMedianData[i]['City'] == MortgageData.cityChoice) {
            var cityMedianObj = RentalData.cityMedianData[i];
            break;
          }  // close if
        } // close for-loop
        // pass the selected RentalData city object off to the controller
        if (cityMedianObj) {
          rentalController.revealCityMedian(cityMedianObj);
        }
        // make sure the mean is called after the median, so the templating looks right
        RentalData.fetchCityMean();
      },
      error: function(xhr, settings, error) {
        var message = 'Server returned a '
            + '<b>' + jqXHR.status + ' ' + thrownError + '</b>'
            + ' error message. <br />Please try again later.</div>';
        console.log(message);
      }
    });
  };

  RentalData.fetchCityMean = function() {
    $.ajax({
      method: 'GET',
      url: '../data/city_rents-mean.json',
      timeout: 2000,

      success: function(data, status, xhr) {
        // loop through the json data, turn it into a RentalData object
        RentalData.cityMeanData = RentalData.loadData(data);
        // grab only the RentalData obj you need:
        for (var i=0; i < RentalData.cityMeanData.length; i++) {
          if (RentalData.cityMeanData[i]['City'] == MortgageData.cityChoice) {
            var cityMeanObj = RentalData.cityMeanData[i];
            break;
          }  // close if
        } // close for-loop
        // pass the selected RentalData city object off to the controller
        if (cityMeanObj) {
          rentalController.revealCityMean(cityMeanObj);
        }
      },

      error: function(xhr, settings, error) {
        var message = 'Server returned a '
          + '<b>' + jqXHR.status + ' ' + thrownError + '</b>'
          + ' error message. <br />Please try again later.</div>';
        console.log(message);
      }
    });
  };

  // method to take returned data from ajax request and load it into RentalData.cityData
  RentalData.loadData = function(jsondata) {
    return jsondata.map(function(obj) {
      return new RentalData(obj);
    });
  };

  module.RentalData = RentalData;
})(window);
