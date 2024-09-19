const send = document.getElementById('send')

const nameRegExp = new RegExp(/^[^0-9!#"¤%&/()=?@£$€{[]}\^*',.:;<>|\+´`§½_µ]+$/)
const numberRegExp = new RegExp(/^\d+$/)

const inputs = [
	['first-name', nameRegExp],
	['last-name', nameRegExp],
	['age', numberRegExp],
	[
		'email',
		new RegExp(/([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)/g),
	],
	['phone-number', numberRegExp],
	['card-name', nameRegExp],
	['card-number', numberRegExp],
	['ccv', numberRegExp],
]

send.addEventListener('click', (e) => {
	e.preventDefault()

	console.log(inputs)

	inputs.forEach((inp) => {
		console.log(inp)
		if (!document.getElementById(inp[0]).value.match(inp[1])) alert('error')
	})
})
