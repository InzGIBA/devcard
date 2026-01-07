import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	let totalPortfolios = 0;

	if (platform?.env?.PROFILE_VIEWS) {
		try {
			const globalKey = 'global:total_portfolios';
			const current = await platform.env.PROFILE_VIEWS.get(globalKey);
			totalPortfolios = current ? parseInt(current) : 0;
		} catch (e) {
			console.error('Error fetching global portfolio count:', e);
		}
	} else {
		// Mock for local dev
		totalPortfolios = 1234;
	}

	return {
		totalPortfolios
	};
};
