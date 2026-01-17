# DevCard

> Your GitHub profile + CV in one beautiful static portfolio

[![Deploy](https://github.com/InzGIBA/devcard/actions/workflows/deploy.yml/badge.svg)](https://github.com/InzGIBA/devcard/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 **3 Templates** — GitHub-style, Bento grid, or Minimal CV
- 📊 **GitHub Stats** — Contributions, languages, pinned repos
- 📄 **JSON Resume** — Full CV integration with work, education, projects
- 🌐 **Social Links** — LinkedIn, Telegram, Twitter support
- 📸 **PNG Export** — Download your portfolio as image
- 🔄 **Auto-Sync** — Scheduled builds keep data fresh
- 🚀 **GitHub Pages** — Free hosting with one-click deploy

## Quick Start

### 1. Fork & Clone

```bash
git clone https://github.com/InzGIBA/devcard.git
cd devcard
npm install
```

### 2. Configure

Create `.env` file:

```env
GH_TOKEN=ghp_your_token_here
GH_USERNAME=your-username
JSONRESUME_URL=https://raw.githubusercontent.com/user/repo/main/resume.json
LINKEDIN_USERNAME=your-linkedin
TELEGRAM_USERNAME=your-telegram
```

Get your GitHub token: [github.com/settings/tokens](https://github.com/settings/tokens) (scope: `read:user`)

### 3. Run

```bash
npm run dev
```

Open [localhost:5173](http://localhost:5173)

## Deploy to GitHub Pages

### Setup

1. **Add Secrets** — Go to Settings → Secrets and variables → Actions

   | Secret              | Required | Description                  |
   | ------------------- | -------- | ---------------------------- |
   | `GH_TOKEN`          | ✅       | GitHub Personal Access Token |
   | `GH_USERNAME`       | ✅       | Your GitHub username         |
   | `JSONRESUME_URL`    | ❌       | URL to JSON Resume file      |
   | `LINKEDIN_USERNAME` | ❌       | LinkedIn username            |
   | `TELEGRAM_USERNAME` | ❌       | Telegram username            |
   | `BASE_PATH`         | ❌       | Base path for subdirectory   |
   | `CUSTOM_DOMAIN`     | ❌       | Custom domain                |

2. **Enable Pages** — Settings → Pages → Source: "GitHub Actions"

3. **Deploy** — Push to `main` or trigger manually in Actions tab

Your site: `https://username.github.io` or `https://username.github.io/repo-name`

### Custom Domain

1. Add `CUSTOM_DOMAIN` secret with your domain
2. Configure DNS: CNAME → `username.github.io`
3. Wait for DNS propagation (up to 24h)

## JSON Resume

DevCard supports [JSON Resume](https://jsonresume.org/) format for CV data.

**Hosting options:**

- GitHub repository (raw file URL)
- [registry.jsonresume.org](https://registry.jsonresume.org/)
- GitHub Gist

**Example structure:**

```json
{
  "basics": {
    "name": "John Doe",
    "label": "Full Stack Developer",
    "email": "john@example.com",
    "summary": "Passionate developer..."
  },
  "work": [
    {
      "name": "Company",
      "position": "Senior Developer",
      "startDate": "2020-01-01",
      "highlights": ["Achievement 1", "Achievement 2"]
    }
  ],
  "education": [...],
  "skills": [...],
  "projects": [...]
}
```

Full schema: [jsonresume.org/schema](https://jsonresume.org/schema/)

## Templates

Switch templates via URL parameter:

```
?template=github   # Default GitHub-style layout
?template=bento    # Modern grid layout
?template=minimal  # Clean CV layout
```

Or set default in `site.config.js`:

```javascript
defaultTemplate: 'github';
```

## Auto-Updates

Site rebuilds automatically **daily at 00:00 UTC** to keep GitHub data fresh.

**Custom schedule** — Edit `.github/workflows/deploy.yml`:

```yaml
schedule:
  - cron: '0 */6 * * *' # Every 6 hours
  - cron: '0 0 * * 1' # Weekly on Monday
```

**Manual trigger** — Actions tab → "Deploy to GitHub Pages" → Run workflow

## Configuration

### Environment Variables

```env
# Required
GH_TOKEN=ghp_xxx              # GitHub API token
GH_USERNAME=username          # GitHub username

# Optional
JSONRESUME_URL=https://...    # JSON Resume URL
LINKEDIN_USERNAME=username    # LinkedIn profile
TELEGRAM_USERNAME=username    # Telegram handle
BASE_PATH=/repo-name          # For subdirectory deployment
CUSTOM_DOMAIN=example.com     # Custom domain
```

### Site Config

Edit `site.config.js`:

```javascript
export default {
	username: process.env.GH_USERNAME || 'your-username',
	defaultTemplate: 'github',
	basePath: process.env.BASE_PATH || '',
	customDomain: process.env.CUSTOM_DOMAIN || '',
	siteTitle: 'DevCard - Developer Portfolio',
	siteDescription: 'GitHub profile + CV in one portfolio'
};
```

## Tech Stack

- **Framework** — SvelteKit 2 + Svelte 5 Runes
- **Styling** — Tailwind CSS 4
- **Data** — GitHub GraphQL API + JSON Resume
- **Deploy** — GitHub Pages + Actions
- **Export** — html-to-image

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview

# Lint & format
npm run lint
npm run format
```

## Troubleshooting

**Build fails with "GH_TOKEN is required"**

- Add `GH_TOKEN` secret in repository settings

**Build fails with "User not found"**

- Check `GH_USERNAME` is valid

**Site shows 404**

- Verify Pages is enabled (Settings → Pages)
- Check workflow completed successfully (Actions tab)

**Data not updating**

- Check Actions tab for failed runs
- Manually trigger workflow to force update

**Custom domain not working**

- Verify DNS records are correct
- Wait up to 24h for DNS propagation
- Check `CUSTOM_DOMAIN` secret is set

## License

MIT License with commercial restriction — see [LICENSE](LICENSE) for details.

---

## About

DevCard is built with modern web technologies and open source tools:

- Based on [CheckMyGit](https://github.com/whoisyurii/checkmygit) by [@whoisyurii](https://github.com/whoisyurii)
- CV data powered by [JSON Resume](https://jsonresume.org/) open standard
- Built with [SvelteKit](https://kit.svelte.dev/) and [Tailwind CSS](https://tailwindcss.com/)
- Deployed on [GitHub Pages](https://pages.github.com/)

Special thanks to the open source community for making this possible.
