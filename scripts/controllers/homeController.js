(function(module) {
  var homeController = {};

  homeController.reveal = function() {
    $('.tab-content').hide();
    $('#threeColumnHome').show();
    $('.hero').fadeOut(function() {
      $('.hero').text('Transplantr: The Smarter Way to Move').fadeIn().animate({fontSize: '3em'}, 800);
    });
  };

  module.homeController = homeController;
})(window);
