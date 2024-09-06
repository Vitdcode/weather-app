import DOMPurify from 'dompurify';

import { weatherData } from './data-handling';
import { createParagraph, createDiv } from './reusable-elements';

//animation
import lottie from 'lottie-web';
import greetanim from '../src/images/animation/greet.json';

const weatherInfoWrapper = document.querySelector('.weather-info');

export function initialGreet() {
  const greetingText = createParagraph(
    'greeting-text',
    'Search for a location to display Weather Data'
  );
  const greetAnimWrapper = document.createElement('div');
  greetAnimWrapper.classList.add('greet-animation-wrapper');

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

export function currentCondition() {
  weatherInfoWrapper.innerHTML = '';
  /*  const currentCondWrapper = createDiv('current-condition-wrapper'); */
  weatherInfoWrapper.innerHTML = DOMPurify.sanitize(
    `<div class="current-condition-wrapper">
          <p>Currently:</p>
          <p class="current-temperature">${weatherData.currentConditions.temp}</p></div>`
  );

  /*   currentCondWrapper.appendChild(currentConditionText); */
  /*  weatherInfoWrapper.appendChild(currentCondWrapper); */
}
