<script lang="ts">
	import type { GitHubProfile } from '$entities/github/model/types';
	import { formatJoinDate, generateProfileTags } from '$shared/lib/github-transform';
	import { onMount } from 'svelte';

	interface Props {
		profile: GitHubProfile;
		class?: string;
	}

	let { profile, class: className = '' }: Props = $props();

	const tags = $derived(generateProfileTags(profile));
	const joinDate = $derived(formatJoinDate(profile.user.createdAt));

	// Live time state
	let currentTime = $state('--:--');

	onMount(() => {
		function updateTime() {
			const now = new Date();
			const hours = now.getHours().toString().padStart(2, '0');
			const minutes = now.getMinutes().toString().padStart(2, '0');
			currentTime = `${hours}:${minutes}`;
		}
		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	});

	// Copy email function
	function copyEmail() {
		const email = profile.user.email || `${profile.user.login}@github.com`;
		navigator.clipboard.writeText(email);
	}
</script>

<aside class="flex w-full flex-col gap-6 lg:sticky lg:top-8 {className}">
	<!-- Avatar & Intro -->
	<div class="flex animate-fade-in flex-col items-center text-center lg:items-start lg:text-left">
		<div class="group relative mb-4 cursor-pointer">
			<div class="absolute -inset-0.5 rounded-full bg-gradient-to-r from-accent-green/20 to-accent-blue/20 opacity-50 blur transition duration-700 group-hover:opacity-100"></div>
			<img
				src={profile.user.avatarUrl}
				alt={profile.user.login}
				class="relative h-32 w-32 rounded-full border border-border-default bg-bg-tertiary object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
			/>
		</div>

		<h1 class="text-2xl font-medium tracking-tight text-white">
			{profile.user.name || profile.user.login}
		</h1>
		<p class="font-light tracking-tight text-text-secondary">
			@{profile.user.login}
		</p>

		<!-- Tags -->
		{#if tags.length > 0}
			<div class="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
				{#each tags as tag (tag)}
					<span class="inline-flex cursor-default items-center rounded-md border border-border-default bg-bg-tertiary/50 px-2 py-1 text-xs font-medium text-text-secondary backdrop-blur-sm transition-colors hover:border-border-highlight hover:text-white">
						{tag}
					</span>
				{/each}
			</div>
		{/if}

		<!-- Bio -->
		{#if profile.user.bio}
			<p class="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-text-secondary/80 lg:mx-0">
				{profile.user.bio}
			</p>
		{/if}
	</div>

	<!-- Info List -->
	<div class="w-full space-y-3 border-t border-border-default pt-6 text-sm">
		<!-- Live Time Widget -->
		<div class="group flex items-center justify-between">
			<div class="flex items-center gap-3 text-text-tertiary transition-colors duration-200 group-hover:text-text-primary">
				<iconify-icon icon="solar:clock-circle-linear" width="18"></iconify-icon>
				<span>{currentTime}</span>
			</div>
			<span class="text-[10px] font-medium uppercase tracking-widest text-accent-green/80">Local</span>
		</div>

		<!-- Join Date -->
		<div class="flex items-center gap-3 text-text-tertiary transition-colors duration-200 hover:text-text-primary">
			<iconify-icon icon="solar:calendar-linear" width="18"></iconify-icon>
			<span>{joinDate}</span>
		</div>

		<!-- Website -->
		{#if profile.user.websiteUrl}
			<div class="flex items-center gap-3 text-text-tertiary transition-colors duration-200 hover:text-accent-green">
				<iconify-icon icon="solar:link-circle-linear" width="18"></iconify-icon>
				<a
					href={profile.user.websiteUrl.startsWith('http') ? profile.user.websiteUrl : `https://${profile.user.websiteUrl}`}
					target="_blank"
					rel="noopener noreferrer"
					data-sveltekit-preload-data="off"
					class="hover:underline"
				>
					{profile.user.websiteUrl.replace(/^https?:\/\//, '')}
				</a>
			</div>
		{/if}

		<!-- Email (clickable to copy) -->
		<button
			onclick={copyEmail}
			class="group flex w-full items-center gap-3 text-left text-text-tertiary transition-colors duration-200 hover:text-white"
		>
			<iconify-icon icon="solar:letter-linear" width="18" class="transition-colors group-hover:text-white"></iconify-icon>
			<span class="truncate">{profile.user.email || `${profile.user.login}@github.com`}</span>
			<iconify-icon icon="solar:copy-linear" width="14" class="ml-auto opacity-0 transition-opacity group-hover:opacity-100"></iconify-icon>
		</button>

		<!-- Social Links -->
		<div class="flex gap-4 pt-2">
			{#if profile.user.linkedinUsername}
				<a
					href="https://www.linkedin.com/in/{profile.user.linkedinUsername}"
					target="_blank"
					rel="noopener noreferrer"
					data-sveltekit-preload-data="off"
					class="transition-colors duration-200"
					style="color: #52525b;"
					onmouseenter={(e) => e.currentTarget.style.color = '#60a5fa'}
					onmouseleave={(e) => e.currentTarget.style.color = '#52525b'}
				>
					<iconify-icon icon="brandico:linkedin-rect" width="20" style="color: inherit;"></iconify-icon>
				</a>
			{/if}
			{#if profile.user.telegramUsername}
				<a
					href="https://t.me/{profile.user.telegramUsername.replace(/^@/, '')}"
					target="_blank"
					rel="noopener noreferrer"
					data-sveltekit-preload-data="off"
					class="transition-colors duration-200"
					style="color: #52525b;"
					onmouseenter={(e) => e.currentTarget.style.color = '#38bdf8'}
					onmouseleave={(e) => e.currentTarget.style.color = '#52525b'}
				>
					<iconify-icon icon="iconoir:telegram" width="20" style="color: inherit;"></iconify-icon>
				</a>
			{/if}
			{#if profile.user.twitterUsername}
				<a
					href="https://twitter.com/{profile.user.twitterUsername}"
					target="_blank"
					rel="noopener noreferrer"
					data-sveltekit-preload-data="off"
					class="transition-colors duration-200"
					style="color: #52525b;"
					onmouseenter={(e) => e.currentTarget.style.color = '#ffffff'}
					onmouseleave={(e) => e.currentTarget.style.color = '#52525b'}
				>
					<iconify-icon icon="ri:twitter-x-fill" width="18" style="color: inherit;"></iconify-icon>
				</a>
			{/if}
		</div>
	</div>

	<!-- Main CTA -->
	<a
		href="https://github.com/{profile.user.login}"
		target="_blank"
		rel="noopener noreferrer"
		data-sveltekit-preload-data="off"
		class="group flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-sm font-medium shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-200 hover:bg-zinc-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
		style="color: #000000;"
	>
		<iconify-icon icon="solar:cat-linear" width="18" style="color: inherit;" class="transition-transform group-hover:-translate-y-0.5"></iconify-icon>
		Follow on GitHub
	</a>

	<!-- Followers Stats -->
	<div class="flex items-center justify-center gap-4 text-xs text-text-tertiary lg:justify-start">
		<a
			href="https://github.com/{profile.user.login}?tab=followers"
			target="_blank"
			rel="noopener noreferrer"
			data-sveltekit-preload-data="off"
			class="flex items-center gap-1 transition-colors hover:text-white"
		>
			<span class="font-medium text-white">{profile.stats.followers}</span> followers
		</a>
		<span>·</span>
		<a
			href="https://github.com/{profile.user.login}?tab=following"
			target="_blank"
			rel="noopener noreferrer"
			data-sveltekit-preload-data="off"
			class="flex items-center gap-1 transition-colors hover:text-white"
		>
			<span class="font-medium text-white">{profile.stats.following}</span> following
		</a>
	</div>
</aside>
