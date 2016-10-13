(function(module) {
  var graphsController = {};

  graphsController.reveal = function() {
    $('.tab-content').hide();
    $('#graphs-page').fadeIn();
    $('.link a').css({color:'white'});
    $('#graphs-link').css({color:'grey'});
    $('#transplantr').fadeOut(function () {
      $('#transplantr').hide().text('City Comparisons').fadeIn();
    });
  };
  module.graphsController = graphsController;
})(window);
