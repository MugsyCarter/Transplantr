(function(module) {
  var homeController = {};

  homeController.reveal = function() {
    $('.tab-content').hide();
    $('#threeColumnHome').fadeIn();
    $('.link a').css({color:'white'});
    $('#home-link').css({color:'grey'});
    $('#transplantr').fadeOut(function () {
      $('#transplantr').hide().text('Transplantr: The Smarter Way to Move').fadeIn();
    });
  };

  module.homeController = homeController;
})(window);
