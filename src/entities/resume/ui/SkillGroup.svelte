<script lang="ts">
	import type { Skill } from '$entities/resume/model/types';

	interface Props {
		skill: Skill;
	}

	let { skill }: Props = $props();
</script>

<div
	class="group rounded-lg border border-border-default bg-bg-secondary p-4 transition-all hover:border-border-subtle hover:bg-bg-tertiary"
>
	<div class="flex items-center justify-between">
		<h3 class="font-medium text-text-primary">{skill.name || 'Skill'}</h3>
		{#if skill.level}
			<span
				class="border border-accent-blue/30 bg-accent-blue/10 px-1.5 py-0.5 text-label tracking-wider text-accent-blue uppercase"
			>
				{skill.level}
			</span>
		{/if}
	</div>

	{#if skill.keywords && skill.keywords.length > 0}
		<div class="mt-3 flex flex-wrap gap-2">
			{#each skill.keywords as keyword (keyword)}
				<span
					class="bg-bg-tertiary px-1.5 py-0.5 text-label tracking-wider text-text-secondary uppercase transition-colors hover:bg-accent-blue/10 hover:text-accent-blue"
				>
					{keyword}
				</span>
			{/each}
		</div>
	{/if}
</div>
