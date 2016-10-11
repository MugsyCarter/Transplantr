(function(module) {
  var dataController = {};

  dataController.reveal = function() {
    $('div').not('.hero, .icon-menu').hide();
    $('#data-page').show();
    $('li').show();
    $('ul li:nth-child(4)').hide();
    $('.hero').fadeOut(function() {
      $('.hero').text('Transplant Me').fadeIn().animate({fontSize: '4em', height: '0.1em'}, 800);
    });
  };

  module.dataController = dataController;
})(window);
