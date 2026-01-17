<script lang="ts">
	import type { GitHubProfile } from '$entities/github/model/types';
	import Sidebar from '$widgets/portfolio-stats/ui/Sidebar.svelte';
	import StatsGrid from '$widgets/portfolio-stats/ui/StatsGrid.svelte';
	import ContributionGraph from '$entities/github/ui/ContributionGraph.svelte';
	import ExternalContributions from '$widgets/portfolio-content/ui/ExternalContributions.svelte';
	import LanguageChart from '$entities/github/ui/LanguageChart.svelte';
	import ProjectCard from '$entities/portfolio/ui/ProjectCard.svelte';
	import TechStack from '$widgets/portfolio-content/ui/TechStack.svelte';
	import Card from '$shared/ui/Card.svelte';
	import Dropdown from '$shared/ui/Dropdown.svelte';
	import WorkExperience from '$widgets/portfolio-content/ui/WorkExperience.svelte';
	import Education from '$widgets/portfolio-content/ui/Education.svelte';
	import _Skills from '$widgets/portfolio-content/ui/Skills.svelte';
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
	<div class="flex flex-col gap-8 lg:flex-row lg:items-start">
		<!-- Sidebar -->
		<div class="w-full lg:sticky lg:top-8 lg:w-[296px] lg:flex-shrink-0 lg:self-start">
			<Sidebar {profile} />
		</div>

		<!-- Main Content -->
		<div class="flex-1 space-y-6">
			<!-- Welcome Banner -->
			<Card variant="default" padding="lg">
				<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div class="flex-1">
						<h2 class="text-xl font-semibold text-text-primary">
							Welcome to {profile.user.name || profile.user.login}'s Portfolio
						</h2>
						<p class="mt-1 text-sm text-text-secondary">
							Explore their professional profile, open source contributions, and projects
						</p>
					</div>
					<div class="flex items-center gap-2 text-xs text-text-tertiary">
						<span
							>Powered by
							<span class="font-semibold text-accent-green">DevCard</span>
							&
							<span class="font-semibold text-accent-green">JSON Resume</span>
						</span>
					</div>
				</div>
			</Card>

			<!-- Stats Grid -->
			<StatsGrid {profile} />

			<!-- Contributions -->
			{#if profile.contributions}
				<ContributionGraph {profile} />
			{/if}

			<!-- Tech Stack & Languages -->
			<div>
				<div class="mb-4 flex items-center gap-2">
					<svg
						class="h-5 w-5 text-text-tertiary"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
						/>
					</svg>
					<h3 class="text-lg font-semibold text-text-primary">Tech Stack & Languages</h3>
				</div>
				<div class="grid gap-4 md:grid-cols-2">
					<TechStack languages={profile.languages} bio={profile.user.bio} />
					<LanguageChart languages={profile.languages} />
				</div>
			</div>

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
				<div>
					<div class="mb-4 flex items-center justify-between">
						<div class="flex items-center gap-2">
							<svg
								class="h-5 w-5 text-text-tertiary"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
								/>
							</svg>
							<h3 class="text-lg font-semibold text-text-primary">Notable Projects</h3>
						</div>
						<Dropdown options={sortOptions} bind:value={sortBy} />
					</div>
					<div class="grid gap-4 sm:grid-cols-2">
						{#each sortedRepos as repo (repo.name)}
							<ProjectCard {repo} />
						{/each}
					</div>
				</div>
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

			<!-- Skills -->
			<!-- {#if profile.resumeData?.skills}
				<Skills skills={profile.resumeData.skills} />
			{/if} -->

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
		</div>
	</div>
</div>
