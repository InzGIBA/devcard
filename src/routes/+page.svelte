<script lang="ts">
	import HomePage from '$pages/home/ui/HomePage.svelte';

	let { data } = $props();
</script>

<HomePage {data} />
