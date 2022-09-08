import { exec, cd } from 'shelljs';

export function postProcess(
	targetPath: string,
	packageManager: 'npm' | 'yarn'
) {
	cd(targetPath);

	const result = exec(`${packageManager} install && git init`);

	if (result.code !== 0) {
		return false;
	}

	return true;
}
