<script lang="ts">
	import { toneTextClass, type Tone } from '$shared/lib/ascii';

	export interface LeaderRow {
		label: string;
		value: string;
		tone?: Tone;
	}

	interface Props {
		rows: LeaderRow[];
		/** Total line width in monospace characters */
		width?: number;
		class?: string;
	}

	let { rows, width = 34, class: className = '' }: Props = $props();
</script>

<!-- SMUI dot leaders: LABEL ....... VALUE — works because everything is monospace -->
<div class="text-ui leading-[1.9] select-none {className}">
	{#each rows as row (row.label)}
		{@const dots = Math.max(3, width - row.label.length - row.value.length)}
		<div class="flex whitespace-pre">
			<span class="tracking-wider text-text-tertiary uppercase">{row.label}</span>
			<span class="flex-1 overflow-hidden text-text-tertiary/40">{'.'.repeat(dots)}</span>
			<span class="tabular-nums {toneTextClass[row.tone ?? 'primary']}">{row.value}</span>
		</div>
	{/each}
</div>
