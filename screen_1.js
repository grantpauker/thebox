$.ajax({
  url: forecast10dayURL,
  async: false,
  dataType: 'json',
  success: function(d) {
    var data = d.forecast.simpleforecast.forecastday;
    for (var i = 0; i < data.length; i ++) {
      var low = data[i].low.fahrenheit;
      var high = data[i].high.fahrenheit;
      var pop = data[i].pop;
      var wind = data[i].avewind.mph;
      var humidity = data[i].avehumidity;
      console.log(low,high,pop,wind,humidity);
    }


    document.getElementById("wind-speed").innerHTML = wind;
    document.getElementById("humidity").innerHTML = humidity;
    document.getElementById("pop").innerHTML = pop;
    document.getElementById("temp-low").innerHTML = low;
    document.getElementById("temp-high").innerHTML = high;


  }
});
