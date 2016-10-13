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
  RentalData.currentStateData = [];
  RentalData.destinationStateData = [];
  RentalData.currentCityMeanData = [];
  RentalData.destinationCityMeanData = [];
  RentalData.currentCityMedianData = [];
  RentalData.destinationCityMedianData = [];

  // Handlebars templating to create the html for state, city rental info
  // is added dynamically by jQuery
  RentalData.prototype.createCurrentStateHtml = function() {
    var template = Handlebars.compile($('#state-curr-rental-template').html());
    return template(this);
  };

  RentalData.prototype.createDestinationStateHtml = function() {
    var template = Handlebars.compile($('#state-dest-rental-template').html());
    return template(this);
  };


/********* All three AJAX calls, one per data source:  ************/
  RentalData.fetchStates = function() {
    var isCurrent = MortgageData.source;

    $.ajax({
      method: 'GET',
      url: '../data/state_rents.json',
      timeout: 2000,
      success: function(data, status, xhr) {

        // loop through the json data, turn it into a RentalData object
        if (isCurrent) {
          RentalData.currentStateData = RentalData.loadData(data);
        } else {
          RentalData.destinationStateData = RentalData.loadData(data);
        }

        // grab only the RentalData obj you need:
        var stateData = isCurrent ? RentalData.currentStateData : RentalData.destinationStateData;
        var stateChoiceName = isCurrent ? Census.stateChoiceName : Census.destinationStateChoiceName;
        for (var i=0; i < stateData.length; i++) {
          if (stateData[i]['State'] == stateChoiceName) {
            var stateObj = stateData[i];
            break;
          }
        }
        // pass the selected RentalData state object off to the controller
        rentalController.revealState(stateObj, isCurrent);
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
    var isCurrent = MortgageData.source;

    $.ajax({
      method: 'GET',
      url: '../data/city_rents-median.json',
      timeout: 2000,
      success: function(data, status, xhr) {
        // loop through the json data, turn it into a RentalData object
        if (isCurrent) {
          RentalData.currentCityMedianData = RentalData.loadData(data);
        } else {
          RentalData.destinationCityMedianData = RentalData.loadData(data);
        }

        // grab only the RentalData obj you need:
        var cityMedianData = isCurrent ? RentalData.currentCityMedianData : RentalData.destinationCityMedianData;
        var cityChoice = isCurrent ? MortgageData.currentCityChoice : MortgageData.destinationCityChoice;
        for (var i=0; i < cityMedianData.length; i++) {
          if (cityMedianData[i]["City"] == cityChoice) {
            var cityMedianObj = cityMedianData[i];
            break;
          }  // close if
        } // close for-loop
        // pass the selected RentalData city object off to the controller
        console.log('the cityMedianObj is ', cityMedianObj);
        if (cityMedianObj) {
          rentalController.revealCityMedian(cityMedianObj, isCurrent);
        }
        // make sure the mean is called after the median, so the templating looks right
        RentalData.fetchCityMean(isCurrent);
      },
      error: function(xhr, settings, error) {
        var message = 'Server returned a '
            + '<b>' + jqXHR.status + ' ' + thrownError + '</b>'
            + ' error message. <br />Please try again later.</div>';
        console.log(message);
      }
    });
  };

  RentalData.fetchCityMean = function(isCurrent) {
    $.ajax({
      method: 'GET',
      url: '../data/city_rents-mean.json',
      timeout: 2000,
      success: function(data, status, xhr) {
        // loop through the json data, turn it into a RentalData object
        if (isCurrent) {
          RentalData.currentCityMeanData = RentalData.loadData(data);
        } else {
          RentalData.destinationCityMeanData = RentalData.loadData(data);
        }

        // grab only the RentalData obj you need:
        var cityMeanData = isCurrent ? RentalData.currentCityMeanData : RentalData.destinationCityMeanData;
        var cityChoice = isCurrent ? MortgageData.currentCityChoice : MortgageData.destinationCityChoice
        for (var i=0; i < cityMeanData.length; i++) {
          if (cityMeanData[i]["City"] == cityChoice) {
            var cityMeanObj = cityMeanData[i];
            break;
          }  // close if
        } // close for-loop
        // pass the selected RentalData city object off to the controller
        if (cityMeanObj) {
          rentalController.revealCityMean(cityMeanObj, isCurrent);
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
