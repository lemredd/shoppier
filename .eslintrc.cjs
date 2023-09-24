module.exports = {
	"root": true,
	"env": { "browser": true, "es2020": true },
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended-type-checked",
		"plugin:react-hooks/recommended",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"next/core-web-vitals"
	],
	"ignorePatterns": ["dist", ".eslintrc.cjs"],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json', './tsconfig.node.json'],
		tsconfigRootDir: __dirname,
	},
	"settings": {
		"react": {
			"version": "detect"
		}
	},
	"plugins": ["react-refresh"],
	"rules": {
		"max-lines": "warn",
		"indent": [
			"error",
			"tab",
			{
				"SwitchCase": 1
			}
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"quote-props": ["error", "always"],
		"require-await": "error",
		"semi": [
			"error",
			"always"
		],
		"no-unused-vars": "off",
		"space-before-function-paren": ["error", "never"],
		"object-curly-spacing": ["error", "always"],

		// React
		"react-refresh/only-export-components": [
			"warn",
			{ "allowConstantExport": true },
		],

		// typescript-eslint
		"@typescript-eslint/no-unused-vars": [
			"error",
			{ "argsIgnorePattern": "^unused|_", "varsIgnorePattern": "^unused|_" }
		],
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/naming-convention": [
			"error",
			{
				"selector": "variable",
				"format": ["snake_case", "UPPER_CASE"]
			}
		],
		"@typescript-eslint/explicit-function-return-type": "error",

	},
};
