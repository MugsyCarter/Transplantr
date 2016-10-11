(function(module) {
  var dataController = {};

  dataController.reveal = function() {
    $('.tab-content').hide();
    $('#data-page').show();
    $('.hero').fadeOut(function() {
      $('.hero').text('Transplant Me').fadeIn().animate({fontSize: '4em', height: '0.1em'}, 800);
    });
  };

  module.dataController = dataController;
})(window);
