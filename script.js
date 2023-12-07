const apiKey = "13a4cd452f49d14b9a24491cdc2af043";

const searchButton= document.querySelector("#search-btn");
const city = document.querySelector(".city");
const currentCity = document.querySelector("#current-city");
const currentTemp = document.querySelector("#current-temp");
const currentWind = document.querySelector("#current-wind");
const currentHumidity = document.querySelector("#current-humidity");
const forecast = document.querySelector("#forecast");
var lat;
var lon;


// Search Weather function pulling weather data from open weather 
function searchWeather () {
    const cityName = city.value.trim();
    if(!cityName) return;

    console.log(cityName);

    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
    
    fetch(requestUrl)
        .then ((response) => {
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

        })

        // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

}



searchButton.addEventListener("click", searchWeather); 