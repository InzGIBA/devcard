<script lang="ts">
	import type { LanguageStats } from '$entities/github/model/types';

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
		<div class="flex flex-1 flex-col justify-center space-y-3">
			{#each topLanguages.slice(0, 2) as lang (lang.name)}
				<div>
					<div class="flex items-center justify-between text-xs">
						<div class="flex items-center gap-2 text-text-primary">
							<span
								class="inline-block h-[5px] w-[5px] rounded-full"
								style="background-color: {lang.color}"
							></span>
							{lang.name}
						</div>
						<span class="text-text-tertiary">{lang.percentage}%</span>
					</div>
					<div class="mt-1.5 h-1.5 w-full bg-bg-tertiary">
						<div
							class="h-full"
							style="width: {lang.percentage}%; background-color: {lang.color};"
						></div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="flex w-full items-center justify-center py-4 text-sm text-text-tertiary">
			No language data available
		</div>
	{/if}
</div>
