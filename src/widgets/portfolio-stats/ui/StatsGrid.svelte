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

	// Spotlight effect handler
	function handleMouseMove(e: MouseEvent) {
		const card = e.currentTarget as HTMLElement;
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		card.style.setProperty('--spotlight-x', `${x}px`);
		card.style.setProperty('--spotlight-y', `${y}px`);
	}
</script>

<div class="grid grid-cols-2 gap-4 md:grid-cols-4 {className}">
	<!-- Repos -->
	<div
		class="spotlight-card group rounded-xl border border-border-default bg-bg-secondary p-5 transition-colors duration-300 hover:border-border-highlight"
		onmousemove={handleMouseMove}
		role="presentation"
	>
		<div class="relative z-20 flex flex-col gap-1">
			<div class="mb-2 flex items-center gap-2 text-text-tertiary">
				<iconify-icon icon="solar:box-linear" width="20"></iconify-icon>
				<span class="text-xs font-medium uppercase tracking-wider">Repos</span>
			</div>
			<span class="text-3xl font-medium tracking-tight text-white transition-colors group-hover:text-accent-green">
				{formatNumber(profile.stats.totalRepos)}
			</span>
		</div>
	</div>

	<!-- Stars -->
	<div
		class="spotlight-card group rounded-xl border border-border-default bg-bg-secondary p-5 transition-colors duration-300 hover:border-border-highlight"
		onmousemove={handleMouseMove}
		role="presentation"
	>
		<div class="relative z-20 flex flex-col gap-1">
			<div class="mb-2 flex items-center gap-2 text-text-tertiary">
				<iconify-icon icon="solar:star-linear" width="20"></iconify-icon>
				<span class="text-xs font-medium uppercase tracking-wider">Stars</span>
			</div>
			{#if showStarsFilter}
				<button
					onclick={toggleStarsType}
					class="text-left text-3xl font-medium tracking-tight text-white transition-colors group-hover:text-amber-400"
					title="Click to toggle between own and all stars"
				>
					{formatNumber(displayStars)}
				</button>
			{:else}
				<span class="text-3xl font-medium tracking-tight text-white transition-colors group-hover:text-amber-400">
					{formatNumber(displayStars)}
				</span>
			{/if}
		</div>
	</div>

	<!-- Community (Followers) -->
	<div
		class="spotlight-card group rounded-xl border border-border-default bg-bg-secondary p-5 transition-colors duration-300 hover:border-border-highlight"
		onmousemove={handleMouseMove}
		role="presentation"
	>
		<div class="relative z-20 flex flex-col gap-1">
			<div class="mb-2 flex items-center gap-2 text-text-tertiary">
				<iconify-icon icon="solar:users-group-rounded-linear" width="20"></iconify-icon>
				<span class="text-xs font-medium uppercase tracking-wider">Community</span>
			</div>
			<span class="text-3xl font-medium tracking-tight text-white transition-colors group-hover:text-blue-400">
				{formatNumber(profile.stats.followers)}
			</span>
		</div>
	</div>

	<!-- Years Active -->
	<div
		class="spotlight-card group rounded-xl border border-border-default bg-bg-secondary p-5 transition-colors duration-300 hover:border-border-highlight"
		onmousemove={handleMouseMove}
		role="presentation"
	>
		<div class="relative z-20 flex flex-col gap-1">
			<div class="mb-2 flex items-center gap-2 text-text-tertiary">
				<iconify-icon icon="solar:clock-circle-linear" width="20"></iconify-icon>
				<span class="text-xs font-medium uppercase tracking-wider">Years Exp</span>
			</div>
			<span class="text-3xl font-medium tracking-tight text-white transition-colors group-hover:text-purple-400">
				{formatNumber(profile.stats.yearsActive)}
			</span>
		</div>
	</div>
</div>
