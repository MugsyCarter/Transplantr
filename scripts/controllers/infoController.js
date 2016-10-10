(function(module) {
  var infoController = {};

  infoController.reveal = function() {
    $('div').not('.head').slideUp();
  };

  module.infoController = infoController;
})(window);
