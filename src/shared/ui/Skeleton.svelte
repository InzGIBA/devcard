<script lang="ts">
	interface Props {
		variant?: 'text' | 'circular' | 'rectangular';
		width?: string;
		height?: string;
		class?: string;
	}

	let { variant = 'text', width, height, class: className = '' }: Props = $props();

	const variantClasses = {
		text: 'h-4 w-full',
		circular: 'rounded-full',
		rectangular: ''
	};
</script>

<div
	class="skeleton-shimmer {variantClasses[variant]} {className}"
	style="{width ? `width: ${width};` : ''} {height ? `height: ${height};` : ''}"
></div>

<style>
	/* SMUI skeleton shimmer across the surface hierarchy */
	.skeleton-shimmer {
		background: linear-gradient(
			90deg,
			hsl(var(--smui-surface-2)) 25%,
			hsl(var(--smui-surface-3)) 50%,
			hsl(var(--smui-surface-2)) 75%
		);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
	}

	@keyframes shimmer {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}
</style>
