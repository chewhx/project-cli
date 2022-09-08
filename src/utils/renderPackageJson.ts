import * as ejs from 'ejs';

export interface TemplateData {
	projectName: string;
}

export function renderPackageJson(content: string, data: TemplateData) {
	return ejs.render(content, data);
}
