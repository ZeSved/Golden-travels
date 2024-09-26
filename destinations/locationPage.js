import { toggleClassnames } from './utils.js'

// Getting the elements
const cityMap = document.getElementById('city-map')
const hotelMap = document.getElementById('hotel-map')
const cityInput = document.getElementById('city-input')
const hotelInput = document.getElementById('hotel-input')

const next = document.getElementById('next')
const previous = document.getElementById('previous')

const bar_1 = document.getElementById('bar-1')
const bar_2 = document.getElementById('bar-2')
const step_2 = document.getElementById('step-2')
const step_3 = document.getElementById('step-3')
const steps = document.querySelectorAll('.step')

const tripLocation = document.getElementById('location')
const dates = document.getElementById('calendar')
const infoForm = document.getElementById('info-form')

const title = document.getElementById('title')

// Keeps track of currently shown parts of progress bar
const currentlyActive = ['step_1']

// Decides which part of the progress bar should be active and what page should be active
const classToggles = {
	progressBar: [
		[bar_1, 'active', 'unactive'],
		[step_2, 'active', 'unactive'],
		[bar_2, 'active', 'unactive'],
		[step_3, 'active', 'unactive'],
	],
	page: [
		[tripLocation, 'hidden', 'current'],
		[dates, 'current', 'hidden'],
		[dates, 'hidden', 'current'],
		[infoForm, 'current', 'hidden'],
	],
	progressBarReverse: [
		[bar_1, 'unactive', 'active'],
		[step_2, 'unactive', 'active'],
		[bar_2, 'unactive', 'active'],
		[step_3, 'unactive', 'active'],
	],
	pageReverse: [
		[tripLocation, 'current', 'hidden'],
		[dates, 'hidden', 'current'],
		[dates, 'current', 'hidden'],
		[infoForm, 'hidden', 'current'],
	],
}

// The titles to be shown on each page
const titleContents = ['Choose where', 'Choose when', 'Final details']

// Animation delay for progress bar moving back
const BACK_ANIMATION_DELAY = 1000

// Adding event listeners
// Animations for progress bar and pages
next.addEventListener('click', () => handleAnimations(true))
previous.addEventListener('click', () => handleAnimations(false))

// Updates the maps based oh searches
cityInput.addEventListener('change', (e) => updateMaps(e, 'city'))
hotelInput.addEventListener('change', (e) => updateMaps(e, 'hotel'))

// Assigns event listeners so that you can use the progress circles to navigate
Array.from(steps).forEach((s) => {
	s.addEventListener('click', () => {
		const currentLength = Math.ceil(currentlyActive.length / 2)
		const text = parseInt(s.getAttribute('text'))
		if (text === currentLength) return

		if (text === currentLength + 1) handleAnimations(true)

		if (text === currentLength - 1) handleAnimations(false)

		if (text === currentLength + 2) {
			handleAnimations(true)
			handleAnimations(true)
		}

		if (text === currentLength - 2) {
			handleAnimations(false)
			handleAnimations(false)
		}
	})
})

// Inital map src set
cityMap.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBJJNyhCEg8sxLsO6YMZ-GMFTT-c5-Cz_Q&q=stockholm`
hotelMap.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBJJNyhCEg8sxLsO6YMZ-GMFTT-c5-Cz_Q&q=grand+hotel`

// Function to update the maps
function updateMaps(e, map) {
	if (e.currentTarget.value.length === 0) return
	;(map === 'city'
		? cityMap
		: hotelMap
	).src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBJJNyhCEg8sxLsO6YMZ-GMFTT-c5-Cz_Q&q=${e.currentTarget.value
		.trim()
		.replaceAll(' ', '+')}`
}

// Function to handle the animations
function handleAnimations(goToNext) {
	const activeLen = currentlyActive.length
	// Makes the object easier to work with
	const { progressBar, page, progressBarReverse, pageReverse } = classToggles

	if (goToNext) {
		// Changes to next page and part of progress bar
		toggleClassnames(
			progressBar[activeLen - 1],
			progressBar[activeLen],
			page[activeLen - 1],
			page[activeLen]
		)

		// Pushes newly activated pages and parts to array that keeps track
		if (activeLen === 1) {
			currentlyActive.push('bar_1', 'step_2')
		} else {
			currentlyActive.push('bar_2', 'step_3')
		}
	} else {
		// Returns if the currently shown page is the first
		if (activeLen === 1) return

		// The same thing but for the other direction
		toggleClassnames(progressBarReverse[activeLen - 2])

		setTimeout(() => toggleClassnames(progressBarReverse[activeLen - 3]), BACK_ANIMATION_DELAY)
		toggleClassnames(pageReverse[activeLen - 3], pageReverse[activeLen - 2])

		currentlyActive.pop()
		currentlyActive.pop()
	}

	// Sets the heading to the correct text
	title.textContent =
		titleContents[currentlyActive.length === 1 ? 0 : Math.floor(currentlyActive.length / 2)]
}
