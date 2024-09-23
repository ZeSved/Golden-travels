const send = document.getElementById('send')
const warning = document.getElementById('warning')

// Regular expressions given variables so that they can actually be read
const nameRegExp = new RegExp(/^[^0-9!#"¤%&/()=?@£$€{[\]}\^*',.:;<>|\+´`§½_µ]+$/)
const numberRegExp = new RegExp(/^\d+$/)
const emailRegExp = new RegExp(
	/([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)/
)

// Array containing the id of each input field and an array of tests to put their value
// through and a message to write at the bottom of the form if any of the tests failes
const inputs = [
	[
		'first-name',
		[
			[
				(elm) => {
					return nameRegExp.test(elm.value)
				},
				'The first name field can not contain any of the following charachters: 0 1 2 3 4 5 6 7 8 9 ! # " ¤ % & / \\ ( ) = ? @ £ $ € { [ ] } ^ * \' , . : ; < > | + ´ ` § ½ _ µ',
			],
			[
				(elm) => {
					return elm.value.length > 0
				},
				'Please write your first name.',
			],
		],
	],
	[
		'last-name',
		[
			[
				(elm) => {
					return nameRegExp.test(elm.value)
				},
				'The last name field can not contain any of the following charachters: 0 1 2 3 4 5 6 7 8 9 ! # " ¤ % & / \\ ( ) = ? @ £ $ € { [ ] } ^ * \' , . : ; < > | + ´ ` § ½ _ µ',
			],
			[
				(elm) => {
					return elm.value.length > 0
				},
				'Please write your last name.',
			],
		],
	],
	[
		'age',
		[
			[
				(elm) => {
					return elm.value >= 18
				},
				'Age has to be 18 or above.',
			],
			[
				(elm) => {
					return numberRegExp.test(elm.value)
				},
				'Age can only contain numbers.',
			],
		],
	],
	[
		'email',
		[
			[
				(elm) => {
					return emailRegExp.test(elm.value)
				},
				'The email address has to be valid.',
			],
			[
				(elm) => {
					return elm.value.length > 0
				},
				'Please write your email address.',
			],
		],
	],
	[
		'phone-number',
		[
			[
				(elm) => {
					return 7 <= elm.value.length && elm.value.length <= 15
				},
				'Phone number has to have between 7 and 15 numbers.',
			],
			[
				(elm) => {
					return numberRegExp.test(elm.value)
				},
				'Phone number can only contain numbers.',
			],
		],
		numberRegExp,
		'Phone number has to be between 7 and 15 numbers long.',
		'Phone number can only contain numbers.',
	],
	[
		'card-name',
		[
			[
				(elm) => {
					return nameRegExp.test(elm.value)
				},
				'The card name field can not contain any of the following charachters: 0 1 2 3 4 5 6 7 8 9 ! # " ¤ % & / \\ ( ) = ? @ £ $ € { [ ] } ^ * \' , . : ; < > | + ´ ` § ½ _ µ',
			],
			[
				(elm) => {
					return elm.value.length > 0
				},
				'Please write the name written on your card.',
			],
		],
	],
	[
		'card-number',
		[
			[
				(elm) => {
					return 12 <= elm.value.length && elm.value.length <= 19
				},
				'Card number has to have between 12 and 19 numbers.',
			],
			[
				(elm) => {
					return numberRegExp.test(elm.value)
				},
				'Card number can only contain numbers.',
			],
		],
	],
	[
		'ccv',
		[
			[
				(elm) => {
					return 3 <= elm.value.length && elm.value.length <= 4
				},
				'CCV has to have between 3 and 4 numbers.',
			],
			[
				(elm) => {
					return numberRegExp.test(elm.value)
				},
				'CCV can only contain numbers.',
			],
		],
	],
]

send.addEventListener('click', (e) => {
	e.preventDefault()

	// Removes all previous warnings
	while (warning.firstChild) {
		warning.removeChild(warning.firstChild)
	}

	inputs.forEach((inp) => {
		const elm = document.getElementById(inp[0])

		inp[1].forEach((cond) => {
			// If current test failed create new warnig for it and append to list
			if (!cond[0](elm)) {
				const li = document.createElement('li')
				const text = document.createTextNode(cond[1])
				li.appendChild(text)
				warning.appendChild(li)
			}
		})
	})
})
