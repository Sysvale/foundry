// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './vitest.setup.ts',
		include: ['tests/**/*.test.ts'],
	},
	build: {
		lib: {
			entry: 'src/index.ts',
			name: 'Foundry',
			formats: ['es', 'cjs'],
			fileName: format => `foundry.${format}.js`,
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
});
