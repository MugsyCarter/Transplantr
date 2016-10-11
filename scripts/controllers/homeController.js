(function(module) {
  var homeController = {};

  homeController.reveal = function() {
    $('div').not('.hero, .icon-menu').hide();
    $('#threeColumnHome').show();
    $('.home_column').show();
    // $('#home-link').parent().css({color:grey});
    $('.hero').text('Transplantr: The Smarter Way to Move').fadeIn().animate({fontSize: '3em'}, 800);
  };

  module.homeController = homeController;
})(window);
