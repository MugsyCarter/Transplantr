(function(module) {
  var homeController = {};

  homeController.reveal = function() {
    $('.tab-content').hide();
    $('#threeColumnHome').fadeIn();
    $('#transplantr').fadeOut(function() {
      $('#transplantr').text('Transplantr: The Smarter Way to Move').fadeIn();
    });
  };

  module.homeController = homeController;
})(window);
