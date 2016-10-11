(function(module) {
  var rentalController = {};

  rentalController.revealState = function(stateObj) {
    cityView.handleStateRental(stateObj);
  };

  rentalController.revealCityMean = function(cityMeanObj) {
    cityView.handleCityMeanRental(cityMeanObj);
  };

  module.rentalController = rentalController;
})(window);
