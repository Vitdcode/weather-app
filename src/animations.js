import lottie from 'lottie-web';
import greetanim from '../src/images/animation/greet.json';
import thermocelsius from '../src/images/animation/thermometer-celsius.json';
import thermofahrenheit from '../src/images/animation/thermometer-fahrenheit.json';
import sunny from '../src/images/animation/sunny.json';

import { createParagraph, createDiv, createImg } from './reusable-elements';
import { weatherInfoWrapperSelector } from './weather-condition';

export function initialGreet() {
  const weatherInfoWrapper = weatherInfoWrapperSelector();
  const greetingText = createParagraph(
    'greeting-text',
    'Search for a location to display Weather Data'
  );
  const greetAnimWrapper = createDiv('greet-animation-wrapper');

  const greetAnimation = lottie.loadAnimation({
    container: greetAnimWrapper,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: greetanim,
  });
  weatherInfoWrapper.appendChild(greetingText);
  weatherInfoWrapper.appendChild(greetAnimWrapper);
  return greetAnimation.play();
}

export function thermometerCelsiusAnim(parentWrapper) {
  const animWrapper = createDiv('thermometer-celsius');
  const thermCelsiusAnim = lottie.loadAnimation({
    container: animWrapper,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    animationData: thermocelsius,
  });
  parentWrapper.appendChild(animWrapper);
  parentWrapper.addEventListener('mouseover', function () {
    thermCelsiusAnim.play();
  });
  parentWrapper.addEventListener('mouseleave', function () {
    thermCelsiusAnim.stop();
  });
  return animWrapper;
}

export function thermometerFahrenheitAnim(parentWrapper) {
  const animWrapper = createDiv('thermometer-fahrenheit');
  const anim = lottie.loadAnimation({
    container: animWrapper,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    animationData: thermofahrenheit,
  });
  parentWrapper.appendChild(animWrapper);
  parentWrapper.addEventListener('mouseover', function () {
    anim.play();
  });
  parentWrapper.addEventListener('mouseleave', function () {
    anim.stop();
  });
  return animWrapper;
}

export function sunnyAnim(parentWrapper) {
  const animWrapper = createDiv('sunny');
  const anim = lottie.loadAnimation({
    container: animWrapper,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: sunny,
  });
  parentWrapper.appendChild(animWrapper);
  return anim.play();
}
