<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'default' | 'outline' | 'solid';
		color?: string;
		size?: 'sm' | 'md';
		class?: string;
		children: Snippet;
	}

	let {
		variant = 'default',
		color,
		size = 'md',
		class: className = '',
		children
	}: Props = $props();

	const sizeClasses = {
		sm: 'px-1.5 py-px text-label',
		md: 'px-1.5 py-0.5 text-label'
	};

	const baseClasses = $derived(
		`inline-flex items-center font-normal whitespace-nowrap uppercase tracking-wider transition-colors border ${sizeClasses[size]}`
	);

	// Generate style if custom color is given (e.g. language colors)
	const style = $derived(
		color
			? variant === 'solid'
				? `background-color: ${color}; color: #1a1e24; border-color: ${color};`
				: `color: ${color}; border-color: ${color}4d; background-color: ${color}0f;`
			: ''
	);
</script>

{#if variant === 'default'}
	<span
		class="{baseClasses} border-[var(--color-border-default)] bg-[var(--color-bg-tertiary)]/50 text-[var(--color-text-secondary)] {className}"
		{style}
	>
		{@render children()}
	</span>
{:else if variant === 'outline'}
	<span
		class="{baseClasses} border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-highlight)] hover:text-[var(--color-text-primary)] {className}"
		{style}
	>
		{@render children()}
	</span>
{:else}
	<span
		class="{baseClasses} border-transparent bg-[var(--color-accent-blue)] text-[var(--color-btn-primary-text)] {className}"
		{style}
	>
		{@render children()}
	</span>
{/if}
