import { toggleClassnames } from './utils.js'

// Getting the elements
const dateGrid = document.getElementById('date-grid')
const calendar = document.getElementById('calendar')

const previous = document.querySelector('.previous')
const next = document.querySelector('.next')
const yearDisplay = document.querySelector('.year')
const monthDisplay = document.querySelector('.month')
const dayList = document.getElementById('days')

// Adding Event listeners
const eventListeners = [
	[next, 1],
	[previous, -1],
]

// Currently selected dates
const dates = []

// To know what place certain days should be
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// Current year, month and day
const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()
const currentDay = new Date().getDay()

// Keeping track of amount of forward or backward moves
const difference = {
	year: currentYear,
	month: currentMonth,
}

// Inital setting of year and month display
yearDisplay.textContent = difference.year
monthDisplay.textContent = capitalizeFirst(
	new Date(difference.year, difference.month, currentDay).toLocaleString('default', {
		month: 'long',
	})
)

// Adding event listeners to buttons
eventListeners.forEach((item) => {
	item[0].addEventListener('click', () => changeMonth(item[1]))
})

// Shortening all day names to the first 3 lettes if the screen is to narrow
if (window.innerWidth <= 810) {
	Array.from(dayList.children).forEach((day) => {
		day.textContent = day.textContent.substring(0, 3)
	})
}

// Activates new calendar creation if the month or year have been put to something other than the current
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

// Initial creation of calendar
createDateGrid(difference.month, difference.year)

// Function that creates the calendar grid
function createDateGrid(month, year) {
	const daysShown = []
	const lastDayOfMonth = new Date(year, month + 1, 0).getDate()
	const currentMonthWeekdayStart = new Date(year, month, 1).toString().substring(0, 3)
	const lastDayPreviousMonth = new Date(year, month, 0).getDate()

	// Resetting the calendar children if it has any
	while (dateGrid.firstChild) {
		dateGrid.removeChild(dateGrid.firstChild)
	}

	// Creates all days of the current month and adds them to
	for (let dayNumber = 1; dayNumber <= lastDayOfMonth; dayNumber++) {
		const containerDiv = document.createElement('div')
		const paragraph = document.createElement('p')

		paragraph.classList.add('small')

		paragraph.appendChild(document.createTextNode(dayNumber))
		containerDiv.appendChild(paragraph)

		containerDiv.id = `${difference.year}-${difference.month}-${dayNumber}`

		// Assigns correct class
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

	// If month starts with somethin other than monday, add days to the start until first day
	// is correctly positioned
	for (let day = 0; day <= days.length - 1; day++) {
		if (currentMonthWeekdayStart === days[day]) {
			for (let i = lastDayPreviousMonth; i >= lastDayPreviousMonth - day + 1; i--) {
				// Calls a function for creating the divs
				createDayBox(daysShown, i, false, { y: difference.year, m: difference.month - 1, d: i })
			}
		}
	}

	// Adds days to the end until the amount of divs in the calendar is 42
	let i = 1
	while (daysShown.length < 42) {
		// Calls a function for creating the divs
		createDayBox(daysShown, i, true, { y: difference.year, m: difference.month + 1, d: i })
		i++
	}

	// Assigns final classes if the divs are in a different month or should have specfic styling
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

	// Appends all created divs to the calendar
	daysShown.forEach((day) => {
		dateGrid.appendChild(day)
	})

	// Assigns special classes to the selected dates if there are any
	assignSelectedClasses(Array.from(dateGrid.children), dates)
	setTimeout(() => handleDayEventListeners())
}

// Capitalizes first letter in a string
function capitalizeFirst(str) {
	const firstLetter = str[0].toUpperCase()
	const remainingString = str.slice(1)

	return firstLetter + remainingString
}

// Creates the divs
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

// Assigns event listeners to created divs
function handleDayEventListeners() {
	const dayBoxes = dateGrid.querySelectorAll('.selectable')

	dayBoxes.forEach((day) => {
		day.addEventListener('click', (e) => {
			const targetDay = parseInt(e.currentTarget.textContent)
			Array.from(dateGrid.children).forEach((d) => d.classList.remove('selected', 'first', 'last'))

			// Removes the correct elements from the dates array depending on clicked div
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

			// Gets all divs with the 'selectable' class
			const selected = Array.from(dateGrid.children).filter((days) =>
				days.classList.contains('selectable')
			)

			assignSelectedClasses(selected, dates)
		})

		// Adds event listeners for responsiveness when the mouse moves over and out
		day.addEventListener('mouseover', () => {
			toggleClassnames([day.firstChild, 'big', 'small'])
		})

		day.addEventListener('mouseout', () => {
			toggleClassnames([day.firstChild, 'small', 'big'])
		})
	})
}

// Assigns the 'selected' class to divs between the selected start and end date
function assignSelectedClasses(elm, dateList) {
	if (!dateList[0]) return

	// Makes sure that the first element in the dates array is the earliest date out of the 2
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

	// Gives the div the correct class depending on its id and relation to the first selected element
	// and the last
	elm.forEach((day) => {
		const dayShown = parseInt(day.children[0].textContent)
		const id = day.id.split('-').map((num) => parseInt(num))
		// Conditions put into array to make it easier to read
		const conditionSets = [
			// If the current interated div has the same id values as the first item in the dates array
			id[0] === firstSelectedDay[0] &&
				id[1] === firstSelectedDay[1] &&
				id[2] === firstSelectedDay[2],
			// If the current iterated div has the same id values as the last item in the dates array
			id[0] === lastSelectedDay[0] && id[1] === lastSelectedDay[1] && id[2] === lastSelectedDay[2],
			// If the current iterated div is between the first selected and the last selected
			id[2] === dayShown &&
				id[0] >= firstSelectedDay[0] &&
				id[1] >= firstSelectedDay[1] &&
				id[2] >= firstSelectedDay[2] &&
				id[0] <= lastSelectedDay[0] &&
				id[1] <= lastSelectedDay[1] &&
				id[2] <= lastSelectedDay[2],
			// If the current iterated div is between first and last selected and the first
			// selected is in a different month
			firstSelectedDay[1] < lastSelectedDay[1] &&
				((id[0] === firstSelectedDay[0] &&
					id[1] === firstSelectedDay[1] &&
					id[2] >= firstSelectedDay[2]) ||
					(id[0] === lastSelectedDay[0] &&
						id[1] === lastSelectedDay[1] &&
						id[2] <= lastSelectedDay[2])),
		]

		// Assings the correctl class to the divs that fulfill any of the conditions
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
