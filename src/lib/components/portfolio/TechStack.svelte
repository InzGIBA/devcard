<script lang="ts">
	import type { LanguageStats } from '$lib/types/github';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Card from '$lib/components/ui/Card.svelte';

	interface Props {
		languages: LanguageStats[];
		bio?: string | null;
		class?: string;
	}

	let { languages, bio, class: className = '' }: Props = $props();

	// Categorize technologies
	const categories = $derived(() => {
		const result: Record<string, LanguageStats[]> = {
			Languages: [],
			Frameworks: [],
			Tools: []
		};

		// This is simplified - in real app you might want more sophisticated categorization
		const frameworkKeywords = ['React', 'Vue', 'Svelte', 'Angular', 'Next', 'Nuxt'];
		const toolKeywords = ['Docker', 'Kubernetes', 'Terraform', 'Shell'];

		for (const lang of languages) {
			if (frameworkKeywords.some((kw) => lang.name.includes(kw))) {
				result.Frameworks.push(lang);
			} else if (toolKeywords.some((kw) => lang.name.includes(kw))) {
				result.Tools.push(lang);
			} else {
				result.Languages.push(lang);
			}
		}

		return result;
	});
</script>

<Card variant="default" padding="md" class={className}>
	{#if bio}
		<div class="mb-4">
			<p class="text-sm leading-relaxed text-text-secondary">
				{bio}
			</p>
		</div>
	{/if}

	<div class="space-y-4">
		<h3 class="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
			Core Technologies
		</h3>
		<div class="flex flex-wrap gap-2">
			{#each languages.slice(0, 8) as lang}
				<Badge variant="outline" color={lang.color}>
					<span
						class="mr-1.5 inline-block h-2 w-2 rounded-full"
						style="background-color: {lang.color}"
					></span>
					{lang.name}
				</Badge>
			{/each}
		</div>
	</div>
</Card>
