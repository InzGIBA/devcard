<script lang="ts">
	import type { LanguageStats } from '$entities/github/model/types';

	interface Props {
		languages: LanguageStats[];
		class?: string;
	}

	let { languages, class: className = '' }: Props = $props();

	// Take top languages for the chart
	const topLanguages = $derived(languages.slice(0, 5));

	// Spotlight effect handler
	function handleMouseMove(e: MouseEvent) {
		const card = e.currentTarget as HTMLElement;
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		card.style.setProperty('--spotlight-x', `${x}px`);
		card.style.setProperty('--spotlight-y', `${y}px`);
	}

	// Convert hex to RGB for dynamic styling
	function hexToRgb(hex: string): string {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		if (result) {
			return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
		}
		return '16, 185, 129';
	}
</script>

<div
	class="spotlight-card flex h-full flex-col rounded-xl border border-border-default bg-bg-secondary p-5 {className}"
	onmousemove={handleMouseMove}
	role="presentation"
>
	<h3 class="relative z-20 mb-4 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
		Distribution
	</h3>

	{#if topLanguages.length > 0}
		<div class="relative z-20 space-y-3 flex-1 flex flex-col justify-center">
			{#each topLanguages.slice(0, 2) as lang (lang.name)}
				{@const rgb = hexToRgb(lang.color)}
				<div>
					<div class="flex items-center justify-between text-xs">
						<div class="flex items-center gap-2 text-text-primary">
							<div
								class="h-2 w-2 rounded-full"
								style="background-color: {lang.color}; box-shadow: 0 0 6px rgba({rgb}, 0.6);"
							></div>
							{lang.name}
						</div>
						<span class="font-mono text-text-tertiary">{lang.percentage}%</span>
					</div>
					<div class="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-bg-tertiary">
						<div
							class="h-full rounded-full"
							style="width: {lang.percentage}%; background-color: {lang.color}; box-shadow: 0 0 10px rgba({rgb}, 0.4);"
						></div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="relative z-20 flex w-full items-center justify-center py-4 text-sm text-text-tertiary">
			No language data available
		</div>
	{/if}
</div>
