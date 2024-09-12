const dateGrid = document.getElementById('date-grid')
const calendar = document.getElementById('calendar')

const calendarChildren = {
	previous: calendar.querySelector('.previous'),
	next: calendar.querySelector('.next'),
	year: calendar.querySelector('.year'),
	month: calendar.querySelector('.month'),
	difference: 0,
}

const eventListeners = [
	[calendarChildren.next, 1],
	[calendarChildren.previous, -1],
]

const dates = {
	start: 0,
	end: 0,
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()
const currentDay = new Date().getDay()

setTimeout(() => {
	const dayButtons = dateGrid.querySelectorAll('.selectable')

	dayButtons.forEach((btn) => {
		btn.addEventListener('click', () => {
			dayButtons.forEach((b) => b.classList.remove('selected'))

			btn.classList.add('selected')
		})
	})
})

calendarChildren.year.textContent = currentYear
calendarChildren.month.textContent = capitalizeFirst(
	new Date(currentYear, currentMonth, currentDay).toLocaleString('default', {
		month: 'long',
	})
)

eventListeners.forEach((item) => {
	item[0].addEventListener('click', () => changeMonth(item[1]))
})

function changeMonth(amountChanged) {
	const obj = { ...calendarChildren }
	const { year, month } = obj

	calendarChildren.difference += amountChanged
	year.textContent = currentYear
	month.textContent = capitalizeFirst(
		new Date(currentYear, currentMonth + calendarChildren.difference, currentDay).toLocaleString(
			'default',
			{
				month: 'long',
			}
		)
	)

	createDateGrid(currentMonth + calendarChildren.difference)
}

createDateGrid(currentMonth)

function createDateGrid(month) {
	const daysShown = []
	const lastDayOfMonth = new Date(currentYear, month + 1, 0).getDate()
	const currentMonthWeekdayStart = new Date(currentYear, month, 1).toString().substring(0, 3)
	const lastDayPreviousMonth = new Date(currentYear, month, 0).getDate()

	while (dateGrid.firstChild) {
		dateGrid.removeChild(dateGrid.firstChild)
	}

	for (let dayNumber = 1; dayNumber <= lastDayOfMonth; dayNumber++) {
		const div = document.createElement('div')
		const button = document.createElement('button')
		const paragraph = document.createElement('p')
		paragraph.appendChild(document.createTextNode(dayNumber))
		button.appendChild(paragraph)

		if (dayNumber === new Date().getDate() && month === currentMonth) {
			paragraph.className = 'golden'
		} else if (
			(dayNumber < new Date().getDate() && month === currentMonth) ||
			month < currentMonth
		) {
			button.className = 'old-days'
		} else {
			button.classList.add('selectable')
		}

		div.appendChild(button)

		daysShown.push(div)
	}

	for (let day = 0; day <= days.length - 1; day++) {
		if (currentMonthWeekdayStart === days[day]) {
			for (let i = lastDayPreviousMonth; i >= lastDayPreviousMonth - day + 1; i--) {
				createDayBox(daysShown, i, false)
			}
		}
	}

	let i = 1
	while (daysShown.length < 42) {
		createDayBox(daysShown, i, true)
		i++
	}

	console.log(daysShown)

	for (let i = 0; i <= daysShown.length; i++) {
		const siblingDownClasses = daysShown[i + 7]?.firstChild.classList
		const siblingUpClasses = daysShown[i - 7]?.firstChild.classList

		if (daysShown[i]?.firstChild.className !== 'otherMonth') continue

		if (
			siblingDownClasses &&
			siblingDownClasses.contains('otherMonth') &&
			siblingUpClasses &&
			siblingUpClasses.contains('otherMonth')
		)
			continue

		if (
			!(siblingDownClasses
				? siblingDownClasses.contains('otherMonth')
				: siblingUpClasses.contains('otherMonth'))
		) {
			daysShown[i].classList.add(siblingDownClasses ? 'br-down' : 'br-up')
			continue
		}
	}

	console.log(daysShown)

	daysShown.forEach((day) => {
		dateGrid.appendChild(day)
	})
}

function capitalizeFirst(str) {
	const firstLetter = str[0].toUpperCase()
	const remainingString = str.slice(1)

	return firstLetter + remainingString
}

function createDayBox(arr, i, addToEnd) {
	const div = document.createElement('div')
	const button = document.createElement('button')
	const paragraph = document.createElement('p')
	paragraph.appendChild(document.createTextNode(i))
	button.classList.add('otherMonth')
	button.appendChild(paragraph)
	div.appendChild(button)

	if (addToEnd) {
		arr.push(div)
	} else {
		arr.unshift(div)
	}
}
