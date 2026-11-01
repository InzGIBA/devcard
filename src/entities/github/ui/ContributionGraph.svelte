<script lang="ts">
	import type { GitHubProfile } from '$entities/github/model/types';
	import { formatNumber } from '$shared/lib/github-transform';
	import AsciiSparkline from '$shared/ui/AsciiSparkline.svelte';

	interface Props {
		profile: GitHubProfile;
		class?: string;
	}

	let { profile, class: className = '' }: Props = $props();

	const calendar = $derived(profile.contributions?.contributionCalendar);
	const totalContributions = $derived(calendar?.totalContributions ?? 0);

	// Get the last 52 weeks of contributions
	const weeks = $derived(calendar?.weeks.slice(-52) ?? []);

	// The first and last weeks of the window are often partial (the calendar
	// only contains real days). Pad them so every column renders 7 cells and
	// the grid stays a solid rectangle.
	const normalizedWeeks = $derived(
		weeks.map((week) => {
			const days = week.contributionDays;
			const startsOnSunday = !days[0] || new Date(`${days[0].date}T00:00:00Z`).getUTCDay() === 0;
			const missing = 7 - days.length;
			return {
				days,
				padTop: missing > 0 && !startsOnSunday ? missing : 0,
				padBottom: missing > 0 && startsOnSunday ? missing : 0
			};
		})
	);

	// Last 30 days for the header sparkline
	const last30 = $derived(
		weeks
			.flatMap((week) => week.contributionDays)
			.slice(-30)
			.map((day) => day.contributionCount)
	);

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

	// SMUI heatmap: five-step primary ramp. Zero days get a subtle border so
	// they read as cells instead of holes in the grid.
	const LEVEL_CLASSES = [
		'bg-bg-tertiary border-border-muted',
		'bg-accent-blue/25 border-transparent',
		'bg-accent-blue/45 border-transparent',
		'bg-accent-blue/70 border-transparent',
		'bg-accent-blue border-transparent'
	];
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
		<div class="flex items-center gap-3">
			<span
				class="hidden items-center gap-2 sm:flex"
				title="Contributions, last 30 days"
				aria-hidden="true"
			>
				<AsciiSparkline values={last30} />
				<span class="text-label tracking-wider text-text-tertiary uppercase">30d</span>
			</span>
			<span
				class="border border-border-default bg-bg-tertiary px-2 py-1 text-xs font-medium text-text-tertiary"
			>
				{formatNumber(totalContributions)} in last year
			</span>
		</div>
	</div>

	<!-- SMUI terminal heatmap: weeks x week-days grid, fluid square cells -->
	<div class="border border-border-default bg-bg-secondary p-3">
		{#if calendar}
			<div class="flex items-start gap-1.5 select-none">
				<!-- Weekday labels: GitHub weeks start on Sunday -->
				<div
					class="flex flex-col justify-between self-stretch py-px text-label tracking-wider text-text-tertiary/70 uppercase"
				>
					<span>su</span>
					<span>tu</span>
					<span>th</span>
					<span>sa</span>
				</div>
				<!-- Week columns share the width equally; cells keep a 9px floor,
				     below which the strip scrolls horizontally -->
				<div class="flex min-w-0 flex-1 gap-[3px] overflow-x-auto">
					{#each normalizedWeeks as week, w (w)}
						<div class="flex min-w-[9px] flex-1 flex-col gap-[3px]">
							{#each Array.from({ length: week.padTop }) as _, i (i)}
								<span class="aspect-square w-full bg-bg-canvas" aria-hidden="true" title="No data"
								></span>
							{/each}
							{#each week.days as day (day.date)}
								{@const level = getContributionLevel(day.contributionCount)}
								<span
									class="aspect-square w-full cursor-pointer border transition-transform duration-200 hover:scale-125 {LEVEL_CLASSES[
										level
									]}"
									onmouseenter={(e) => showTooltip(e, day.contributionCount)}
									onmouseleave={hideTooltip}
									role="gridcell"
								></span>
							{/each}
							{#each Array.from({ length: week.padBottom }) as _, i (i)}
								<span class="aspect-square w-full bg-bg-canvas" aria-hidden="true" title="No data"
								></span>
							{/each}
						</div>
					{/each}
				</div>
			</div>
			<!-- Heatmap footer: summary + less/more legend -->
			<div
				class="mt-2 flex items-center justify-between text-label tracking-wider text-text-tertiary uppercase"
			>
				<span>{weeks.length} weeks // {formatNumber(totalContributions)} contributions</span>
				<span class="flex items-center gap-1">
					less
					{#each LEVEL_CLASSES as cls, level (level)}
						<span class="inline-block h-[9px] w-[9px] border {cls}"></span>
					{/each}
					more
				</span>
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
</section>
