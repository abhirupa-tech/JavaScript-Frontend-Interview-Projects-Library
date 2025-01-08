import {OPEN_WEATHER_API_KEY} from "./../secrets.js";

function fetchData() {
    // Check if the browser supports Geolocation 
    if (navigator.geolocation) { 
        // Get the current position 
        navigator.geolocation.getCurrentPosition(showPosition, showError); 
    } else { 
        console.log("Geolocation is not supported by this browser."); 
    }
}

function kelvinToCelsius(kelvin) { 
  return kelvin - 273.15;
}

function mphToKmph(mph) {
  return mph * 1.60934;
}

function truncateToOneDecimal(num) {
  return Math.trunc(num * 10) / 10;
}

// Function to handle the position data
function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

  // Construct the API URL using latitude and longitude
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_API_KEY}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Process the data here
      const temperature = kelvinToCelsius(data.main.temp);
      const location = data.name;
      const weatherDescription = data.weather[0].description;
      const humidity = data.main.humidity;
      const wind = mphToKmph(data.wind.speed);
      updateWeatherCard(temperature, location, weatherDescription, humidity, wind);
      console.log(`Temperature: ${temperature}`);
      console.log(`Weather: ${weatherDescription}`);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

const updateWeatherCard = (temperature, location, weatherDescription, humidity, wind) => {
  document.getElementById('weather-desc').textContent = weatherDescription;
  document.getElementById('location').textContent = location;
  document.getElementById('temperature').textContent = "Temperature: " + truncateToOneDecimal(temperature) + "°C";
  document.getElementById('humidity').textContent = "Humidity: "+ humidity + "%";
  document.getElementById('wind').textContent = "Wind Speed: " + truncateToOneDecimal(wind) + " km/h";
}

// Function to handle errors
function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}


// Call the function to fetch data
fetchData();


const initWeather = () => {
    fetchDeviceTime();
    fetchDeviceLocation();
    loadData();
}

  
document.addEventListener('DOMContentLoaded', initWeather());
