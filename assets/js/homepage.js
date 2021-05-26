var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=chicago&appid=518cefa1a9edeefef3077a2f5077d0a7"
var forcastURL = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=518cefa1a9edeefef3077a2f5077d0a7"



var getWeather = function (user) {
    // format the weather api url
    

    fetch(weatherURL).then(function(response) {
        response.json().then(function (data) {
            console.log(data);
        });
    });
};

// $("#cityBtn").on("click"), function() {
//     $(this).
// };


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