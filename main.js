const sectionOne = document.getElementById('first-section')
const sectionTwo = document.getElementById('second-section')

const photoElements = document.querySelectorAll('.photo')

const images = [
	'images/16-colosseum-getty.jpg',
	'images/20-Best-Things-To-Do-In-Brazil-Christo.jpg',
	'images/africa-best-places-to-visit-experience-victoria-falls-zimbabwe-zambia.jpg',
	'images/asia-best-places-to-visit-bagan-myanmar.jpg',
	'images/16-colosseum-getty.jpg',
	'images/Cape-Town-aerial-shot-e1477915766935.jpg',
	'images/Chichen-750x400.webp',
	'images/nedladdning.jpg',
	'images/shutterstock-580489630.webp',
	'images/test.webp',
	'images/the-great-wall-2190047_960_720-e1517999791900.jpg',
]

document.addEventListener('scroll', () => {
	// const FIRST_ANIMATION_CONDITION = window.scrollY >= 200
	const FIRST_ANIMATION_CONDITION = window.scrollY >= window.outerHeight / 5
	const SECOND_ANIMATION_CONDITION = window.scrollY >= (window.outerHeight / 5) * 4

	startAnimations(sectionOne, FIRST_ANIMATION_CONDITION)
	startAnimations(sectionTwo, SECOND_ANIMATION_CONDITION)
})

photoElements.forEach((photo) => {
	photo.addEventListener('click', () => changeImages(photo))
})

function changeImages(elm) {
	const path = images[Math.floor(Math.random() * (9 - 0 + 1) + 0)]

	if (elm.src === path) {
		changeImages(elm)
	} else {
		elm.src = path
	}
}

function startAnimations(section, condition) {
	// console.log(window.innerHeight)
	// console.log(window.outerHeight)

	if (section.classList.contains('slide-in')) {
		if (condition) return

		if (!condition) {
			section.classList.remove('slide-in')
			section.classList.add('slide-out')
			return
		}
	}

	if (section.classList.contains('slide-out')) {
		if (!condition) return

		if (condition) {
			section.classList.remove('slide-out')
			section.classList.add('slide-in')
			return
		}
	}

	section.classList.add('slide-in')
}
