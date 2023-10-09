import { defineConfig } from "cypress";

export default defineConfig({
	"component": {
		"devServer": {
			"framework": "next",
			"bundler": "webpack",
		},
		"specPattern": [
			"./cypress/component/**/*.test.{ts,tsx}",
			"./app/**/*.component.test.{ts,tsx}",
		],
		"screenshotOnRunFailure": false,
	},

	"e2e": {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		"specPattern": [
			"./app/api/**/route.test.ts",
			"./app/**/page.test.tsx",
		]
	},
});
