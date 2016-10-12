(function(module) {
  var rentalController = {};

  rentalController.revealState = function(stateObj) {
    cityView.handleStateRental(stateObj);
  };

  rentalController.revealCityMedian = function(cityMedianObj) {
    cityView.handleCityMedianRental(cityMedianObj);
  };

  rentalController.revealCityMean = function(cityMeanObj) {
    cityView.handleCityMeanRental(cityMeanObj);
  };

  module.rentalController = rentalController;
})(window);
