import { Swiper } from './swiper-bundle.min.js';

const usersSubmittingCounter = () => {
  const updateProgress = (percentage) => {
    const progressBar = document.querySelector('.percent-text');
    const loaderBar = document.querySelector('.loader-bar');
    loaderBar.style.width = `${percentage}%`;
    progressBar.textContent = `${Math.round(percentage)}%`;
  };

  const simulateProgress = (progress = 0) => {
    const maxProgress = 99;
    const step = 5;
    let requestId; 

    const incrementProgress = () => {
      if (progress < maxProgress) {
        progress += step;
        updateProgress(progress);
        requestId = requestAnimationFrame(incrementProgress);
      }
    };
    requestId = requestAnimationFrame(incrementProgress);

    return () => cancelAnimationFrame(requestId);
  };

  const stopProgressAnimation = simulateProgress();

  const apiKey = 'AIzaSyDHJ0HulbJHVfvgmEH_8BHEE8hqD922ZTY';
  const spreadsheetId = '1-IWrz95e2KX3bvdqUq3xs1Sh1rAIPMDWd7aik73pTco';
  const range = 'Лист1!M2:M2';
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      stopProgressAnimation();
      const value = data.values[0][0];
      document.querySelectorAll('.counter').forEach(el => {
        el.textContent = value;
      });
      updateProgress(100);
    })
    .catch(error => {
      stopProgressAnimation();
      console.error('Error fetching data:', error);
      updateProgress(100);
    });
};

usersSubmittingCounter();

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
