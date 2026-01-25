<script lang="ts">
	import type { WorkExperience } from '$entities/resume/model/types';

	interface Props {
		job: WorkExperience;
		isFirst?: boolean;
	}

	let { job, isFirst = false }: Props = $props();

	const formatDate = (date?: string) => {
		if (!date) return 'Present';
		return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
	};

	const isCurrentJob = $derived(!job.endDate);
</script>

<div class="group relative pl-8">
	<!-- Timeline dot -->
	<span
		class="absolute -left-[5px] top-2 z-10 h-2.5 w-2.5 rounded-full border border-bg-primary transition-colors {isCurrentJob ? 'bg-accent-green shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-border-default group-hover:bg-text-tertiary'}"
	></span>

	<!-- Vertical line glow connector (only for current job) -->
	{#if isCurrentJob}
		<div class="timeline-glow absolute -left-[1px] bottom-0 top-2 w-0.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
	{/if}

	<!-- Header -->
	<div class="mb-1 flex flex-col sm:flex-row sm:items-center sm:justify-between">
		<h3 class="text-base font-medium text-white transition-colors {isCurrentJob ? 'group-hover:text-accent-green' : 'group-hover:text-text-primary'}">
			{job.position || 'Position'}
		</h3>
		<span class="font-mono text-xs text-text-tertiary {isCurrentJob ? 'rounded border border-border-default bg-bg-tertiary px-2 py-0.5 transition-colors group-hover:border-accent-green/30' : ''}">
			{formatDate(job.startDate)} - {formatDate(job.endDate)}
		</span>
	</div>

	<!-- Company -->
	<div class="mb-2 text-sm font-medium {isCurrentJob ? 'text-accent-green' : 'text-text-tertiary transition-colors hover:text-text-primary'}">
		{#if job.url}
			<a
				href={job.url}
				target="_blank"
				rel="noopener noreferrer"
				data-sveltekit-preload-data="off"
				class="hover:underline"
			>
				{job.name || 'Company'}
			</a>
		{:else}
			{job.name || 'Company'}
		{/if}
	</div>

	<!-- Summary -->
	{#if job.summary}
		<p class="text-sm leading-relaxed text-text-secondary group-hover:text-text-secondary/90">
			{job.summary}
		</p>
	{/if}

	<!-- Highlights -->
	{#if job.highlights && job.highlights.length > 0}
		<ul class="mt-3 space-y-1.5 text-sm text-text-secondary/70">
			{#each job.highlights as highlight (highlight)}
				<li class="flex gap-2">
					<span class="mt-1 text-[10px] text-accent-green/60">●</span>
					<span>{highlight}</span>
				</li>
			{/each}
		</ul>
	{/if}
</div>
