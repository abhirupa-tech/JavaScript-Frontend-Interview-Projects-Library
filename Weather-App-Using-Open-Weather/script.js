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
      const temperature = data.main.temp;
      const weatherDescription = data.weather[0].description;
      console.log(`Temperature: ${temperature}`);
      console.log(`Weather: ${weatherDescription}`);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
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
