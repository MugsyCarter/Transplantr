(function(module) {
  var infoController = {};

  infoController.reveal = function() {
    $('div').not('.hero').hide();
    $('.search-page').show();
    $('a').show();
    $('#info-link').hide();
    $('.hero').fadeOut(function() {
      $('.hero').text('Transplant Me').fadeIn().animate({fontSize: '4em'}, 800);
    });
  };

  module.infoController = infoController;
})(window);
