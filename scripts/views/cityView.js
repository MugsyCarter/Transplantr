/* This script holds all of the logic for rendering the various parts of the
city 'page' -- city, income, mortgage, rental, CPI, etc.
 */


var cityView = {};

cityView.handleStateRental = function(stateObj) {
  if(Census.source){
    $('#state-rentals').hide().html(stateObj.createStateHtml()).fadeIn('slow');
  }
  else{
    $('#destination-state-rentals').hide().html(stateObj.createStateHtml()).fadeIn('slow');
    console.log('state rentals');
  }
};

cityView.handleCityMeanRental = function(cityMeanObj) {
  if(Census.source){
    $('#city-mean-rentals').hide().html(cityMeanObj.createCityMeanHtml()).fadeIn('slow');
  }
  else{
    $('#destination-city-mean-rentals').hide().html(cityMeanObj.createCityMeanHtml()).fadeIn('slow');
    console.log('city mean');
  }
};

cityView.handleCityMedianRental = function(cityMedianObj) {
  if(Census.source){
    $('#city-median-rentals').hide().html(cityMedianObj.createCityMedianHtml()).fadeIn('slow');
  }
  else {
    $('#destination-city-rentals').hide().html(cityMedianObj.createCityMedianHtml()).fadeIn('slow');
    console.log('city median');
  }
};

cityView.handleEcon = function(econObj) {
  if(Census.source){
    $('#county-econ').hide().html(econObj.createEconHtml()).fadeIn('slow');
  }
  else{
    $('#destination-econ').hide().html(econObj.createEconHtml()).fadeIn('slow');
    console.log('county econ');
  }
};
