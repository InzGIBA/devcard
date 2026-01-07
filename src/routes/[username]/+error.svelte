<script lang="ts">
	import { page } from '$app/stores';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';

	const statusMessages: Record<number, { title: string; description: string }> = {
		404: {
			title: 'User not found',
			description: 'The GitHub user you\'re looking for doesn\'t exist or has been deleted.'
		},
		429: {
			title: 'Rate limit exceeded',
			description: 'We\'ve hit GitHub\'s API rate limit. Please try again in a few minutes.'
		},
		500: {
			title: 'Something went wrong',
			description: 'An error occurred while fetching the profile. Please try again.'
		}
	};

	const status = $derived($page.status);
	const message = $derived(statusMessages[status] || statusMessages[500]);
</script>

<Header />

<main class="flex min-h-[60vh] items-center justify-center px-4">
	<Card variant="default" padding="lg" class="max-w-md text-center">
		<div class="mb-4 text-6xl font-bold text-[var(--color-text-tertiary)]">
			{status}
		</div>
		<h1 class="text-xl font-semibold text-[var(--color-text-primary)]">
			{message.title}
		</h1>
		<p class="mt-2 text-[var(--color-text-secondary)]">
			{$page.error?.message || message.description}
		</p>
		<div class="mt-6 flex justify-center gap-3">
			<Button variant="primary" href="/">
				Go Home
			</Button>
			<Button variant="secondary" onclick={() => window.location.reload()}>
				Try Again
			</Button>
		</div>
	</Card>
</main>

<Footer />
