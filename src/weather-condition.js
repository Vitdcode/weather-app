/* libraries */

import DOMPurify from 'dompurify';

import { weatherData } from './data-handling';
import { colorDependingOnTemperature, weatherConditionIconEvaluation } from './ui-functions';

export function weatherInfoWrapperSelector() {
  const weatherInfoWrapper = document.querySelector('.weather-info');
  return weatherInfoWrapper;
}

export function currentCondition() {
  const weatherInfoWrapper = weatherInfoWrapperSelector();
  weatherInfoWrapper.innerHTML = '';
  weatherInfoWrapper.innerHTML = DOMPurify.sanitize(
    `<div class="current-condition-wrapper">
      <p>${weatherData.resolvedAddress}</p>
        <div class='weather-data-wrapper'>
          <p>Currently:</p>
          <p class="current-temperature">${weatherData.currentConditions.temp}°C</p>
          <p class="current-condition">${weatherData.currentConditions.conditions}</p>
        </div> 
      </div> `
  );
  weatherConditionIconEvaluation(
    weatherData.currentConditions.conditions,
    document.querySelector('.current-condition-wrapper')
  );
  colorDependingOnTemperature('.weather-data-wrapper', '.current-temperature');
}
