(function(module) {
  var aboutController = {};

  aboutController.reveal = function() {
    $('div').not('.hero').hide();
    $('.about-page').show();
    $('a').show();
    $('#about-link').hide();
  };

  module.aboutController = aboutController;
})(window);
