const cityMap = document.getElementById('city-map')
const hotelMap = document.getElementById('hotel-map')
const cityInput = document.getElementById('city-input')
const hotelInput = document.getElementById('hotel-input')

const next = document.getElementById('next')
const previous = document.getElementById('previous')

const bar1 = document.getElementById('bar1')
const bar2 = document.getElementById('bar2')
const step1 = document.getElementById('step1')
const step2 = document.getElementById('step2')
const step3 = document.getElementById('step3')

const tripLocation = document.getElementById('location')
const dates = document.getElementById('dates')
const confirmDetails = document.getElementById('confirm')

const currentlyActive = ['step1']

const FORWARD_ANIMATION_DELAY = 600
const BACK_ANIMATION_DELAY = FORWARD_ANIMATION_DELAY

next.addEventListener('click', () => handleTransition(true))
previous.addEventListener('click', () => handleTransition(false))

cityInput.addEventListener('change', (e) => updateMaps(e, 'city'))
hotelInput.addEventListener('change', (e) => updateMaps(e, 'hotel'))

cityMap.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBJJNyhCEg8sxLsO6YMZ-GMFTT-c5-Cz_Q&q=stockholm`
hotelMap.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBJJNyhCEg8sxLsO6YMZ-GMFTT-c5-Cz_Q&q=grand+hotel`

function updateMaps(e, map) {
	console.log('runs')
	;(map === 'city'
		? cityMap
		: hotelMap
	).src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBJJNyhCEg8sxLsO6YMZ-GMFTT-c5-Cz_Q&q=${e.target.value
		.trim()
		.replaceAll(' ', '+')}`
}

function handleTransition(goToNext) {
	if (goToNext) {
		if (currentlyActive.length === 1) {
			toggleClassnames(bar1, 'active', 'unactive')
			toggleClassnames(step2, 'active', 'unactive')
			currentlyActive.push('bar1', 'step2')
			setTimeout(() => conicGradient(true, step2), FORWARD_ANIMATION_DELAY)

			toggleClassnames(tripLocation, 'hidden', 'current')
			toggleClassnames(dates, 'current', 'hidden')
		} else if (currentlyActive.length === 3) {
			toggleClassnames(bar2, 'active', 'unactive')
			toggleClassnames(step3, 'active', 'unactive')
			currentlyActive.push('bar2', 'step3')
			setTimeout(() => conicGradient(true, step3), FORWARD_ANIMATION_DELAY)

			toggleClassnames(dates, 'hidden', 'current')
			toggleClassnames(confirmDetails, 'current', 'hidden')
		}
	} else {
		if (currentlyActive.length === 5) {
			conicGradient(false, step3)
			setTimeout(() => toggleClassnames(bar2, 'unactive', 'active'), BACK_ANIMATION_DELAY)
			setTimeout(() => toggleClassnames(step3, 'unactive', 'active'), BACK_ANIMATION_DELAY)

			toggleClassnames(confirmDetails, 'hidden', 'current')
			toggleClassnames(dates, 'current', 'hidden')
		} else if (currentlyActive.length === 3) {
			conicGradient(false, step2)
			setTimeout(() => toggleClassnames(bar1, 'unactive', 'active'), BACK_ANIMATION_DELAY)
			setTimeout(() => toggleClassnames(step2, 'unactive', 'active'), BACK_ANIMATION_DELAY)

			toggleClassnames(dates, 'hidden', 'current')
			toggleClassnames(tripLocation, 'current', 'hidden')
		} else return

		currentlyActive.pop()
		currentlyActive.pop()
	}
}

function toggleClassnames(item, addName, removeName) {
	item.classList.add(addName)
	item.classList.remove(removeName)
}

function conicGradient(goToNext, elm) {
	let transparent = goToNext ? 0 : 360
	let color = goToNext ? 270 : 90

	const id = setInterval(() => {
		if ((goToNext && transparent === 360) || (!goToNext && transparent === 0)) clearInterval(id)

		elm.style.background = `conic-gradient(from ${color}deg, transparent ${transparent}deg, var(--secondary) ${transparent}deg ${color}deg)`

		goToNext ? (color -= 2) : (color += 2)
		goToNext ? (transparent += 4) : (transparent -= 4)
	}, 1)
}
