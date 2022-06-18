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

function showResponce(responce) {
  celsiusTransfer(event);
  console.log(responce.data);
  let city = responce.data.name;
  let country = responce.data.sys.country;
  let temp = responce.data.main.temp;
  let tempMin = responce.data.main.temp_min;

  actualCity(city);
  actualCountry(country);
  actualTemperature(temp);
  actualTemperatureMin(tempMin);
}

function actualDay(dayNumber) {
  let localDay = document.querySelector(".local_day");
  let today = document.querySelector("#today");
  let day = days[dayNumber];
  localDay.innerHTML = day;
  today.innerHTML = day;
}

function actualTime(hours, minutes) {
  let localTime = document.querySelector(".local_time");
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  localTime.innerHTML = `${hours}:${minutes}`;
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

  actualDay(dayNumber);
  actualTime(hours, minutes);
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
