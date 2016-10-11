'use strict';

function drawChart() {
  var nationalMedianIncome = [];

  var ctx = $('#chart_canvas');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['National Median Income', 'Destination Median Income', 'National Median Rent', 'Destination Median Rent'],
      datasets: [{
        label: 'National Median Income',
        data: nationalMedianIncome,
      },
      {
        label: 'Destination Median Income',
        data: Census.allData,
      },
      {
        label: 'National Median Rent',
        data: nationalMedianIncome,
      },
      {
        label: 'Destination Median Rent',
        data: RentalData.stateData,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            stacked: true,
            beginAtZero: true
          }
        }]
      }
    }
  });
}

drawChart();
