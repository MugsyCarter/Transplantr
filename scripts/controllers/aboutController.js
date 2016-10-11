(function(module) {
  var aboutController = {};

  aboutController.reveal = function() {
    $('.tab-content').hide();
    $('#about-page').fadeIn();
    $('#transplantr').fadeOut(function() {
      $('#transplantr').text('About Transplantr').fadeIn();
    });
  };

  module.aboutController = aboutController;
})(window);
