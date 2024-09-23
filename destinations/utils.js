/**
 *
 * @param First_place - The element of which classes shall be changed
 * @param Second_place - Classes to add
 * @param Third_place - Classes to remove
 */

// Toggles given classes for given elements
export function toggleClassnames(...classArrays) {
	Array.from(classArrays).forEach((item) => {
		item[0].classList.add(item[1])
		item[0].classList.remove(item[2])
	})
}
