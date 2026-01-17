/**
 * Site Configuration
 *
 * This file contains the configuration for the static GitHub Pages deployment.
 * Environment variables can override these default values.
 */

// Check if we're in a Node.js environment (build time) or browser (runtime)
const isNode = typeof process !== 'undefined' && process.env;

export default {
	// GitHub username для отображения (может быть переопределен через env)
	username: isNode ? process.env.GH_USERNAME || 'your-username' : 'your-username',

	// Шаблон по умолчанию: 'github' | 'bento' | 'minimal'
	defaultTemplate: 'github',

	// Base URL для GitHub Pages (если репозиторий не username.github.io)
	basePath: isNode ? process.env.BASE_PATH || '' : '',

	// Custom domain (опционально)
	customDomain: isNode ? process.env.CUSTOM_DOMAIN || '' : '',

	// Метаданные сайта
	siteTitle: 'DevCard - Developer Portfolio',
	siteDescription: 'GitHub profile + CV in one beautiful static portfolio',

	// Опции сборки
	build: {
		// Кэшировать данные GitHub во время сборки
		cacheGitHubData: true,
		// Генерировать sitemap
		generateSitemap: true
	}
};
