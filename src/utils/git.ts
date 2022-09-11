import { execSync } from 'child_process';

export function tryGitInit(targetPath: string) {
	execSync(`cd ${targetPath} && git init`, { stdio: 'ignore' });
	execSync(`cd ${targetPath} && git add -A`, { stdio: 'ignore' });
	execSync(`cd ${targetPath} && git commit -m "Initial commit"`, {
		stdio: 'ignore',
	});
}
