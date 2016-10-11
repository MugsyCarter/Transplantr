(function(module) {
  var aboutController = {};

  aboutController.reveal = function() {
    $('.tab-content').hide();
    $('#about-page').fadeIn();
    $('.link a').css({color:'white'});
    $('#about-link').css({color:'grey'});
    $('#transplantr').fadeOut(function() {
      $('#transplantr').text('About Transplantr').fadeIn();
    });
  };

  module.aboutController = aboutController;
})(window);
