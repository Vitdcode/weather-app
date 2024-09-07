import './style.css';
import { searchButtonHoverEffect, setInputLocation } from './ui-functions';
import { initialUnitMeasurementConstructor } from './celsius-fahrenheit';
import { loadLocalStorage } from './local-storage-handling';
import { initialGreet } from './animations';

searchButtonHoverEffect();
setInputLocation();
initialUnitMeasurementConstructor();
loadLocalStorage();
initialGreet();

document.querySelector('.clear-storage').addEventListener('click', () => {
  localStorage.clear();
});
