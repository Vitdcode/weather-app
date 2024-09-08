/* libraries */

import DOMPurify from 'dompurify';

import { weatherData } from './data-handling';
import { colorDependingOnTemperature, weatherConditionIconEvaluation } from './ui-functions';
import { createDiv } from './reusable-elements';

export function weatherInfoWrapperSelector() {
  const weatherInfoWrapper = document.querySelector('.weather-info');
  return weatherInfoWrapper;
}

export function currentCondition() {
  const weatherInfoWrapper = weatherInfoWrapperSelector();
  const formattedTime = weatherData.currentConditions.datetime.split(':').slice(0, 2).join(':');
  weatherInfoWrapper.innerHTML = '';
  weatherInfoWrapper.innerHTML = DOMPurify.sanitize(
    `<div class="current-condition-wrapper">
      <p>${weatherData.resolvedAddress}</p>
        <div class='weather-data-wrapper'>
          <p>Currently:</p>
          <p class="current-temperature">${weatherData.currentConditions.temp}°C</p>
          <p class="current-condition">${weatherData.currentConditions.conditions}</p>
          <p class="measured-time">Measured at ${formattedTime}</p>
        </div> 
      </div> `
  );
  weatherConditionIconEvaluation(
    weatherData.currentConditions.conditions,
    document.querySelector('.current-condition-wrapper')
  );
  colorDependingOnTemperature('.weather-data-wrapper', '.current-temperature');
}

function forecastDays(weatherInfoWrapper) {
  const DaysForecastWrapper = createDiv('days-forecast-wrapper');
  const day1 = createDiv('individual-day-forecast-wrapper');
  const day2 = createDiv('individual-day-forecast-wrapper');
  const day3 = createDiv('individual-day-forecast-wrapper');
  const day4 = createDiv('individual-day-forecast-wrapper');
  const day5 = createDiv('individual-day-forecast-wrapper');
}
