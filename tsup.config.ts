import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src'],
	outDir: 'dist',
	format: ['esm', 'cjs'],
	clean: true,
	treeshake: true,
	dts: true,
});
