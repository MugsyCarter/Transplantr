(function(module) {
  var graphsController = {};

  graphsController.reveal = function() {
    $('div').not('.hero, .icon-menu').hide();
    $('#graphs-page').show();
    // $('.link').show();
    // $('#graphs-link').parent().hide();
    $('.hero').text('City Comparisons').animate({fontSize: '3em'}, 800);
  };

  module.graphsController = graphsController;
})(window);
