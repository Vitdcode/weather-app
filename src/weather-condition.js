/* libraries */

import DOMPurify from 'dompurify';

import { weatherData } from './data-handling';
import { colorDependingOnTemperature, weatherConditionIconEvaluation } from './ui-functions';
import { createDiv, createParagraph } from './reusable-elements';
import { metricDateFormatting, fahrenHeitCelsiusChar } from './us-metric-formatting';

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
          <p class="current-temperature">${weatherData.currentConditions.temp}${fahrenHeitCelsiusChar()}</p>
          <p class="current-condition">${weatherData.currentConditions.conditions}</p>
          <p class="measured-time">Measured at ${formattedTime}</p>
        </div> 
      </div> `
  );
  weatherConditionIconEvaluation(
    weatherData.currentConditions.conditions,
    document.querySelector('.current-condition-wrapper'),
    'current-weather-animation'
  );
  colorDependingOnTemperature('.weather-data-wrapper', '.current-temperature');
  forecastHours(weatherInfoWrapper);
  forecastDays(weatherInfoWrapper);
}

function forecastDays(weatherInfoWrapper) {
  const DaysForecastWrapper = createDiv('days-forecast-wrapper');
  const daysHeader = createParagraph('days-forecast-header', '7 Day Forecast');
  for (let i = 1; i <= 7; i++) {
    const day = createDiv('individual-day-forecast-wrapper', `day${i}-forecast`);
    DaysForecastWrapper.appendChild(day);
    weatherInfoWrapper.appendChild(DaysForecastWrapper);
    daysForecastData(day, i - 1, `day${i}-forecast`);
  }
  weatherInfoWrapper.insertBefore(daysHeader, DaysForecastWrapper);
}

function forecastHours(weatherInfoWrapper) {
  const hoursForecastWrapper = createDiv('hours-forecast-wrapper');
  const hoursHeader = createParagraph('hours-forecast-header', 'Hourly Forecast');

  for (let i = 1; i <= 24; i++) {
    const hour = createDiv('individual-hour-forecast-wrapper', `hour${i}-forecast`);
    hoursForecastWrapper.appendChild(hour);
    weatherInfoWrapper.appendChild(hoursForecastWrapper);
    hoursForecastData(hour, i - 1, `hour${i}-forecast`);
  }
  weatherInfoWrapper.insertBefore(hoursHeader, hoursForecastWrapper);
}

function hoursForecastData(hour, arrayPosition, id) {
  hour.innerHTML = DOMPurify.sanitize(
    `<p>${weatherData.days[0].hours[arrayPosition].datetime}</p> 
   <p>${weatherData.days[0].hours[arrayPosition].temp}${fahrenHeitCelsiusChar()}</p>
   <p>${weatherData.days[0].hours[arrayPosition].conditions}</p>

  `
  );

  weatherConditionIconEvaluation(
    weatherData.days[0].hours[arrayPosition].conditions,
    document.querySelector(`#${id}`),
    'hours-forecast-animation'
  );
}

function daysForecastData(day, arrayPosition, id) {
  day.innerHTML = DOMPurify.sanitize(
    `<p>${metricDateFormatting(weatherData.days[arrayPosition].datetime)}</p> 
   <p>${weatherData.days[arrayPosition].temp}${fahrenHeitCelsiusChar()}</p>
   <p>${weatherData.days[arrayPosition].conditions}</p>

  `
  );

  weatherConditionIconEvaluation(
    weatherData.days[arrayPosition].conditions,
    document.querySelector(`#${id}`),
    'days-forecast-animation'
  );
}
