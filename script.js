// HEADER

const LOC_HASH = document.location.hash;
const LOGO = document.querySelector('.logo');
const HEADER_NAV = document.querySelector('.header__navigation ul');
const NAV_ITEMS = [...HEADER_NAV.querySelectorAll('li')];

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

// PORTFOLIO

const TAGS_MENU = document.querySelector('.tags');
const TAGS = [...TAGS_MENU.querySelectorAll('.tags__item')];
const GALLERY = document.querySelector('.portfolio .layout-4-col');
const PICS = [...GALLERY.querySelectorAll('.portfolio__pic')];

TAGS_MENU.addEventListener('click', (e) => {
  TAGS.forEach(tag => tag.classList.remove('tags__item_active'));
  e.target.classList.add('tags__item_active');
  PICS.forEach(pic => pic.style.order = Math.floor((Math.random()*PICS.length)).toString());
});

GALLERY.addEventListener('click', (e) => {
  PICS.forEach(pic => pic.children[0].style.outline = '');
  e.target.style.outline = '5px solid #f06c64';
});

// SLIDER

const SLIDER_SECTION = document.querySelector('.slider');
const SLIDER_FRAME = document.querySelector('.slider__frame');

let slides
createNewStructure();
const FIRST = 0, LAST = slides.length-1;
let current = FIRST, next = FIRST + 1, prev = LAST;
initNewStructure();

nextBtn.addEventListener('click', buttonHandler);
prevBtn.addEventListener('click', buttonHandler);
SLIDER_FRAME.addEventListener('click', handlePhones);

function createNewStructure () {
  if (SLIDER_FRAME.children.length > 2) {
    slides = [...SLIDER_FRAME.children];
  } else {
    slides = [...SLIDER_FRAME.children];
    [...SLIDER_FRAME.children].forEach(item => {
      slides.push(item.cloneNode(true));
    });
  }
}

function initNewStructure () {
  slides.forEach(slide => slide.remove());
  rearrangeSlides();
  useStyles();
  SLIDER_FRAME.append(slides[prev], slides[current], slides[next]);
}

function rearrangeSlides () {
  slides[prev].classList.add('slide_prev');
  slides[current].classList.add('slide_current');
  slides[next].classList.add('slide_next');
}

function useStyles () {
  SLIDER_SECTION.style.backgroundColor = slides[current].dataset.bgColor;
  SLIDER_SECTION.style.borderColor = slides[current].dataset.borderColor;
}

function buttonHandler (e) {
  disableButton(e);
  cancelArrangement();
  if(e.target === nextBtn) {
    slides[prev].remove();
    prev == LAST ? prev = FIRST : prev++ ;
    current == LAST ? current = FIRST : current++ ;
    next == LAST ? next = FIRST : next++;
    SLIDER_FRAME.append(slides[next]);

  } else {
    slides[next].remove();
    prev == FIRST ? prev = LAST : prev-- ;
    current == FIRST ? current = LAST : current-- ;
    next == FIRST ? next = LAST : next--;
    SLIDER_FRAME.prepend(slides[prev]);
  }
  rearrangeSlides();
  useStyles();
  switchOnMobiles();
}

function disableButton (e) {
  e.target.disabled = true;
  e.target.classList.add('hidden', 'no-pointed');
  setTimeout(() => {
    e.target.disabled = false;
    e.target.classList.remove('hidden', 'no-pointed');
  }, 1000);
}

function cancelArrangement () {
  slides.forEach(slide => slide.classList.remove('slide_prev', 'slide_current', 'slide_next'));
}

function switchOnMobiles () {
  [...slides[current].children].forEach(mobile => mobile.children[1].classList.remove('hidden'));
}

function handlePhones (e) {
  if(e.target.classList.contains('mobile-screen-on')) {
    e.target.classList.toggle('hidden');
  }
  if(e.target.classList.contains('mobile-phone')) {
    e.target.nextSibling.classList.toggle('hidden');
  }
}









