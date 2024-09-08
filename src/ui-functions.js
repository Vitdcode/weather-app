import suncalc from 'suncalc';

import { weatherData, latitude, longitude } from './data-handling';

/* icons and animations */
import { weatherConditonAnimationPicker } from './animations';
import sunny from '../src/images/animation/sunny.json';
import clearnight from '../src/images/animation/clear-night.json';
import partiallycloudyday from '../src/images/animation/partly-cloudy-day.json';
import partiallycloudynight from '../src/images/animation/partly-cloudy-night.json';
import locationicon from '../src/images/location.png';
import searchicon from '../src/images/search.png';
import daybackground from '../src/images/svg/day-background.svg';
import nightbackground from '../src/images/svg/night-background.svg';

export function searchButtonHoverEffect() {
  const searchIcon = document.getElementById('search-icon');
  searchIcon.src = searchicon;

  const searchButton = document.querySelector('.search-btn');
  searchIcon.style.bottom = '-70%';
  searchIcon.style.opacity = 0;
  searchButton.addEventListener('mouseenter', () => {
    searchIcon.style.opacity = 1;
    searchIcon.style.bottom = '20%';
  });
  searchButton.addEventListener('mouseleave', () => {
    searchIcon.style.opacity = 0;
    searchIcon.style.bottom = '-70%';
  });
}

export function setInputLocation() {
  const locationIcon = document.getElementById('location-icon');
  locationIcon.src = locationicon;
}

export function colorDependingOnTemperature(parrentWrapperSelector, textSelector) {
  const weatherDataWrapper = document.querySelector(parrentWrapperSelector);
  const temperatureText = document.querySelector(textSelector);
  if (weatherData.currentConditions.temp >= 27) {
    temperatureText.style.color = 'rgb(204, 73, 12)';
    weatherDataWrapper.style.backgroundColor = 'rgba(218, 111, 97, 0.582)';
  } else if (weatherData.currentConditions.temp >= 10) {
    temperatureText.style.color = 'rgb(28, 163, 39)';
    weatherDataWrapper.style.backgroundColor = 'rgba(125, 218, 97, 0.7)';
  } else {
    temperatureText.style.color = 'rgb(28, 143, 163)';
    weatherDataWrapper.style.backgroundColor = 'rgba(97, 204, 218, 0.582)';
  }
}

export function weatherConditionIconEvaluation(weatherCondition, parentWrapper) {
  const currentTime = new Date().getTime();
  const sunsetTime = getSunset();
  if (currentTime < sunsetTime) {
    helperFunctionWeatherEvaluationDay('sunny', sunny);
    helperFunctionWeatherEvaluationDay('cloudy', partiallycloudyday);
  } else {
    helperFunctionWeatherEvaluationNight('clear', clearnight);
    helperFunctionWeatherEvaluationNight('cloudy', partiallycloudynight);
  }

  function helperFunctionWeatherEvaluationDay(weatherConditionString, animationSource) {
    if (weatherCondition.toLowerCase().includes(weatherConditionString)) {
      weatherConditonAnimationPicker(parentWrapper, animationSource, 'current-weather-animation');
    } else {
      console.log(`icon not found for ${weatherCondition} at daytime`);
    }
  }

  function helperFunctionWeatherEvaluationNight(weatherConditionString, animationSource) {
    if (weatherCondition.toLowerCase().includes(weatherConditionString)) {
      weatherConditonAnimationPicker(parentWrapper, animationSource, 'current-weather-animation');
    } else {
      console.log(`icon not found for ${weatherCondition} at night time`);
    }
  }
}

function getSunset() {
  // get sunset time to use in the weatherConditionIconEvaluation function to pick the right day and night icons
  if (!latitude && !longitude) {
    const currentDate = new Date();
    const sunTimes = suncalc.getTimes(currentDate, 53.9528957, 10.2121481); // my current geolocation
    const sunsetTime = sunTimes.sunset.getTime();
    return sunsetTime;
  } else {
    const currentDate = new Date();
    const sunTimes = suncalc.getTimes(currentDate, latitude, longitude);
    const sunsetTime = sunTimes.sunset.getTime();
    return sunsetTime;
  }
}

export function dayNightWallpaperPicker() {
  const bodySelector = document.querySelector('body');
  const sunsetTime = getSunset();
  const currentTime = new Date().getTime();
  if (currentTime > sunsetTime) {
    bodySelector.style.backgroundImage = `url(${daybackground})`;
  } else {
    bodySelector.style.backgroundImage = `url(${nightbackground})`;
  }
}
