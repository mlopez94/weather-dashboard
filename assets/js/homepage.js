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
  $("#temp").empty();
  $("#uvi").empty();
  $("#humidity").empty();
  $("#wind").empty();

  temp = "Temperature: "+ data.current.temp + " °F";
  humidity = "Humidity: "+ data.current.humidity + " %";
  uvi = "UVI: "+ data.current.uvi;
  wind = "Wind Speed: "+ data.current.wind_speed + " mph";

  $("#temp").append(temp);
  $("#uvi").append(uvi);
  $("#humidity").append(humidity);
  $("#wind").append(wind);

  for (i = 1; i < 6; i++) {
    var temp = data.daily[i].temp.day;
    var uvi = data.daily[i].uvi;
    var humidity = data.daily[i].humidity;
    var wind = data.daily[i].wind_speed;

    //card creation
    var forcastCard = $("<div>").addClass("card");
    var forcastCardTitle = $("<div>").addClass("card-divide");
    var forcastCardBody = $("<div>").addClass("card-section");
    var forcastCardFooter = $("<div>").addClass("card-divide card-footer");
    console.log(forcastCardTitle);

    // insert city name
    var forcastEl = $("div").text


    console.log(uvi);
  }
};



$("#user-form").submit(function(event){
  event.preventDefault();
  var buttonData = $("#entercity").val();
  var text = $(this).siblings("#entercity").val();
  var time = $(this).parent().attr("id");

  localStorage.setItem(time, text);

  cities.push(buttonData);
  localStorage.setItem('myCity', JSON.stringify(cities));
  populateContainer();

  getWeather(buttonData);
});
