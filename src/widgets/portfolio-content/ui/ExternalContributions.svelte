<script lang="ts">
	import type { ExternalContribution } from '$entities/github/model/types';
	import { formatNumber } from '$shared/lib/github-transform';

	interface Props {
		contributions: ExternalContribution[];
		totalPRs: number;
		totalCommits: number;
		class?: string;
	}

	let { contributions, totalPRs, totalCommits, class: className = '' }: Props = $props();

	// Show top 4 contributions (2x2 grid like Notable Projects)
	const topContributions = $derived(contributions.slice(0, 4));
</script>

<section class="animate-slide-up {className}" style="animation-delay: 250ms;">
	<!-- Header -->
	<div class="mb-6 flex items-center justify-between">
		<div class="flex items-center gap-2">
			<iconify-icon icon="solar:global-linear" width="20" class="text-text-tertiary"></iconify-icon>
			<h2 class="text-lg font-medium tracking-tight text-text-primary">
				Open Source Contributions
			</h2>
		</div>
		<div class="flex items-center gap-3 text-xs text-text-tertiary">
			<span class="flex shrink-0 items-center gap-1 whitespace-nowrap">
				<iconify-icon icon="solar:git-pull-request-linear" width="16" class="text-accent-green"
				></iconify-icon>
				{formatNumber(totalPRs)} PRs
			</span>
			<span class="flex shrink-0 items-center gap-1 whitespace-nowrap">
				<iconify-icon icon="solar:git-commit-linear" width="16" class="text-accent-purple"
				></iconify-icon>
				{formatNumber(totalCommits)} commits
			</span>
		</div>
	</div>

	<!-- Contributions Grid -->
	<div class="grid gap-4 sm:grid-cols-2">
		{#each topContributions as contrib (contrib.repoName)}
			<a
				href="https://github.com/{contrib.repoName}"
				target="_blank"
				rel="noopener noreferrer"
				data-sveltekit-preload-data="off"
				class="card-glow group block border border-border-default bg-bg-secondary p-5 transition-colors duration-200 hover:border-border-highlight"
			>
				<div>
					<!-- Header -->
					<div class="mb-3 flex items-start justify-between">
						<h3
							class="font-medium text-text-primary transition-colors group-hover:text-accent-blue"
						>
							{contrib.repoName.split('/')[1]}
						</h3>
						<iconify-icon
							icon="solar:arrow-right-up-linear"
							width="16"
							class="text-text-tertiary transition-colors group-hover:text-text-primary"
						></iconify-icon>
					</div>

					<!-- Description -->
					<p
						class="mb-4 h-10 text-sm text-text-secondary transition-colors group-hover:text-text-secondary/90"
					>
						Contributed to <span class="text-text-primary">{contrib.owner}</span>
					</p>

					<!-- Stats -->
					<div class="flex items-center gap-4 text-xs text-text-tertiary">
						{#if contrib.language}
							<div class="flex items-center gap-1.5">
								<span
									class="h-2 w-2 rounded-full"
									style="background-color: {contrib.language.color}"
								></span>
								{contrib.language.name}
							</div>
						{/if}
						{#if contrib.prCount > 0}
							<div class="flex items-center gap-1">
								<iconify-icon
									icon="solar:git-pull-request-linear"
									width="16"
									class="text-accent-green"
								></iconify-icon>
								<span>{contrib.prCount}</span>
							</div>
						{/if}
						{#if contrib.stargazerCount > 0}
							<div class="flex items-center gap-1">
								<iconify-icon icon="solar:star-linear" width="16"></iconify-icon>
								<span>{formatNumber(contrib.stargazerCount)}</span>
							</div>
						{/if}
					</div>
				</div>
			</a>
		{/each}
	</div>
</section>
