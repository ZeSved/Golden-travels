const cityMap = document.getElementById('city-map')
const hotelMap = document.getElementById('hotel-map')
const cityInput = document.getElementById('city-input')
const hotelInput = document.getElementById('hotel-input')

const next = document.getElementById('next')
const previous = document.getElementById('previous')

const bar_1 = document.getElementById('bar-1')
const bar_2 = document.getElementById('bar-2')
const step_1 = document.getElementById('step-1')
const step_2 = document.getElementById('step-2')
const step_3 = document.getElementById('step-3')

const tripLocation = document.getElementById('location')
const dates = document.getElementById('dates')
const confirmDetails = document.getElementById('confirm')

const title = document.getElementById('title')

const currentlyActive = ['step_1']
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
		[confirmDetails, 'current', 'hidden'],
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
		[confirmDetails, 'hidden', 'current'],
	],
}

const titleContents = ['Choose where', 'Choose when', 'Confirm details']

const FORWARD_ANIMATION_DELAY = 600
// const BACK_ANIMATION_DELAY = (360 / Math.floor(window.innerWidth / 200)) * 14
const BACK_ANIMATION_DELAY = 1000

next.addEventListener('click', () => handleAnimations(true))
previous.addEventListener('click', () => handleAnimations(false))

cityInput.addEventListener('change', (e) => updateMaps(e, 'city'))
hotelInput.addEventListener('change', (e) => updateMaps(e, 'hotel'))

cityMap.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBJJNyhCEg8sxLsO6YMZ-GMFTT-c5-Cz_Q&q=stockholm`
hotelMap.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBJJNyhCEg8sxLsO6YMZ-GMFTT-c5-Cz_Q&q=grand+hotel`

function updateMaps(e, map) {
	console.log('runs')
	;(map === 'city'
		? cityMap
		: hotelMap
	).src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBJJNyhCEg8sxLsO6YMZ-GMFTT-c5-Cz_Q&q=${e.currentTarget.value
		.trim()
		.replaceAll(' ', '+')}`
}

function handleAnimations(goToNext) {
	const activeLen = currentlyActive.length
	const { progressBar, page, progressBarReverse, pageReverse } = classToggles

	if (goToNext) {
		toggleClassnames(
			progressBar[activeLen - 1],
			progressBar[activeLen],
			page[activeLen - 1],
			page[activeLen]
		)

		if (activeLen === 1) {
			currentlyActive.push('bar_1', 'step_2')
		} else {
			currentlyActive.push('bar_2', 'step_3')
		}
	} else {
		if (activeLen === 1) return

		toggleClassnames(progressBarReverse[activeLen - 2])

		setTimeout(() => toggleClassnames(progressBarReverse[activeLen - 3]), BACK_ANIMATION_DELAY)
		toggleClassnames(pageReverse[activeLen - 3], pageReverse[activeLen - 2])

		currentlyActive.pop()
		currentlyActive.pop()
	}

	title.textContent =
		titleContents[currentlyActive.length === 1 ? 1 : Math.floor(currentlyActive.length / 2)]
}

function toggleClassnames(...classArrays) {
	Array.from(classArrays).forEach((item) => {
		item[0].classList.add(item[1])
		item[0].classList.remove(item[2])
	})
}
