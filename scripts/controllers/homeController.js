(function(module) {
  var homeController = {};

  homeController.reveal = function() {
    $('div').not('.hero, .icon-menu').hide();
    $('#threeColumnHome').show();
    $('.home_column').show();
    $('.link a').css({color:'white'});
    $('#home-link').css({color:'grey'});
    $('.hero').text('Transplantr: The Smarter Way to Move').fadeIn().animate({fontSize: '3em'}, 800);
  };

  module.homeController = homeController;
})(window);
