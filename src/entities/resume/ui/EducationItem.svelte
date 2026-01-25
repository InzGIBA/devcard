<script lang="ts">
	import type { Education } from '$entities/resume/model/types';

	interface Props {
		edu: Education;
	}

	let { edu }: Props = $props();

	const formatDate = (date?: string) => {
		if (!date) return '';
		return new Date(date).toLocaleDateString('en-US', { year: 'numeric' });
	};

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

<div
	class="spotlight-card rounded-xl border border-border-default bg-bg-secondary p-5"
	onmousemove={handleMouseMove}
	role="presentation"
>
	<div class="relative z-20">
		<div class="mb-2 flex flex-col sm:flex-row sm:items-start sm:justify-between">
			<h3 class="font-medium text-white">
				{edu.studyType || 'Degree'}
				{edu.area ? `in ${edu.area}` : ''}
			</h3>
			{#if edu.endDate}
				<span class="font-mono text-xs text-text-tertiary">
					Graduated {formatDate(edu.endDate)}
				</span>
			{/if}
		</div>

		{#if edu.institution}
			<p class="text-sm text-text-secondary">
				{#if edu.url}
					<a
						href={edu.url}
						target="_blank"
						rel="noopener noreferrer"
						data-sveltekit-preload-data="off"
						class="text-accent-green hover:underline"
					>
						{edu.institution}
					</a>
				{:else}
					{edu.institution}
				{/if}
			</p>
		{/if}

		{#if edu.courses && edu.courses.length > 0}
			<div class="mt-3 flex flex-wrap gap-2">
				{#each edu.courses as course (course)}
					<span class="rounded border border-border-default bg-bg-tertiary px-2 py-1 text-xs text-text-tertiary">
						{course}
					</span>
				{/each}
			</div>
		{/if}
	</div>
</div>
