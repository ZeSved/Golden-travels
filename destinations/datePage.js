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

const dates = {
	start: 0,
	end: 0,
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()
const currentDay = new Date().getDay()

setTimeout(() => {
	const dayBoxes = dateGrid.querySelectorAll('.selectable')

	dayBoxes.forEach((day) => {
		day.addEventListener('click', () => {
			dayBoxes.forEach((b) => b.classList.remove('selected'))

			day.classList.add('selected')
		})

		const last = day.lastChild
		const first = day.firstChild

		day.addEventListener('mouseover', () => {
			toggleClassnames([last, 'show', 'hide'], [first, 'small', 'big'])
		})

		day.addEventListener('mouseout', () => {
			toggleClassnames([last, 'hide', 'show'], [first, 'big', 'small'])
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
		const containerDiv = document.createElement('div')
		const paragraph = document.createElement('p')
		const btnDiv = document.createElement('div')
		const startBtn = document.createElement('button')
		const endBtn = document.createElement('button')

		paragraph.classList.add('big')
		btnDiv.classList.add('hide')

		paragraph.appendChild(document.createTextNode(dayNumber))
		startBtn.appendChild(document.createTextNode('Start'))
		endBtn.appendChild(document.createTextNode('End'))
		btnDiv.appendChild(startBtn)
		btnDiv.appendChild(endBtn)
		containerDiv.appendChild(paragraph)
		containerDiv.appendChild(btnDiv)

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
	const btnDiv = document.createElement('div')
	const paragraph = document.createElement('p')
	const startBtn = document.createElement('button')
	const endBtn = document.createElement('button')

	containerDiv.classList.add('otherMonth')
	paragraph.classList.add('big')
	btnDiv.classList.add('hide')

	paragraph.appendChild(document.createTextNode(i))
	startBtn.appendChild(document.createTextNode('Start'))
	endBtn.appendChild(document.createTextNode('End'))
	btnDiv.appendChild(startBtn)
	btnDiv.appendChild(endBtn)
	containerDiv.appendChild(paragraph)
	containerDiv.appendChild(btnDiv)

	if (addToEnd) {
		arr.push(containerDiv)
	} else {
		arr.unshift(containerDiv)
	}
}
