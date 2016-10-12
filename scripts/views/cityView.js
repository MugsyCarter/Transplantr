/* This script holds all of the logic for rendering the various parts of the
city 'page' -- city, income, mortgage, rental, CPI, etc.
 */


var cityView = {};

cityView.handleStateRental = function(stateObj) {
  $('#state-rentals').hide().html(stateObj.createStateHtml()).fadeIn('slow');
};

cityView.handleCityMeanRental = function(cityMeanObj) {
  $('#city-mean-rentals').hide().html(cityMeanObj.createCityMeanHtml()).fadeIn('slow');
};

cityView.handleCityMedianRental = function(cityMedianObj) {
  $('#city-median-rentals').hide().html(cityMedianObj.createCityMedianHtml()).fadeIn('slow');
};

cityView.handleEcon = function(econObj) {
  $('#county-econ').hide().html(econObj.createEconHtml()).fadeIn('slow');
};