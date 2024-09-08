import { createParagraph, createDiv } from './reusable-elements';
import { UnitMeasurement, fetchWeatherData } from './data-handling';
import { saveToLocalStorage, getDataFromLocalStorage } from './local-storage-handling';
import { thermometerCelsiusAnim, thermometerFahrenheitAnim } from './animations';

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

  const updateAnimation = () => {
    if (unitElement.textContent === 'Unit Measurement: Celsius') {
      thermometerCelsiusAnim(unitElement);
    } else {
      thermometerFahrenheitAnim(unitElement);
    }
  };
  updateAnimation();

  unitElement.addEventListener('click', () => {
    unitElement.textContent =
      unitElement.textContent === 'Unit Measurement: Celsius'
        ? 'Unit Measurement: Fahrenheit'
        : 'Unit Measurement: Celsius';
    unitMeasure.domTextContent = unitElement.textContent;
    unitMeasure.unit = unitMeasure.unit === 'metric' ? 'us' : 'metric';
    updateAnimation();
    fetchWeatherData(unitMeasure);
    saveToLocalStorage(unitMeasure);
  });
}
