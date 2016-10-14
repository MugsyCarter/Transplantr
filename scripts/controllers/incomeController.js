(function(module) {
  var incomeController = {};

  incomeController.revealEcon = function(econObj, isCurrent) {
    cityView.handleEcon(econObj, isCurrent);
  };

  incomeController.revealIncomeNeeedData = function() {
    cityView.handleIncomeNeededData();
  };

  module.incomeController = incomeController;
})(window);
