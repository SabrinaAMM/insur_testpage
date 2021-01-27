'use strict';

///////////////////////////////////////
// Modals

const modal = document.querySelector('.modal');
const btnsOpenModal = document.querySelector('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnConfirm = document.querySelector('.btn--confirm-modal');
const overlay = document.querySelector('.overlay');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// document.addEventListener('keydown', function (e) {
//   if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
//     closeModal();
//   }
// });

btnConfirm.addEventListener('click', function () {
  document.querySelector('.modal__header').textContent =
    'Thank you for registering!';
  document.querySelector('.modal__form').classList.add('hidden');
  btnConfirm.classList.add('hidden');
  setTimeout(closeModal, 2000);
});

////////////////////////////
// Cookie Message
const header = document.querySelector('.header');
const message = document.createElement('div');

message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

header.append(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

////////////////////////////
// Smooth Scrolling

const navLinks = document.querySelector('.nav__links');
const tabs = document.querySelectorAll('.insurances__tab');
const tabsContainer = document.querySelector('.insurances__tab-container');
const tabsContent = document.querySelectorAll('.insurances__content');

navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

////////////////////////////
// Tabs Container

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.insurances__tab');

  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('insurances__tab--active'));
  tabsContent.forEach(c => c.classList.remove('insurances__content--active'));
  clicked.classList.add('insurances__tab--active');

  document
    .querySelector(`.insurances__content--${clicked.dataset.tab}`)
    .classList.add('insurances__content--active');
});

////////////////////////////
// Reveal Elements on Scroll

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

////////////////////////////
// Sticky Navigation

const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const initialCoords = section1.getBoundingClientRect();
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

////////////////////////////
// Splide Slider
var elms = document.getElementsByClassName('splide');
for (var i = 0, len = elms.length; i < len; i++) {
  new Splide(elms[i], {
    type: 'loop',
    perPage: 1,
    speed: 1000,
    width: '100%',
  }).mount();
}

//Lazy loading images

// const imgTargets = document.querySelectorAll('img[data-src]');

// const loadImg = function (entries, observer) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) return;

//   entry.target.src = entry.target.dataset.src;

//   entry.target.addEventListener('load', function () {
//     entry.target.classList.remove('lazy-img');
//   });
//   observer.unobserve(entry.target);
// };

// const imgObserver = new IntersectionObserver(loadImg, {
//   root: null,
//   threshold: 0,
//   rootMargin: '200px',
// });

// imgTargets.forEach(img => imgObserver.observe(img));
