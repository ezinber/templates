class Slider {
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

  _autoSlide() {
    this._interval = setInterval(() => this._handleRightButtonClick(), this._autoSlideInterval)
  }

  init() {
    this._images.forEach((image) => {
      const imageElement = this._createImageElement(image);
      this._container.append(imageElement);
    });

    this._leftButton.addEventListener('click', () => this._handleLeftButtonClick());
    this._rightButton.addEventListener('click', () => this._handleRightButtonClick());

    this._setCount();

    if (this._autoSlideInterval) { // TODO: add auto slide preventing by touch event
      this._slider.addEventListener('mouseenter', () => clearInterval(this._interval));
      this._slider.addEventListener('mouseleave', () => this._autoSlide());

      this._autoSlide();
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
  autoSlideInterval: 0,
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
