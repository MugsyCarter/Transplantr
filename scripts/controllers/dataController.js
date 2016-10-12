(function(module) {
  var dataController = {};

  dataController.reveal = function() {
    $('.tab-content').hide();
    $('#data-page').fadeIn();
    $('.link a').css({color:'white'});
    $('#data-link').css({color:'grey'});
    $('#transplantr').fadeOut(function() {
      $('#transplantr').text('Transplant Me').fadeIn();
    });
  };

  dataController.mortgageReveal = function(mortgageObj) {
    cityView.handleMortgage(mortgageObj);
  };

  module.dataController = dataController;
})(window);
