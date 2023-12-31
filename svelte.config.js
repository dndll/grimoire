import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { loadEnv } from 'vite'

const packagePath = fileURLToPath(new URL('package.json', import.meta.url));
const packageJson = readFileSync(packagePath, 'utf-8');
const PKG = JSON.parse(packageJson);

/** @type {import('./src/lib/utils/vite.js').BuildEnv} */
const env = loadEnv(process.env['NODE_ENV'] ?? 'development', process.cwd())

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess({
		postcss: true
	}),

	kit: {
		adapter: adapter(),
		paths: {
			base: env.VITE_BASE,
		},
		version: { name: PKG.version }
	}
};

export default config;
