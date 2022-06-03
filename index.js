class Slider { // TODO: create navigation dots
  constructor(images = [{ name: '', link: '' }], {
    sliderSelector = '.slider',
    sliderContainerSelector = '.slider-container',
    leftButtonSelector = '.left-button',
    rightButtonSelector = '.right-button',
    sliderImageClass = 'slider-image',
    countCssVariable = '--count',
    autoSlideInterval = 0,
  }) {
    this._images = images;
    this._slider = document.querySelector(sliderSelector);
    this._container = this._slider.querySelector(sliderContainerSelector);
    this._leftButton = this._slider.querySelector(leftButtonSelector);
    this._rightButton = this._slider.querySelector(rightButtonSelector);
    this._sliderImageClass = sliderImageClass;
    this._countCssVariable = countCssVariable;
    this._autoSlideInterval = autoSlideInterval;
    this._count = 0;
    this._initialX = null;
    this._initialY = null;
  }

  _createImageElement({ link, name }) {
    const imageElement = document.createElement('img');
    imageElement.classList.add(this._sliderImageClass);
    imageElement.src = link;
    imageElement.alt = name;

    return imageElement;
  }

  _setCount() {
    this._container.setAttribute(
      'style',
      `${this._countCssVariable}: ${this._count}`
    );
  }

  _handleLeftButtonClick() {
    this._count > 0
      ? this._count--
      : this._count = this._images.length - 1;

    this._setCount();
  }

  _handleRightButtonClick() {
    this._count < this._images.length - 1
      ? this._count++
      : this._count = 0;

    this._setCount();
  }

  _setAutoSlide() {
    this._interval = setInterval(() => this._handleRightButtonClick(), this._autoSlideInterval)
  }

  _removeAutoSlide() {
    clearInterval(this._interval);
  }

  _startTouch(e) {
    this._initialX = e.touches[0].clientX;
    this._initialY = e.touches[0].clientY;
  }

  _moveTouch(e) {
    e.preventDefault();

    if (!this._initialX) {
      return;
    }

    if (!this._initialY) {
      return;
    }

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;

    const diffX = this._initialX - currentX;
    const diffY = this._initialY - currentY;

    const resetInitialXY = () => {
      this._initialX = null;
      this._initialY = null;
    }

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 50) {
        this._handleRightButtonClick();
        resetInitialXY();
      } else if (diffX < -50) {
        this._handleLeftButtonClick();
        resetInitialXY();
      }
    }
  }

  init() {
    this._images.forEach((image) =>
      this._container.append(this._createImageElement(image)));

    this._leftButton.addEventListener('click', () => this._handleLeftButtonClick());
    this._rightButton.addEventListener('click', () => this._handleRightButtonClick());
    this._slider.addEventListener('touchstart', (e) => this._startTouch(e));
    this._slider.addEventListener('touchmove', (e) => this._moveTouch(e));

    this._setCount();

    if (this._autoSlideInterval) { // TODO: add auto slide preventing by touch event
      this._slider.addEventListener('mouseenter', () => this._removeAutoSlide());
      this._slider.addEventListener('touchstart', () => this._removeAutoSlide());
      this._slider.addEventListener('mouseleave', () => this._setAutoSlide());
      this._slider.addEventListener('touchend', () => this._setAutoSlide());

      this._setAutoSlide();
    }
  }
}


const sliderSettings = {
  sliderSelector: '.slider-a',
  sliderContainerSelector: '.slider-a__container',
  leftButtonSelector: '.slider-a__button_pos_left',
  rightButtonSelector: '.slider-a__button_pos_right',
  sliderImageClass: 'slider-a__image',
  countCssVariable: '--slider-a-count',
  autoSlideInterval: 3000,
}

const images = [
  {
    link: 'https://picsum.photos/600/400',
    name: 'any image',
  },
  {
    link: 'https://picsum.photos/800/600',
    name: 'any image',
  },
  {
    link: 'https://picsum.photos/700/500',
    name: 'any image',
  },
]

const slider = new Slider(images, sliderSettings);

slider.init();
