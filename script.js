'use strict';

document.addEventListener('DOMContentLoaded', () => {

	//!! 							HEADER
	window.onload = function () {
		let menu = document.getElementById('menu');
		menu.onclick = function myFunction() {
			let x = document.getElementById('myTopnav');
			if (x.className === 'topnav') {
				x.className += ' responsive';
			} else {
				x.className = 'topnav';
			}
		}
	}
	//!! 							SLIDER POPUP
	let multiItemSlider = (function () {
		return function (selector, config) {
			let
				_mainElement = document.querySelector(selector), // основный элемент блока
				_sliderWrapper = _mainElement.querySelector('.slider__wrapper'), // обертка для .slider-item
				_sliderItems = _mainElement.querySelectorAll('.slider__item'), // элементы (.slider-item)
				_sliderControls = _mainElement.querySelectorAll('.slider__control'), // элементы управления
				_sliderControlLeft = _mainElement.querySelector('.slider__control_left'), // кнопка "LEFT"
				_sliderControlRight = _mainElement.querySelector('.slider__control_right'), // кнопка "RIGHT"
				_wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
				_itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента    
				_positionLeftItem = 0, // позиция левого активного элемента
				_transform = 0, // значение транфсофрмации .slider_wrapper
				_step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
				_items = []; // массив элементов
			// наполнение массива _items
			_sliderItems.forEach(function (item, index) {
				_items.push({
					item: item,
					position: index,
					transform: 0
				});
			});

			let position = {
				getMin: 0,
				getMax: _items.length - 1,
			}

			let _transformItem = function (direction) {
				if (direction === 'right') {
					if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) >= position.getMax) {
						return;
					}
					if (!_sliderControlLeft.classList.contains('slider__control_show')) {
						_sliderControlLeft.classList.add('slider__control_show');
					}
					if (_sliderControlRight.classList.contains('slider__control_show') && (_positionLeftItem + _wrapperWidth / _itemWidth) >= position.getMax) {
						_sliderControlRight.classList.remove('slider__control_show');
					}
					_positionLeftItem++;
					_transform -= _step;
				}
				if (direction === 'left') {
					if (_positionLeftItem <= position.getMin) {
						return;
					}
					if (!_sliderControlRight.classList.contains('slider__control_show')) {
						_sliderControlRight.classList.add('slider__control_show');
					}
					if (_sliderControlLeft.classList.contains('slider__control_show') && _positionLeftItem - 1 <= position.getMin) {
						_sliderControlLeft.classList.remove('slider__control_show');
					}
					_positionLeftItem--;
					_transform += _step;
				}
				_sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
			}

			// обработчик события click для кнопок "назад" и "вперед"
			let _controlClick = function (e) {
				if (e.target.classList.contains('slider__control')) {
					e.preventDefault();
					let direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
					_transformItem(direction);
				}
			};

			let _setUpListeners = function () {
				// добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
				_sliderControls.forEach(function (item) {
					item.addEventListener('click', _controlClick);
				});
			}

			// инициализация
			_setUpListeners();

			return {
				right: function () { // метод right
					_transformItem('right');
				},
				left: function () { // метод left
					_transformItem('left');
				}
			}

		}
	}());



	let scrollbar = document.body.clientWidth - window.innerWidth + 'px';

	let slider;
	//'.photo-itm-1'
	document.querySelector('[data-target="modal"]').addEventListener('click', function (e) {
		e.preventDefault();
		document.body.style.overflow = 'hidden';
		document.querySelector('#modal').style.marginLeft = scrollbar;
		document.querySelector('#modal').classList.add('modal-open');
		if (slider === undefined) {
			slider = multiItemSlider('.slider', {
				isCycling: true
			});
		} else {
			slider.cycle;
		}
	});
	document.querySelector('[data-target="close"]').addEventListener('click', function (e) {
		e.preventDefault();
		document.body.style.overflow = 'visible';
		document.querySelector('#modal').style.marginLeft = '0px';
		document.querySelector('#modal').classList.remove('modal-open');
		slider.stop;
	});

	window.addEventListener("keydown", function (evt) {
		if (evt.keyCode === 27 & document.querySelector('#modal').classList.contains("modal-open")) {
			evt.preventDefault();
			console.log('27');
			document.querySelector('#modal').classList.remove('modal-open');
		}
	});






	document.querySelector('.photo-itm-1').addEventListener('click', function (e) {
		e.preventDefault();
		document.body.style.overflow = 'hidden';
		document.querySelector('#modal').style.marginLeft = scrollbar;
		document.querySelector('#modal').classList.add('modal-open');
		if (slider === undefined) {
			slider = multiItemSlider('.slider', {
				isCycling: true
			});
		} else {
			slider.cycle;
		}
	});
	document.querySelector('[data-target="close"]').addEventListener('click', function (e) {
		e.preventDefault();
		document.body.style.overflow = 'visible';
		document.querySelector('#modal').style.marginLeft = '0px';
		document.querySelector('#modal').classList.remove('modal-open');
		slider.stop;
	});

	window.addEventListener("keydown", function (evt) {
		if (evt.keyCode === 27 & document.querySelector('#modal').classList.contains("modal-open")) {
			evt.preventDefault();
			console.log('27');
			document.querySelector('#modal').classList.remove('modal-open');
		}
	});









	/*
		//!! 							TABS
		window.onload = function () {
			document.querySelector(".tabs-header").addEventListener('click', fTabs);

			function fTabs(event) {
				if (event.target.className == 'tab-h') {
					//dataTab-номер вкладки которую нужно отобразить
					let dataTab = event.target.getAttribute('data-tab');
					//отключаем класс active
					let tabH = document.getElementsByClassName('tab-h');
					for (let i = 0; i < tabH.length; i++) {
						tabH[i].classList.remove('active');
					}
					event.target.classList.add('active');
					//все вкладки с содержимым
					let tabBody = document.getElementsByClassName('tab-b');
					for (let i = 0; i < tabBody.length; i++) {
						if (dataTab == i) {
							tabBody[i].style.display = 'block';
						} else {
							tabBody[i].style.display = 'none';
						}
					}
				}
			}
		}*/





	//!! 							SLIDER
	/*
		let images = document.querySelectorAll('.infinity-slider img')
		let current = 0

		//function slider() {
		//	for (let i = 0; i < images.length; i++) {
		//		images[i].classList.add('opacity0')
		//	}
		//	images[current].classList.remove('opacity0')
		//	if (current + 1 == images.length) {
		//		current = 0
		//	} else {
		//		current++
		//	}
		//}



		function slider() {
			for (let i = 0; i < images.length; i++) {
				images[i].classList.add('opacity0')
			}
			images[current].classList.remove('opacity0')
		}

		slider()
	*/
	////document.querySelector('.infinity-slider').onclick = slider
	/*
		document.querySelector('.btn-infinity-up').onclick = function () {

			if (current - 1 == -1) {
				current = images.length - 1
			} else {
				current--
			}
			slider()
		}

		document.querySelector('.btn-infinity-down').onclick = function () {
			if (current + 1 == images.length) {
				current = 0
			} else {
				current++
			}
			slider()
		}*/




});