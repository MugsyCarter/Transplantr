//IIFE here
(function(module) {
  // contructor function to make object out of API response data

  var Data = {};

//called in Mortgage.js to create home and away objects
  // takes state, county, city, homePrice, income, poverty, and rental info
  Data.location = function(data){
    for (key in data) {
      this[key] = data[key]
    }
  };
//called in city.js.  Needed to get usable econ data.
  Data.parseEconData = function(obj){
    Data.econIncome= obj.medianIncome;
    Data.econPoverty= obj.percentPoverty;
  };

  Data.storeData = function(obj, isCurrent){
    if(isCurrent){
      var tag = 'home';
    }
    else {
      var tag = 'away';
    }
    for (key in obj){
      localStorage.setItem(tag+key, obj[key]);
    }
  };

  module.Data = Data;
})(window);
