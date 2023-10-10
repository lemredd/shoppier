import { defineConfig } from "cypress";

export default defineConfig({
	"component": {
		"devServer": {
			"framework": "next",
			"bundler": "webpack",
		},
		"specPattern": [
			//"./cypress/component/**/*.test.{ts,tsx}",
			"./app/**/*[^page].test.tsx",
		],
		"screenshotOnRunFailure": false,
		"video": false
	},

	"e2e": {
		"baseUrl": "http://localhost:7357",
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		"specPattern": [
			"./app/api/**/route.test.ts",
			"./app/**/page.test.tsx",
		],
		"screenshotOnRunFailure": false,
		"video": false
	},
});
