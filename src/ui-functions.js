import { diaries } from '../src/diary-list-handling.js';
import { trashAnimationIcon } from './icons-creation-functions.js';

import { saveToLocalStorage } from './local-storage-handling';

//svgs
import svgbackground1 from '../src/images/svgs/svg1.svg';
import svgbackground2 from '../src/images/svgs/svg2.svg';
import svgbackground3 from '../src/images/svgs/svg3.svg';
import svgbackground4 from '../src/images/svgs/svg4.svg';
import svgbackground5 from '../src/images/svgs/svg5.svg';
import svgbackground6 from '../src/images/svgs/svg6.svg';
import svgbackground7 from '../src/images/svgs/svg7.svg';
import svgbackground8 from '../src/images/svgs/svg8.svg';
import svgbackground9 from '../src/images/svgs/svg9.svg';
import svgbackground10 from '../src/images/svgs/svg10.svg';
import svgbackground11 from '../src/images/svgs/svg11.svg';

import { format } from 'date-fns';

export function closePrompt(prompt, closeIconId) {
  const mainWrapper = document.querySelector('.main-wrapper');
  const closePromptIcon = document.querySelector('.close-icon-animation');
  if (prompt === document.querySelector('.gif-search-prompt')) {
    document.getElementById(closeIconId).addEventListener('click', () => {
      document.querySelector('.gif-search-prompt').classList.add('close');
      setTimeout(() => {
        mainWrapper.removeChild(prompt);
      }, 250);

      return;
    });
  } else if (prompt) {
    const backdrop = document.querySelector('.backdrop');
    closePromptIcon.addEventListener('click', () => {
      mainWrapper.removeChild(prompt);
      document.body.removeChild(backdrop);
    });
  }
}

export function deleteItemsFromLeftSide() {
  const leftSide = document.querySelector('.left-side');
  const diaryItemWrapper = document.querySelectorAll('.diary-item-wrapper');
  diaryItemWrapper.forEach((diaryElement) => {
    leftSide.removeChild(diaryElement);
  });
}

export function randomizeSvgWallpaper(element) {
  const svgsArray = [
    `url(${svgbackground1})`,
    `url(${svgbackground2})`,
    `url(${svgbackground3})`,
    `url(${svgbackground4})`,
    `url(${svgbackground5})`,
    `url(${svgbackground6})`,
    `url(${svgbackground7})`,
    `url(${svgbackground8})`,
    `url(${svgbackground9})`,
    `url(${svgbackground10})`,
    `url(${svgbackground11})`,
  ];
  const randomizeNum = Math.floor(Math.random() * svgsArray.length);
  element.style.backgroundImage = svgsArray[randomizeNum];
}
export function deleteAndMenuIconHover(diaryItemWrapper, deleteIcon, diaryMenuIcon) {
  deleteIcon.addEventListener('mouseenter', () => {
    diaryItemWrapper.style.outline = '1px solid rgba(194, 78, 78, 0.815)';
  });

  deleteIcon.addEventListener('mouseleave', () => {
    diaryItemWrapper.style.outline = ''; // Removes the outline when the mouse leaves
  });

  diaryMenuIcon.addEventListener('mouseenter', () => {
    diaryItemWrapper.style.outline = '1px solid rgba(120, 98, 173, 0.671)';
  });

  diaryMenuIcon.addEventListener('mouseleave', () => {
    diaryItemWrapper.style.outline = ''; // Removes the outline when the mouse leaves
  });
}

export function deleteDiary(yesButton, noButton, diaryItemWrapper, backdrop, deletePromptWindow, mainWrapper) {
  yesButton.addEventListener('click', () => {
    const leftSide = document.querySelector('.left-side');
    const rightSide = document.querySelector('.right-side');
    rightSide.innerHTML = '';
    const diaryItemWrapperID = document.getElementById(diaryItemWrapper.id);
    leftSide.removeChild(diaryItemWrapperID);
    document.body.removeChild(backdrop);
    mainWrapper.removeChild(deletePromptWindow);
    const diaryIndex = diaries.findIndex((item) => item.id === diaryItemWrapper.id);
    if (diaries[diaryIndex]) {
      diaries.splice(diaryIndex, 1);
    }
    saveToLocalStorage();
  });
  noButton.addEventListener('click', () => {
    document.body.removeChild(backdrop);
    mainWrapper.removeChild(deletePromptWindow);
  });
}

export function deleteDiaryEntry(diary, diaryIndex, diaryPinnedEntryIndex, promptWindow) {
  const deleteIcon = trashAnimationIcon(promptWindow);

  /* promptWindow.appendChild(deleteIcon); */
  deleteIcon.addEventListener('mouseenter', () => {
    promptWindow.style.outline = '2px solid rgba(194, 78, 78, 0.815)';
  });
  deleteIcon.addEventListener('mouseleave', () => {
    promptWindow.style.outline = ''; // Removes the outline when the mouse leaves
  });

  deleteIcon.addEventListener('click', () => {
    const entryId = document.getElementById(diary.entries[diaryIndex].id);
    console.log(diaryIndex);
    entryId.remove();
    if (diary.pinnedEntries[diaryPinnedEntryIndex]) {
      const pinnedEntryId = document.getElementById(diary.pinnedEntries[diaryPinnedEntryIndex].id);
      console.log(diaryPinnedEntryIndex);
      pinnedEntryId.remove();
      diary.pinnedEntries.splice(diaryPinnedEntryIndex, 1);
    }
    diary.entries.splice(diaryIndex, 1);

    document.querySelector('.main-wrapper').removeChild(promptWindow);
    document.body.removeChild(document.querySelector('.backdrop'));
    console.log(diaries);
    saveToLocalStorage();
  });
}

export function yearCollapsible() {
  document.querySelector('.right-side').addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (clickedElement.classList.contains('year-text')) {
      clickedElement.classList.toggle('active-year');
      const months = document.querySelectorAll('.month-text');
      months.forEach((month) => {
        const diaryEntries = month.nextElementSibling;
        if (month.style.maxHeight || (diaryEntries.style.maxHeight && month.style.maxHeight)) {
          // If the content is already expanded, collapse it
          month.style.maxHeight = null;
          diaryEntries.style.maxHeight = null;
          month.classList.remove('active-month');
        } else {
          // Expand the content to its full height
          month.style.maxHeight = month.scrollHeight + 'px';
        }
      });
    }
  });
}

export function monthCollapsible() {
  document.querySelector('.right-side').addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (clickedElement.classList.contains('month-text')) {
      clickedElement.classList.toggle('active-month');
      const content = clickedElement.nextElementSibling;
      content.classList.toggle('active-entries');
      if (content.style.maxHeight) {
        // If the content is already expanded, collapse it
        content.style.maxHeight = null;
      } else {
        // Expand the content to its full height
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    }
  });
}

export function pinnedCollapsibale() {
  document.querySelector('.right-side').addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (clickedElement.classList.contains('pinned-collapsable-menu-text')) {
      clickedElement.classList.toggle('active-pinned-menu');
      /*   const content = document.querySelector('.diary-entries-wrapper-pinned-menu'); */
      const content = clickedElement.nextElementSibling;
      if (content.style.maxHeight) {
        // If the content is already expanded, collapse it
        content.style.maxHeight = null;
      } else {
        // Expand the content to its full height
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    }
  });
}

export function addingHeightToCollapsableMenu() {
  const year = document.getElementById(`year-text-${format(new Date(), 'yyyy')}`);
  year.classList.toggle('active-year'); // adding classlist active to the clickable year text so the + symbol correctly changes to the - symbol
  const currentMonth = document.getElementById(`${format(new Date(), 'yyyy')}-${format(new Date(), 'MMMM')}`);
  console.log(`${format(new Date(), 'yyyy')}-${format(new Date(), 'MMMM')}`);
  currentMonth.classList.toggle('active-month');
  const months = document.querySelectorAll('.month-text');
  months.forEach((month) => {
    // all months will still be visible but won't get a active month class so only the current month is collapsed when creating a new entry
    if (month != currentMonth) {
      month.style.maxHeight = month.scrollHeight + 'px';
    }
  });
  const entriesWrapper = currentMonth.nextElementSibling;
  entriesWrapper.style.maxHeight = entriesWrapper.scrollHeight + 'px'; // adding additional height to the collapsable menu so the new entry is seen in the DOM
  currentMonth.style.maxHeight = currentMonth.scrollHeight + 'px';
  year.style.maxHeight = year.scrollHeight + 'px';
}

export function animatePinnedIconPinnedEntriesText() {
  const pinnedEntriesWrapper = document.querySelector('.pinned-collapsable-menu-text');
  const pinnedIcon = document.querySelector('.pinned-inside-collapsible-menu-icon');

  if (pinnedEntriesWrapper) {
    console.log('test');
    pinnedEntriesWrapper.addEventListener('mouseenter', () => {
      pinnedEntriesWrapper.style.transition = 'transform 250ms ease-in-out';
      pinnedIcon.style.transform = 'rotate(20deg)';
    });

    pinnedEntriesWrapper.addEventListener('mouseleave', () => {
      pinnedIcon.style.transition = 'transform 250ms ease-in-out';
      pinnedIcon.style.transform = 'rotate(0deg)';
    });
  }
}
