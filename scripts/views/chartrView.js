'use strict';

function drawChart() {

  var ctx = $('#chart_canvas');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['You', 'National Median Income', 'Your Median Rent', 'Destination Median Rent'],
      datasets: [{
        label: 'National Median Income',
        data: [1,25,36,4,9],
        backgroundColor: 'rgba(0, 167, 225, 1)'
      },
      {
        label: 'Destination Median Income',
        data: [3,17,48,43,8],
        backgroundColor: 'rgba(0, 52, 89, 1)'
      },
      {
        label: 'National Median Rent',
        data: [9,55,24,9,9],
        backgroundColor: 'rgba(0, 126, 167, 1)'
      },
      {
        label: 'Destination Median Rent',
        data: [66,33,8,44,17],
        backgroundColor: 'rgba(0, 64, 87, 1)'
      }]
    },
    options: {
      title: {
        fontFamily: "'Open Sans', sans-serif"
      },
      xAxes: [{
        ticks: {
          beginAtZero:true
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    }
  });
}

drawChart();
