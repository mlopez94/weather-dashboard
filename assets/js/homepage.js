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
    $(".cityList").append("<div>" + cities[i] + "</div>");
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
    var icon = data.daily[i].weather[i].icon;
    var temp = data.daily[i].temp.day;
    var uvi = data.daily[i].uvi;
    var humidity = data.daily[i].humidity;
    var wind = data.daily[i].wind_speed;

    // temp for cards
    $("#temp1").empty();
    $("#temp2").empty();
    $("#temp3").empty();
    $("#temp4").empty();
    $("#temp5").empty();

    // humidity for cards
    $("#humid1").empty();
    $("#humid2").empty();
    $("#humid3").empty();
    $("#humid4").empty();
    $("#humid5").empty();

    // wind speed for cards
    $("#wind1").empty();
    $("#wind2").empty();
    $("#wind3").empty();
    $("#wind4").empty();
    $("#wind5").empty();

    // pulling data for temp
    temp1 = "Temp: " + data.daily[0].temp.day + " °F";
    temp2 = "Temp: " + data.daily[1].temp.day + " °F";
    temp3 = "Temp: " + data.daily[2].temp.day + " °F";
    temp4 = "Temp: " + data.daily[3].temp.day + " °F";
    temp5 = "Temp: " + data.daily[4].temp.day + " °F";

    // pulling data for humidity
    humid1 = "Humidity: " + data.daily[0].humidity + " %";
    humid2 = "Humidity: " + data.daily[1].humidity + " %";
    humid3 = "Humidity: " + data.daily[2].humidity + " %";
    humid4 = "Humidity: " + data.daily[3].humidity + " %";
    humid5 = "Humidity: " + data.daily[4].humidity + " %";

    // pulling data for wind speed
    wind1 = "Wind: " + data.daily[0].wind_speed + " MPH";
    wind2 = "Wind: " + data.daily[1].wind_speed + " MPH";
    wind3 = "Wind: " + data.daily[2].wind_speed + " MPH";
    wind4 = "Wind: " + data.daily[3].wind_speed + " MPH";
    wind5 = "Wind: " + data.daily[4].wind_speed + " MPH";

    // appending data
    $("#temp1").append(temp1);
    $("#temp2").append(temp2);
    $("#temp3").append(temp3);
    $("#temp4").append(temp4);
    $("#temp5").append(temp5);

    // appending humidity
    $("#humid1").append(humid1);
    $("#humid2").append(humid2);
    $("#humid3").append(humid3);
    $("#humid4").append(humid4);
    $("#humid5").append(humid5);

    //append wind
    $("#wind1").append(wind1);
    $("#wind2").append(wind2);
    $("#wind3").append(wind3);
    $("#wind4").append(wind4);
    $("#wind5").append(wind5);

    console.log(temp5);

    console.log(icon)
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
