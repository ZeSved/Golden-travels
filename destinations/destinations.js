const cityMap = document.getElementById('city-map')
const hotelMap = document.getElementById('hotel-map')

const next = document.getElementById('next')
const previous = document.getElementById('previous')

const bar1 = document.getElementById('bar1')
const bar2 = document.getElementById('bar2')
const step1 = document.getElementById('step1')
const step2 = document.getElementById('step2')
const step3 = document.getElementById('step3')

const currentlyActive = ['step1']

cityMap.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBJJNyhCEg8sxLsO6YMZ-GMFTT-c5-Cz_Q&q=Stockholm+Sweden`
hotelMap.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBJJNyhCEg8sxLsO6YMZ-GMFTT-c5-Cz_Q&q=Grand+Hotel,Stockholm+Sweden`

next.addEventListener('click', () => {
	handleTransition(true)
})

previous.addEventListener('click', () => {
	handleTransition(false)
})

function handleTransition(goToNext) {
	if (goToNext) {
		if (currentlyActive.length === 1) {
			toggleClassnames(bar1, 'active', 'unactive')
			toggleClassnames(step2, 'active', 'unactive')
			currentlyActive.push('bar1', 'step2')
			setTimeout(() => conicGradient(true, step2), 600)
		} else if (currentlyActive.length === 3) {
			toggleClassnames(bar2, 'active', 'unactive')
			toggleClassnames(step3, 'active', 'unactive')
			currentlyActive.push('bar2', 'step3')
			setTimeout(() => conicGradient(true, step3), 600)
		}
	} else {
		if (currentlyActive.length === 5) {
			conicGradient(false, step3)
			toggleClassnames(bar2, 'unactive', 'active')
			toggleClassnames(step3, 'unactive', 'active')
		} else if (currentlyActive.length === 3) {
			conicGradient(false, step2)
			toggleClassnames(bar1, 'unactive', 'active')
			toggleClassnames(step2, 'unactive', 'active')
		}

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

		goToNext ? color-- : (color += 2)
		goToNext ? (transparent += 2) : transparent--
	}, 1)
}
