<script lang="ts">
	import { sparkChars, toneTextClass, type Tone } from '$shared/lib/ascii';

	interface Props {
		values: number[];
		tone?: Tone;
		class?: string;
	}

	let { values, tone = 'primary', class: className = '' }: Props = $props();

	const chars = $derived(sparkChars(values));
</script>

<span class="whitespace-pre {toneTextClass[tone]} {className}" title={chars}>{chars}</span>
