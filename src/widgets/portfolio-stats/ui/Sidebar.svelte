<script lang="ts">
	import type { GitHubProfile } from '$entities/github/model/types';
	import { formatJoinDate, formatNumber, generateProfileTags } from '$shared/lib/github-transform';
	import DotLeaderList from '$shared/ui/DotLeaderList.svelte';
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
		if (!profile.user.email) return;
		navigator.clipboard.writeText(profile.user.email);
	}
</script>

<aside class="flex w-full flex-col gap-6 lg:sticky lg:top-8 {className}">
	<!-- Avatar & Intro -->
	<div class="animate-fade-in flex flex-col items-center text-center lg:items-start lg:text-left">
		<div class="group relative mb-4">
			<img
				src={profile.user.avatarUrl}
				alt={profile.user.login}
				class="relative h-32 w-32 rounded-full border border-border-highlight bg-bg-tertiary object-cover transition-colors duration-300 group-hover:border-smui-frost-3"
			/>
		</div>

		<h1 class="text-2xl font-medium tracking-tight text-text-primary">
			{profile.user.name || profile.user.login}
		</h1>
		<p class="tracking-tight text-text-secondary">
			@{profile.user.login}
		</p>

		<!-- Tags -->
		{#if tags.length > 0}
			<div class="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
				{#each tags as tag (tag)}
					<span
						class="inline-flex cursor-default items-center border border-border-default bg-bg-tertiary/50 px-2 py-1 text-label tracking-wider text-text-secondary normal-case transition-colors hover:border-border-highlight hover:text-text-primary"
					>
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
			<div
				class="flex items-center gap-3 text-text-tertiary transition-colors duration-200 group-hover:text-text-primary"
			>
				<iconify-icon icon="solar:clock-circle-linear" width="18"></iconify-icon>
				<span>{currentTime}</span>
			</div>
			<span class="text-[10px] font-medium tracking-widest text-accent-blue/80 uppercase"
				>Local</span
			>
		</div>

		<!-- Join Date -->
		<div
			class="flex items-center gap-3 text-text-tertiary transition-colors duration-200 hover:text-text-primary"
		>
			<iconify-icon icon="solar:calendar-linear" width="18"></iconify-icon>
			<span>{joinDate}</span>
		</div>

		<!-- Website -->
		{#if profile.user.websiteUrl}
			<div
				class="flex items-center gap-3 text-text-tertiary transition-colors duration-200 hover:text-accent-blue"
			>
				<iconify-icon icon="solar:link-circle-linear" width="18"></iconify-icon>
				<a
					href={profile.user.websiteUrl.startsWith('http')
						? profile.user.websiteUrl
						: `https://${profile.user.websiteUrl}`}
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
		{#if profile.user.email}
			<button
				onclick={copyEmail}
				class="group flex w-full items-center gap-3 text-left text-text-tertiary transition-colors duration-200 hover:text-text-primary"
			>
				<iconify-icon
					icon="solar:letter-linear"
					width="18"
					class="transition-colors group-hover:text-text-primary"
				></iconify-icon>
				<span class="truncate">{profile.user.email}</span>
				<iconify-icon
					icon="solar:copy-linear"
					width="14"
					class="ml-auto opacity-0 transition-opacity group-hover:opacity-100"
				></iconify-icon>
			</button>
		{/if}

		<!-- Social Links -->
		<div class="flex gap-4 pt-2">
			{#if profile.user.linkedinUsername}
				<a
					href="https://www.linkedin.com/in/{profile.user.linkedinUsername}"
					target="_blank"
					rel="noopener noreferrer"
					data-sveltekit-preload-data="off"
					class="text-text-tertiary transition-colors duration-200 hover:text-accent-blue"
					aria-label="LinkedIn profile"
				>
					<iconify-icon icon="brandico:linkedin-rect" width="20"></iconify-icon>
				</a>
			{/if}
			{#if profile.user.telegramUsername}
				<a
					href="https://t.me/{profile.user.telegramUsername.replace(/^@/, '')}"
					target="_blank"
					rel="noopener noreferrer"
					data-sveltekit-preload-data="off"
					class="text-text-tertiary transition-colors duration-200 hover:text-accent-blue"
					aria-label="Telegram profile"
				>
					<iconify-icon icon="iconoir:telegram" width="20"></iconify-icon>
				</a>
			{/if}
			{#if profile.user.twitterUsername}
				<a
					href="https://twitter.com/{profile.user.twitterUsername}"
					target="_blank"
					rel="noopener noreferrer"
					data-sveltekit-preload-data="off"
					class="text-text-tertiary transition-colors duration-200 hover:text-accent-blue"
					aria-label="X (Twitter) profile"
				>
					<iconify-icon icon="ri:twitter-x-fill" width="18"></iconify-icon>
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
		class="group flex w-full items-center justify-center gap-2 border border-transparent bg-[var(--color-btn-primary-bg)] py-2.5 text-sm font-medium tracking-wider text-[var(--color-btn-primary-text)] uppercase transition-colors duration-200 hover:bg-[var(--color-btn-primary-hover)]"
	>
		<iconify-icon
			icon="solar:cat-linear"
			width="18"
			class="transition-transform group-hover:-translate-y-0.5"
		></iconify-icon>
		Follow on GitHub
	</a>

	<!-- Stats Readout (SMUI dot leaders) -->
	<div class="w-full border-t border-border-default pt-4">
		<DotLeaderList
			width={26}
			rows={[
				{ label: 'repos', value: formatNumber(profile.stats.totalRepos), tone: 'primary' },
				{ label: 'stars', value: formatNumber(profile.stats.totalStars), tone: 'yellow' },
				{ label: 'followers', value: formatNumber(profile.stats.followers), tone: 'green' },
				{ label: 'following', value: formatNumber(profile.stats.following), tone: 'purple' }
			]}
		/>
	</div>
</aside>
