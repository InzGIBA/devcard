<script lang="ts">
	import type { ToastType } from '$entities/portfolio/model/types';

	interface Props {
		type?: ToastType;
		message: string;
		visible?: boolean;
		onclose?: () => void;
	}

	let { type = 'info', message, visible = true, onclose }: Props = $props();

	// SMUI: flat panel with a colored status accent per aurora color
	const typeClasses = {
		success:
			'bg-[var(--color-bg-secondary)] border border-[var(--color-border-default)] border-l-2 border-l-[var(--color-accent-green)] text-[var(--color-text-primary)]',
		error:
			'bg-[var(--color-bg-secondary)] border border-[var(--color-border-default)] border-l-2 border-l-[var(--color-accent-red)] text-[var(--color-text-primary)]',
		warning:
			'bg-[var(--color-bg-secondary)] border border-[var(--color-border-default)] border-l-2 border-l-[var(--color-accent-yellow)] text-[var(--color-text-primary)]',
		info: 'bg-[var(--color-bg-secondary)] border border-[var(--color-border-default)] border-l-2 border-l-[var(--color-accent-blue)] text-[var(--color-text-primary)]'
	};

	const icons = {
		success: `<svg class="h-4 w-4 text-[var(--color-accent-green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`,
		error: `<svg class="h-4 w-4 text-[var(--color-accent-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>`,
		warning: `<svg class="h-4 w-4 text-[var(--color-accent-yellow)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>`,
		info: `<svg class="h-4 w-4 text-[var(--color-accent-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
	};
</script>

{#if visible}
	<div
		class="
			flex items-center gap-3 px-4 py-3
			{typeClasses[type]}
		"
		role="alert"
	>
		<div class="flex-shrink-0">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html icons[type]}
		</div>
		<p class="flex-1 text-sm">{message}</p>
		{#if onclose}
			<button
				type="button"
				class="ml-2 p-1 text-[var(--color-text-tertiary)] transition-colors hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]"
				onclick={onclose}
				aria-label="Dismiss notification"
			>
				<svg
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		{/if}
	</div>
{/if}
