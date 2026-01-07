<script lang="ts">
	import type { GitHubProfile } from '$lib/types/github';
	import { formatNumber, getTotalContributions } from '$lib/utils/github-transform';
	import Card from '$lib/components/ui/Card.svelte';

	interface Props {
		profile: GitHubProfile;
		class?: string;
	}

	let { profile, class: className = '' }: Props = $props();

	const totalContributions = $derived(getTotalContributions(profile));

	const stats = $derived([
		{
			label: 'Total Repos',
			value: profile.stats.totalRepos,
			icon: `<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>`
		},
		{
			label: 'Total Stars',
			value: profile.stats.totalStars,
			icon: `<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>`
		},
		{
			label: 'Followers',
			value: profile.stats.followers,
			icon: `<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>`
		},
		{
			label: 'Years Active',
			value: profile.stats.yearsActive,
			icon: `<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
		}
	]);
</script>

<div class="grid grid-cols-2 gap-4 lg:grid-cols-4 {className}">
	{#each stats as stat}
		<Card variant="default" padding="md">
			<div class="flex flex-col items-center text-center">
				<div class="mb-2 text-[var(--color-text-tertiary)]">
					{@html stat.icon}
				</div>
				<div class="text-3xl font-bold text-[var(--color-text-primary)]">
					{formatNumber(stat.value)}
				</div>
				<div class="text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
					{stat.label}
				</div>
			</div>
		</Card>
	{/each}
</div>

{#if totalContributions > 0}
	<div class="mt-4 text-center text-sm text-[var(--color-text-secondary)]">
		<span class="font-semibold text-[var(--color-accent-green)]">
			{formatNumber(totalContributions)}
		</span>
		contributions in the last year
	</div>
{/if}
