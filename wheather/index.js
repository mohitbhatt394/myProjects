let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");
let cityInput = document.querySelector(".city_name");

function getCountryName(code) {
  return new Intl.DisplayNames(['en'], { type: 'region' }).of(code);
}

function getDateAndTime(timestamp) {
  let date = new Date(timestamp * 1000);

  let options = {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

async function getWeatherData(city = "Haridwar") {
  try {
    let weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fb02b7a95e4acd5c49ba9c54dab82d50`
    );

    if (!weatherData.ok) {
      throw new Error("City not found");
    }

    let response = await weatherData.json();

    const { main, name, weather, wind, sys, dt } = response;

    cityName.textContent = `${name}, ${getCountryName(sys.country)}`;
    dateTime.textContent = getDateAndTime(dt);
    w_forecast.textContent = weather[0].main;
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;
    w_temperature.innerHTML = `${(main.temp - 273.15).toFixed(2)}&#176C`;
    w_minTem.innerHTML = `Min: ${(main.temp_min - 273.15).toFixed(2)}&#176C`;
    w_maxTem.innerHTML = `Max: ${(main.temp_max - 273.15).toFixed(2)}&#176C`;

    w_feelsLike.innerHTML = `${(main.feels_like - 273.15).toFixed(2)}&#176C`;
    w_humidity.textContent = `${main.humidity}%`;
    w_wind.textContent = `${wind.speed} m/s`;
    w_pressure.textContent = `${main.pressure} hPa`;
  } catch (error) {
    console.error(error);
    cityName.textContent = "City not found";
    dateTime.textContent = "";
    w_forecast.textContent = "";
    w_icon.innerHTML = "";
    w_temperature.innerHTML = "";
    w_minTem.innerHTML = "";
    w_maxTem.innerHTML = "";
    w_feelsLike.innerHTML = "";
    w_humidity.textContent = "";
    w_wind.textContent = "";
    w_pressure.textContent = "";
  }
}

citySearch.addEventListener("submit", (e) => {
  e.preventDefault();
  if (cityInput.value.trim() !== "") {
    getWeatherData(cityInput.value);
  } else {
    alert("Please enter a city name.");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  getWeatherData();
});
