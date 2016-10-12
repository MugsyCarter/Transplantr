//IIFE here
(function(module) {
  // contructor function to make object out of API response data

  var Data = {};

//called in Mortgage.js to create home and away objects
  Data.location = function(state, county, city, homePrice, income, poverty){
    this.state = state;
    this.county = county;
    this.city = city;
    this.homePrice = homePrice;
    this.income = income;
    this.poverty = poverty;
  };
//called in city.js.  Needed to get usable econ data.
  Data.parseEconData = function(obj){
    Data.econIncome= obj.medianIncome;
    Data.econPoverty= obj.percentPoverty;
  };


  module.Data = Data;
})(window);
