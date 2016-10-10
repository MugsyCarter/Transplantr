(function(module) {
  var cityController = {};

  cityController.reveal = function() {
    $('div').not('.hero').hide();
    $('.city-comparison-page').show();
    $('a').show();
    $('#city-link').hide();
    $('.hero').fadeOut(function() {
      $('.hero').text('City Comparisons').fadeIn().animate({fontSize: '3em'}, 800);
    });
  };

  module.cityController = cityController;
})(window);
