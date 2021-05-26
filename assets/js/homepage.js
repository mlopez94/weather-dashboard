var lon = 0;
var lat = 0;

var forcastURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&appid=518cefa1a9edeefef3077a2f5077d0a7";




var getWeather = function (user) {
    // format the weather api url
    

    fetch("https://api.openweathermap.org/data/2.5/weather?q="+user+"&appid=2fd9f6120b1e5e49f6b0893e50ef57f6").then(function(response) {
        response.json().then(function (data) {
         lon = data.coord.lon;
         lat = data.coord.lat;
         
         displayWeather(lat, lon);

         

        });
    });
};

var displayWeather = function (lat, lon) {
    fetch(forcastURL).then(function(response) {
        response.json().then(function (data) {
            console.log(data);

            renderWeather(data);
        })
    })
};

var renderWeather = function (data) {
    temp = data.current.temp+" °F";
    humidity = data.current.humidity+" %";
    uvi = data.current.uvi;
    wind = data.current.wind_speed+" mph";

    $("#temp").append(temp);
    $("#uvi").append(uvi);
    $("#humidity").append(humidity);
    $("#wind").append(wind);


}

 $("#cityBtn").click (function(event) {
    event.preventDefault();
    var buttonData =  $("#entercity").val();


   getWeather(buttonData);

});










// var formEl = document.querySelector("#user-form");
// var inputEl = document.querySelector("#entercity");


// // testing button
// var formSubmitHandler = function (event) {
//     event.preventDefault();
//     //get value from input element
//     var entercity = inputEl.value.trim();

//     if(entercity) {
//         getWeather(entercity);
//         inputEl.value = "";
//     } else {
//         alert("Please enter a city");
//     }

//     console.log(event);
// };

// formEl.addEventListener("submit", formSubmitHandler);