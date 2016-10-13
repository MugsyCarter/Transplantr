(function(module) {
  var graphsController = {};

  graphsController.reveal = function() {
    $('.tab-content').hide();
    $('#graphs-page').fadeIn();
    $('.link a').css({color:'white'});
    $('#graphs-link').css({color:'grey'});
    $('#transplantr').fadeOut(function () {
      $('#transplantr').text('City Comparisons').fadeIn();
    });
    drawChart();
    drawChart2();
  };
  module.graphsController = graphsController;
})(window);
