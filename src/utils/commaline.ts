export function commaline(str: string, index: number, length: number): string;
export function commaline(arr: string[]): string;

export function commaline(
	strOrArray: string | string[],
	index?: number,
	length?: number
): string {
	if (typeof strOrArray === 'string') {
		if (typeof index === 'undefined' || typeof length === 'undefined') {
			throw new Error('Index and length must be provided when passing a string');
		} else {
			if (index === length - 1) return strOrArray;
			if (index === length - 2) return `${strOrArray} e `;
			return `${strOrArray}, `;
		}
	} else {
		if (!strOrArray.length || strOrArray[0] === '') return '';

		return strOrArray.reduce((acc, cur, index, arr) => {
			return acc += commaline(cur, index, arr.length);
		}, '');
	}
}
