(function(module) {
  var cityController = {};

  cityController.reveal = function() {
    $('div').not('.hero').hide();
    $('.city-comparison-page').show();
    $('a').show();
    $('#city-link').hide();
  };

  module.cityController = cityController;
})(window);
