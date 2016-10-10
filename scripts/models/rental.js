/* This file does an AJAX call to the local JSON data in order to make
a useable data structure to display on the main page
 */

function RentalData (data) {
    // Loop through the data and make it into a MortgageData object
    for (key in data) {
        this[key] = data[key]
    }
}

// Create the array to hold the objects from the AJAX call
RentalData.stateData = [];

RentalData.fetchStates = function() {
    console.log('im in the fetchjson method');
    $.ajax({
        method: 'GET',
        url: '../data/state_rents.json',
        timeout: 2000,
        success: function(data, status, xhr) {
            // turn the json into RentalData
            RentalData.loadStateData(data);
            console.log(RentalData.stateData);
        },
        error: function(xhr, settings, error) {
            var message = 'Server returned a '
                + '<b>' + jqXHR.status + ' ' + thrownError + '</b>'
                + ' error message. <br />Please try again later.</div>';
            console.log(message);
        }
    })
};

RentalData.loadStateData = function(jsondata) {
    // This function loops through the json and turns it into a RentalData object
    RentalData.stateData = jsondata.map(function(state) {
        return new RentalData(state);
    })
};