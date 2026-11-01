// SMUI ASCII chart primitives — block characters, no canvas, no libraries

export type Tone = 'primary' | 'green' | 'yellow' | 'red' | 'purple';

// Maps a tone to devcard accent tokens (all adapt to light/dark)
export const toneTextClass: Record<Tone, string> = {
	primary: 'text-accent-blue',
	green: 'text-accent-green',
	yellow: 'text-accent-yellow',
	red: 'text-accent-red',
	purple: 'text-accent-purple'
};

const SPARK_CHARS = '▁▂▃▄▅▆▇█';
const FULL = '█';
const PARTIAL = ['░', '▒', '▓'];
const EMPTY = '░';

/**
 * Build a block-character bar: full blocks █, a partial block (░▒▓) for the
 * fractional remainder, then ░ padding out to `width`.
 */
export function asciiBar(value: number, width: number): string {
	const exact = (Math.min(100, Math.max(0, value)) / 100) * width;
	const full = Math.floor(exact);
	const frac = exact - full;
	const partial =
		frac < 0.125 ? '' : frac < 0.375 ? PARTIAL[0] : frac < 0.625 ? PARTIAL[1] : PARTIAL[2];
	return FULL.repeat(full) + partial + EMPTY.repeat(Math.max(0, width - full - partial.length));
}

/** Map a value series to the ▁▂▃▄▅▆▇█ ramp, normalized to its own min/max. */
export function sparkChars(values: number[]): string {
	if (values.length === 0) return '';
	const min = Math.min(...values);
	const max = Math.max(...values);
	const span = max - min || 1;
	return values
		.map((v) => {
			const idx = Math.round(((v - min) / span) * (SPARK_CHARS.length - 1));
			return SPARK_CHARS[Math.min(SPARK_CHARS.length - 1, Math.max(0, idx))];
		})
		.join('');
}
