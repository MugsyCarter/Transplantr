/* This file does an AJAX call to the local JSON data in order to make
a useable data structure to display on the main page
 */

(function(module) {

function RentalData (data) {
    // Loop through the data and make it into a RentalData object
    for (key in data) {
        this[key] = data[key]
    }
}

// Create the array to hold the objects from the AJAX call
RentalData.stateData = [];
RentalData.cityMeanData = [];

// Do some basic handlebars templating
RentalData.prototype.createStateHtml = function() {
  var template = Handlebars.compile($('#state-rental-template').html());
  return template(this);
};

RentalData.prototype.createCityMeanHtml = function() {
  var template = Handlebars.compile($('#city-mean-rental-template').html());
  return template(this);
};


RentalData.fetchStates = function() {
  $.ajax({
    method: 'GET',
    url: '../data/state_rents.json',
    timeout: 2000,

    success: function(data, status, xhr) {

      // loop through the json data, turn it into a RentalData object
      RentalData.stateData = data.map(function(state) {
        return new RentalData(state);
      });

      // grab only the RentalData obj you need:
      for (var i=0; i < RentalData.stateData.length; i++) {
        if (RentalData.stateData[i]["State"] === Census.stateChoiceName) {
          var stateObj = RentalData.stateData[i];
          break;
        }
      }
      // pass the selected RentalData state object off to the controller
      rentalController.revealState(stateObj);
      RentalData.fetchCityMean();
    },

    error: function(xhr, settings, error) {
      var message = 'Server returned a '
        + '<b>' + jqXHR.status + ' ' + thrownError + '</b>'
        + ' error message. <br />Please try again later.</div>';
      console.log(message);
    }
  })
};

RentalData.fetchCityMean = function() {
  $.ajax({
    method: 'GET',
    url: '../data/city_rents-mean.json',
    timeout: 2000,

    success: function(data, status, xhr) {
      // loop through the json data, turn it into a RentalData object
      RentalData.cityMeanData = data.map(function(city) {
        return new RentalData(city);
      });

      // grab the state name of the selected state
      var cityChoice = "San Francisco";
      // selectedCity = $('option[value="'+ cityChoice +'"]').text();

      // grab only the RentalData obj you need:
      for (var i=0; i < RentalData.cityMeanData.length; i++) {
        if (RentalData.cityMeanData[i]["City"] == cityChoice) {
          var cityMeanObj = RentalData.cityMeanData[i];
          break;
        }  // close if
      } // close for-loop
      // pass the selected RentalData city object off to the controller
      rentalController.revealCityMean(cityMeanObj);
    },

    error: function(xhr, settings, error) {
      var message = 'Server returned a '
        + '<b>' + jqXHR.status + ' ' + thrownError + '</b>'
        + ' error message. <br />Please try again later.</div>';
      console.log(message);
    }
  })
};

  module.RentalData = RentalData;
})(window);