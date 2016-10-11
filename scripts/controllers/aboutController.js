(function(module) {
  var aboutController = {};

  aboutController.reveal = function() {
    $('div').not('.hero, .icon-menu').hide();
    $('#about-page').show();
    $('.link a').css({color:'white'});
    $('#about-link').css({color:'grey'});
    // $('.link').show();
    // $('#home-link').parent().hide();
    $('.hero').text('About Transplantr').fadeIn().animate({fontSize: '2em'}, 800);
  };

  module.aboutController = aboutController;
})(window);
