/* This script holds all of the logic for rendering the various parts of the
city 'page' -- city, income, mortgage, rental, CPI, etc.
 */


var cityView = {};

cityView.handleEcon = function(econObj) {
  if(Census.source){
    $('#county-econ').hide().html(econObj.createEconHtml()).fadeIn('slow');
  }
  else{
    $('#destination-econ').hide().html(econObj.createEconHtml()).fadeIn('slow');
    console.log('county econ');
  }
};

cityView.handleIncome = function(incomeObj) {
  $('#user_income').html('Your Income: <b>$' + incomeObj + '</b>').fadeIn('slow');
};


cityView.handleMortgage = function(mortgageObj) {
  if(MortgageData.source) {
    $('#mortgage-data').hide().html(mortgageObj.createMortgageHtml()).fadeIn('slow');
  } else {
    $('#destination-mortgage-data').hide().html(mortgageObj.createMortgageHtml()).fadeIn('slow');
  }
};

cityView.handleStateRental = function(stateObj, isCurrent) {
  if(isCurrent){
    $('#rental-data').hide().html(stateObj.createStateHtml()).fadeIn('slow');
  }
  else{
    $('#destination-rental-data').hide().html(stateObj.createStateHtml()).fadeIn('slow');
  }
};

cityView.handleCityMedianRental = function(cityMedianObj, isCurrent) {
  if(isCurrent){
    $('#rental-data').append(cityMedianObj.createCityMedianHtml()).fadeIn('slow');
  }
  else {
    $('#destination-rental-data').append(cityMedianObj.createCityMedianHtml()).fadeIn('slow');
  }
};

cityView.handleCityMeanRental = function(cityMeanObj, isCurrent) {
  if(isCurrent){
    $('#rental-data').append(cityMeanObj.createCityMeanHtml()).fadeIn('slow');
  }
  else{
    $('#destination-rental-data').append(cityMeanObj.createCityMeanHtml()).fadeIn('slow');
  }
};
