import { currentCondition } from './weather-condition';

export let weatherData;

export class UnitMeasurement {
  constructor(unit, domTextContent) {
    (this.unit = unit), (this.domTextContent = domTextContent);
  }
}

export function fetchLocation(unitMeasure) {
  document.querySelector('.search-btn').addEventListener('click', async (event) => {
    event.preventDefault();
    fetchData(unitMeasure);
  });
}

export async function fetchData(unitMeasure) {
  const input = document.getElementById('location-search');
  const apiKey = process.env.API_KEY_VIUSAL_CROSSING;
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}?unitGroup=${unitMeasure.unit}&key=${apiKey}&contentType=json`,
      {
        mode: 'cors',
      }
    );
    weatherData = await response.json();
    console.log(weatherData);
    currentCondition();
  } catch (error) {
    console.error('Error fetching Weather Data:', error);
  }
}
