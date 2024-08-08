import { Swiper } from './swiper-bundle.min.js';

new Swiper('#reviews', {
  slidesPerView: 2,
  spaceBetween: 1,
  loop: true,
  autoplay: {
    delay: 3000,
  },
});

new Swiper('#team', {
  slidesPerView: 2,
  spaceBetween: 15,
  loop: true,
  autoplay: {
    delay: 3000,
  },
});

const usersSubmittingCounter = () => {
  const apiKey = 'AIzaSyDHJ0HulbJHVfvgmEH_8BHEE8hqD922ZTY';
  const spreadsheetId = '1-IWrz95e2KX3bvdqUq3xs1Sh1rAIPMDWd7aik73pTco';
  const range = 'Лист1!M2:M2';
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const value = data.values[0][0];
      document.querySelectorAll('.counter').forEach(el => {
        el.textContent = value;
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};

usersSubmittingCounter();

document.querySelectorAll('.open-modal').forEach(function (element) {
  element.addEventListener('click', function () {
    const videoSrc = this.getAttribute('data-video');
    const modalVideo = document.getElementById('modalVideo');
    const source = modalVideo.querySelector('source');
    const myModal = document.getElementById('myModal');
    source.setAttribute('src', videoSrc);
    modalVideo.load();

    myModal.style.display = 'flex';
    myModal.style.opacity = 0;

    setTimeout(function () {
      myModal.style.transition = 'opacity 0.5s';
      myModal.style.opacity = 1;
    }, 0);

    setTimeout(function () {
      modalVideo.style.display = 'block';
      modalVideo.style.transition = 'opacity 0.1s';
      modalVideo.style.opacity = 1;

      const modalClose = document.querySelector('.modal-close');
      modalClose.style.display = 'block';
      modalClose.style.transition = 'opacity 0.1s';
      modalClose.style.opacity = 1;
    }, 500);
  });
});

document.querySelectorAll('.modal-close').forEach(element => {
  element.addEventListener('click', function () {
    const modalVideo = document.getElementById('modalVideo');
    const myModal = document.getElementById('myModal');
    element.style.transition = 'opacity 0.3s';
    element.style.opacity = 0;

    setTimeout(function () {
      element.style.display = 'none';
    }, 300);

    modalVideo.style.transition = 'opacity 0.3s';
    modalVideo.style.opacity = 0;

    setTimeout(function () {
      modalVideo.style.display = 'none';
      modalVideo.pause();
    }, 300);

    myModal.style.transition = 'opacity 0.3s';
    myModal.style.opacity = 0;

    setTimeout(function () {
      myModal.style.display = 'none';
    }, 300);
  });
});

window.addEventListener('click', event => {
  const myModal = document.getElementById('myModal');
  const modalVideo = document.getElementById('modalVideo');

  if (event.target.id === 'myModal') {
    const modalClose = document.querySelector('.modal-close');

    modalVideo.style.transition = 'opacity 0.3s';
    modalVideo.style.opacity = 0;

    setTimeout(function () {
      modalVideo.style.display = 'none';
      modalVideo.pause();
    }, 300);

    modalClose.style.transition = 'opacity 0.3s';
    modalClose.style.opacity = 0;

    setTimeout(function () {
      modalClose.style.display = 'none';
    }, 300);

    myModal.style.transition = 'opacity 0.3s';
    myModal.style.opacity = 0;

    setTimeout(function () {
      myModal.style.display = 'none';
    }, 300);
  }

  if (event.target.className === 'leave-popup-overlay') {
    const leavePopupOverlay = document.querySelector('.leave-popup-overlay');
    leavePopupOverlay.style.transition = 'opacity 0.3s';
    leavePopupOverlay.style.opacity = 0;

    setTimeout(function () {
      leavePopupOverlay.style.display = 'none';
    }, 300);
  }
});

document.querySelectorAll('.leave-popup-close-btn').forEach(function (element) {
  element.addEventListener('click', function () {
    const leavePopupOverlay = document.querySelector('.leave-popup-overlay');
    leavePopupOverlay.style.transition = 'opacity 0.3s';
    leavePopupOverlay.style.opacity = 0;

    setTimeout(function () {
      leavePopupOverlay.style.display = 'none';
    }, 300);
  });
});

const showPopup = () => {
  const leavePopupOverlay = document.querySelector('.leave-popup-overlay');
  leavePopupOverlay.style.display = 'flex';
  leavePopupOverlay.style.transition = 'opacity 0.3s';
  leavePopupOverlay.style.opacity = 1;
};

document.addEventListener('mouseleave', function (event) {
  const lastPopupTimeKey = 'lastPopupShownTime';
  const now = new Date().getTime();
  const twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000;

  if (event.clientY <= 0) {
    const lastPopupTime = localStorage.getItem(lastPopupTimeKey);
    if (!lastPopupTime || now - lastPopupTime >= twoDaysInMilliseconds) {
      localStorage.setItem(lastPopupTimeKey, now);
      showPopup();
    }
  }
});

document.querySelector('.footer__policy-button').addEventListener('click', () => {
  const policy = document.querySelector('.policy');
  const policyContainer = document.querySelector('.policy__container');
  const html = document.querySelector('html');

  const showPolicy = () => {
    policy.style.display = 'block';
    policy.style.transition = 'opacity 0.3s';
    policy.style.opacity = 1;
    html.style.overflow = 'hidden';
    setTimeout(() => policyContainer.classList.add('active'), 10);
  };

  const hidePolicy = () => {
    policy.scrollTo(0, 0);
    html.style.overflow = 'auto';
    policy.style.transition = 'opacity 0.3s';
    policy.style.opacity = 0;
    policyContainer.classList.remove('active');

    setTimeout(() => {
      policy.style.display = 'none';
    }, 300);
  };

  showPolicy();

  window.addEventListener('click', event => {
    if (event.target.className === 'policy' || event.target.className === 'policy__close-btn') {
      hidePolicy();
    }
  });

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      hidePolicy();
    }
  });
});

const telegramButton = document.querySelectorAll('.telegram-button');

telegramButton.forEach(el => {
  el.addEventListener('click', event => {
    event.preventDefault();
    const url = 'https://t.me/drop100f_bot?start=link_t9TbqYzkkA';
    window.open(url, '_blank');
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html');
  const body = document.querySelector('body');
  const preloader = document.querySelector('.preloader');
  const preloaderGreetingsImg = document.querySelector('.preloader__greetings-main-title-img');
  const whiteScreen = document.querySelector('.slide');

  const criticalImage = './assets/img/preloader/preloaderBg.png';

  const preloadCriticalImage = src => {
    const img = new Image();
    img.src = src;
    img.onload = () => (body.style.opacity = 1);
    img.onerror = () => (body.style.opacity = 1);
  };

  const onPageLoad = () => {
    preloaderGreetingsImg.style.opacity = 0;
    whiteScreen.style.height = '100vh';
    setTimeout(() => {
      preloader.style.transform = 'translateY(100vh)';
      setTimeout(() => {
        html.style.overflowY = 'scroll';
        preloader.style.display = 'none';
      }, 500);
    }, 500);
  };

  document.querySelector('.preloader-screen').style.zIndex = '999999';
  document.querySelector('.preloader-screen').style.opacity = '1';

  const blocks = [
    { class: '.block1', effect: 'fade-down-left' },
    { class: '.block2', effect: 'fade-down-right' },
    { class: '.block3', effect: 'fade-down-right' },
    { class: '.block4', effect: 'fade-up-left' },
    { class: '.block5', effect: 'fade-up-right' },
  ];

  let currentIndex = 0;
  let pageLoaded = false;
  let animationComplete = false;

  function showBlocks() {
    const mainTitle = document.querySelector('.main-title');
    const preloaderGreetingsImgTopPart = document.querySelectorAll('.preloader__greetings-top');
    const preloaderGreetingsImgCenterPart = document.querySelectorAll(
      '.preloader__greetings-center'
    );
    const preloaderGreetingsImgBottomPart = document.querySelectorAll(
      '.preloader__greetings-bottom'
    );

    if (pageLoaded && animationComplete) {
      return;
    }
    if (currentIndex === blocks.length) {
      mainTitle.style.opacity = 0;
      mainTitle.style.visibility = 'hidden';
      mainTitle.style.height = '0';
      blocks.forEach(block => {
        const element = document.querySelector(block.class);
        element.classList.remove(block.effect);
        element.style.opacity = '';
        element.style.transform = '';
      });

      currentIndex = 0;

      preloaderGreetingsImg.style.opacity = 1;
      preloaderGreetingsImg.style.visibility = 'visible';
      preloaderGreetingsImg.style.height = '100%';

      setTimeout(() => {
        preloaderGreetingsImgTopPart.forEach(el => el.classList.add('shake-left'));
        preloaderGreetingsImgCenterPart.forEach(el => el.classList.add('shake-center-right'));
        preloaderGreetingsImgBottomPart.forEach(el => el.classList.add('shake-right'));

        setTimeout(() => {
          document.querySelector('.main-title').style.opacity = 1;
          preloaderGreetingsImg.style.opacity = 0;
          preloaderGreetingsImg.style.visibility = 'hidden';
          preloaderGreetingsImg.style.height = '0';

          preloaderGreetingsImgTopPart.forEach(el => el.classList.remove('shake-left'));
          preloaderGreetingsImgCenterPart.forEach(el => el.classList.remove('shake-center-right'));
          preloaderGreetingsImgBottomPart.forEach(el => el.classList.remove('shake-right'));
          if (pageLoaded) {
            mainTitle.style.opacity = 1;
            mainTitle.style.visibility = 'visible';
            mainTitle.style.height = '100%';
            animationComplete = true;
            onPageLoad();
          } else {
            showBlocks();
          }
        }, 100);
      }, 100);
    } else {
      mainTitle.style.opacity = 1;
      mainTitle.style.visibility = 'visible';
      mainTitle.style.height = '100%';
      const element = document.querySelector(blocks[currentIndex].class);
      element.classList.add(blocks[currentIndex].effect);
      currentIndex++;
      setTimeout(showBlocks, 500);
    }
  }

  const loaderBar = document.querySelector('.loader-bar');
  const percentText = document.getElementById('percentText');

  const logPageLoadTime = () => {
    loaderBar.style.width = `${100}%`;
    percentText.textContent = `${100}%`;
    pageLoaded = true;
  };

  window.addEventListener('load', logPageLoadTime);
  preloadCriticalImage(criticalImage);
  showBlocks();

  const allBackgroundImages = Array.from(document.querySelectorAll('*'))
    .map(element => window.getComputedStyle(element).backgroundImage)
    .filter(image => image !== 'none')
    .map(image => image.replace(/url\(['"]?(.*?)['"]?\)/i, '$1'));

  const allImgTags = Array.from(document.querySelectorAll('img')).map(img => img.src);

  const allResources = [...new Set([...allBackgroundImages, ...allImgTags])];
  const totalResources = allResources.length;

  let loadedResources = 0;

  const updateLoader = () => {
    const percentage = Math.min(Math.round((loadedResources / totalResources) * 100), 100);

    if (percentage >= 97) {
      loaderBar.style.width = `${97}%`;
      percentText.textContent = `${97}%`;
    } else {
      loaderBar.style.width = `${percentage}%`;
      percentText.textContent = `${percentage}%`;
    }
  };

  const resourceLoaded = src => {
    if (loadedResources < totalResources) {
      loadedResources++;
      updateLoader();
    }
  };

  const preloadImages = images => {
    images.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => resourceLoaded(src);
      img.onerror = () => resourceLoaded(src);
    });
  };

  preloadImages(allResources);

  const lazyBackgrounds = document.querySelectorAll('.lazy-bg');
  const lazyPictures = document.querySelectorAll('.lazy-picture');
  const lazyImages = document.querySelectorAll('.lazy-img');
  const lazyImagesMobile = document.querySelectorAll('.lazy-img-mobile');

  const lazyLoadBackgrounds = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bg = entry.target;
        const isMobile = window.matchMedia('(max-width: 590px)').matches;
        const bgUrl = isMobile ? bg.getAttribute('data-bg-mobile') : bg.getAttribute('data-bg');
        if (bgUrl) {
          bg.style.backgroundImage = `url(${bgUrl})`;

          const img = new Image();
          img.src = bgUrl;
          img.onload = () => resourceLoaded();
          img.onerror = () => resourceLoaded();

          observer.unobserve(bg);
        }
      }
    });
  };

  const lazyLoadPictures = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const picture = entry.target;
        const desktopSrc = picture.getAttribute('data-src-desktop');
        const mobileSrc = picture.getAttribute('data-src-mobile');
        const isMobile = window.matchMedia('(max-width: 590px)').matches;

        if (desktopSrc && mobileSrc) {
          if (isMobile) {
            picture.querySelector('source[media="(max-width: 590px)"]').srcset = mobileSrc;
            picture.querySelector('img').src = mobileSrc;
          } else {
            picture.querySelector('source[media="(min-width: 591px)"]').srcset = desktopSrc;
            picture.querySelector('img').src = desktopSrc;
          }

          const img = new Image();
          img.src = isMobile ? mobileSrc : desktopSrc;
          img.onload = () => resourceLoaded();
          img.onerror = () => resourceLoaded();

          observer.unobserve(picture);
        }
      }
    });
  };

  const lazyLoadImages = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const imgSrc = img.getAttribute('data-src');
        if (imgSrc) {
          img.src = imgSrc;
          img.onload = () => resourceLoaded();
          img.onerror = () => resourceLoaded();
          observer.unobserve(img);
        }
      }
    });
  };

  const lazyLoadImagesMobile = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && window.matchMedia('(max-width: 590px)').matches) {
        const img = entry.target;
        const imgSrc = img.getAttribute('data-src');
        if (imgSrc) {
          img.src = imgSrc;
          img.onload = () => resourceLoaded();
          img.onerror = () => resourceLoaded();
          observer.unobserve(img);
        }
      }
    });
  };

  const observerOptions = {
    root: null,
    rootMargin: '500px',
    threshold: 0.1,
  };

  const bgObserver = new IntersectionObserver(lazyLoadBackgrounds, observerOptions);
  lazyBackgrounds.forEach(bg => {
    bgObserver.observe(bg);
  });

  const pictureObserver = new IntersectionObserver(lazyLoadPictures, observerOptions);
  lazyPictures.forEach(picture => {
    pictureObserver.observe(picture);
  });

  const imgObserver = new IntersectionObserver(lazyLoadImages, observerOptions);
  lazyImages.forEach(img => {
    imgObserver.observe(img);
  });

  const imgMobileObserver = new IntersectionObserver(lazyLoadImagesMobile, observerOptions);
  lazyImagesMobile.forEach(img => {
    imgMobileObserver.observe(img);
  });
});
