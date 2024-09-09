import { fetchLocation } from './data-handling';
import { celsiusFahrenheitSelector } from './us-metric-formatting';
import { dayNightWallpaperPicker } from './ui-functions';

export function saveToLocalStorage(unitMeasure) {
  localStorage.setItem('unitMeasure', JSON.stringify(unitMeasure));
}

export function getDataFromLocalStorage() {
  const getLocalStorage = localStorage.getItem('unitMeasure');
  return getLocalStorage;
}

export function loadLocalStorage() {
  console.log(getDataFromLocalStorage());
  document.addEventListener('DOMContentLoaded', () => {
    const localStorageUnit = getDataFromLocalStorage();
    if (localStorageUnit) {
      const parsedUnit = JSON.parse(localStorageUnit);
      dayNightWallpaperPicker();
      fetchLocation(parsedUnit);
      celsiusFahrenheitSelector(parsedUnit);
    }
  });
}
