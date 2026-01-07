<script lang="ts">
	import type { GitHubProfile } from '$lib/types/github';
	import Badge from '$lib/components/ui/Badge.svelte';

	interface Props {
		profile: GitHubProfile;
		class?: string;
	}

	let { profile, class: className = '' }: Props = $props();
</script>

<div class="flex items-center gap-6 {className}">
	<!-- Avatar -->
	<img
		src={profile.user.avatarUrl}
		alt={profile.user.login}
		class="h-24 w-24 rounded-full border-2 border-border-default bg-bg-tertiary"
	/>

	<!-- Info -->
	<div class="flex-1">
		<div class="flex items-center gap-3">
			<h1 class="text-2xl font-bold text-text-primary">
				{profile.user.name || profile.user.login}
			</h1>
			{#if profile.user.name}
				<span class="text-lg text-text-secondary">
					@{profile.user.login}
				</span>
			{/if}
		</div>

		{#if profile.user.bio}
			<p class="mt-2 text-text-secondary">
				{profile.user.bio}
			</p>
		{/if}

		<!-- Quick stats -->
		<div class="mt-3 flex flex-wrap items-center gap-4 text-sm text-text-tertiary">
			{#if profile.user.location}
				<div class="flex items-center gap-1">
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
						/>
					</svg>
					<span>{profile.user.location}</span>
				</div>
			{/if}
			{#if profile.user.company}
				<div class="flex items-center gap-1">
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"
						/>
					</svg>
					<span>{profile.user.company.replace('@', '')}</span>
				</div>
			{/if}
			<Badge variant="outline" size="sm">
				{profile.stats.yearsActive} {profile.stats.yearsActive === 1 ? 'year' : 'years'} on GitHub
			</Badge>
		</div>
	</div>
</div>
