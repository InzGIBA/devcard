<script lang="ts">
	import Dropdown from '$lib/components/ui/Dropdown.svelte';
	import type { TemplateType } from '$lib/types/portfolio';
	
	interface Props {
		template?: TemplateType;
		onTemplateChange?: (template: TemplateType) => void;
	}

	let { template = 'github', onTemplateChange }: Props = $props();

	const templateOptions = [
		{ value: 'github', label: 'GitHub Style', mobileLabel: 'GitHub' },
		{ value: 'bento', label: 'Bento Grid', mobileLabel: 'Bento' },
		{ value: 'minimal', label: 'Minimal' }
	];

	function handleTemplateChange(value: string) {
		onTemplateChange?.(value as TemplateType);
	}
</script>

<Dropdown
	options={templateOptions}
	value={template}
	onchange={handleTemplateChange}
/>
