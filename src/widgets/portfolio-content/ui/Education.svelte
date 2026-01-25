<script lang="ts">
	import type { Education } from '$entities/resume/model/types';
	import EducationItem from '$entities/resume/ui/EducationItem.svelte';

	interface Props {
		education: Education[];
		class?: string;
	}

	let { education, class: className = '' }: Props = $props();
</script>

{#if education && education.length > 0}
	<section class="animate-slide-up border-t border-border-default pt-8 {className}" style="animation-delay: 500ms;">
		<div class="mb-6 flex items-center gap-2">
			<iconify-icon icon="solar:diploma-linear" width="20" class="text-text-tertiary"></iconify-icon>
			<h2 class="text-lg font-medium tracking-tight text-white">Education</h2>
		</div>

		<div class="space-y-4">
			{#each education as edu, i ((edu.institution || '') + (edu.startDate || '') + i)}
				<EducationItem {edu} />
			{/each}
		</div>
	</section>
{/if}
