import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import babel from 'rollup-plugin-babel';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/scripts/app.js',
	output: {
		format: 'iife', // immediately-invoked function expression — suitable for <script> tags
		file: 'public/app.js',
	},
	plugins: [
		resolve(),
		babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
		commonjs(), // converts date-fns to ES modules
		production && uglify(), // minify, but only in production
		!production && serve(),
		!production && livereload(),
	],
	sourcemap: true,
};
