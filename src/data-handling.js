import { saveToLocalStorage, getDataFromLocalStorage } from './local-storage-handling';

import { createParagraph, createDiv } from './reusable-elements';
import { currentCondition } from './weather-condition';

export let weatherData;

class UnitMeasurement {
  constructor(unit, domTextContent) {
    (this.unit = unit), (this.domTextContent = domTextContent);
  }
}

export function initialUnitMeasurementConstructor() {
  //asking User initially what meaurement unit to use
  const localStorage = getDataFromLocalStorage();
  if (!localStorage) {
    const promptWindow = createDiv('initial-unit-selector-window');
    const backdrop = createDiv('backdrop');
    const header = createParagraph('initial-unit-selector-window-header', 'Select a Unit');
    const celsius = createParagraph('initial-unit-selector-window-celsius', 'Celsius');
    const fahrenheit = createParagraph('initial-unit-selector-window-fahrenheit', 'Fahrenheit');
    promptWindow.appendChild(header);
    promptWindow.appendChild(celsius);
    promptWindow.appendChild(fahrenheit);
    document.body.appendChild(promptWindow);
    document.body.appendChild(backdrop);
    celsius.addEventListener('click', () => {
      const unitMeasure = new UnitMeasurement('metric', 'Unit Measurement: Celsius');
      saveToLocalStorage(unitMeasure);
      promptWindow.remove();
      backdrop.remove();
      location.reload();
    });
    fahrenheit.addEventListener('click', () => {
      const unitMeasure = new UnitMeasurement('us', 'Unit Measurement: Fahrenheit');
      saveToLocalStorage(unitMeasure);
      promptWindow.remove();
      backdrop.remove();
      location.reload();
    });
  }
}

export function celsiusFahrenheitSelector(unitMeasure) {
  const searchWrapper = document.querySelector('.search-wrapper');
  const unitElement = createParagraph('unit-selector', unitMeasure.domTextContent);
  searchWrapper.appendChild(unitElement);
  unitElement.addEventListener('click', () => {
    unitElement.textContent =
      unitElement.textContent === 'Unit Measurement: Celsius'
        ? 'Unit Measurement: Fahrenheit'
        : 'Unit Measurement: Celsius';
    unitMeasure.domTextContent = unitElement.textContent;
    unitMeasure.unit = unitMeasure.unit === 'metric' ? 'us' : 'metric';
    fetchData(unitMeasure);
    saveToLocalStorage(unitMeasure);
  });
}

export function fetchLocation(unitMeasure) {
  document.querySelector('.search-btn').addEventListener('click', async (event) => {
    event.preventDefault();
    fetchData(unitMeasure);
  });
}

async function fetchData(unitMeasure) {
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
