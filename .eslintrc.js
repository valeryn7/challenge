const config = {
  browser: true,
  es2021: true,
  extends: [
    "plugin:react/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./.eslintrc.js"],
  },
  plugins: ["react", "prettier"],
  rules: {"@typescript-eslint/triple-slash-reference": "off"},
};
module.exports = config;
