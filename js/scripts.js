console.log('javascript connected!');
  
document.addEventListener('DOMContentLoaded', function() {
    const carouselElement = document.getElementById('homeCarousel');

    const carousel = new bootstrap.Carousel(carouselElement, {
        interval: 5000,
        pause: false
    });
    const carouselButton = document.getElementById('carouselButton');
    const faIcon = document.getElementById('faButton');

    carouselButton.addEventListener('click', function () {
    if (faIcon.classList.contains('fa-pause')) {
        faIcon.classList.remove('fa-pause');
        faIcon.classList.add('fa-play');
        carousel.pause();
    } else {
        faIcon.classList.remove('fa-play');
        faIcon.classList.add('fa-pause');
        carousel.cycle();
    }
}) 
    
});


async function fetchWeather() {
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const city = 'ocala';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    try {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        displayWeather(data);
    } catch(error) {
        console.log('Sorry, no weather available right now', error);
    }
}
fetchWeather()

function displayWeather(weatherData) {
const temp = weatherData.main.temp;
const description = weatherData.weather[0].description;
const icon = weatherData.weather[0].icon;


const weatherContainer = document.querySelector('#weather');
const img = document.createElement('img');
img.src = `https://openweathermap.org/img/w/${icon}.png`;
weatherContainer.appendChild(img);

const weatherTemp = document.querySelector('#weather-temp');
weatherTemp.textContent =  `${temp}\u00B0F`;

const weatherDesc = document.querySelector('#weather-description');
weatherDesc.textContent = description;

}
