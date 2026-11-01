<script lang="ts">
	import type { GitHubProfile } from '$entities/github/model/types';
	import { formatNumber } from '$shared/lib/github-transform';

	interface Props {
		profile: GitHubProfile;
		class?: string;
		showStarsFilter?: boolean;
	}

	let { profile, class: className = '', showStarsFilter = true }: Props = $props();

	// Client-side filter for stars display
	let repoType = $state<'all' | 'original'>('all');

	// Show different stars based on filter
	const displayStars = $derived(
		repoType === 'original' ? profile.stats.originalStars : profile.stats.totalStars
	);

	function toggleStarsType() {
		repoType = repoType === 'original' ? 'all' : 'original';
	}
</script>

<div class="grid grid-cols-2 gap-4 md:grid-cols-4 {className}">
	<!-- Repos -->
	<div
		class="card-glow group border border-border-default bg-bg-secondary p-5 transition-colors hover:border-border-highlight"
	>
		<div class="flex flex-col gap-1">
			<div class="mb-2 flex items-center gap-2 text-text-tertiary">
				<iconify-icon icon="solar:box-linear" width="20"></iconify-icon>
				<span class="text-label font-normal tracking-[1.5px] uppercase">Repos</span>
			</div>
			<span
				class="text-stat font-medium tracking-tight text-text-primary transition-colors group-hover:text-accent-green"
			>
				{formatNumber(profile.stats.totalRepos)}
			</span>
		</div>
	</div>

	<!-- Stars -->
	<div
		class="card-glow group border border-border-default bg-bg-secondary p-5 transition-colors hover:border-border-highlight"
	>
		<div class="flex flex-col gap-1">
			<div class="mb-2 flex items-center gap-2 text-text-tertiary">
				<iconify-icon icon="solar:star-linear" width="20"></iconify-icon>
				<span class="text-label font-normal tracking-[1.5px] uppercase">Stars</span>
			</div>
			{#if showStarsFilter}
				<button
					onclick={toggleStarsType}
					class="text-left text-stat font-medium tracking-tight text-text-primary transition-colors group-hover:text-accent-yellow"
					title="Click to toggle between own and all stars"
				>
					{formatNumber(displayStars)}
				</button>
			{:else}
				<span
					class="text-stat font-medium tracking-tight text-text-primary transition-colors group-hover:text-accent-yellow"
				>
					{formatNumber(displayStars)}
				</span>
			{/if}
		</div>
	</div>

	<!-- Community (Followers) -->
	<div
		class="card-glow group border border-border-default bg-bg-secondary p-5 transition-colors hover:border-border-highlight"
	>
		<div class="flex flex-col gap-1">
			<div class="mb-2 flex items-center gap-2 text-text-tertiary">
				<iconify-icon icon="solar:users-group-rounded-linear" width="20"></iconify-icon>
				<span class="text-label font-normal tracking-[1.5px] uppercase">Community</span>
			</div>
			<span
				class="text-stat font-medium tracking-tight text-text-primary transition-colors group-hover:text-accent-blue"
			>
				{formatNumber(profile.stats.followers)}
			</span>
		</div>
	</div>

	<!-- Years Active -->
	<div
		class="card-glow group border border-border-default bg-bg-secondary p-5 transition-colors hover:border-border-highlight"
	>
		<div class="flex flex-col gap-1">
			<div class="mb-2 flex items-center gap-2 text-text-tertiary">
				<iconify-icon icon="solar:clock-circle-linear" width="20"></iconify-icon>
				<span class="text-label font-normal tracking-[1.5px] uppercase">Years Exp</span>
			</div>
			<span
				class="text-stat font-medium tracking-tight text-text-primary transition-colors group-hover:text-accent-purple"
			>
				{formatNumber(profile.stats.yearsActive)}
			</span>
		</div>
	</div>
</div>
