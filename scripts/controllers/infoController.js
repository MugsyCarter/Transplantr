(function(module) {
  var infoController = {};

  infoController.reveal = function() {
    $('.home-column').fadeout('fast');
    $('.search-page').show();
  };

  module.infoController = infoController;
})(window);
