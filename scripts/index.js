import { Swiper } from './swiper-bundle.min.js';

const reviews = new Swiper('#reviews', {
  slidesPerView: 2,
  spaceBetween: 1,
  loop: true,
  autoplay: {
    delay: 3000,
  },
});

const team = new Swiper('#team', {
  slidesPerView: 2,
  spaceBetween: 15,
  loop: true,
  autoplay: {
    delay: 3000,
  },
});


