import { type Config } from 'prettier'

export default {
  semi: false,
  singleQuote: true,
  printWidth: 100,
  plugins: ['@prettier/plugin-xml'],
} satisfies Config
