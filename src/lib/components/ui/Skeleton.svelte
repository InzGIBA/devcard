<script lang="ts">
	interface Props {
		variant?: 'text' | 'circular' | 'rectangular';
		width?: string;
		height?: string;
		class?: string;
	}

	let {
		variant = 'text',
		width,
		height,
		class: className = ''
	}: Props = $props();

	const variantClasses = {
		text: 'h-4 w-full rounded',
		circular: 'rounded-full',
		rectangular: 'rounded-[var(--radius-md)]'
	};
</script>

<div
	class="animate-pulse bg-[var(--color-bg-tertiary)] {variantClasses[variant]} {className}"
	style="{width ? `width: ${width};` : ''} {height ? `height: ${height};` : ''}"
></div>
