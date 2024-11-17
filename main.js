// get Elements
const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const notFound = document.querySelector(".not-found");
const searchInput = document.querySelector(".search-box input");

// Event listener for the search button
search.addEventListener("click", () => {
  const keyAPI = "6122ec26efcc7059aeea312999af0ea6";
  const cityName = document.querySelector(".search-box input").value;
  if (cityName === "") alert("Please enter a city name");

  // Fetch API weather
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${keyAPI}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        notFound.style.display = "block";
        notFound.classList.add("fadeIn");
        return;
      }
      notFound.style.display = "none";
      notFound.classList.remove("fadeIn");
      searchInput.focus();

      // get elements
      const img = document.querySelector(".weather-box img");
      const temps = document.querySelector(".weather-box .temps");
      const desc = document.querySelector(".weather-box .desc");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const windy = document.querySelector(".weather-details .windy span");

      // Set the weather image based on the weather condition
      switch (json.weather[0].main) {
        case "Clear":
          img.src = "./Images/sunny.webp"; // Update with your actual image path
          break;
        case "Rain":
          img.src = "./Images/rain.webp"; // Example: Update for rain
          break;
        case "Clouds":
          img.src = "./Images/cloud.png"; // Example: Update for cloudy
          break;
        case "Snow":
          img.src = "./Images/snow.webp"; // Example: Update for snow
          break;
        case "Wind":
          img.src = "./Images/wwindy.png"; // Example: Update for wind
          break;
        default:
          img.src = "./Images/default.jpg"; // Default image for other conditions
      }

      // Update the weather details
      temps.innerHTML = `${parseInt(json.main.temp)}<span>&#176;C</span>`;
      desc.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      windy.innerHTML = `${parseInt(json.wind.speed)} Km/h`; // Corrected wind speed

      // Display the weather box and details
      weatherBox.style.display = "block";
      weatherDetails.style.display = "flex";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "600px";
      searchInput.value = ""; // Clear the search input
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    })
    .finally((done) => {
      console.log("Data is already loaded successfully!");
    });
});
