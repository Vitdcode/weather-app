export let weatherData;
export function fetchLocation() {
  const apiKey = process.env.API_KEY_VIUSAL_CROSSING;
  console.log(apiKey);
  const input = document.getElementById('location-search');
  document.querySelector('.search-btn').addEventListener('click', async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}?unitGroup=metric&key=${apiKey}&contentType=json`,
        {
          mode: 'cors',
        }
      );
      weatherData = await response.json();
      console.log(weatherData);
      printDataInDom(weatherData);
    } catch (error) {
      console.error('Error fetching Weather Data:', error);
    }
  });
}
