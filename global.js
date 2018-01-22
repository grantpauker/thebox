const api_key = "ce4f08aa7cc2cea5";
// const forecastURL = "http://api.wunderground.com/api/" + api_key + "/forecast/q/CA/La_jolla.json";
// const conditionsURL = "http://api.wunderground.com/api/" + api_key + "/conditions/q/CA/La_jolla.json";
// const hourlyURL = "http://api.wunderground.com/api/" + api_key + "/hourly/q/CA/La_jolla.json";
// const forecast10dayURL = "http://api.wunderground.com/api/" + api_key + "/forecast10day/q/CA/La_jolla.json";
// const hourly10dayURL = "http://api.wunderground.com/api/" + api_key + "/hourly10day/q/CA/La_jolla.json";

const forecastURL = "json/forecast.json";
const conditionsURL = "json/conditions.json";
const hourlyURL = "json/hourly.json";
const forecast10dayURL = "json/forecast10day.json";
const hourly10dayURL = "json/hourly10day.json";

const height = 400;
const width = 600;

var files = require('fs').readdirSync(__dirname);
var s = [];
for (var f in files) {
  if (/^screen_([0-9]+)\.html/.test(files[f])) {
    s.push(files[f]);
  }
}
const screens = s;
const screen_count = screens.length;


function openScreen(n) {
  if (n>= 0 && n < screen_count && n % 1 == 0) {
    window.location.href = "screen_" + n + ".html";
  } else {
    console.error("Screen " + n + " does nots exist");
  }
}

function getScreen() {
  var n = new String(window.location.pathname).substring(window.location.pathname.lastIndexOf('/') + 1);
  if (n.lastIndexOf(".") != -1) {
    n = n.substring(0, n.lastIndexOf("."));
  }
  n = n.substring(n.lastIndexOf("_") + 1);
  n = parseInt(n);
  return n;
}

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const weekday_short = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
