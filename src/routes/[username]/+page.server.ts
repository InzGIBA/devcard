import type { PageServerLoad } from './$types';
import { fetchGitHubProfile } from '$lib/server/github';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, platform }) => {
	const { username } = params;

	// Fetch GitHub profile
	const result = await fetchGitHubProfile(username);

	if (!result.success) {
		if (result.error.type === 'NOT_FOUND') {
			error(404, {
				message: `User "${username}" not found on GitHub`
			});
		}
		if (result.error.type === 'RATE_LIMIT') {
			error(429, {
				message: 'GitHub API rate limit exceeded. Please try again later.'
			});
		}
		error(500, {
			message: result.error.message || 'Failed to fetch GitHub profile'
		});
	}

	// Handle View Counts with Cloudflare KV
	let views = 0;
	if (platform?.env?.PROFILE_VIEWS) {
		try {
			const current = await platform.env.PROFILE_VIEWS.get(username);
			views = current ? parseInt(current) + 1 : 1;
			
			// Update in background
			const updatePromise = platform.env.PROFILE_VIEWS.put(username, views.toString());
			
			// Increment global counter
			const incrementGlobal = async () => {
				const globalKey = 'global:total_portfolios';
				const currentGlobal = await platform.env.PROFILE_VIEWS.get(globalKey);
				const nextGlobal = (currentGlobal ? parseInt(currentGlobal) : 0) + 1;
				await platform.env.PROFILE_VIEWS.put(globalKey, nextGlobal.toString());
			};

			if (platform.context?.waitUntil) {
				platform.context.waitUntil(Promise.all([updatePromise, incrementGlobal()]));
			} else {
				// Fallback for dev/other environments
				updatePromise.catch((err: any) => console.error('Failed to update views KV:', err));
				incrementGlobal().catch((err: any) => console.error('Failed to update global KV:', err));
			}
		} catch (e: any) {
			console.error('Error handling view count:', e);
		}
	} else {
        // Mock for local dev if KV not available
        views = 1;
    }

	return {
		profile: result.data,
		username,
		views
	};
};
