import { readdirSync, readFileSync, renameSync, writeFileSync } from 'fs-extra';
import { join } from 'path';
import { DOT_FILES_TO_RENAMES } from '../constants';

export function renameDotFiles(targetPath: string) {
	const files = readdirSync(targetPath);

	const toRename = files.filter((e) => DOT_FILES_TO_RENAMES.includes(e));

	toRename.forEach((name) => {
		const oldPath = join(targetPath, name);
		const newPath = join(targetPath, `.${name}`);
		renameSync(oldPath, newPath);
	});
}

export function renameProjectNameInPackageJson(
	targetPath: string,
	name: string
) {
	const packageJsonFilePath = join(targetPath, 'package.json');
	const packageContents = JSON.parse(
		readFileSync(packageJsonFilePath, 'utf-8')
	);

	packageContents.name = name;

	writeFileSync(packageJsonFilePath, JSON.stringify(packageContents, null, 2));
}
