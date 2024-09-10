/* libraries */

import DOMPurify from 'dompurify';

import { weatherData } from './data-handling';
import { colorDependingOnTemperature, weatherConditionIconEvaluation } from './ui-functions';
import { createDiv, createParagraph } from './reusable-elements';
import {
  metricDateFormatting,
  fahrenHeitCelsiusChar,
  metricHoursFormatting,
  weatherWarningTimelineFormatting,
} from './us-metric-formatting';

import { weatherConditonAnimationPicker } from './animations';
import windanimation from '../src/images/animation/weather-icons/wind.json';
import humidtyanimation from '../src/images/animation/weather-icons/humidity.json';
import sunrise from '../src/images/animation/weather-icons/sunrise.json';
import sunset from '../src/images/animation/weather-icons/sunset.json';

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
          <p class="current-temperature">${weatherData.currentConditions.temp}${fahrenHeitCelsiusChar()}</p>
          <p class="current-condition">${weatherData.currentConditions.conditions}</p>
        </div> 
          <div class="current-wind">
            <p>Wind Speed</p>
            <p>${weatherData.currentConditions.windspeed} km/h</p>
          </div> 
          <div class="humidity">
            <p>Humidity</p>
            <p>${weatherData.currentConditions.humidity} %</p>
          </div> 
          <div class="sunrise">
            <p>Sunrise</p>
            <p>${metricHoursFormatting(weatherData.currentConditions.sunrise)}</p>
          </div> 
           <div class="sunset">
            <p>Sunset</p>
            <p>${metricHoursFormatting(weatherData.currentConditions.sunset)}</p>
          </div> 
      </div> `
  );

  weatherConditionIconEvaluation(
    weatherData.currentConditions.conditions,
    document.querySelector('.weather-data-wrapper'),
    'current-weather-animation'
  );

  weatherConditonAnimationPicker(
    document.querySelector('.humidity'),
    humidtyanimation,
    'humidity-animation'
  );

  weatherConditonAnimationPicker(
    document.querySelector('.current-wind'),
    windanimation,
    'wind-animation'
  );

  weatherConditonAnimationPicker(document.querySelector('.sunrise'), sunrise, 'sunrise-animation');

  weatherConditonAnimationPicker(document.querySelector('.sunset'), sunset, 'sunset-animation');

  colorDependingOnTemperature('.weather-data-wrapper', '.current-temperature');
  weatherAlerts(weatherInfoWrapper);
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
  const hoursHeader = createParagraph('hours-forecast-header', 'Hourly Forecast for Today');

  for (let i = 1; i <= 24; i++) {
    const hour = createDiv('individual-hour-forecast-wrapper', `hour${i}-forecast`);
    hoursForecastWrapper.appendChild(hour);
    weatherInfoWrapper.appendChild(hoursForecastWrapper);
    hoursForecastData(hour, i - 1, `hour${i}-forecast`);
  }
  weatherInfoWrapper.insertBefore(hoursHeader, hoursForecastWrapper);
}

function weatherAlerts(weatherInfoWrapper) {
  const alertWrapper = createDiv('alert-wrapper');
  if (weatherData.alerts != '') {
    const alertHeadline = createParagraph(
      'weather-alert-description',
      weatherData.alerts[0].headline
    );
    const start = createParagraph(
      'weather-alert-start',
      `From ${weatherWarningTimelineFormatting(weatherData.alerts[0].onset)}`
    );

    const end = createParagraph(
      'weather-alert-end',
      `Until ${weatherWarningTimelineFormatting(weatherData.alerts[0].ends)}`
    );

    alertWrapper.appendChild(alertHeadline);
    alertWrapper.appendChild(start);
    alertWrapper.appendChild(end);
    weatherInfoWrapper.appendChild(alertWrapper);
  }
}

function hoursForecastData(hour, arrayPosition, id) {
  hour.innerHTML = DOMPurify.sanitize(
    `<p>${metricHoursFormatting(weatherData.days[0].hours[arrayPosition].datetime)}</p> 
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
