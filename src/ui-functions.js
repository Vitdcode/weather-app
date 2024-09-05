import locationicon from '../src/images/location.png';
import searchicon from '../src/images/search.png';

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
