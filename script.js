// HEADER

document.addEventListener('scroll', scrollHandler);
const hamburger_menu  = document.querySelector('.hamburger-btn');
hamburger_menu.addEventListener('click', toggleMenu);
document.addEventListener('click', removeMenu);

function scrollHandler (e) {
  const html = document.documentElement;
  const nav_items = [...html.querySelectorAll('.header__navigation li')];
  if(Math.ceil(html.scrollHeight - html.scrollTop) == html.clientHeight) {
    nav_items.forEach(item => item.classList.remove('navigation__item_current'));
    nav_items[nav_items.length - 1].classList.add('navigation__item_current');
    return;
  }
  const from_top = window.scrollY;
  nav_items.forEach((item) => {
    let section = document.querySelector(item.children[0].hash);
    if (section.offsetTop - header.offsetHeight <= from_top && (section.offsetTop - header.offsetHeight + section.offsetHeight) > from_top) {
      item.classList.add('navigation__item_current');
    } else {
      item.classList.remove('navigation__item_current');
    }
  });
}

function toggleMenu (e) {
  const header_nav  = document.querySelector('.header__navigation');
  const logo = document.querySelector('.logo');
  hamburger_menu.classList.toggle('hamburger-btn_turned');
  header_nav.classList.toggle('header__navigation_active');
  logo.classList.toggle('logo_sticked');
}

function removeMenu (e) {
  if(!hamburger_menu.classList.contains('hamburger-btn_turned')) return;
  if(e.target.classList.contains('navigation__link') || !e.target.closest('header')) {
   toggleMenu();
  }
}

// PORTFOLIO

const tags_menu = document.querySelector('.tags');
const tags = [...tags_menu.querySelectorAll('.tags__item')];
const gallery = document.querySelector('.portfolio .layout-4-col');
const pics = [...gallery.querySelectorAll('.portfolio__pic')];

tags_menu.addEventListener('click', tagClickHandler);
gallery.addEventListener('click', highlightPicture);

function tagClickHandler (e) {
  if (e.target.classList.contains('tags__item_active') || !e.target.classList.contains('tags__item')) return;
  tags.forEach(tag => tag.classList.remove('tags__item_active'));
  e.target.classList.add('tags__item_active');
  mixPictures();
}

function highlightPicture (e) {
  if (e.target.nodeName != 'IMG' || e.target.getAttribute('outline') != null) return;
  pics.forEach(pic => pic.children[0].style.outline = '');
  e.target.style.outline = '5px solid #f06c64';
}

function mixPictures () {
  pics.forEach(pic => pic.remove());
  pics.push(pics.shift());
  const picsContainer = document.querySelector('.portfolio .layout-4-col');
  pics.forEach(pic => picsContainer.append(pic));
}

// FORM

const form = document.querySelector('.contact-form');
form.addEventListener('submit', submitFormHandler);

function submitFormHandler (e) {
  e.preventDefault();
  displayModal();
  fillModal();
  document.querySelector('.modal-window__button').addEventListener('click', removeModal);
}

function fillModal () {
  if (form.subject.value) document.querySelector('.modal-window__subject').textContent = 'Subject: ' + form.subject.value;
  if (form.comments.value) document.querySelector('.modal-window__comments').textContent = 'Description: ' + form.comments.value;
}

function displayModal () {
  document.body.append(template.content.cloneNode(true));
}

function removeModal (e) {
  e.target.closest('.overlay').remove();
  form.reset();
}

// SLIDER

const slider_section = document.querySelector('.slider');
const slider_frame = document.querySelector('.slider__frame');

let slides
createNewStructure();
let current = 0, next = 1, prev = slides.length-1;
initNewStructure();

nextBtn.addEventListener('click', buttonHandler);
prevBtn.addEventListener('click', buttonHandler);
slider_frame.addEventListener('click', handlePhones);

function createNewStructure () {
  if (slider_frame.children.length > 2) {
    slides = [...slider_frame.children];
  } else {
    slides = [...slider_frame.children];
    [...slider_frame.children].forEach(item => {
      slides.push(item.cloneNode(true));
    });
  }
}

function initNewStructure () {
  slides.forEach(slide => slide.remove());
  setNewMargins();
  useColorStyles();
  slider_frame.append(slides[prev], slides[current], slides[next]);
}

function setNewMargins () {
  slides[prev].classList.add('slide_prev');
  slides[current].classList.add('slide_current');
  slides[next].classList.add('slide_next');
}

function useColorStyles () {
  slider_section.style.backgroundColor = slides[current].dataset.bgColor;
  slider_section.style.borderColor = slides[current].dataset.borderColor;
  prevBtn.className = 'slider__button ' + slides[current].dataset.btnClass;
  nextBtn.className = 'slider__button slider__button_next ' + slides[current].dataset.btnClass;
}

function buttonHandler (e) {
  disableButton(e);
  cancelMargins();
  handleCertainButton(e);
  setNewMargins();
  useColorStyles();
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

function cancelMargins () {
  slides.forEach(slide => slide.classList.remove('slide_prev', 'slide_current', 'slide_next'));
}

function handleCertainButton (e) {
  if(e.target === nextBtn) {
    slides[prev].remove();
    calcNewMargins(1);
    slider_frame.append(slides[next]);
  } else {
    slides[next].remove();
    calcNewMargins(-1);
    slider_frame.prepend(slides[prev]);
  }
}

function switchOnMobiles () {
  [...slides[current].children].forEach(mobile => mobile.children[1].classList.remove('hidden'));
}

function calcNewMargins (change) {
  prev = (prev + change + slides.length) % slides.length;
  current = (current + change + slides.length) % slides.length;
  next = (next + change + slides.length) % slides.length;
}

function handlePhones (e) {
  if(e.target.classList.contains('mobile-screen-on')) {
    e.target.classList.toggle('hidden');
  }
  if(e.target.classList.contains('mobile-phone')) {
    e.target.nextSibling.classList.toggle('hidden');
  }
}
