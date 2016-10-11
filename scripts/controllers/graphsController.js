(function(module) {
  var graphsController = {};

  graphsController.reveal = function() {
    $('.tab-content').hide();
    $('#graphs-page').fadeIn();

    $('#transplantr').fadeOut(function () {
      $('#transplantr').text('City Comparisons').fadeIn();
    });
  };
  module.graphsController = graphsController;
})(window);
