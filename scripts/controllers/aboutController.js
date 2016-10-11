(function(module) {
  var aboutController = {};

  aboutController.reveal = function() {
    $('div').not('.hero, .icon-menu').hide();
    $('#about-page').show();
    $('li').show();
    $('ul li:nth-child(3)').hide();
    $('.hero').fadeOut(function() {
      $('.hero').text('About Transplantr').fadeIn().animate({fontSize: '3em'}, 800);
    });
  };

  module.aboutController = aboutController;
})(window);
