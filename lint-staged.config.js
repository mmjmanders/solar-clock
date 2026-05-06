/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{css,html,js,json,svg,ts,vue,yml,yaml}': 'prettier -w --no-error-on-unmatched-pattern',
}
