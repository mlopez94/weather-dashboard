var lon = 0;
var lat = 0;
var cities = [];

//global function to iterate through cities
var populateContainer = function () {
  if (JSON.parse(localStorage.getItem("myCity"))) {
    cities = JSON.parse(localStorage.getItem("myCity"));
  }

  $(".cityList").html("");

  for (var i = 0; i < cities.length; i++) {
    $(".cityList").append("<div class='btn btn-secondary btn-block'>" + cities[i] + "</div>");
  }
};

console.log(cities);
populateContainer();

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
  $("#icon").empty();
  $("#temp").empty();
  $("#uvi").empty();
  $("#humidity").empty();
  $("#wind").empty();

  icon = data.current.weather[0].icon;
  // iconEl = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
  temp = "Temperature: " + data.current.temp + " °F";
  humidity = "Humidity: " + data.current.humidity + "%";
  uvi = "UVI: " + data.current.uvi;
  wind = "Wind Speed: " + data.current.wind_speed + " MPH";

  $("#icon").append(icon);
  $("#temp").append(temp);
  $("#uvi").append(uvi);
  $("#humidity").append(humidity);
  $("#wind").append(wind);

  for (i = 1; i < 6; i++) {
    var icon = data.daily[i - 1].weather[0].icon;
    var temp = data.daily[i - 1].temp.day;
    var uvi = data.daily[i - 1].uvi;
    var humidity = data.daily[i - 1].humidity;
    var wind = data.daily[i - 1].wind_speed;

    // temp for cards
    $("#temp" + i).empty();

    // humidity for cards
    $("#humid" + i).empty();

    // wind speed for cards
    $("#wind" + i).empty();

    // appending data
    $("#temp" + i).append("Temp: " + temp + " °F");

    // appending humidity
    $("#humid" + i).append("Humidity: " + humidity + " %");

    //append wind
    $("#wind" + i).append("Wind: " + wind + " MPH");

    // icon for cards
    $("#icon" + i).attr(
      "src",
      "http://openweathermap.org/img/w/" + icon + ".png"
    );

    // icon for todays weather
    $("#icon").attr(
      "src",
      "http://openweathermap.org/img/w/" + icon + ".png"
    );

    
  }
};

$("#user-form").submit(function (event) {
  event.preventDefault();
  var buttonData = $("#entercity").val();
  var text = $(this).siblings("#entercity").val();
  var time = $(this).parent().attr("id");

  localStorage.setItem(time, text);

  cities.push(buttonData);
  localStorage.setItem("myCity", JSON.stringify(cities));
  populateContainer();

  getWeather(buttonData);
});
