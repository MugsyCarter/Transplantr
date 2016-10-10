(function(module) {
  var aboutController = {};

  aboutController.reveal = function() {
    $('div').not('.hero').hide();
    $('.about-page').show();
    $('a').show();
    $('#about-link').hide();
    $('.hero').fadeOut(function() {
      $('.hero').text('About Transplantr').fadeIn().animate({fontSize: '3em'}, 800);
    });
  };

  module.aboutController = aboutController;
})(window);
