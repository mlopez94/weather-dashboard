var getWeather = function (user) {
    // format the weather api url
    var weatherURL = "" + user;

    // make a request to the url
    fetch(weatherURL).then(function(response) {
        response.json().then(function (data) {
            console.log(data);
        });
    });
};

var formEl = document.querySelector("#user-form");
var inputEl = document.querySelector("#entercity");


// testing button
var formSubmitHandler = function (event) {
    event.preventDefault();
    //get value from input element
    var entercity = inputEl.value.trim();

    if(entercity) {
        getWeather(entercity);
        inputEl.value = "";
    } else {
        alert("Please enter a city");
    }

    console.log(event);
};

formEl.addEventListener("submit", formSubmitHandler);