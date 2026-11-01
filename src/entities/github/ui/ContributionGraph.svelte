<script lang="ts">
	import type { GitHubProfile } from '$entities/github/model/types';
	import { formatNumber } from '$shared/lib/github-transform';

	interface Props {
		profile: GitHubProfile;
		class?: string;
	}

	let { profile, class: className = '' }: Props = $props();

	const calendar = $derived(profile.contributions?.contributionCalendar);
	const totalContributions = $derived(calendar?.totalContributions ?? 0);

	// Get the last 52 weeks of contributions
	const weeks = $derived(calendar?.weeks.slice(-52) ?? []);

	// Flatten all days for grid display
	const allDays = $derived(weeks.flatMap((week) => week.contributionDays));

	// Tooltip state
	let tooltip = $state<{ text: string; x: number; y: number } | null>(null);

	function showTooltip(e: MouseEvent, count: number) {
		const rect = (e.target as HTMLElement).getBoundingClientRect();
		tooltip = {
			text: `${count} commits`,
			x: rect.left + rect.width / 2,
			y: rect.top
		};
	}

	function hideTooltip() {
		tooltip = null;
	}

	// Get contribution level (0-4) based on count
	function getContributionLevel(count: number): number {
		if (count === 0) return 0;
		if (count <= 3) return 1;
		if (count <= 6) return 2;
		if (count <= 9) return 3;
		return 4;
	}

	// Get color class based on level — SMUI frost scale
	function getContributionColorClass(level: number): string {
		const colors = [
			'bg-bg-tertiary',
			'bg-smui-frost-4',
			'bg-smui-frost-3',
			'bg-smui-frost-2',
			'bg-smui-frost-1'
		];
		return colors[level] || colors[0];
	}
</script>

<!-- Tooltip portal -->
{#if tooltip}
	<div
		class="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full border border-border-default bg-bg-secondary px-2 py-1 text-xs whitespace-nowrap text-text-primary"
		style="left: {tooltip.x}px; top: {tooltip.y - 6}px;"
	>
		{tooltip.text}
	</div>
{/if}

<section class="animate-slide-up {className}" style="animation-delay: 100ms;">
	<div class="mb-4 flex items-center justify-between">
		<h2 class="flex items-center gap-2 text-heading font-medium tracking-tight text-text-primary">
			<iconify-icon icon="solar:graph-new-linear" class="text-tertiary"></iconify-icon>
			Contributions
		</h2>
		<span
			class="border border-border-default bg-bg-tertiary px-2 py-1 text-xs font-medium text-text-tertiary"
		>
			{formatNumber(totalContributions)} in last year
		</span>
	</div>

	<div class="group relative border border-border-default bg-bg-secondary p-1">
		<div class="overflow-x-auto">
			<!-- Fade overlay for overflow hint -->
			<div
				class="pointer-events-none absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-[var(--color-bg-secondary)] to-transparent lg:hidden"
			></div>

			{#if calendar}
				<div class="min-w-[700px] p-2">
					<div class="contribution-grid h-[120px] w-full">
						{#each allDays as day (day.date)}
							{@const level = getContributionLevel(day.contributionCount)}
							<div
								class="cursor-pointer transition-transform duration-200 hover:z-10 hover:scale-125 {getContributionColorClass(
									level
								)}"
								style="width: 100%; height: 100%;"
								onmouseenter={(e) => showTooltip(e, day.contributionCount)}
								onmouseleave={hideTooltip}
								role="gridcell"
							></div>
						{/each}
					</div>
				</div>
			{:else}
				<div class="flex h-32 items-center justify-center text-sm text-text-tertiary">
					<div class="text-center">
						<iconify-icon icon="solar:graph-new-linear" width="32" class="mx-auto mb-2"
						></iconify-icon>
						<p>Contribution data not available</p>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	.contribution-grid {
		display: grid;
		grid-template-rows: repeat(7, 1fr);
		grid-auto-flow: column;
		gap: 3px;
	}
</style>
