//API Key for Openweather API
const apiKey = "13a4cd452f49d14b9a24491cdc2af043";

//DOM elements
const searchButton = document.querySelector("#search-btn");
const clearButton = document.getElementById("clear-history-btn");
const city = document.querySelector(".city");
const currentCity = document.querySelector("#current-city");
const currentTemp = document.querySelector("#current-temp");
const currentWind = document.querySelector("#current-wind");
const currentHumidity = document.querySelector("#current-humidity");
const forecast = $(".forecast");
let savedCitiesEl = $("#saved-cities");
var lat;
var lon;


// Search Weather function pulling weather data from open weather 
function searchWeather(cityName) {
    if (!cityName) return;

    console.log(cityName);

    // API request for Current Weather
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

    // Fetch current weather data 
    fetch(requestUrl)
        .then((response) => {
            return response.json();
        })
        // Display Current weather 
        .then((data) => {
            lat = data.coord.lat;
            lon = data.coord.lon;
            temp = data.main.temp;
            wind = data.wind.speed;
            humidity = data.main.humidity;
            currentCity.textContent = `City: ${cityName}`;
            currentTemp.textContent = `Temp: ${temp} °F`;
            currentWind.textContent = `Wind: ${wind} mph`;
            currentHumidity.textContent = `Humidity: ${humidity}%`;
            //API for 5-day forecast
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

            //fetch 5-day data
            fetch(forecastUrl)
                .then((response) => {
                    return response.json();
                })

                .then((data) => {
                    console.log(data)
                    displayForecast(data.list);
                })

        });

    // Save city to local Storage
    saveCity(cityName);
}

// display the 5 day forecast

function displayForecast(forecastList) {
    forecast.empty();
    console.log(forecastList)
    for (var i = 0; i < forecastList.length; i += 8) {
        const forecastItem = forecastList[i];
        console.log(i)

        //create HTML elements for the forecast 
        var dayEl = `<div class="card row my-1 mx-auto" id="forecast">
    <ul id="Day-1"></ul>
    </div>`;
        var divEl = $("<div>");
        divEl.addClass("card row my-1 mx-auto");
        var ulEl = $("<ul>");
        //display the day number for the 5day forecast
        var dayText = `Day ${Math.ceil((i + 1) / 8)}`;
        var dayNum = $("<li>");
        dayNum.text(dayText);
        dayNum.addClass("forecast-day");
        ulEl.append(dayNum);
        //Forecast Details 
        var temp = $("<li>");
        var wind = $("<li>");
        var humidity = $("<li>");
        temp.text(`Temperature: ${forecastItem.main.temp} °F`);
        wind.text(`Wind: ${forecastItem.wind.speed} mph`);
        humidity.text(`Humidity: ${forecastItem.main.humidity}%`);
        ulEl.append(temp, wind, humidity);
        console.log(ulEl)
        divEl.append(ulEl);
        forecast.append(ulEl);
    }

}

// Save City to local Storage
function saveCity(cityName) {
    savedCitiesEl.empty();

    let savedCities = JSON.parse(localStorage.getItem("cities")) || [];

    if (cityName) {
        if (!savedCities.includes(cityName)) {
            savedCities.push(cityName);
            localStorage.setItem("cities", JSON.stringify(savedCities));
        }
    }
    console.log(savedCities);

    for (var i = 0; i < savedCities.length; i++) {
        var savedCitiesbtn = $("<button>");
        savedCitiesbtn.text(savedCities[i]);
        savedCitiesbtn.addClass("saved-city-button");
        savedCitiesbtn.on("click", cityClick);
        savedCitiesEl.append(savedCitiesbtn);
    }
}

saveCity();

savedCitiesEl.on("click", ".saved-city-button", cityClick);

function cityClick() {
    console.log("button clicked!!!")
    var cityName = $(this).text();
    searchWeather(cityName);
}


// Clear the saved cities
function clearHistory() {
    console.log("Clear history");

    // clear local storage
    localStorage.removeItem("cities")
    savedCitiesEl.empty(); 
}



searchButton.addEventListener("click", function () {
    var cityName = city.value.trim();
    searchWeather(cityName);
});
clearButton.addEventListener("click", clearHistory);