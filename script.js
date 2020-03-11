const TAGS_MENU = document.querySelector('.tags');
const GALLERY = document.querySelector('.portfolio .layout-4-col');
const TAGS = [...document.querySelectorAll('.tags__item')];
const PICS = [...document.querySelectorAll('.portfolio__pic')];

TAGS_MENU.addEventListener('click', (e) => {
  TAGS.forEach(tag => tag.classList.remove('tags__item_active'));
  e.target.classList.add('tags__item_active');
  PICS.forEach(pic => pic.style.order = Math.floor((Math.random()*PICS.length)).toString());
});

GALLERY.addEventListener('click', (e) => {
  PICS.forEach(pic => pic.children[0].style.outline = '');
  e.target.style.outline = '5px solid #f06c64';
});
