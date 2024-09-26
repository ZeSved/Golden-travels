import { toggleClassnames } from './destinations/utils.js'

// Elements
const sectionOne = document.getElementById('first-section')
const sectionTwo = document.getElementById('second-section')
const hamburgerMenu = document.querySelector('.hamburger-menu')
const navBar = document.querySelector('.nav-bar')

const photoElements = document.querySelectorAll('.photo')

// Array of image sources
const images = [
	'images/16-colosseum-getty.jpg',
	'images/20-Best-Things-To-Do-In-Brazil-Christo.jpg',
	'images/africa-best-places-to-visit-experience-victoria-falls-zimbabwe-zambia.jpg',
	'images/asia-best-places-to-visit-bagan-myanmar.jpg',
	'images/Cape-Town-aerial-shot-e1477915766935.jpg',
	'images/Chichen-750x400.webp',
	'images/eiffel-tower-outro-stock.jpg',
	'images/most-visited-tourist-attraction-world--the-met.png',
	'images/most-visited-tourist-attraction-world-dinsey-california-adventure.png',
	'images/most-visited-tourist-attraction-world-islands-of-adventure.png',
	'images/most-visited-tourist-attraction-world-lake-mead.png',
	'images/most-visited-tourist-attraction-world-smoky-mountains.png',
	'images/most-visited-tourist-attraction-world-unviersal-studios-hollywood.png',
	'images/most-visited-tourist-attraction-world-unviersal-sydney-opera-house.png',
	'images/pexels-photo-753626.jpeg',
	'images/shutterstock-580489630.webp',
	'images/test.webp',
	'images/the-great-wall-2190047_960_720-e1517999791900.jpg',
	'images/victoria-peak-most-visited-tourist-attraction-world.png',
]

// Reveal the sections inside of the main on the first page when the user has scrolled far enough
document.addEventListener('scroll', () => {
	const FIRST_ANIMATION_CONDITION = window.scrollY >= window.outerHeight / 5
	const SECOND_ANIMATION_CONDITION = window.scrollY >= (window.outerHeight / 5) * 4

	startAnimations(sectionOne, FIRST_ANIMATION_CONDITION)
	startAnimations(sectionTwo, SECOND_ANIMATION_CONDITION)
})

// Assigns eventlisneters to the image elements (that changes the image when you clin on it)
photoElements.forEach((photo) => {
	photo.addEventListener('click', () => changeImages(photo))
})

// Hamburger functionality on phone
hamburgerMenu.addEventListener('click', () => {
	if (navBar.classList.contains('hide')) {
		toggleClassnames([navBar, 'show', 'hide'])
		navBar.style.top = `${window.scrollY}px`
	} else {
		toggleClassnames([navBar, 'hide', 'show'])
		hamburgerMenu.blur()
	}
})

// Making sure the links that the hamburger menu reveals work when you click on them
// while closing the navbar if the user clicks on anything besides the hamburger menu button or
// the navbar
window.addEventListener('mousedown', (e) => {
	if (
		e.target.classList.contains('hamburger-menu') ||
		e.target.parentNode.classList.contains('nav-bar') ||
		e.target.parentNode.classList.contains('hamburger-menu')
	)
		return

	toggleClassnames([navBar, 'hide', 'show'])
	hamburgerMenu.blur()
})

// Makes sure the phone nav bar follows the scrolling óf the page
window.addEventListener('scroll', () => {
	if (navBar.classList.contains('show')) {
		navBar.style.top = `${window.scrollY}px`
	}
})

// Changes the images when clicked on
function changeImages(elm) {
	const path = images[Math.floor(Math.random() * images.length)]

	if (elm.src.includes(path) || path === undefined) {
		changeImages(elm)
	} else {
		elm.src = path
	}
}

// Starts the animations for fading in/out the sections after certain amount of scrolling
function startAnimations(section, condition) {
	// If the section is visible
	if (section.classList.contains('slide-in')) {
		// Return if it should be
		if (condition) return

		// Hide if it shouldnt be shown
		if (!condition) {
			section.classList.remove('slide-in')
			section.classList.add('slide-out')
			return
		}
	}

	// If the section is hidden
	if (section.classList.contains('slide-out')) {
		// Return if it should be
		if (!condition) return

		// Reveal if it shouldnt be hidden
		if (condition) {
			section.classList.remove('slide-out')
			section.classList.add('slide-in')
			return
		}
	}

	section.classList.add('slide-in')
}
