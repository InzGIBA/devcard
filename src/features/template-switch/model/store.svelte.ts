import type { TemplateType } from '$entities/portfolio/model/types';

// Template switching state using Svelte 5 runes
class TemplateSwitchState {
	// Current template
	template = $state<TemplateType>('github');

	// Methods
	setTemplate(template: TemplateType) {
		this.template = template;
	}

	// Load template from URL params
	loadFromParams(params: URLSearchParams) {
		const template = params.get('template');
		if (template && ['github', 'bento', 'minimal'].includes(template)) {
			this.template = template as TemplateType;
		}
	}

	// Generate URL param for current template
	toParam(): string | null {
		return this.template !== 'github' ? this.template : null;
	}

	reset() {
		this.template = 'github';
	}
}

// Export a singleton instance
export const templateSwitchState = new TemplateSwitchState();
