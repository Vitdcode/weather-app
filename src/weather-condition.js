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
  forecastDays(weatherInfoWrapper);
}

function forecastDays(weatherInfoWrapper) {
  const DaysForecastWrapper = createDiv('days-forecast-wrapper');
  const daysHeader = createParagraph('days-forecast-header', '7 Days Forecast');
  for (let i = 1; i <= 7; i++) {
    const day = createDiv('individual-day-forecast-wrapper', `day${i}-forecast`);
    DaysForecastWrapper.appendChild(day);
    weatherInfoWrapper.appendChild(DaysForecastWrapper);
    daysForecastData(day, i - 1, `day${i}-forecast`);
  }
  weatherInfoWrapper.insertBefore(daysHeader, DaysForecastWrapper);
}

/* function forecastDays(weatherInfoWrapper) {
  const DaysForecastWrapper = createDiv('days-forecast-wrapper');
  const daysHeader = createParagraph('days-forecast-header', '7 Days Forecast');
  const day1 = createDiv('individual-day-forecast-wrapper', 'day1-forecast');
  const day2 = createDiv('individual-day-forecast-wrapper', 'day2-forecast');
  const day3 = createDiv('individual-day-forecast-wrapper', 'day3-forecast');
  const day4 = createDiv('individual-day-forecast-wrapper', 'day4-forecast');
  const day5 = createDiv('individual-day-forecast-wrapper', 'day5-forecast');
  const day6 = createDiv('individual-day-forecast-wrapper', 'day6-forecast');
  const day7 = createDiv('individual-day-forecast-wrapper', 'day7-forecast');
  weatherInfoWrapper.appendChild(daysHeader);
  DaysForecastWrapper.append(day1, day2, day3, day4, day5, day6, day7);
  weatherInfoWrapper.appendChild(DaysForecastWrapper);

  const daysArray = [day1, day2, day3, day4, day5, day6, day7];
  for (let i = 0; i < daysArray.length; i++) {
    daysForecastData(daysArray[i], i, `day${i + 1}-forecast`);
  }
} */

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
