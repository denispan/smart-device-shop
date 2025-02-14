const pageBody = document.querySelector('.page-body');
const modal = document.querySelector('.modal');
const buttonOpenModal = document.querySelector('.header__btn');
const overlayModal = modal.querySelector('.modal__overlay');
const buttonCloseModal = modal.querySelector('.modal__close-btn');
const nonFocusByModal = document.querySelector('.wrapper');
const inputName = modal.querySelector('#name-pop-up');
const inputPhone = modal.querySelector('#client-tel-pop-up');
const inputQuestion = modal.querySelector('#question-pop-up');
const checkboxAgreement = modal.querySelector('#agreement-pop-up');
const buttonAbout = document.querySelector('.about__btn');
const footerNav = document.querySelector('.footer__nav');
const footerContacts = document.querySelector('.footer__contacts');
const navToggle = footerNav.querySelector('button');
const contactsToggle = footerContacts.querySelector('button');

const FIRSTSIMBOLS = '+7(';
const SELECTORS = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  'select:not([disabled]):not([aria-hidden])',
  'textarea:not([disabled]):not([aria-hidden])',
  'button:not([disabled]):not([aria-hidden])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex^="-"])'
];

function initModals() {

  let focusableElementsOutModal = nonFocusByModal.querySelectorAll(SELECTORS);
  let focusableElementsInModal = modal.querySelectorAll(SELECTORS);

  const setFocus = (elements) => {
    elements.forEach((el) => {
      el.setAttribute('tabindex', '1');
    });
  };

  const removeFocus = (elements) => {
    elements.forEach((el) => {
      el.setAttribute('tabindex', '-1');
    });
  };

  const keyEscDownHandler = (evt) => {
    const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';
    if (isEscKey) {
      evt.preventDefault();
      closeModal();
    }
  };

  const openModal = () => {
    modal.classList.add('is-active');
    pageBody.classList.add('scroll-lock');
    inputName.focus();
    document.addEventListener('keydown', keyEscDownHandler);
    setFocus(focusableElementsInModal);
    removeFocus(focusableElementsOutModal);
  };

  const clearModal = () => {
    inputName.value = '';
    inputPhone.value = '';
    inputQuestion.value = '';
    checkboxAgreement.checked = true;
  };

  const closeModal = () => {
    clearModal();
    modal.classList.remove('is-active');
    pageBody.classList.remove('scroll-lock');
    document.removeEventListener('keydown', keyEscDownHandler);
    setFocus(focusableElementsOutModal);
    removeFocus(focusableElementsInModal);
  };

  buttonOpenModal.addEventListener('click', openModal);
  overlayModal.addEventListener('click', closeModal);
  buttonCloseModal.addEventListener('click', closeModal);
}

function addScrollSmooth() {

  const anchors = document.querySelectorAll('a[data-anchor]');

  anchors.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const blockID = item.getAttribute('href');
      document.querySelector('' + blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
}

function initAdditionalAbout() {

  const additionalDescription = document.querySelectorAll('.about__additional-description');

  const openDescription = () => {
    additionalDescription.forEach((el) => {
      el.classList.add('about__additional-description--open');
      buttonAbout.innerHTML = 'Свернуть';
    });
  };

  const closeDescription = () => {
    additionalDescription.forEach((el) => {
      el.classList.remove('about__additional-description--open');
      buttonAbout.innerHTML = 'Подробнее';
    });
  };

  buttonAbout.addEventListener('click', () => {
    if (additionalDescription[0].classList.contains('about__additional-description--open')) {
      closeDescription();
    } else {
      openDescription();
    }
  });
}

function initFooterSections() {

  footerNav.classList.add('footer__nav--close');
  footerContacts.classList.add('footer__contacts--close');

  navToggle.addEventListener('click', () => {
    if (footerNav.classList.contains('footer__nav--close')) {
      footerNav.classList.remove('footer__nav--close');
      footerContacts.classList.add('footer__contacts--close');
    } else {
      footerNav.classList.add('footer__nav--close');
    }
  });

  contactsToggle.addEventListener('click', () => {
    if (footerContacts.classList.contains('footer__contacts--close')) {
      footerContacts.classList.remove('footer__contacts--close');
      footerNav.classList.add('footer__nav--close');
    } else {
      footerContacts.classList.add('footer__contacts--close');
    }
  });
}

function initPhoneInput() {

  let phoneInputs = document.querySelectorAll('input[data-tel-input]');

  const getInputNumbersValue = (input) => {
    return input.value.replace(/\D/g, '');
  };

  const onPhonePaste = (e) => {
    let input = e.target;
    let inputNumbersValue = getInputNumbersValue(input);
    let pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      let pastedText = pasted.getData('Text');
      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
      }
    }
  };

  const onPhoneInput = (e) => {
    let input = e.target;
    let inputNumbersValue = getInputNumbersValue(input);
    let selectionStart = input.selectionStart;
    let formattedInputValue = '';

    if (!inputNumbersValue) {
      input.value = '';
    }

    if (input.value.length !== selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        input.value = inputNumbersValue;
      }
      return;
    }

    if (inputNumbersValue) {

      if (inputNumbersValue.length === 1) {
        formattedInputValue = FIRSTSIMBOLS + inputNumbersValue;
      }

      if (inputNumbersValue.length >= 2) {
        formattedInputValue = input.value;
      }

      if (inputNumbersValue.length > 4) {
        formattedInputValue = FIRSTSIMBOLS + inputNumbersValue.substring(1, 4) + ')' + inputNumbersValue.substring(4, 13);
      }
    }

    input.value = formattedInputValue;
  };

  const onPhoneKeyDown = (e) => {
    let inputValue = e.target.value;
    if (e.keyCode === 8 && inputValue.length === 4) {
      e.target.value = '';
    }
  };

  phoneInputs.forEach((el) => {
    el.addEventListener('keydown', onPhoneKeyDown);
    el.addEventListener('input', onPhoneInput, false);
    el.addEventListener('paste', onPhonePaste, false);
  });
}

export {initModals, addScrollSmooth, initAdditionalAbout, initFooterSections, initPhoneInput};
