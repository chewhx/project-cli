#!/usr/bin/env node
import { existsSync, copySync, readFileSync, writeFileSync } from 'fs-extra';
import { join } from 'path';
import { createPromptModule } from 'inquirer';
import { red } from 'chalk';
import { renderPackageJson } from './utils/renderPackageJson';
import { postProcess } from './utils/postProcess';
import * as ora from 'ora';
import { CURRENT_DIR, QUESTIONS, TEMPLATE_PATH } from './constants';

const prompt = createPromptModule();

(async () => {
	const answers = await prompt(QUESTIONS);

	const { template, name, packagemanager } = answers;

	const templatePath = join(TEMPLATE_PATH, template);
	const targetPath = join(CURRENT_DIR, name);

	// Check if holder already exists
	if (existsSync(targetPath)) {
		console.log(
			red(`Folder ${targetPath} exists. Delete or use another name.`)
		);
	}

	// Copy template to targetPath
	copySync(templatePath, targetPath);

	// Render and write project name into package.json
	const targetPackageJsonPath = join(targetPath, 'package.json');
	const targetPackageJsonContent = readFileSync(targetPackageJsonPath, 'utf-8');
	const newPackageJsonContents = renderPackageJson(targetPackageJsonContent, {
		projectName: name,
	});
	writeFileSync(targetPackageJsonPath, newPackageJsonContents);

	// Package manager install and git init
	const spinner = ora('   Installing project dependencies...');
	spinner.start();
	postProcess(targetPath, packagemanager);
	spinner.succeed(
		`   Generated project "${name}" with 📐templates/${template}`
	);
})();
