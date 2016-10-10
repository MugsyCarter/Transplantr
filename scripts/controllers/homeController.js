(function(module) {
  var homeController = {};

  homeController.reveal = function() {
    $('div:not".home-column"').fadeout('fast');
    $('.home-column').show();

    alert('page is working!');
  };

  module.homeController = homeController;
})(window);
