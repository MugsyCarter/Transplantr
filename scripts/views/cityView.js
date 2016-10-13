/* This script holds all of the logic for rendering the various parts of the
city 'page' -- city, income, mortgage, rental, CPI, etc.
 */


var cityView = {};

cityView.handleEcon = function(econObj, isCurrent) {
  if(isCurrent){
    $('#county-econ').hide().html(econObj.createEconHtml()).fadeIn('slow');
  }
  else{
    $('#destination-econ').hide().html(econObj.createEconHtml()).fadeIn('slow');
  }
};

cityView.handleIncome = function(incomeObj) {
  $('#user_income').html('Your Income: <b>$' + incomeObj + '</b>').fadeIn('slow');
};


cityView.handleMortgage = function(mortgageObj, isCurrent) {
  if(isCurrent) {
    $('#mortgage-data').hide().html(mortgageObj.createMortgageHtml()).fadeIn('slow');
  } else {
    $('#destination-mortgage-data').hide().html(mortgageObj.createMortgageHtml()).fadeIn('slow');
  }
};

cityView.handleStateRental = function(stateObj, isCurrent) {
  if(isCurrent){
    $('#rental-data').hide().html(stateObj.createCurrentStateHtml()).fadeIn('slow');
  }
  else{
    $('#destination-rental-data').hide().html(stateObj.createDestinationStateHtml()).fadeIn('slow');
  }
};

cityView.handleCityMedianRental = function(cityMedianObj, isCurrent) {
  if(isCurrent){
    $('#curr_city_median_1bdrm').html('<p>Median price (1 bdrm apartment): <b>' + cityMedianObj.Median_1_BR_price + '</b></p>').fadeIn('slow');
    $('#curr_city_median_2bdrm').html('<p>Median price (2 bdrm apartment): <b>' + cityMedianObj.Median_2_BR_price + '</b></p>').fadeIn('slow');
  }
  else {
    $('#dest_city_median_1bdrm').html('<p>Median price (1 bdrm apartment): <b>' + cityMedianObj.Median_1_BR_price + '</b></p>').fadeIn('slow');
    $('#dest_city_median_2bdrm').html('<p>Median price (2 bdrm apartment): <b>' + cityMedianObj.Median_2_BR_price + '</b></p>').fadeIn('slow');
  }
};

cityView.handleCityMeanRental = function(cityMeanObj, isCurrent) {
  if(isCurrent){
    $('#curr_city_mean_1bdrm').html('<p>Mean price (1 bdrm apartment): <b>' + cityMeanObj.Mean_1-Bdrm_Price + '</b></p>').fadeIn('slow');
  }
  else{
    $('#dest_city_mean_1bdrm').html('<p>Mean price (1 bdrm apartment): <b>' + cityMeanObj.Mean_1-Bdrm_Price + '</b></p>').fadeIn('slow');
  }
};

/*
<p>In the city of <b>{{City}}</b>:</p>



*/
