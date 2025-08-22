const cityName = document.querySelector(".weather-city");
const dateTime = document.querySelector(".weather-date-time");
const w_forecast = document.querySelector(".weather-forecast");
const w_temperature = document.querySelector(".weather-temperature");
const w_icon = document.querySelector(".weather-icon");
const w_minTem = document.querySelector(".weather-min");
const w_maxTem = document.querySelector(".weather-max");

const w_feelsLike = document.querySelector(".weather-feelsLike");
const w_humidity = document.querySelector(".weather-humidity");
const w_wind = document.querySelector(".weather-wind");
const w_pressure = document.querySelector(".weather-pressure");

const citySearch = document.querySelector(".weather-search");


const getCountryName = (code) => {
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);
};

const getDateTime = (dt) => {
    //let dt = 1708667988;
    const curDate = new Date(dt * 1000);
    console.log(curDate);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    console.log(formatter.format(curDate));
    return formatter.format(curDate);
};

let city = "Vadodara";

citySearch.addEventListener("submit", (e) => {
    e.preventDefault();

    let cityName = document.querySelector(".city-name");
    console.log(cityName.value);
    city = cityName.value;
    getWeatherData();
    cityName.value = "";
})


const getWeatherData = async () => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a0b06669a793506ae54060f7df8a5fb6&units=metric`;
    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        //console.log(data);

        const { main, name, weather, wind, sys, dt } = data;
        cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
        dateTime.innerHTML = getDateTime(dt);

        w_forecast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;

        w_temperature.innerHTML = `${main.temp}&#176`;
        w_minTem.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
        w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`;

        w_feelsLike.innerHTML = `${main.feels_like}&#176`;
        w_humidity.innerHTML = `${main.humidity}%`;
        w_wind.innerHTML = `${wind.speed} m/s`;
        w_pressure.innerHTML = `${main.pressure} hPa`;

    } catch (error) {
        console.log("Error fetching weather data:", error);
    }
};

window.addEventListener("load", getWeatherData);