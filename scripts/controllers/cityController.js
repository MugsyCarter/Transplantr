(function(module) {
  var cityController = {};

  cityController.reveal = function() {
    $('div').not('.hero, .icon-menu').hide();
    $('.city-comparison-page').show();
    $('li').show();
    $('ul li:nth-child(5)').hide();
    $('.hero').fadeOut(function() {
      $('.hero').text('City Comparisons').fadeIn().animate({fontSize: '3em'}, 800);
    });
  };

  module.cityController = cityController;
})(window);
