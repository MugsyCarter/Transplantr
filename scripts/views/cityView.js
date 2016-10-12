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
  console.log('incomeobj is ', incomeObj);
  $('#user_income').html(incomeObj.createIncomeHtml()).fadeIn('slow');
};


cityView.handleMortgage = function(mortgageObj) {
  if(Census.source) {
    $('#mortgage-data').hide().html(mortgageObj.createMortgageHtml()).fadeIn('slow');
  } else {
    $('#destination-mortgage-data').hide().html(mortgageObj.createMortgageHtml()).fadeIn('slow');
  }
};

cityView.handleStateRental = function(stateObj) {
  if(Census.source){
    $('#rental-data').hide().html(stateObj.createStateHtml()).fadeIn('slow');
  }
  else{
    $('#destination-rental-data').hide().html(stateObj.createStateHtml()).fadeIn('slow');
    console.log('state rentals');
  }
};

cityView.handleCityMedianRental = function(cityMedianObj) {
  if(Census.source){
    $('#rental-data').append(cityMedianObj.createCityMedianHtml()).fadeIn('slow');
  }
  else {
    $('#destination-rental-data').append(cityMedianObj.createCityMedianHtml()).fadeIn('slow');
    console.log('city median');
  }
};

cityView.handleCityMeanRental = function(cityMeanObj) {
  if(Census.source){
    $('#rental-data').append(cityMeanObj.createCityMeanHtml()).fadeIn('slow');
  }
  else{
    $('#destination-rental-data').append(cityMeanObj.createCityMeanHtml()).fadeIn('slow');
    console.log('city mean');
  }
};
