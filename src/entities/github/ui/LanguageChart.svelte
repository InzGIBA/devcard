<script lang="ts">
	import type { LanguageStats } from '$entities/github/model/types';
	import RetroProgress from '$shared/ui/RetroProgress.svelte';

	interface Props {
		languages: LanguageStats[];
		class?: string;
	}

	let { languages, class: className = '' }: Props = $props();

	// Take top languages for the chart
	const topLanguages = $derived(languages.slice(0, 5));
</script>

<div
	class="card-glow flex h-full flex-col border border-border-default bg-bg-secondary p-5 {className}"
>
	<h3 class="mb-4 text-xs font-normal tracking-[1.5px] text-text-tertiary uppercase">
		Distribution
	</h3>

	{#if topLanguages.length > 0}
		<!-- SMUI retro progress bars: language share -->
		<div class="flex flex-1 flex-col justify-center gap-1.5">
			{#each topLanguages as lang (lang.name)}
				<div class="flex items-center gap-2">
					<span
						class="w-20 shrink-0 truncate text-label tracking-wider text-text-tertiary uppercase"
						title={lang.name}
					>
						{lang.name}
					</span>
					<RetroProgress
						value={lang.percentage}
						width={14}
						showPercent={false}
						color={lang.color}
						class="flex-1"
					/>
					<span class="w-11 shrink-0 text-right text-label text-text-secondary tabular-nums">
						{lang.percentage.toFixed(1)}%
					</span>
				</div>
			{/each}
		</div>
	{:else}
		<div class="flex w-full items-center justify-center py-4 text-sm text-text-tertiary">
			No language data available
		</div>
	{/if}
</div>
