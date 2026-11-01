<script lang="ts">
	import { asciiBar, toneTextClass, type Tone } from '$shared/lib/ascii';

	interface Props {
		value: number;
		width?: number;
		tone?: Tone;
		/** Inline color override (e.g. a language color) — takes precedence over tone */
		color?: string;
		active?: boolean;
		showPercent?: boolean;
		class?: string;
	}

	let {
		value,
		width = 20,
		tone = 'primary',
		color,
		active = false,
		showPercent = true,
		class: className = ''
	}: Props = $props();

	const clamped = $derived(Math.min(100, Math.max(0, value)));
	const bar = $derived(asciiBar(clamped, width));
</script>

<div
	class="flex items-center gap-1.5 text-ui whitespace-pre {className}"
	role="progressbar"
	aria-valuenow={Math.round(clamped)}
	aria-valuemin={0}
	aria-valuemax={100}
>
	<span class="text-text-tertiary">[</span>
	<span
		class="whitespace-pre {color ? '' : toneTextClass[tone]}"
		style={color ? `color: ${color};` : ''}
	>
		{bar}
	</span>
	<span class="text-text-tertiary">]</span>
	{#if active}
		<span class="cursor-blink text-accent-blue">█</span>
	{/if}
	{#if showPercent}
		<span class="w-9.5 text-right text-text-primary tabular-nums">{Math.round(clamped)}%</span>
	{/if}
</div>
