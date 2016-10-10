(function(module) {
  var homeController = {};

  homeController.reveal = function() {
    $('div').not('.hero').hide();
    $('.threeColumnHome').show();
    $('.home_column').show();
    $('.hero').text('Transplantr: The Smarter Way to Move');
    $('a').show();
    $('#home-link').hide();
    $('.hero').fadeOut(function() {
      $('.hero').text('Transplantr: The Smarter Way to Move').fadeIn().animate({fontSize: '2em'}, 800);
    });
  };

  module.homeController = homeController;
})(window);
