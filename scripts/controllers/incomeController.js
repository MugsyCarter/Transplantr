(function(module) {
  var incomeController = {};

  incomeController.revealEcon = function(econObj) {
    cityView.handleEcon(econObj);
  };

  module.incomeController = incomeController;
})(window);
