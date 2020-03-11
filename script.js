const LOC_HASH = document.location.hash;
const LOGO = document.querySelector('.logo');
const HEADER_NAV = document.querySelector('.header__navigation ul');
const NAV_ITEMS = [...HEADER_NAV.querySelectorAll('li')];
const TAGS_MENU = document.querySelector('.tags');
const TAGS = [...TAGS_MENU.querySelectorAll('.tags__item')];
const GALLERY = document.querySelector('.portfolio .layout-4-col');
const PICS = [...GALLERY.querySelectorAll('.portfolio__pic')];

NAV_ITEMS.forEach(item => {
  if(item.children[0].getAttribute('href') == LOC_HASH) item.classList.add('navigation__item_current');
});

LOGO.addEventListener('click', () => {
  NAV_ITEMS.forEach(item => item.classList.remove('navigation__item_current'));
  NAV_ITEMS[0].classList.add('navigation__item_current');
});

HEADER_NAV.addEventListener('click', (e) => {
  NAV_ITEMS.forEach(item => item.classList.remove('navigation__item_current'));
  e.target.closest('li').classList.add('navigation__item_current');
});

TAGS_MENU.addEventListener('click', (e) => {
  TAGS.forEach(tag => tag.classList.remove('tags__item_active'));
  e.target.classList.add('tags__item_active');
  PICS.forEach(pic => pic.style.order = Math.floor((Math.random()*PICS.length)).toString());
});

GALLERY.addEventListener('click', (e) => {
  PICS.forEach(pic => pic.children[0].style.outline = '');
  e.target.style.outline = '5px solid #f06c64';
});
