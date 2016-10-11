(function(module) {
  var graphsController = {};

  graphsController.reveal = function() {
    $('.tab-content').hide();
    $('#graphs-page').show();
    $('#city-link').parent().hide();
    $('.hero').text('City Comparisons').animate({fontSize: '3em'}, 800);
  };

  module.graphsController = graphsController;
})(window);
