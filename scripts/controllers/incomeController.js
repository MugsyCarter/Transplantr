(function(module) {
  var incomeController = {};

  incomeController.revealEcon = function(econObj, isCurrent) {
    cityView.handleEcon(econObj, isCurrent);
  };

  module.incomeController = incomeController;
})(window);
