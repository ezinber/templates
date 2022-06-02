class Slider {
  constructor(images, {
    sliderSelector,
    sliderContainerSelector,
    leftButtonSelector,
    rightButtonSelector,
    sliderImageClass,
    countCssVariable,
  }) {
    this._sliderImageClass = sliderImageClass;
    this._images = images;
    this._count = 0;
    this._countCssVariable = countCssVariable;
    this._slider = document.querySelector(sliderSelector);
    this._container = this._slider.querySelector(sliderContainerSelector);
    this._leftButton = this._slider.querySelector(leftButtonSelector);
    this._rightButton = this._slider.querySelector(rightButtonSelector);
  }

  _createImageElement({ link, name }) {
    const imageElement = document.createElement('img');
    imageElement.classList.add(this._sliderImageClass);
    imageElement.src = link;
    imageElement.alt = name;

    return imageElement;
  }

  _handleLeftButtonClick() {
    if (this._count > 0) {
      this._container.setAttribute(
        'style',
        `${this._countCssVariable}: ${--this._count}`
      );
    } else {
      this._count = this._images.length - 1;
      this._container.setAttribute(
        'style',
        `${this._countCssVariable}: ${this._count}`
      );
    }
  }

  _handleRightButtonClick() {
    if (this._count === this._images.length - 1) {
      this._count = 0;
      this._container.setAttribute(
        'style',
        `${this._countCssVariable}: ${this._count}`
      );
    } else {
      this._container.setAttribute(
        'style',
        `${this._countCssVariable}: ${++this._count}`
      );
    }
  }

  init() {
    this._images.forEach((image) => {
      const imageElement = this._createImageElement(image);
      this._container.append(imageElement);
    });

    this._leftButton.addEventListener('click', () => this._handleLeftButtonClick());
    this._rightButton.addEventListener('click', () => this._handleRightButtonClick());
  }
}

const sliderSettings = {
  sliderSelector: '.slider-a',
  sliderContainerSelector: '.slider-a__container',
  leftButtonSelector: '.slider-a__button_pos_left',
  rightButtonSelector: '.slider-a__button_pos_right',
  sliderImageClass: 'slider-a__image',
  countCssVariable: '--slider-a-count',
}

const images = [
  {
    link: 'https://picsum.photos/600/400',
    name: 'any image',
  },
  {
    link: 'https://picsum.photos/600/400',
    name: 'any image',
  },
  {
    link: 'https://picsum.photos/600/400',
    name: 'any image',
  },
]

const slider = new Slider(images, sliderSettings);

slider.init();
