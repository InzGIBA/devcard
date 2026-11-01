<script lang="ts">
	export interface TickerItem {
		symbol: string;
		value: string;
		/** Optional change indicator, in percent */
		delta?: number;
	}

	interface Props {
		items: TickerItem[];
		label?: string;
		class?: string;
	}

	let { items, label = 'feed', class: className = '' }: Props = $props();

	// Repeat items so each marquee half is comfortably wider than the
	// container — the animation translates by -50% and needs seamless halves.
	const reps = $derived(Math.max(2, Math.ceil(14 / Math.max(1, items.length))));
	const half = $derived(Array.from({ length: reps }, () => items).flat());
</script>

<!-- SMUI ticker tape: content duplicated and translated with a CSS marquee; hover pauses -->
<div
	class="flex items-center overflow-hidden border border-border-default bg-bg-secondary px-2.5 py-1.5 {className}"
>
	<span
		class="mr-2.5 shrink-0 border-r border-border-default pr-2 text-label tracking-wider text-accent-blue uppercase"
	>
		{label}
	</span>
	<div class="flex-1 overflow-hidden">
		<div class="ticker-marquee flex w-max text-ui whitespace-nowrap">
			{#each [0, 1] as halfCopy (halfCopy)}
				{#each half as item, i (`${halfCopy}-${i}-${item.symbol}`)}
					<span class="flex shrink-0 items-center gap-1.5">
						<span class="tracking-wider text-text-tertiary uppercase">{item.symbol}</span>
						<span class="text-text-primary tabular-nums">{item.value}</span>
						{#if item.delta !== undefined}
							<span
								class="tabular-nums {item.delta >= 0 ? 'text-accent-green' : 'text-accent-red'}"
							>
								{item.delta >= 0 ? '+' : ''}{item.delta.toFixed(1)}%
							</span>
						{/if}
						<span class="px-2 text-text-tertiary/40">/</span>
					</span>
				{/each}
			{/each}
		</div>
	</div>
</div>
