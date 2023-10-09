import { defineConfig } from "cypress";

export default defineConfig({
	"component": {
		"devServer": {
			"framework": "next",
			"bundler": "webpack",
		},
		"specPattern": [
			"./cypress/component/**/*.test.{ts,tsx}",
			"./app/**/*.test.{ts,tsx}",
		],
		"screenshotOnRunFailure": false
	},
});
