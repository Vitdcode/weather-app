export function createParagraph(className, text) {
  const paragraph = document.createElement('p');
  paragraph.classList.add(className);
  paragraph.textContent = text;
  return paragraph;
}

export function createDiv(className, id) {
  const div = document.createElement('div');
  div.classList.add(className);
  div.id = id;
  return div;
}

export function createImg(className) {
  const img = document.createElement('img');
  img.classList.add(className);
  return img;
}
