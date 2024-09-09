const dateGridFrom = document.getElementById('date-grid-from')
const dateGridTo = document.getElementById('date-grid-to')

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const YEAR = new Date().getFullYear()
const MONTH = new Date().getMonth()
const DAY = new Date().getDay()

createDateGrid(dateGridFrom)
createDateGrid(dateGridTo)

function createDateGrid(elm) {
	const daysShown = []

	for (let dayNumber = 1; dayNumber < new Date(YEAR, MONTH, 0).getDate(); dayNumber++) {
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
				let i = new Date(YEAR, MONTH - 1, 0).getDate();
				i > new Date(YEAR, MONTH - 1, 0).getDate() - day;
				i--
			) {
				const paragraph = document.createElement('p')
				paragraph.appendChild(document.createTextNode(i))
				paragraph.className = 'otherMonth'
				daysShown.unshift(paragraph)
			}
		}

		if (new Date(YEAR, MONTH + 1, 0).toString().substring(0, 3) === days[day]) {
			for (let i = 1; i < days.length - day; i++) {
				const paragraph = document.createElement('p')
				paragraph.appendChild(document.createTextNode(i))
				paragraph.className = 'otherMonth'
				daysShown.push(paragraph)
			}
		}
	}

	daysShown.forEach((day) => {
		elm.appendChild(day)
	})
}
