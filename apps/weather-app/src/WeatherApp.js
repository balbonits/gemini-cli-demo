class WeatherApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .weather-app {
                    width: 100%;
                    max-width: 300px;
                    padding: 1rem;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                .weather-info {
                    text-align: center;
                }
                @media (max-width: 400px) {
                    .weather-app {
                        max-width: 100%;
                        border-radius: 0;
                        box-shadow: none;
                        border: none;
                    }
                    h2 {
                        font-size: 1.2rem;
                    }
                    p {
                        font-size: 1rem;
                    }
                }
            </style>
            <div class="weather-app">
                <input type="text" placeholder="Enter a city" />
                <button>Get Weather</button>
                <div class="weather-info"></div>
            </div>
        `;

        this.input = this.shadowRoot.querySelector('input');
        this.button = this.shadowRoot.querySelector('button');
        this.weatherInfo = this.shadowRoot.querySelector('.weather-info');

        this.button.addEventListener('click', this.getWeather.bind(this));
    }

    async getWeather() {
        const city = this.input.value;
        if (!city) {
            this.weatherInfo.textContent = 'Please enter a city.';
            return;
        }

        try {
            const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
            const geocodeResponse = await fetch(geocodeUrl);
            const geocodeData = await geocodeResponse.json();
            const { latitude, longitude } = geocodeData.results[0];

            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();

            const { temperature, weathercode } = weatherData.current_weather;
            this.weatherInfo.innerHTML = `
                <h2>${city}</h2>
                <p>Temperature: ${temperature}°C</p>
                <p>Weather: ${this.getWeatherDescription(weathercode)}</p>
            `;
        } catch (error) {
            this.weatherInfo.textContent = 'Could not fetch weather data.';
            console.error(error);
        }
    }

    getWeatherDescription(code) {
        const descriptions = {
            0: 'Clear sky',
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Fog',
            48: 'Depositing rime fog',
            51: 'Light drizzle',
            53: 'Moderate drizzle',
            55: 'Dense drizzle',
            56: 'Light freezing drizzle',
            57: 'Dense freezing drizzle',
            61: 'Slight rain',
            63: 'Moderate rain',
            65: 'Heavy rain',
            66: 'Light freezing rain',
            67: 'Heavy freezing rain',
            71: 'Slight snow fall',
            73: 'Moderate snow fall',
            75: 'Heavy snow fall',
            77: 'Snow grains',
            80: 'Slight rain showers',
            81: 'Moderate rain showers',
            82: 'Violent rain showers',
            85: 'Slight snow showers',
            86: 'Heavy snow showers',
            95: 'Thunderstorm',
            96: 'Thunderstorm with slight hail',
            99: 'Thunderstorm with heavy hail',
        };
        return descriptions[code] || 'Unknown';
    }
}

customElements.define('weather-app', WeatherApp);