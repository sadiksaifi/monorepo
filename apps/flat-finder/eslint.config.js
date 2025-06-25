//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,
  {
    name: 'eslint-config-custom',
    ignores: ['**/dev-dist/**', '**/*.{js,jsx}'],
  },
]
