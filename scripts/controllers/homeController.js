(function(module) {
  var homeController = {};

  homeController.reveal = function() {
    $('div').not('.hero').hide();
    $('.threeColumnHome').show();
    $('.home_column').show();
    $('a').show();
    $('#home-link').hide();
    console.log('home controller working');
  };

  module.homeController = homeController;
})(window);
