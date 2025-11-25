const slides = [...document.getElementsByClassName("gallery-slide")];
const dots = [...document.getElementsByClassName("slide-dot")];
const TIMEOUT_DURATION = 10000;
let currentTimer = null;


let slideIndex = 0;
displaySlide(slideIndex);

// Preload gallery images sequentially
function preloadImagesSequentially() {
	if (slides.length === 0) return;
	
	let index = 0;
	
	function loadNext() {
		if (index >= slides.length) return;
		
		const img = new Image();
		img.onload = function() {
			index++;
			loadNext();
		};
		img.onerror = function() {
			index++;
			loadNext();
		};
		img.src = slides[index].src;
	}
	
	loadNext();
}

// Start preloading when DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', preloadImagesSequentially);
} else {
	preloadImagesSequentially();
}

function incrementSlideIndex(x) {
	slideIndex += x;
	displaySlide(slideIndex)
}

function setSlide(x) {
	slideIndex = x;
	displaySlide(x)
}

function displaySlide(n) {
	startTimer();

	if (n === slides.length) {
		slideIndex = 0;
	}
	if (n === -1) {
		slideIndex = slides.length -1;
	}
	for (let i=0; i < slides.length; i++) {
		slides[i].classList.remove('active')
		dots[i].classList.remove('active')
	}
	slides[slideIndex].classList.add('active')
	dots[slideIndex].classList.add('active')
}

function startTimer() {
	clearTimeout(currentTimer)
	currentTimer = setTimeout(() => {
		incrementSlideIndex(1)
		startTimer()
	}, TIMEOUT_DURATION)
}