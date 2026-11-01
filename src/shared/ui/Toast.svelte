<script lang="ts">
	import type { ToastType } from '$entities/portfolio/model/types';

	interface Props {
		type?: ToastType;
		message: string;
		visible?: boolean;
		onclose?: () => void;
	}

	let { type = 'info', message, visible = true, onclose }: Props = $props();

	// SMUI terminal toast: log-style [OK]/[ERR] prefixes with aurora tones
	const kinds: Record<ToastType, { tag: string; cls: string }> = {
		success: { tag: 'OK', cls: 'text-accent-green' },
		error: { tag: 'ERR', cls: 'text-accent-red' },
		warning: { tag: 'WARN', cls: 'text-accent-yellow' },
		info: { tag: 'INFO', cls: 'text-accent-blue' }
	};
</script>

{#if visible}
	<div
		class="flex w-70 items-start gap-2 border border-border-default bg-bg-secondary px-2.5 py-2 text-ui"
		role="alert"
	>
		<span class="shrink-0 {kinds[type].cls}">[{kinds[type].tag}]</span>
		<span class="flex-1 break-words text-text-primary">{message}</span>
		{#if onclose}
			<button
				type="button"
				class="shrink-0 cursor-pointer text-text-tertiary transition-colors hover:text-text-primary"
				onclick={onclose}
				aria-label="Dismiss notification"
			>
				&times;
			</button>
		{/if}
	</div>
{/if}
