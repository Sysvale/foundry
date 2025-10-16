const prepositions: Set<string> = new Set(['da', 'de', 'do', 'das', 'dos']);

export function smartTitleCase(
	text: string,
	exceptions: string[] | null = null
): string {
	if (!text) return '';

	const words = text.trim().split(/\s+/);
	const defaultExceptions = new Set(exceptions);

	return words
		.map((originalWord: string) => {
			const lower = originalWord.toLowerCase();

			if (prepositions.has(lower)) {
				return lower;
			}

			if (defaultExceptions.has(originalWord)) {
				return originalWord;
			}

			return lower.charAt(0).toUpperCase() + lower.slice(1);
		})
		.join(' ');
}
