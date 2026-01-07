<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { REPO_URL, GITHUB_API_URL } from '$lib/constants';

	interface Props {
		showControls?: boolean;
		onExport?: () => void;
		onShare?: () => void;
	}

	let { showControls = false, onExport, onShare }: Props = $props();

	let starCount = $state<number | null>(null);

	$effect(() => {
		fetch(GITHUB_API_URL)
			.then((res) => res.json())
			.then((data) => {
				if (typeof data.stargazers_count === 'number') {
					starCount = data.stargazers_count;
				}
			})
			.catch(() => {
				// Silently fail - button will still work without count
			});
	});

	function formatStarCount(count: number): string {
		if (count >= 1000) {
			return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
		}
		return count.toString();
	}
</script>

<div class="flex shrink-0 items-center gap-2">
	{#if showControls}
		<Button variant="ghost" size="sm" onclick={onExport} class="hidden! sm:inline-flex!">
			<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
			</svg>
			<span class="hidden sm:inline">Export</span>
		</Button>
		<Button variant="ghost" size="sm" onclick={onShare}>
			<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
			</svg>
			<span class="hidden sm:inline">Share</span>
		</Button>
	{/if}

	<Button variant="secondary" size="sm" href={REPO_URL} target="_blank">
		<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
			<path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
		</svg>
		{#if starCount !== null}
			<span>{formatStarCount(starCount)} <span class="hidden sm:inline">Github</span></span>
		{:else}
			<span class="hidden sm:inline"> Github</span>
		{/if}
	</Button>
</div>
