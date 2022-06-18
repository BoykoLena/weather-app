let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let temperatureValue = document.querySelectorAll(".temperature");
let temperatureUnit = document.querySelectorAll(".unit");

let fahrenheitTransferButton = document.querySelector("#fahrenheit_transfer");
function fahrenheitTransfer(event) {
  event.preventDefault();
  if (fahrenheitTransferButton.classList.contains("transfer")) {
  } else {
    fahrenheitTransferButton.classList.add("transfer");
    celsiusTransferButton.classList.remove("transfer");

    for (let i = 0; i < temperatureValue.length; i++) {
      temperatureValue[i].innerHTML = Math.round(
        (temperatureValue[i].innerHTML * 9) / 5 + 32
      );
    }

    for (let i = 0; i < temperatureUnit.length; i++) {
      temperatureUnit[i].innerHTML = "°F";
    }
  }
}
fahrenheitTransferButton.addEventListener("click", fahrenheitTransfer);

let celsiusTransferButton = document.querySelector("#celsius_transfer");
function celsiusTransfer(event) {
  event.preventDefault();
  if (celsiusTransferButton.classList.contains("transfer")) {
  } else {
    celsiusTransferButton.classList.add("transfer");
    fahrenheitTransferButton.classList.remove("transfer");
    for (let i = 0; i < temperatureValue.length; i++) {
      temperatureValue[i].innerHTML = Math.round(
        ((temperatureValue[i].innerHTML - 32) * 5) / 9
      );
    }

    for (let i = 0; i < temperatureUnit.length; i++) {
      temperatureUnit[i].innerHTML = "°C";
    }
  }
}
celsiusTransferButton.addEventListener("click", celsiusTransfer);

function request(cityRequest) {
  let apiKey = "70d3ffa9a4880bd0019219a54fdf13d4";
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityRequest}&appid=${apiKey}&units=metric`;
  axios.get(urlApi).then(showResponce);
}

function actualCity(city) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;
}

function actualCountry(countryName) {
  let country = document.querySelector(".country");
  country.innerHTML = countryName;
}

function actualTemperature(temperature) {
  let todayTemp = document.querySelector(".today_first_value span");
  todayTemp.innerHTML = Math.round(temperature);
}

function actualTemperatureMin(temperature) {
  let todayTempMin = document.querySelector(".today_second_value span");
  todayTempMin.innerHTML = Math.round(temperature);
}

function actialIcon(iconDescription) {
  let actualIconImg = document.querySelector(".today_icon");

  if (iconDescription === "Clear") {
    actualIconImg.src = "icons/clear_sky.png";
    actualIconImg.alt = "clear_sky";
  }
  if (iconDescription === "Clouds") {
    actualIconImg.src = "icons/scattered_clouds.png";
    actualIconImg.alt = "scattered_clouds";
  }
  if (iconDescription === "Rain") {
    actualIconImg.src = "icons/shower_rain.png";
    actualIconImg.alt = "shower_rain";
  }
  if (iconDescription === "Drizzle") {
    actualIconImg.src = "icons/light_rain.png";
    actualIconImg.alt = "light_rain";
  }
  if (iconDescription === "Thunderstorm") {
    actualIconImg.src = "icons/thunderstorm.png";
    actualIconImg.alt = "thunderstorm";
  }
  if (iconDescription === "Snow") {
    actualIconImg.src = "icons/snow.png";
    actualIconImg.alt = "snow";
  }
  if (
    iconDescription === "Mist" ||
    iconDescription === "Smoke" ||
    iconDescription === "Haze" ||
    iconDescription === "Dust" ||
    iconDescription === "Fog" ||
    iconDescription === "Sand" ||
    iconDescription === "Ash" ||
    iconDescription === "Squall" ||
    iconDescription === "Tornado"
  ) {
    actualIconImg.src = "icons/mist.png";
    actualIconImg.alt = "mist";
  }
}

function showResponce(responce) {
  celsiusTransfer(event);
  let city = responce.data.name;
  let country = responce.data.sys.country;
  let temp = responce.data.main.temp;
  let tempMin = responce.data.main.temp_min;
  let iconDescription = responce.data.weather[0].main;

  actualCity(city);
  actualCountry(country);
  actualTemperature(temp);
  actualTemperatureMin(tempMin);
  actialIcon(iconDescription);
}

function actualDay(dayNumber) {
  let today = document.querySelector("#today");
  let day = days[dayNumber];
  today.innerHTML = day;
}

function actualTime() {
  let nowDate = new Date();
  let nowHours = nowDate.getHours();
  let nowMinutes = nowDate.getMinutes();
  let nowDayNumber = nowDate.getDay();
  let localDay = document.querySelector(".local_day");
  let nowDay = days[nowDayNumber];
  localDay.innerHTML = nowDay;
  let localTime = document.querySelector(".local_time");
  if (nowMinutes < 10) {
    nowMinutesminutes = `0${nowMinutes}`;
  }
  if (nowHours < 10) {
    nowHours = `0${nowHours}`;
  }
  localTime.innerHTML = `${nowHours}:${nowMinutes}`;
}

setInterval(actualTime, 1000);

function lastUpdated(hours, minutes) {
  let lastUpdated = document.querySelector("#lastUpdated");
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  lastUpdated.innerHTML = `${hours}:${minutes}`;
}

function actualData(date, monthNumber, year) {
  let todayData = document.querySelector("#today_data");
  let month = months[monthNumber];
  todayData.innerHTML = `${date} ${month} ${year}`;
}

function nextDay(numberDay) {
  let nextDayArr = document.querySelectorAll(".next_day_name");
  for (let i = 0; i < nextDayArr.length; i++) {
    if (numberDay === 6) {
      numberDay = 0;
    } else {
      numberDay = numberDay + 1;
    }
    nextDayArr[i].innerHTML = days[numberDay];
  }
}

function requestData() {
  let nowDate = new Date();
  let dayNumber = nowDate.getDay();
  let hours = nowDate.getHours();
  let minutes = nowDate.getMinutes();
  let date = nowDate.getDate();
  let monthNumber = nowDate.getMonth();
  let year = nowDate.getFullYear();

  lastUpdated(hours, minutes);
  actualDay(dayNumber);
  actualData(date, monthNumber, year);
  nextDay(dayNumber);
}

function byDefault() {
  request("Sydney");
  requestData();
}

byDefault();

let yourLocation = document.querySelector(".your_location a");

function checkWeatherInYourLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "70d3ffa9a4880bd0019219a54fdf13d4";
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(urlApi).then(showResponce);
}

yourLocation.addEventListener("click", checkWeatherInYourLocation);

let searchCityForm = document.querySelector(".search_city_form");

function searchCity(event) {
  event.preventDefault();
  let yourCityName = document.querySelector(".enter_your_city").value;
  if (yourCityName != "") {
    request(yourCityName);
  } else {
    alert("Please, enter the city OR check the weather in your area");
  }
}

searchCityForm.addEventListener("submit", searchCity);
