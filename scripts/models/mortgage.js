/* This script handles pulling data from the Zillow API and making it
available to the Transplantr app

To use handlebars, my data needs to be stored as an array of objects.
 */


function MortgageData (data) {
    // Loop through the data and make it into a MortgageData object
    for (key in data) {
        this[key] = data[key]
    }
}

// Create the array to hold the objects from the AJAX call
MortgageData.allData = [];

MortgageData.prototype.createHtml = function() {
    // Grab the handlebars template, compile it
    // return the finished html
};

MortgageData.fetchZillow = function(city, state) {
    // This method does the API call to zillow
    $.ajax({
        method: 'GET',
        url: '/zillow/:city/:state'
        success: function(data, status, xhr) {
            console.log(data);
        },
        error: function(xhr, settings, error) {
            console.log('Server returned a ', xhr.status + ' ' + error + ' error.');
        }
    })
};

MortgageData.fetchZillow('portland', 'or');