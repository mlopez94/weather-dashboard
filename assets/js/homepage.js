var lon = 0;
var lat = 0;

var getWeather = function (user) {
  // format the weather api url

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      user +
      "&appid=2fd9f6120b1e5e49f6b0893e50ef57f6"
  ).then(function (response) {
    response.json().then(function (data) {
      lon = data.coord.lon;
      lat = data.coord.lat;

      displayWeather(lat, lon);
    });
  });
};

var displayWeather = function (lat, lon) {
  var forcastURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=518cefa1a9edeefef3077a2f5077d0a7";
  fetch(forcastURL).then(function (response) {
    response.json().then(function (data) {
      console.log(data);

      renderWeather(data);
    });
  });
};

var renderWeather = function (data) {
  $("#temp").empty();
  $("#uvi").empty();
  $("#humidity").empty();
  $("#wind").empty();

  temp = data.current.temp + " °F";
  humidity = data.current.humidity + " %";
  uvi = data.current.uvi;
  wind = data.current.wind_speed + " mph";

  $("#temp").append(temp);
  $("#uvi").append(uvi);
  $("#humidity").append(humidity);
  $("#wind").append(wind);

  for (i=1; i < 6; i++) {
    var temp = data.daily[i].temp.day;
    var uvi = data.daily[i].uvi;
    var humidity = data.daily[i].humidity;
    var wind = data.daily[i].wind_speed;

    

    console.log(uvi);







  




  }
};

$("#cityBtn").click(function (event) {
  event.preventDefault();
  var buttonData = $("#entercity").val();
  var text = $(this).siblings("#entercity").val();
  var time = $(this).parent().attr("id");
  
  
  localStorage.setItem(time, text);

  getWeather(buttonData);
});

