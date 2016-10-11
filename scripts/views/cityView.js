/* This script holds all of the logic for rendering the various parts of the
city 'page' -- city, income, mortgage, rental, CPI, etc.
 */


var cityView = {};

cityView.handleStateRental = function(stateObj) {
  $('#state-rentals').hide().html(stateObj.createStateHtml()).fadeIn('slow');
};

cityView.handleCityMeanRental = function(cityMeanObj) {
  console.log('in the view, cityMeanObj is', cityMeanObj);
  $('#city-mean-rentals').hide().html(cityMeanObj.createCityMeanHtml()).fadeIn('slow');
};


MortgageData.fetchZillow();
