/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  semi: true,
  singleQuote: true,
  quoteProps: 'consistent',
  jsxSingleQuote: false,
  trailingComma: 'all',
  arrowParens: 'always',
  proseWrap: 'always', // markdown
  endOfLine: 'lf',
  printWidth: 100,
};

export default config;
