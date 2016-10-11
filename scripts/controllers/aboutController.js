(function(module) {
  var aboutController = {};

  aboutController.reveal = function() {
    $('.tab-content').hide();
    $('#about-page').fadeIn();
    $('.hero').fadeOut(function() {
      $('.hero').text('About Transplantr').fadeIn().animate({fontSize: '3em'}, 800);
    });
  };

  module.aboutController = aboutController;
})(window);
