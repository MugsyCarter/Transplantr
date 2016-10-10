/* This script holds all of the logic for rendering the various parts of the
city 'page' -- city, income, mortgage, rental, CPI, etc.
 */


var cityView = {};


cityView.handleStateRental = function() {
  RentalData.stateData.forEach(function(state) {
    $('#state-rentals').append(state.createStateHtml());
  });
};