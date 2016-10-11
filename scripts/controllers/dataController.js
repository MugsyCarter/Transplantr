(function(module) {
  var dataController = {};

  dataController.reveal = function() {
    $('.tab-content').hide();
    $('#data-page').fadeIn();
    $('#transplantr').fadeOut(function() {
      $('#transplantr').text('Transplant Me').fadeIn();
    });
  };

  module.dataController = dataController;
})(window);
