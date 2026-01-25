<script lang="ts">
	import type { LanguageStats } from '$entities/github/model/types';

	interface Props {
		languages: LanguageStats[];
		bio?: string | null;
		class?: string;
	}

	let { languages, bio, class: className = '' }: Props = $props();

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
		return '16, 185, 129'; // fallback to emerald
	}
</script>

<div
	class="spotlight-card h-full rounded-xl border border-border-default bg-bg-secondary p-5 {className}"
	onmousemove={handleMouseMove}
	role="presentation"
>
	<h3 class="relative z-20 mb-4 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
		Core Stack
	</h3>
	<div class="relative z-20 flex flex-wrap gap-2">
		{#each languages.slice(0, 8) as lang (lang.name)}
			{@const rgb = hexToRgb(lang.color)}
			<span
				class="inline-flex cursor-default items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors"
				style="
					border-color: rgba({rgb}, 0.3);
					background-color: rgba({rgb}, 0.1);
					color: {lang.color};
				"
			>
				<span
					class="h-1.5 w-1.5 rounded-full"
					style="background-color: {lang.color}; box-shadow: 0 0 8px rgba({rgb}, 0.5);"
				></span>
				{lang.name}
			</span>
		{/each}
	</div>
</div>
