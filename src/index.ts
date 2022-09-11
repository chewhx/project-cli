#!/usr/bin/env node
import { copySync } from 'fs-extra';
import { join } from 'path';
import { CURRENT_DIR, QUESTIONS, TEMPLATE_PATH } from './constants';
import { prompt } from './lib/prompt';
import { renameDotFiles, renameProjectNameInPackageJson } from './utils/files';
import { tryGitInit } from './utils/git';

(async () => {
	const answers = await prompt(QUESTIONS);
	const { template, name } = answers;

	const templatePath = join(TEMPLATE_PATH, template);
	const targetPath = join(CURRENT_DIR, name.trim());

	// Copy template to targetPath
	copySync(templatePath, targetPath);

	// Rename dot files
	renameDotFiles(targetPath);

	// Render and write project name into package.json
	renameProjectNameInPackageJson(targetPath, name);

	// Git init
	tryGitInit(targetPath);
})();
