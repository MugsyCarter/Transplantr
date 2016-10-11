(function(module) {
  var aboutController = {};

  aboutController.reveal = function() {
    $('div').not('.hero, .icon-menu').hide();
    $('#about-page').show();
    // $('.link').show();
    // $('#home-link').parent().hide();
    $('.hero').text('About Transplantr').fadeIn().animate({fontSize: '3em'}, 800);
  };

  module.aboutController = aboutController;
})(window);
