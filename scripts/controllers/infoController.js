(function(module) {
  var infoController = {};

  infoController.reveal = function() {
    $('div').not('.hero, .icon-menu').hide();
    $('.search-page').show();
    $('li').show();
    $('ul li:nth-child(4)').hide();
    $('.hero').fadeOut(function() {
      $('.hero').text('Transplant Me').fadeIn().animate({fontSize: '4em', height: '0.1em'}, 800);
    });
  };

  module.infoController = infoController;
})(window);
