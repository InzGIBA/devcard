<script lang="ts">
	import type { LanguageStats } from '$entities/github/model/types';
	import RetroProgress from '$shared/ui/RetroProgress.svelte';

	interface Props {
		languages: LanguageStats[];
		bio?: string | null;
		class?: string;
	}

	let { languages, bio: _bio, class: className = '' }: Props = $props();

	// Top languages shown as SMUI retro progress bars
	const topLanguages = $derived(languages.slice(0, 5));

	// Convert hex to RGB for dynamic styling
	function hexToRgb(hex: string): string {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		if (result) {
			return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
		}
		return '136, 192, 208'; // fallback to frost blue
	}
</script>

<div class="card-glow h-full border border-border-default bg-bg-secondary p-5 {className}">
	<h3 class="mb-4 text-xs font-normal tracking-[1.5px] text-text-tertiary uppercase">Core Stack</h3>
	<div class="flex flex-wrap gap-2">
		{#each languages.slice(0, 8) as lang (lang.name)}
			{@const rgb = hexToRgb(lang.color)}
			<span
				class="inline-flex cursor-default items-center gap-1.5 border px-2 py-0.5 text-label tracking-wider uppercase transition-colors"
				style="
					border-color: rgba({rgb}, 0.3);
					background-color: rgba({rgb}, 0.08);
					color: {lang.color};
				"
			>
				<span
					class="inline-block h-[5px] w-[5px] rounded-full"
					style="background-color: {lang.color};"
				></span>
				{lang.name}
			</span>
		{/each}
	</div>

	<!-- SMUI retro progress bars: language share -->
	{#if topLanguages.length > 0}
		<div class="mt-4 space-y-1.5 border-t border-border-muted pt-4">
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
	{/if}
</div>
