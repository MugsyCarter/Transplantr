(function(module) {
  var graphsController = {};

  graphsController.reveal = function() {
    $('div').not('.hero, .icon-menu').hide();
    $('#graphs-page').show();
    $('li').show();
    //be more specific thatn "li"
    //then update all the other controllers
    $('#city-link').parent().hide();
    $('.hero').text('City Comparisons').animate({fontSize: '3em'}, 800);
  };

  module.graphsController = graphsController;
})(window);
