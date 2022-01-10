function getCurrentTemp(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
}

function getCurrentCityTemp(event) {
  event.preventDefault();

  function handlePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let apiKey = "d702c598912f6b831e35edf8569da794";
    let currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

    axios.get(currentUrl).then(getCurrentTemp);
  }
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let currentCityButton = document.querySelector("#current-button");
currentCityButton.addEventListener("click", getCurrentCityTemp);

function searchCity(cityName) {
  let apiKey = "d702c598912f6b831e35edf8569da794";
  let searchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;
  axios.get(searchUrl).then(getCurrentTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input").value;
  searchCity(cityName);
}
let search = document.querySelector("form");
search.addEventListener("submit", handleSubmit);

searchCity("new york");

let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[currentTime.getDay()];
let hour = currentTime.getHours();
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let h5 = document.querySelector("h5");
h5.innerHTML = `${day} ${hour}:${minutes}`;
