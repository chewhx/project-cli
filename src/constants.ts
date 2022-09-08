import { readdirSync } from 'fs-extra';
import { QuestionCollection } from 'inquirer';

export const TEMPLATE_PATH = 'templates';
export const TEMPLATE_PRESETS: string[] = readdirSync(TEMPLATE_PATH);
export const CURRENT_DIR: string = process.cwd();

export interface TAnswers {
	template: string;
	name: string;
	packagemanager: 'npm' | 'yarn';
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
	},
	{
		name: 'packagemanager',
		type: 'list',
		message: 'Select package manager:',
		choices: ['npm', 'yarn'],
		default: 'npm',
	},
];
