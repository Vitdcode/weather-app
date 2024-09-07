import DOMPurify from 'dompurify';

import { weatherData } from './data-handling';
import { createParagraph, createDiv } from './reusable-elements';

import { sunnyAnim } from './animations';

export function weatherInfoWrapperSelector() {
  const weatherInfoWrapper = document.querySelector('.weather-info');
  return weatherInfoWrapper;
}

export function currentCondition() {
  const weatherInfoWrapper = weatherInfoWrapperSelector();
  weatherInfoWrapper.innerHTML = '';

  weatherInfoWrapper.innerHTML = DOMPurify.sanitize(
    `<div class="current-condition-wrapper">
           <p>${document.getElementById('location-search').value}</p>
          <p>Currently:</p>
          <p class="current-temperature">${weatherData.currentConditions.temp}°C</p>
          <p class="current-condition">${weatherData.currentConditions.conditions}</p>
          </div>
          `
  );
  sunnyAnim(weatherInfoWrapper);
}
