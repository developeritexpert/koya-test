


class SlideshowImage {

	
	
	/*-------------------------------------------
	 *	METHODS
	 *-----------------------------------------*/
	
	/**
	*	ViewSlideshow
	*	@param null
	*	@returns null	
	*/
	constructor (_settings) {
		
		this.img = _settings.img;
		this.imgContainer = _settings.imgContainer;
		this.isShowAll = this.img.getAttribute('data-is-show-all');
		
		this.heightIntoWidth = this.img.getAttribute('width') / this.img.getAttribute('height'); //to resize according to correct ratios
		this.widthIntoHeight = this.img.getAttribute('height') / this.img.getAttribute('width');

		if (this.handlesResize) {
			window.addEventListener('resize', this.handleWindowResize.bind(this));
			this.handleWindowResize();
		}
		
	}
	
	
	/**
	*	handleWindowResize
	*	@param null
	*	@returns null	
	*/
	handleWindowResize () {
		if (this.isShowAll) {
			this.showAll();
		} else {
			this.fillScreen();
		}
	}


	/**
	*	showAll
	*	@param null
	*	@returns null	
	*/
	showAll () {

		let amountImgOffset;
		const windowWidth = this.imgContainer.getBoundingClientRect().width; 
		const windowHeight = this.imgContainer.getBoundingClientRect().height;
		const windowAspectRatio = windowWidth / windowHeight;
			
		this.img.style.marginLeft = '0px'; //reset for another positon
		this.img.style.marginTop = '0px'; //reset for another positon
		
		if (windowAspectRatio < this.heightIntoWidth) { 
			this.img.style.width = windowWidth + 'px';
			this.img.style.height = ( windowWidth * this.widthIntoHeight ) + 'px';
			amountImgOffset = (this.img.getBoundingClientRect().height - windowHeight) / 2; //to vertically align
			this.img.style.marginTop = -amountImgOffset + 'px'; 
		} else {
			this.img.style.height = windowHeight + 'px';
			this.img.style.width = ( windowHeight * this.heightIntoWidth ) + 'px';
			amountImgOffset = (this.img.getBoundingClientRect().width - windowWidth) / 2; //to horiztonally align
			this.img.style.marginLeft = -amountImgOffset + 'px'; 
		}

	}


	/**
	*	fillScreen
	*	@param null
	*	@returns null	
	*/
	fillScreen () {

		let amountImgOffset;
		const windowWidth = this.imgContainer.getBoundingClientRect().width; 
		const windowHeight = this.imgContainer.getBoundingClientRect().height;
		const windowAspectRatio = windowWidth / windowHeight;
			
		this.img.style.marginLeft = '0px'; //reset for another positon
		this.img.style.marginTop = '0px'; //reset for another positon
		
		if (windowAspectRatio > this.heightIntoWidth) { 
			this.img.style.width = windowWidth + 'px';
			this.img.style.height = ( windowWidth * this.widthIntoHeight ) + 'px';
			amountImgOffset = (this.img.getBoundingClientRect().height - windowHeight) / 2; //to vertically align
			this.img.style.marginTop = -amountImgOffset + 'px'; 
		} else {
			this.img.style.height = windowHeight + 'px';
			this.img.style.width = ( windowHeight * this.heightIntoWidth ) + 'px';
			amountImgOffset = (this.img.getBoundingClientRect().width - windowWidth) / 2; //to horiztonally align
			this.img.style.marginLeft = -amountImgOffset + 'px'; 
		}

	}

	
	/**
	*	dispose
	*	@param null
	*	@returns null	
	*/
	dispose () {
		window.removeEventListener('resize', this.handleWindowResize.bind(this));
	}
	
	
	
}
	
	
export default SlideshowImage;