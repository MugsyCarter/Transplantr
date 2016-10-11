(function(module) {
  var dataController = {};

  dataController.reveal = function() {
    $('div').not('.hero, .icon-menu').hide();
    $('#data-page').show();
    $('.link a').css({color:'white'});
    $('#data-link').css({color:'grey'});
    // $('.link').show();
    // $('#data-link').parent().hide();
    $('.hero').text('Transplant Me').fadeIn().animate({fontSize: '4em', height: '0.1em'}, 800);
  };

  module.dataController = dataController;
})(window);
