/** @type {import("eslint").Linter.Config} */

const config = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "standard-with-typescript",
    "plugin:react/recommended",
    "plugin/prettier/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "@typescript-eslint/quotes": ["error", "double"],
    "@typescript-eslint/semi": "off",
    "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
    "@typescript-eslint/explicit-function-return-type": "off",
  },
  ignorePatterns: ["dist/", "node_modules/", ".eslintrc.cjs", "jest.config.js"],
};

module.exports = config;
