const API_KEY = 'f0d9c5ecea1d51973fda67739f6a1a22';

document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherData(lat, lon);
        }, error => {
            console.error('Geolocation error:', error);
        });
    }
});

function fetchWeather() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    displayError(data.message);
                }
            })
            .catch(error => console.error('Error fetching weather data:', error));
    } else {
        displayError('Please enter a location.');
    }
}

function fetchWeatherData(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                displayError(data.message);
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    const temp = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    let backgroundImage;
    if (description.includes('clouds')) {
        backgroundImage = 'url(https://images.pexels.com/photos/531767/pexels-photo-531767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)';
    } else if (description.includes('sunny')) {
        backgroundImage = 'url(https://images.unsplash.com/photo-1622278647429-71bc97e904e8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';
    } else if (description.includes('rain')) {
        backgroundImage = 'url(https://images.unsplash.com/photo-1518803194621-27188ba362c9?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';
    } else if (description.includes('sky')) {
        backgroundImage = 'url(https://images.unsplash.com/photo-1590077428593-a55bb07c4665?q=80&w=1414&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
    }
    else if (description.includes('haze')) {
        backgroundImage = 'url(https://images.unsplash.com/photo-1599059021750-82716ae2b661?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
    }
     else {
        backgroundImage = 'url(https://images.unsplash.com/photo-1561484930-998b6a7b22e8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';
    }

    document.body.style.backgroundImage = backgroundImage;

    weatherInfo.innerHTML = `
        <h2 class="text-xl font-bold mb-2">${data.name}</h2>
        <p class="text-lg capitalize">${description}</p>
        <p class="text-lg">Temperature: ${temp}°C</p>
        <p class="text-lg">Humidity: ${humidity}%</p>
        <p class="text-lg">Wind Speed: ${windSpeed} m/s</p>
    `;
}

function displayError(message) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `<p class="text-red-500">${message}</p>`;
}
