<script lang="ts">
	interface Props {
		lines: string[];
		title?: string;
		prompt?: string;
		charMs?: number;
		class?: string;
	}

	let {
		lines,
		title = 'bios',
		prompt = 'smui',
		charMs = 14,
		class: className = ''
	}: Props = $props();

	const totalChars = $derived(lines.reduce((sum, line) => sum + line.length, 0));
	let count = $state(0);
	const done = $derived(count >= totalChars);

	$effect(() => {
		if (done) return;
		const id = setInterval(() => {
			count = Math.min(totalChars, count + 1);
		}, charMs);
		return () => clearInterval(id);
	});

	// Reveal each line up to `count` characters
	const offsets = $derived.by(() => {
		let acc = 0;
		return lines.map((line) => {
			const start = acc;
			acc += line.length;
			return start;
		});
	});
	const revealed = $derived(
		lines.map((line, i) => line.slice(0, Math.max(0, Math.min(line.length, count - offsets[i]))))
	);
	const okLines = $derived(lines.filter((l) => l.includes('[ OK ]')).length);
</script>

<!-- SMUI boot sequence: POST lines type in char by char, ending at a ready prompt -->
<div class="border border-border-default bg-bg-secondary text-left {className}">
	<div class="flex items-center justify-between border-b border-border-default px-2.5 py-1.5">
		<span class="text-label tracking-[1.5px] text-text-tertiary uppercase">{title}</span>
		<button
			type="button"
			class="cursor-pointer border border-border-default px-1.5 py-px text-label tracking-wider text-text-tertiary uppercase transition-colors hover:text-text-primary"
			onclick={() => (count = done ? 0 : totalChars)}
		>
			{done ? 'reset' : 'skip'}
		</button>
	</div>
	<div class="min-h-33 px-2.5 py-2 text-ui leading-[1.75]">
		{#each revealed as line, i (i)}
			<div class="whitespace-pre-wrap">
				{#if line.includes('[ OK ]')}
					{line.split('[ OK ]')[0]}<span class="text-accent-green">[ OK ]</span>{line.split(
						'[ OK ]'
					)[1]}
				{:else if line.includes('[FAIL]')}
					{line.split('[FAIL]')[0]}<span class="text-accent-red">[FAIL]</span>{line.split(
						'[FAIL]'
					)[1]}
				{:else}
					<span class="text-text-tertiary">{line}</span>
				{/if}
			</div>
		{/each}
		{#if done}
			<div class="mt-1 flex items-center gap-1.5">
				<span class="text-accent-blue">{prompt}</span>
				<span class="text-text-tertiary">&gt;</span>
				<span class="cursor-blink text-accent-blue">█</span>
				<span class="ml-2 text-label tracking-wider text-accent-green uppercase">
					boot complete // {okLines} checks passed
				</span>
			</div>
		{/if}
	</div>
</div>
