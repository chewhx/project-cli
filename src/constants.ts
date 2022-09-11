import { existsSync } from 'fs';
import { readdirSync } from 'fs-extra';
import { QuestionCollection } from 'inquirer';
import { join } from 'path';

export const TEMPLATE_PATH: string = join(__dirname, '..', 'templates');
export const TEMPLATE_PRESETS: string[] = readdirSync(TEMPLATE_PATH);
export const CURRENT_DIR: string = process.cwd();

export const DOT_FILES_TO_RENAMES = ['gitignore', 'eslintrc.js', 'prettierrc'];

export interface TAnswers {
	template: string;
	name: string;
}

// Detect process.argv[2] for default package name
const [, , argvProjectName] = process.argv;

export const QUESTIONS: QuestionCollection<TAnswers> = [
	{
		name: 'template',
		type: 'list',
		message: 'Select project template:',
		choices: TEMPLATE_PRESETS,
	},
	{
		name: 'name',
		type: 'input',
		message: 'Project name:',
		default: argvProjectName,
		validate: (_input: string) => {
			const input = _input.trim();

			if (existsSync(join(CURRENT_DIR, input))) {
				return `Folder already exists. Delete or use another name.`;
			}

			if (!input || !input.length) {
				return 'Please provide a valid project name';
			}
			return true;
		},
	},
];
