(function(module) {
  var rentalController = {};

  rentalController.revealState = function(stateObj) {
    cityView.handleStateRental(stateObj);
  };

  rentalController.revealCityMean = function(cityMeanObj) {
    cityView.handleCityMeanRental(cityMeanObj);
  };

  rentalController.revealCityMedian = function(cityMedianObj) {
    cityView.handleCityMedianRental(cityMedianObj);
  };

  module.rentalController = rentalController;
})(window);
