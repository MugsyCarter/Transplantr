(function(module) {
  var rentalController = {};

  rentalController.reveal = function(stateObj) {
    cityView.handleStateRental(stateObj);
  };

  module.rentalController = rentalController;
})(window);
