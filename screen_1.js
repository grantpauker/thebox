var today = new Date();

// for (var i = today.getDay(); i < today.getDay() + 6; i++) {
//   var eDay = document.getElementById("weekday-" + (i + 1));
//   eDay.innerHTML = weekday[i];
// }
// var eDay = document.getElementById("weekday-1");
// eDay.innerHTML = weekday[0];
$.ajax({
  url: forecast10dayURL,
  async: false,
  dataType: 'json',
  success: function(d) {
    var data = d.forecast.simpleforecast.forecastday;
    var i = 1;
    var icon = 'icons/black/svg/clear.svg'
    var low = 100;
    var high = 200;


    var day = "Sunday"
    for (var i = 0; i < 6; i++) {
      var low = data[i].low.fahrenheit;
      var high = data[i].high.fahrenheit;
      var icon = "icons/black/svg/" + data[i].icon + ".svg";
      var pop = data[i].pop;
      var humidity = data[i].avehumidity;
      var wind = data[i].avewind.mph;

      $("#grid").append(`
         <div id="grid-weekday-${i}" style="grid-column: ${i}; grid-row: 1;">
           <h id="weekday-${i}">${day}</h>
         </div>
         <div id="grid-icon-${i}" style="grid-column: ${i}; grid-row: 2;">
           <img id="icon-${i}" src="${icon}" style="height:100%; width:100%;"></img>
         </div>
         <div id="grid-forecast-${i}" class="inline-block" style="grid-column: ${i}; grid-row: 3;">
           <div>
             <h id="low-${i}">${low} °F</h>
           </div>
           <div>
             <h id="high-${i}" >${high} °F</h>
           </div>
           <div>
             <h id="pop-${i}" >${pop}%</h>
           </div>
           <div>
             <h id="humidity-${i}" >${humidity}%</h>
           </div>
           <div>
             <h id="wind-${i}" >${wind} mph</h>
           </div>
         </div>

         `);
    }

  }
});
