const dateGridFrom = document.getElementById('date-grid-from')
const dateGridTo = document.getElementById('date-grid-to')
const yearDisplay = document.querySelector('.year')
const monthDisplay = document.querySelector('.month')

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const YEAR = new Date().getFullYear()
const MONTH = new Date().getMonth()
// const MONTH = 0
const DAY = new Date().getDay()

createDateGrid(dateGridFrom)
createDateGrid(dateGridTo)

monthDisplay.textContent = new Date(YEAR, MONTH, DAY).toLocaleString('default', { month: 'long' })
yearDisplay.textContent = YEAR

function createDateGrid(elm) {
	const daysShown = []

	for (let dayNumber = 1; dayNumber <= new Date(YEAR, MONTH + 1, 0).getDate(); dayNumber++) {
		const paragraph = document.createElement('p')
		paragraph.appendChild(document.createTextNode(dayNumber))

		if (dayNumber === new Date().getDate()) {
			paragraph.className = 'today'
		}

		daysShown.push(paragraph)
	}

	for (let day = 0; day <= days.length - 1; day++) {
		if (new Date(YEAR, MONTH, 1).toString().substring(0, 3) === days[day]) {
			for (
				let i = new Date(YEAR, MONTH, 0).getDate();
				i >= new Date(YEAR, MONTH, 0).getDate() - day + 1;
				i--
			) {
				const paragraph = document.createElement('p')
				paragraph.appendChild(document.createTextNode(i))
				paragraph.className = 'otherMonth'
				daysShown.unshift(paragraph)
			}
		}
	}

	let i = 1
	while (daysShown.length < 42) {
		console.log(daysShown.length)
		const paragraph = document.createElement('p')
		paragraph.appendChild(document.createTextNode(i))
		paragraph.className = 'otherMonth'
		daysShown.push(paragraph)
		i++
	}

	daysShown.forEach((day) => {
		elm.appendChild(day)
	})
}
