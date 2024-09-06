import './style.css';
import { searchButtonHoverEffect, setInputLocation } from './ui-functions';
import { initialUnitMeasurementConstructor } from './data-handling';
import { loadLocalStorage } from './local-storage-handling';
import { initialGreet } from './weather-condition';

searchButtonHoverEffect();
setInputLocation();
initialUnitMeasurementConstructor();
loadLocalStorage();
initialGreet();

document.querySelector('.clear-storage').addEventListener('click', () => {
  localStorage.clear();
});
