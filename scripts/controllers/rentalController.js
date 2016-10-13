(function(module) {
  var rentalController = {};

  rentalController.revealState = function(stateObj, isCurrent) {
    cityView.handleStateRental(stateObj, isCurrent);
  };

  rentalController.revealCityMedian = function(cityMedianObj, isCurrent) {
    cityView.handleCityMedianRental(cityMedianObj, isCurrent);
  };

  rentalController.revealCityMean = function(cityMeanObj, isCurrent) {
    cityView.handleCityMeanRental(cityMeanObj, isCurrent);
  };

  module.rentalController = rentalController;
})(window);
