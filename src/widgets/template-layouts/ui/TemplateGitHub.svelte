<script lang="ts">
	import type { GitHubProfile } from '$entities/github/model/types';
	import Sidebar from '$widgets/portfolio-stats/ui/Sidebar.svelte';
	import StatsGrid from '$widgets/portfolio-stats/ui/StatsGrid.svelte';
	import ContributionGraph from '$entities/github/ui/ContributionGraph.svelte';
	import ExternalContributions from '$widgets/portfolio-content/ui/ExternalContributions.svelte';
	import LanguageChart from '$entities/github/ui/LanguageChart.svelte';
	import ProjectCard from '$entities/portfolio/ui/ProjectCard.svelte';
	import TechStack from '$widgets/portfolio-content/ui/TechStack.svelte';
	import Dropdown from '$shared/ui/Dropdown.svelte';
	import WorkExperience from '$widgets/portfolio-content/ui/WorkExperience.svelte';
	import Education from '$widgets/portfolio-content/ui/Education.svelte';
	import Projects from '$widgets/portfolio-content/ui/Projects.svelte';
	import Volunteer from '$widgets/portfolio-content/ui/Volunteer.svelte';
	import Awards from '$widgets/portfolio-content/ui/Awards.svelte';
	import Publications from '$widgets/portfolio-content/ui/Publications.svelte';

	interface Props {
		profile: GitHubProfile;
		class?: string;
	}

	let { profile, class: className = '' }: Props = $props();

	let sortBy = $state('stars');
	const sortOptions = [
		{ value: 'stars', label: 'Most Stars' },
		{ value: 'pinned', label: 'Pinned Order' }
	];

	const sortedRepos = $derived(
		sortBy === 'stars'
			? [...profile.pinnedRepositories].sort((a, b) => b.stargazerCount - a.stargazerCount)
			: profile.pinnedRepositories
	);
</script>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 {className}">
	<div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
		<!-- Sidebar -->
		<Sidebar {profile} />

		<!-- Main Content -->
		<main class="space-y-12">
			<!-- Stats Grid -->
			<StatsGrid {profile} />

			<!-- Contributions -->
			{#if profile.contributions}
				<ContributionGraph {profile} />
			{/if}

			<!-- Tech Stack & Languages -->
			<section class="animate-slide-up" style="animation-delay: 200ms;">
				<div class="mb-6 flex items-center gap-2">
					<iconify-icon icon="solar:code-circle-linear" width="20" class="text-text-tertiary"></iconify-icon>
					<h2 class="text-lg font-medium tracking-tight text-white">Technologies</h2>
				</div>

				<div class="grid gap-6 md:grid-cols-2">
					<TechStack languages={profile.languages} />
					<LanguageChart languages={profile.languages} />
				</div>
			</section>

			<!-- External Open Source Contributions -->
			{#if profile.contributions?.externalContributions && profile.contributions.externalContributions.length > 0}
				<ExternalContributions
					contributions={profile.contributions.externalContributions}
					totalPRs={profile.contributions.externalPRCount ?? 0}
					totalCommits={profile.contributions.externalCommitCount ?? 0}
				/>
			{/if}

			<!-- Notable Projects -->
			{#if profile.pinnedRepositories.length > 0}
				<section class="animate-slide-up" style="animation-delay: 300ms;">
					<div class="mb-6 flex items-center justify-between">
						<div class="flex items-center gap-2">
							<iconify-icon icon="solar:rocket-2-linear" width="20" class="text-text-tertiary"></iconify-icon>
							<h2 class="text-lg font-medium tracking-tight text-white">Notable Projects</h2>
						</div>
						<Dropdown options={sortOptions} bind:value={sortBy} />
					</div>

					<div class="grid gap-4 sm:grid-cols-2">
						{#each sortedRepos as repo (repo.name)}
							<ProjectCard {repo} />
						{/each}
					</div>
				</section>
			{/if}

			<!-- Resume Section Divider -->
			{#if profile.resumeData && (profile.resumeData.work || profile.resumeData.education || profile.resumeData.skills || profile.resumeData.projects || profile.resumeData.volunteer || profile.resumeData.awards || profile.resumeData.publications)}
				<div class="relative py-4">
					<div class="absolute inset-0 flex items-center" aria-hidden="true">
						<div class="w-full border-t border-border-default"></div>
					</div>
					<div class="relative flex justify-center">
						<span class="bg-bg-primary px-4 text-sm font-medium text-text-tertiary">
							Professional Experience & Achievements
						</span>
					</div>
				</div>
			{/if}

			<!-- Work Experience -->
			{#if profile.resumeData?.work}
				<WorkExperience work={profile.resumeData.work} />
			{/if}

			<!-- Education -->
			{#if profile.resumeData?.education}
				<Education education={profile.resumeData.education} />
			{/if}

			<!-- Projects -->
			{#if profile.resumeData?.projects}
				<Projects projects={profile.resumeData.projects} />
			{/if}

			<!-- Volunteer -->
			{#if profile.resumeData?.volunteer}
				<Volunteer volunteer={profile.resumeData.volunteer} />
			{/if}

			<!-- Awards -->
			{#if profile.resumeData?.awards}
				<Awards awards={profile.resumeData.awards} />
			{/if}

			<!-- Publications -->
			{#if profile.resumeData?.publications}
				<Publications publications={profile.resumeData.publications} />
			{/if}

			<!-- Footer -->
			<footer class="animate-slide-up pt-12 text-center text-xs text-text-tertiary" style="animation-delay: 600ms;">
				<p>© {new Date().getFullYear()} {profile.user.name || profile.user.login}. Built with DevCard.</p>
			</footer>
		</main>
	</div>
</div>
