<script lang="ts">
	import type { WorkExperience } from '$entities/resume/model/types';
	import WorkItem from '$entities/resume/ui/WorkItem.svelte';

	interface Props {
		work: WorkExperience[];
		class?: string;
	}

	let { work, class: className = '' }: Props = $props();
</script>

{#if work && work.length > 0}
	<section class="animate-slide-up {className}" style="animation-delay: 400ms;">
		<div class="mb-8 flex items-center gap-2">
			<iconify-icon icon="solar:case-round-linear" width="20" class="text-text-tertiary"></iconify-icon>
			<h2 class="text-lg font-medium tracking-tight text-white">Experience</h2>
		</div>

		<div class="relative ml-3 space-y-10 border-l border-border-default">
			{#each work as job, i ((job.name || '') + (job.startDate || '') + i)}
				<WorkItem {job} isFirst={i === 0} />
			{/each}
		</div>
	</section>
{/if}
