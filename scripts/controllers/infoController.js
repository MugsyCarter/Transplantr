(function(module) {
  var infoController = {};

  infoController.reveal = function() {
    $('div').not('.hero').hide();
    $('.search-page').show();
    $('a').show();
    $('#info-link').hide();
  };

  module.infoController = infoController;
})(window);
