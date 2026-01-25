<script lang="ts">
	import type { GitHubRepository } from '$entities/github/model/types';
	import { formatNumber } from '$shared/lib/github-transform';

	interface Props {
		repo: GitHubRepository;
		class?: string;
	}

	let { repo, class: className = '' }: Props = $props();

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

<a
	href={repo.url}
	target="_blank"
	rel="noopener noreferrer"
	data-sveltekit-preload-data="off"
	class="spotlight-card group block rounded-xl border border-border-default bg-bg-secondary p-5 transition-all duration-200 hover:border-border-highlight {className}"
	onmousemove={handleMouseMove}
>
	<div class="relative z-20">
		<!-- Header -->
		<div class="mb-3 flex items-start justify-between">
			<h3 class="font-medium text-white transition-colors group-hover:text-accent-green">
				{repo.name}
			</h3>
			<iconify-icon icon="solar:arrow-right-up-linear" width="16" class="text-text-tertiary transition-colors group-hover:text-white"></iconify-icon>
		</div>

		<!-- Description -->
		{#if repo.description}
			<p class="mb-4 line-clamp-2 h-10 text-sm text-text-secondary transition-colors group-hover:text-text-secondary/90">
				{repo.description}
			</p>
		{:else}
			<p class="mb-4 h-10 text-sm italic text-text-tertiary">
				No description available.
			</p>
		{/if}

		<!-- Stats -->
		<div class="flex items-center gap-4 text-xs text-text-tertiary">
			{#if repo.primaryLanguage}
				<div class="flex items-center gap-1.5">
					<span
						class="h-2 w-2 rounded-full"
						style="background-color: {repo.primaryLanguage.color}"
					></span>
					{repo.primaryLanguage.name}
				</div>
			{/if}
			{#if repo.stargazerCount > 0}
				<div class="flex items-center gap-1">
					<iconify-icon icon="solar:star-linear" width="16"></iconify-icon>
					{formatNumber(repo.stargazerCount)}
				</div>
			{/if}
		</div>
	</div>
</a>
