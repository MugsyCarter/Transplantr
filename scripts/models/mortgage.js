/* This script handles pulling data from the Zillow API and making it
available to the Transplantr app

To use handlebars, my data needs to be stored as an array of objects.
 */

(function(module) {

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

MortgageData.fetchZillow = function() {
    console.log('im in the fetchZillow function');
    // This method does the API call to zillow
    $.ajax({
        method: 'GET',
        url: '/zillow',
        success: function(data, status, xhr) {
            console.log('inside the fetch ajax call, data is:', data);
        },
        error: function(xhr, settings, error) {
            console.log('Server returned a ', xhr.status + ' ' + error + ' error.');
        }
    })
};

    module.MortgageData = MortgageData;
})(window);