<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: className = '', children }: Props = $props();
</script>

<thead class="border-[var(--color-border-default)] [&_tr]:border-b {className}">
	{@render children()}
</thead>
