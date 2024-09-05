import './style.css';
import { searchButtonHoverEffect, setInputLocation } from './ui-functions';
import { fetchLocation } from './data-handling';
import { initialGreet } from './weather-condition';

searchButtonHoverEffect();
setInputLocation();
fetchLocation();
initialGreet();
