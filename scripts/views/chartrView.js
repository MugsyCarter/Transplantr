'use strict';

var homecity = localStorage.getItem('homecity');
var awaycity = localStorage.getItem('awaycity');
var myIncome = parseInt(localStorage.getItem('income'));
var homeincome = localStorage.getItem('homeincome');
var awayincome = localStorage.getItem('awayincome');
var homehome = localStorage.getItem('homehomePrice');
var awayhome = localStorage.getItem('awayhomePrice');

function drawChart() {
  setTimeout(function() {

    var ctx = $('#chart_canvas');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Home Values'],
        datasets: [{
          label: 'You',
          data: [myIncome],
          backgroundColor: 'rgba(0, 167, 225, 1)'
        },
        {
          label: homecity,
          data: [homehome.slice(1)],
          backgroundColor: 'rgba(0, 52, 89, 1)'
        },
        {
          label: awaycity,
          data: [awayhome.slice(1)],
          backgroundColor: 'rgba(0, 126, 167, 1)'
        },
        {
          label: 'National Median',
          data: [284000],
          backgroundColor: 'rgba(0, 23, 31, 1)'
        },
      ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              suggestedMin:0,
              beginAtZero:true
            }
          }],
          xAxes: [{
            ticks: {
              suggestedMin:0,
              beginAtZero:true
            }
          }]
        }
      }
    });
  }, 300);
};

drawChart();

function drawChart2() {
  setTimeout(function() {

    var ctx = $('#chart2_canvas');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Income Comparison'],
        datasets: [{
          label: 'You',
          data: [myIncome],
          backgroundColor: 'rgba(0, 167, 225, 1)'
        },
        {
          label: homecity,
          data: [homeincome.slice(1)],
          backgroundColor: 'rgba(0, 52, 89, 1)'
        },
        {
          label: awaycity,
          data: [awayincome.slice(1)],
          backgroundColor: 'rgba(0, 126, 167, 1)'
        },
        {
          label: 'National Median',
          data: [51759],
          backgroundColor: 'rgba(0, 23, 31, 1)'
        },
      ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              suggestedMin:0,
              beginAtZero:true
            }
          }],
          xAxes: [{
            ticks: {
              suggestedMin:0,
              beginAtZero:true
            }
          }]
        }
      }
    });
  }, 300);
};

drawChart2();
