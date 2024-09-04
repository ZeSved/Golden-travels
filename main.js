const sectionOne = document.getElementById('first-section')
const sectionTwo = document.getElementById('second-section')

document.addEventListener('scroll', () => {
	const FIRST_ANIMATION_CONDITION = window.scrollY >= 200 && window.scrollY <= 950
	const SECOND_ANIMATION_CONDITION = window.scrollY >= 700

	startAnimations(sectionOne, FIRST_ANIMATION_CONDITION)
	startAnimations(sectionTwo, SECOND_ANIMATION_CONDITION)
})

function startAnimations(section, condition) {
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
