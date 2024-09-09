import suncalc from 'suncalc';

import { weatherData, latitude, longitude } from './data-handling';

/* icons and animations */
import { weatherConditonAnimationPicker } from './animations';
import sunnyday from '../src/images/animation/weather-icons/sunny.json';
import clearnight from '../src/images/animation/weather-icons/clear-night.json';
import partiallycloudyday from '../src/images/animation/weather-icons/partly-cloudy-day.json';
import partiallycloudynight from '../src/images/animation/weather-icons/partly-cloudy-night.json';
import overcastday from '../src/images/animation/weather-icons/overcastDay.json';
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
  const currentUnit = document.querySelector('.unit-selector');
  const temperature = weatherData.currentConditions.temp;

  if (currentUnit.textContent === 'Unit Measurement: Celsius') {
    if (temperature >= 27) {
      temperatureText.style.color = 'rgb(204, 73, 12)';
      weatherDataWrapper.style.backgroundColor = 'rgba(218, 111, 97, 0.582)';
    } else if (temperature >= 10) {
      temperatureText.style.color = 'rgb(28, 163, 39)';
      weatherDataWrapper.style.backgroundColor = 'rgba(125, 218, 97, 0.7)';
    } else {
      temperatureText.style.color = 'rgb(28, 143, 163)';
      weatherDataWrapper.style.backgroundColor = 'rgba(97, 204, 218, 0.582)';
    }
  }

  if (currentUnit.textContent === 'Unit Measurement: Fahrenheit') {
    console.log('test');
    if (temperature >= 80) {
      temperatureText.style.color = 'rgb(204, 73, 12)';
      weatherDataWrapper.style.backgroundColor = 'rgba(218, 111, 97, 0.582)';
    } else if (temperature >= 50) {
      temperatureText.style.color = 'rgb(28, 163, 39)';
      weatherDataWrapper.style.backgroundColor = 'rgba(125, 218, 97, 0.7)';
    } else {
      temperatureText.style.color = 'rgb(28, 143, 163)';
      weatherDataWrapper.style.backgroundColor = 'rgba(97, 204, 218, 0.582)';
    }
  }
}

export function lazyAnimationMap() {
  const animationMap = {
    day: {
      sunny: () => import('../src/images/animation/weather-icons/clear-day.json'),
      'partially cloudy': () => import('../src/images/animation/weather-icons/partly-cloudy-day.json'), //prettier-ignore
      overcast: () => import('../src/images/animation/weather-icons/overcast-day.json'),
      rain: () => import('../src/images/animation/weather-icons/rain.json'),
      drizzle: () => import('../src/images/animation/weather-icons/drizzle.json'),
      thunderstorm: () => import('../src/images/animation/weather-icons/thunderstorms-day.json'),
      snow: () => import('../src/images/animation/weather-icons/snow.json'),
      sleet: () => import('../src/images/animation/weather-icons/sleet.json'),
      fog: () => import('../src/images/animation/weather-icons/fog-day.json'),
      haze: () => import('../src/images/animation/weather-icons/haze-day.json'),
      dust: () => import('../src/images/animation/weather-icons/dust-day.json'),
      smoke: () => import('../src/images/animation/weather-icons/smoke.json'),
      tornado: () => import('../src/images/animation/weather-icons/tornado.json'),
      windy: () => import('../src/images/animation/weather-icons/wind.json'),
      hail: () => import('../src/images/animation/weather-icons/hail.json'),
      hurricane: () => import('../src/images/animation/weather-icons/hurricane.json'),
      'extreme heat': () => import('../src/images/animation/weather-icons/extreme-day.json'),
    },
    night: {
      clear: () => import('../src/images/animation/weather-icons/clear-night.json'),
      'partially cloudy': () => import('../src/images/animation/weather-icons/partly-cloudy-night.json'), //prettier-ignore
      overcast: () => import('../src/images/animation/weather-icons/overcast-night.json'),
      rain: () => import('../src/images/animation/weather-icons/rain.json'),
      drizzle: () => import('../src/images/animation/weather-icons/drizzle.json'),
      thunderstorm: () => import('../src/images/animation/weather-icons/thunderstorms-night.json'),
      snow: () => import('../src/images/animation/weather-icons/snow.json'),
      sleet: () => import('../src/images/animation/weather-icons/sleet.json'),
      fog: () => import('../src/images/animation/weather-icons/fog-night.json'),
      haze: () => import('../src/images/animation/weather-icons/haze-night.json'),
      dust: () => import('../src/images/animation/weather-icons/dust-night.json'),
      smoke: () => import('../src/images/animation/weather-icons/smoke.json'),
      tornado: () => import('../src/images/animation/weather-icons/tornado.json'),
      windy: () => import('../src/images/animation/weather-icons/wind.json'),
      hail: () => import('../src/images/animation/weather-icons/hail.json'),
      hurricane: () => import('../src/images/animation/weather-icons/hurricane.json'),
      'extreme cold': () => import('../src/images/animation/weather-icons/extreme-night.json'),
    },
  };
  return animationMap;
}

export function weatherConditionIconEvaluation(
  weatherCondition,
  parentWrapper,
  weatherIconWrapperClassName
) {
  const currentTime = new Date().getTime();
  const sunsetTime = getSunset();
  const dayTime = currentTime < sunsetTime;

  const animationMap = lazyAnimationMap();
  let dayNightSwitch;

  if (dayTime) {
    dayNightSwitch = 'day';
  } else {
    dayNightSwitch = 'night';
  }

  function helperFunctionWeatherConditionSplit() {
    // if weather condition includes multiple words, return the first one
    if (weatherCondition.includes(' ')) {
      const weatherCondSplit = weatherCondition
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(' ');
      return weatherCondSplit[0];
    } else {
      return weatherCondition.toLowerCase();
    }
  }

  for (const key in animationMap[dayNightSwitch]) {
    //loop through animation map and pick the right animation for each weather condition
    if (key.includes(helperFunctionWeatherConditionSplit())) {
      animationMap[dayNightSwitch][key]().then((module) => {
        weatherConditonAnimationPicker(parentWrapper, module.default, weatherIconWrapperClassName);
        return;
      });
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
  console.log(`sunsettime: ${sunsetTime}`);
  console.log(`currenttime: ${currentTime}`);
  if (currentTime < sunsetTime) {
    bodySelector.style.backgroundImage = `url(${daybackground})`;
  } else {
    bodySelector.style.backgroundImage = `url(${nightbackground})`;
  }
}
