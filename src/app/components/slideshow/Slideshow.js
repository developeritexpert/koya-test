import { gsap } from 'gsap/all';
import SlideshowImage from './SlideshowImage.js';
import './stylesSlideshow.scss';


class Slideshow {

	
	
	/*-------------------------------------------
	 *	METHODS
	 *-----------------------------------------*/
	
	/**
	*	Slideshow
	*	@param null
	*	@returns null	
	*/
	constructor (_settings) {
		
		this.container = _settings.container;
		this.handlesResize = _settings.handlesResize;

		this.speed = this.container.getAttribute('data-speed');
		this.tweenOb = {};
		this.currSlideIndex = 0; 
		this.animationActive = false;
		this.hasInteracted = false;
		
		// this.slideshowContainer = this.container.querySelector('.js-slideshowContainer');
		
		this.initSlides();
		this.initPagination();
		this.initMouseEvents();
		// this.initTouchEvents();

		if (this.handlesResize) {
			window.addEventListener('resize', this.handleWindowResize.bind(this));
			this.handleWindowResize();
		}

		this.initImages();

		this.autoTween();

	}

	
	/**
	*	initSlides
	*	@param null
	*	@returns null	
	*/ 
	initSlides () { 
		this.slidesContainer = this.container.querySelector('.js-slidesContainer');
		this.slides = this.slidesContainer.querySelectorAll('.js-slide');
		this.totalSlides = this.slides.length;
		this.currSlide = this.slides[this.currSlideIndex];
		this.currSlide.style.opacity = 1;
		this.slidesContainer.appendChild(this.currSlide);
		this.heightRatio = this.container.getAttribute('data-height-ratio');
	}
	
	
	/**
	*	initImages
	*	@param null
	*	@returns null	
	*/ 
	initImages () { 
		Array.prototype.forEach.call(this.container.querySelectorAll('.js-slideImg'), (element, index) => {
			new SlideshowImage( {
				img: element,
				imgContainer: this.container,
				handlesResize: this.handlesResize
			} );
		} );
	}
	
	
	/**
	*	initPagination
	*	@param null
	*	@returns null	
	*/ 
	initPagination () { 
		this.slidePaginations = this.container.querySelectorAll('.js-slideshowPagination');
		this.currSlidePagination = this.slidePaginations[this.currSlideIndex];
		// this.currSlidePagination.querySelector('a').classList.add('active');
	}


	/**
	*	initMouseEvents
	*	@param null
	*	@returns null	
	*/ 
	initMouseEvents () { 
			
		// this.container.find('.js-previousSlide').on('click', (event) => { 
		// 	event.preventDefault();
		// 	if (!this.animationActive) {
		// 		this.clearAutoTween();
		// 		this.hasInteracted = true;
		// 		this.previousSlide();
		// 	}
		// });
		
		// this.container.find('.js-nextSlide').on('click', (event) => { 
		// 	event.preventDefault();
		// 	if (!this.animationActive) {
		// 		this.clearAutoTween();
		// 		this.hasInteracted = true;
		// 		this.nextSlide();
		// 	}
		// });

		Array.prototype.forEach.call(this.container.querySelectorAll('.js-toThisSlide'), (element, index) => {
			element.addEventListener('click', (event) => {
				event.preventDefault();
				if (!this.animationActive) {
					this.clearAutoTween();
					this.currSlideIndex = index;
					this.hasInteracted = true;
					this.animateSlide();
				}
			});
		} );
		
	}
	
	
	/**
	*	initTouchEvents
	*	@param null
	*	@returns null	
	*/ 
	// initTouchEvents () { 
	// 	if (this.totalSlides > 1) {
	// 		const mc = new Hammer(this.container[0]);
	// 		mc.on('swipe', (ev) => {
	// 			if (!this.animationActive) {
	// 				if (ev.direction == 2) {
	// 					this.clearAutoTween();
	// 					this.hasInteracted = true;
	// 					this.nextSlide();
	// 				} else if (ev.direction == 4) {
	// 					this.clearAutoTween();
	// 					this.hasInteracted = true;
	// 					this.previousSlide();
	// 				}
	// 			}
	// 		});
	// 	}
	// }


	/**
	*	autoTween
	*	@param null
	*	@returns null	
	*/
	autoTween () {
		this.tweenObj = { turn: 0 };
		gsap.to(this.tweenObj, 0.1, { delay: this.speed, turn: 1, onComplete: () => {
			this.nextSlide();
		} } );
	}
	
	
	/**
	*	clearAutoTween
	*	@param null
	*	@returns null	
	*/
	clearAutoTween () { 
		gsap.killTweensOf(this.tweenObj);
	}
	
	
	/**
	*	nextSlide
	*	@param null
	*	@returns null	
	*/
	nextSlide () {
		if (this.currSlideIndex < (this.totalSlides-1)) { //next, otherwise back to start
			this.currSlideIndex++;
		} else {
			this.currSlideIndex = 0;
		}
		this.animateSlide();
	}
	
	
	/**
	*	previousSlide
	*	@param null
	*	@returns null	
	*/
	previousSlide () {
		if (this.currSlideIndex === 0) { //next, otherwise back to start
			this.currSlideIndex = this.totalSlides-1;
		} else {
			this.currSlideIndex--;
		}
		this.animateSlide();
	}
	
	
	/**
	*	animateSlide
	*	@param null
	*	@returns null	
	*/
	animateSlide () {
		
		this.animationActive = true;
		
		this.currSlide = this.slides[this.currSlideIndex];
		this.slidesContainer.appendChild(this.currSlide);
		this.currSlide.style.opacity = 0;
		gsap.to(this.currSlide, 0.6, { opacity: 1, ease: 'Linear.easeNone', onComplete: () => {
			this.animationActive = false;
			if (!this.hasInteracted) {
				this.autoTween();
			}
		} } );
		
		this.updatePagination();
		
	}
	
	
	/**
	*	updatePagination
	*	@param null
	*	@returns null	
	*/
	updatePagination () {
		this.currSlidePagination.querySelector('a').classList.remove('active');
		this.currSlidePagination = this.slidePaginations[this.currSlideIndex];
		this.currSlidePagination.querySelector('a').classList.add('active');
	}
	
	
	/**
	*	handleWindowResize
	*	@param null
	*	@returns null	
	*/
	handleWindowResize () {
		
		let windowWidth; 
		let windowHeight;

		if (this.container.getAttribute('data-is-full-screen')) {
			windowWidth = window.innerWidth; 
			windowHeight = window.innerHeight;
		} else {
			windowWidth = window.innerWidth; 
			windowHeight = windowWidth * this.heightRatio;
		}

		this.container.style.height = windowHeight;
		// this.slideshowContainer.css( { height: windowHeight } );
		
	}
	
	
	/**
	*	dispose
	*	@param null
	*	@returns null	
	*/
	dispose () {
		window.removeEventListener('resize', this.handleWindowResize.bind(this));
		this.clearAutoTween();
	}
	
	
	
}
	
	
export default Slideshow;