const dateGridFrom = document.getElementById('date-grid-from')
const dateGridTo = document.getElementById('date-grid-to')
const firstSection = document.getElementById('from')
const secondSection = document.getElementById('to')

const firstSectChildren = {
	previous: firstSection.querySelector('.previous'),
	next: firstSection.querySelector('.next'),
	year: firstSection.querySelector('.year'),
	month: firstSection.querySelector('.month'),
	difference: 0,
}

const secondSectChildren = {
	previous: secondSection.querySelector('.previous'),
	next: secondSection.querySelector('.next'),
	year: secondSection.querySelector('.year'),
	month: secondSection.querySelector('.month'),
	difference: 0,
}

const eventListeners = [
	[firstSectChildren, firstSectChildren.next, 1, dateGridFrom],
	[firstSectChildren, firstSectChildren.previous, -1, dateGridFrom],
	[secondSectChildren, secondSectChildren.next, 1, dateGridTo],
	[secondSectChildren, secondSectChildren.previous, -1, dateGridTo],
]

const onInitalLoad = [firstSectChildren, secondSectChildren]

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()
const currentDay = new Date().getDay()

onInitalLoad.forEach((item) => {
	item.year.textContent = currentYear
	item.month.textContent = capitalizeFirst(
		new Date(currentYear, currentMonth, currentDay).toLocaleString('default', {
			month: 'long',
		})
	)
})

eventListeners.forEach((item) => {
	item[1].addEventListener('click', () => changeMonth(item[0], item[2], item[3]))
})

function changeMonth(object, amountChanged, elm) {
	const obj = { ...object }
	const { year, month } = obj

	object.difference += amountChanged
	year.textContent = currentYear
	month.textContent = capitalizeFirst(
		new Date(currentYear, currentMonth + object.difference, currentDay).toLocaleString('default', {
			month: 'long',
		})
	)

	createDateGrid(elm, currentMonth + object.difference)
}

createDateGrid(dateGridFrom, currentMonth)
createDateGrid(dateGridTo, currentMonth)

function createDateGrid(elm, month) {
	const daysShown = []
	const lastDayOfMonth = new Date(currentYear, month + 1, 0).getDate()
	const currentMonthWeekdayStart = new Date(currentYear, month, 1).toString().substring(0, 3)
	const lastDayPreviousMonth = new Date(currentYear, month, 0).getDate()

	while (elm.firstChild) {
		elm.removeChild(elm.firstChild)
	}

	for (let dayNumber = 1; dayNumber <= lastDayOfMonth; dayNumber++) {
		const paragraph = document.createElement('p')
		paragraph.appendChild(document.createTextNode(dayNumber))

		if (dayNumber === new Date().getDate() && month === currentMonth) {
			paragraph.className = 'today'
		}

		daysShown.push(paragraph)
	}

	for (let day = 0; day <= days.length - 1; day++) {
		if (currentMonthWeekdayStart === days[day]) {
			for (let i = lastDayPreviousMonth; i >= lastDayPreviousMonth - day + 1; i--) {
				const paragraph = document.createElement('p')
				paragraph.appendChild(document.createTextNode(i))
				paragraph.className = 'otherMonth'
				daysShown.unshift(paragraph)
			}
		}
	}

	let i = 1
	while (daysShown.length < 42) {
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

function capitalizeFirst(str) {
	const firstLetter = str[0].toUpperCase()
	const remainingString = str.slice(1)

	return firstLetter + remainingString
}
