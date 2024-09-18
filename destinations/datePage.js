import { toggleClassnames } from './utils.js'

const dateGrid = document.getElementById('date-grid')
const calendar = document.getElementById('calendar')

const previous = document.querySelector('.previous')
const next = document.querySelector('.next')
const yearDisplay = document.querySelector('.year')
const monthDisplay = document.querySelector('.month')

const eventListeners = [
	[next, 1],
	[previous, -1],
]

const dates = []

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()
const currentDay = new Date().getDay()

const difference = {
	year: currentYear,
	month: currentMonth,
}

yearDisplay.textContent = difference.year
monthDisplay.textContent = capitalizeFirst(
	new Date(difference.year, difference.month, currentDay).toLocaleString('default', {
		month: 'long',
	})
)

eventListeners.forEach((item) => {
	item[0].addEventListener('click', () => changeMonth(item[1]))
})

function changeMonth(amountChanged) {
	if (amountChanged === -1 && difference.month === 0) {
		difference.year -= 1
		difference.month = 12
	}

	if (amountChanged === 1 && difference.month === 11) {
		difference.year += 1
		difference.month = 0
	} else {
		difference.month += amountChanged
	}

	yearDisplay.textContent = difference.year
	monthDisplay.textContent = capitalizeFirst(
		new Date(difference.year, difference.month, currentDay).toLocaleString('default', {
			month: 'long',
		})
	)

	createDateGrid(difference.month, difference.year)
}

createDateGrid(difference.month, difference.year)

function createDateGrid(month, year) {
	const daysShown = []
	const lastDayOfMonth = new Date(year, month + 1, 0).getDate()
	const currentMonthWeekdayStart = new Date(year, month, 1).toString().substring(0, 3)
	const lastDayPreviousMonth = new Date(year, month, 0).getDate()

	while (dateGrid.firstChild) {
		dateGrid.removeChild(dateGrid.firstChild)
	}

	for (let dayNumber = 1; dayNumber <= lastDayOfMonth; dayNumber++) {
		const containerDiv = document.createElement('div')
		const paragraph = document.createElement('p')

		paragraph.classList.add('small')

		paragraph.appendChild(document.createTextNode(dayNumber))
		containerDiv.appendChild(paragraph)

		containerDiv.id = `${difference.year}-${difference.month}-${dayNumber}`

		if (dayNumber === new Date().getDate() && month === currentMonth && year === currentYear) {
			paragraph.className = 'golden'
		} else if (
			(dayNumber < new Date().getDate() && month === currentMonth && year === currentYear) ||
			(month < currentMonth && year <= currentYear) ||
			year < currentYear
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
				createDayBox(daysShown, i, false, { y: difference.year, m: difference.month - 1, d: i })
			}
		}
	}

	let i = 1
	while (daysShown.length < 42) {
		createDayBox(daysShown, i, true, { y: difference.year, m: difference.month + 1, d: i })
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

	assignSelectedClasses(Array.from(dateGrid.children), dates)
	setTimeout(() => handleDayEventListeners())
}

function capitalizeFirst(str) {
	const firstLetter = str[0].toUpperCase()
	const remainingString = str.slice(1)

	return firstLetter + remainingString
}

function createDayBox(arr, i, addToEnd, id) {
	const containerDiv = document.createElement('div')
	const paragraph = document.createElement('p')

	containerDiv.classList.add('otherMonth')
	containerDiv.id = `${id.y}-${id.m}-${id.d}`
	paragraph.classList.add('small')

	paragraph.appendChild(document.createTextNode(i))
	containerDiv.appendChild(paragraph)

	if (addToEnd) {
		arr.push(containerDiv)
	} else {
		arr.unshift(containerDiv)
	}
}

function handleDayEventListeners() {
	const dayBoxes = dateGrid.querySelectorAll('.selectable')

	dayBoxes.forEach((day) => {
		day.addEventListener('click', (e) => {
			const targetDay = parseInt(e.currentTarget.textContent)
			Array.from(dateGrid.children).forEach((d) => d.classList.remove('selected', 'first', 'last'))

			if (dates.length === 2) {
				switch (true) {
					case targetDay === dates[0][2] + 1:
					case targetDay === dates[0][2] - 1:
						dates.shift()
						break
					case targetDay === dates[1][2] + 1:
					case targetDay === dates[1][2] - 1:
						dates.pop()
						break
					case targetDay >= dates[0][2] + 2:
					case targetDay <= dates[1][2] - 2:
						if (
							targetDay - dates[0][2] > dates[1][2] - targetDay ||
							targetDay - dates[0][2] === dates[1][2] - targetDay
						) {
							dates.pop()
							break
						}

						if (targetDay - dates[0][2] < dates[1][2] - targetDay) {
							dates.shift()
							break
						}
				}
			}

			dates.push([difference.year, difference.month, targetDay])

			const selected = Array.from(dateGrid.children).filter((days) =>
				days.classList.contains('selectable')
			)

			assignSelectedClasses(selected, dates)
		})

		day.addEventListener('mouseover', () => {
			toggleClassnames([day.firstChild, 'big', 'small'])
		})

		day.addEventListener('mouseout', () => {
			toggleClassnames([day.firstChild, 'small', 'big'])
		})
	})
}

function assignSelectedClasses(elm, dateList) {
	if (!dateList[0]) return

	dateList.sort((firstDate, lastDate) => {
		if (firstDate[0] < lastDate[0]) return -1
		if (firstDate[0] > lastDate[0]) return 1

		if (firstDate[1] < lastDate[1]) return -1
		if (firstDate[1] > lastDate[1]) return 1

		if (firstDate[2] < lastDate[2]) return -1
		if (firstDate[2] > lastDate[2]) return 1
	})

	const firstSelectedDay = dateList[0]
	const lastSelectedDay = dateList[1] ?? dateList[0]

	elm.forEach((day) => {
		const dayShown = parseInt(day.children[0].textContent)
		const id = day.id.split('-').map((num) => parseInt(num))
		const conditionSets = [
			id[0] === firstSelectedDay[0] &&
				id[1] === firstSelectedDay[1] &&
				id[2] === firstSelectedDay[2],
			id[0] === lastSelectedDay[0] && id[1] === lastSelectedDay[1] && id[2] === lastSelectedDay[2],
			id[2] === dayShown &&
				id[0] >= firstSelectedDay[0] &&
				id[1] >= firstSelectedDay[1] &&
				id[2] >= firstSelectedDay[2] &&
				id[0] <= lastSelectedDay[0] &&
				id[1] <= lastSelectedDay[1] &&
				id[2] <= lastSelectedDay[2],
			firstSelectedDay[1] < lastSelectedDay[1] &&
				((id[0] === firstSelectedDay[0] &&
					id[1] === firstSelectedDay[1] &&
					id[2] >= firstSelectedDay[2]) ||
					(id[0] === lastSelectedDay[0] &&
						id[1] === lastSelectedDay[1] &&
						id[2] <= lastSelectedDay[2])),
		]

		if (conditionSets[0]) {
			day.classList.add('first')
		}

		if (conditionSets[1]) {
			day.classList.add('last')
		}

		if (conditionSets[2] || conditionSets[3]) {
			day.classList.add('selected')
		}
	})
}
