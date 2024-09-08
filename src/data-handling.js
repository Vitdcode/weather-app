import { currentCondition } from './weather-condition';

export let weatherData;
export let longitude;
export let latitude;

export class UnitMeasurement {
  constructor(unit, domTextContent) {
    (this.unit = unit), (this.domTextContent = domTextContent);
  }
}

export function fetchLocation(unitMeasure) {
  document.querySelector('.search-btn').addEventListener('click', async (event) => {
    event.preventDefault();
    fetchWeatherData(unitMeasure);
  });
}

export async function fetchWeatherData(unitMeasure) {
  const input = document.getElementById('location-search');
  const apiKey = process.env.API_KEY_VIUSAL_CROSSING;
  fetchGeocode(input);
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}?unitGroup=${unitMeasure.unit}&key=${apiKey}&contentType=json`,
      {
        mode: 'cors',
      }
    );
    weatherData = await response.json();
    console.log(weatherData);
  } catch (error) {
    console.error('Error fetching Weather Data:', error);
  }
  currentCondition();
}

export async function fetchGeocode(input) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${input.value}&format=jsonv2`,
      {
        mode: 'cors',
      }
    );
    const geoData = await response.json();
    longitude = geoData[0].lon;
    latitude = geoData[0].lat;
    console.log(latitude);
    console.log(longitude);
  } catch (error) {
    console.error('Error fetching Geocode Data:', error);
  }
}
