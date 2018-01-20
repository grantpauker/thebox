const hour_lookahead = 12;
const height = 200;
const width = 600;
const padding_top = 40;
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var temperatureChartData = [];
var lablesChartData = [];

var min, max, range;

function getTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var d = today.getDay();
  var ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h ? h : 12; // the hour '0' should be '12'
  m = m < 10 ? '0' + m : m; // the hour '0' should be '12'
  return weekday[d] + ' ' + h + ':' + m + ' ' + ampm;
}


function getDate() {
  var today = new Date();
  var m = today.getMonth() + 1;
  var d = today.getDate();
  var y = today.getFullYear();
  y = y.toString().substr(-2);
  return m + '/' + d + '/' + y;
}

var clockTimeout = setTimeout(function t() {
  document.getElementById("time").innerHTML = getTime();
}, 1000);

$.ajax({
  url: "json/hourly.json",
  async: false,
  dataType: 'json',
  success: function(data) {
    var newData = data.hourly_forecast;
    for (var i = 0; i < hour_lookahead; i++) {
      var tempDate = new Date(parseInt(newData[i].FCTTIME.epoch) * 1000);
      var hour = tempDate.getHours();
      var ampm = hour >= 12 ? 'pm' : 'am';
      hour = hour % 12;
      hour = hour ? hour : 12; // the hour '0' should be '12'
      temperatureChartData.push(parseInt(newData[i].temp.english));
      lablesChartData.push(hour + ampm);

    }
    max = Math.max(...temperatureChartData);
    min = Math.min(...temperatureChartData);
    range = max - min;
    max += Math.ceil(range * 0.1);
    min -= Math.ceil(range * 0.1);
  }
});

$.ajax({
  url: "json/conditions.json",
  async: false,
  dataType: 'json',
  success: function(d) {
    var data = d.current_observation;

    var eIcon = document.getElementById("main-icon");
    eIcon.setAttribute("src", "icons/black/svg/" + data.icon + ".svg");
    document.getElementById("temperature").innerHTML = data.temp_f + " °F";
    document.getElementById("humidity").innerHTML = data.relative_humidity;
    document.getElementById("wind-speed").innerHTML = data.wind_mph;
  }
});
$.ajax({
  url: "json/forecast.json",
  async: false,
  dataType: 'json',
  success: function(d) {
    var data = d.forecast.simpleforecast.forecastday;

    document.getElementById("pop").innerHTML = data[0].pop;

  }
});

var canvas = document.getElementById("myChart");
var ctx = canvas.getContext("2d");
var container = document.getElementById("chart-box");
container.setAttribute("style", "height:" + (height + padding_top) + "px; width: " + width + "px;")
Chart.defaults.global.tooltips.yPadding = 10;
var chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: lablesChartData,
    datasets: [{
      backgroundColor: "rgba(32, 162, 219, 0.3)",
      borderColor: "rgba(32, 162, 219, 255)",
      data: temperatureChartData,
      datalabels: {
        align: 'end',
        anchor: 'end'
      }
    }]
  },
  options: {
    legend: {
      display: false,
    },
    layout: {
      padding: {
        // Any unspecified dimensions are assumed to be 0
        top: padding_top
      }
    },

    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      datalabels: {
        backgroundColor: "rgba(32, 162, 219, 1)",
        borderRadius: 4,
        color: 'white',
        font: {
          weight: 'bold',
          size: 16
        },
        formatter: Math.round
      }
    },
    scales: {
      ticks: {
        userCallback: function(value, index, values) {
          return "";
        },

      },
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          callback: function(dataLabel, index) {
            return '';
          },
          max: max,
          min: min
        },
        stacked: true
      }],
      xAxes: [{
        gridLines: {
          display: false
        }

      }]
    }
  }
});
