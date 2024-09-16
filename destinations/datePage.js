import { toggleClassnames } from './utils.js'

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

const dates = []

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()
const currentDay = new Date().getDay()

setTimeout(() => {
	const dayBoxes = Array.from(dateGrid.querySelectorAll('.selectable'))

	dayBoxes.forEach((d) => d.classList.remove('selected'))

	dayBoxes.forEach((day) => {
		day.addEventListener('click', (e) => {
			if (dates.length === 2) {
				dates.pop()
			}

			dates.unshift([
				currentYear,
				currentMonth + calendarChildren.difference,
				parseInt(e.currentTarget.textContent),
			])

			console.log(dates)

			dates.forEach((date) => {
				if (date[0] === currentYear && date[1] === currentMonth + calendarChildren.difference) {
					Array.from(dateGrid.children)[date[2] + 5].classList.add('selected')
				}
			})
		})

		day.addEventListener('mouseover', () => {
			toggleClassnames([day.firstChild, 'big', 'small'])
		})

		day.addEventListener('mouseout', () => {
			toggleClassnames([day.firstChild, 'small', 'big'])
		})
	})
})

calendarChildren.year.textContent = currentYear
calendarChildren.month.textContent = capitalizeFirst(
	new Date(currentYear, currentMonth + calendarChildren.difference, currentDay).toLocaleString(
		'default',
		{
			month: 'long',
		}
	)
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

createDateGrid(currentMonth + calendarChildren.difference)

function createDateGrid(month) {
	const daysShown = []
	const lastDayOfMonth = new Date(currentYear, month + 1, 0).getDate()
	const currentMonthWeekdayStart = new Date(currentYear, month, 1).toString().substring(0, 3)
	const lastDayPreviousMonth = new Date(currentYear, month, 0).getDate()

	while (dateGrid.firstChild) {
		dateGrid.removeChild(dateGrid.firstChild)
	}

	for (let dayNumber = 1; dayNumber <= lastDayOfMonth; dayNumber++) {
		const containerDiv = document.createElement('div')
		const paragraph = document.createElement('p')

		paragraph.classList.add('small')

		paragraph.appendChild(document.createTextNode(dayNumber))
		containerDiv.appendChild(paragraph)

		if (dayNumber === new Date().getDate() && month === currentMonth) {
			paragraph.className = 'golden'
		} else if (
			(dayNumber < new Date().getDate() && month === currentMonth) ||
			month < currentMonth
		) {
			containerDiv.className = 'old-days'
		} else {
			containerDiv.classList.add('selectable')
		}

		daysShown.push(containerDiv)
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
	const containerDiv = document.createElement('div')
	const paragraph = document.createElement('p')

	containerDiv.classList.add('otherMonth')
	paragraph.classList.add('small')

	paragraph.appendChild(document.createTextNode(i))
	containerDiv.appendChild(paragraph)

	if (addToEnd) {
		arr.push(containerDiv)
	} else {
		arr.unshift(containerDiv)
	}
}
