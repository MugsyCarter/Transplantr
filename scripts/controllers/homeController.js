(function(module) {
  var homeController = {};

  homeController.reveal = function() {
    $('div').not('.hero, .icon-menu').hide();
    $('.threeColumnHome').show();
    $('.home_column').show();
    $('.hero').text('Transplantr: The Smarter Way to Move');
    $('li').show();
    $('ul li:nth-child(2)').hide();
    $('.hero').fadeOut(function() {
      $('.hero').text('Transplantr: The Smarter Way to Move').fadeIn().animate({fontSize: '3em'}, 800);
    });
  };

  module.homeController = homeController;
})(window);
