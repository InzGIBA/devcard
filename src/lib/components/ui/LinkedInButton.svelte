<script lang="ts">
	interface Props {
		linkedinUrl: string;
		class?: string;
	}

	let { linkedinUrl, class: className = '' }: Props = $props();

	// Normalize URL: convert username to full URL, or use full URL as-is
	const normalizedUrl = $derived(() => {
		if (!linkedinUrl) return '';

		// If it doesn't start with http, treat it as a username
		if (!linkedinUrl.startsWith('http')) {
			return `https://www.linkedin.com/in/${linkedinUrl}`;
		}

		// Otherwise, use the full URL as-is
		return linkedinUrl;
	});
</script>

<a
	href={normalizedUrl()}
	target="_blank"
	rel="noopener noreferrer"
	class="inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-btn-secondary-bg)] px-4 py-2 text-sm font-medium text-[var(--color-btn-secondary-text)] transition-colors hover:border-[var(--color-border-muted)] hover:bg-[var(--color-btn-secondary-hover)] focus-visible:ring-2 focus-visible:ring-[var(--color-saas-green)] focus-visible:ring-offset-2 focus-visible:outline-none {className}"
>
	<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
		<path
			d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
		/>
	</svg>
	Follow on LinkedIn
</a>
