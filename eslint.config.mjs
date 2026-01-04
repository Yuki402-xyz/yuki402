import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

const eslintConfig = defineConfig([
  ...nextVitals,

  // Global ignores
  globalIgnores([
    // Next.js
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',

    // Dependencies
    'node_modules/**',

    // Smart contracts
    'contracts/node_modules/**',
    'contracts/cache/**',
    'contracts/artifacts/**',

    // Build artifacts
    'dist/**',
    '.vercel/**'
  ]),

  // Custom rules
  {
    rules: {
      // React rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // General rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      'prefer-const': 'warn',
      'no-var': 'error',

      // Code quality
      'no-debugger': 'warn',
      'no-alert': 'warn',
      'no-duplicate-imports': 'error',

      // Formatting (handled by Prettier)
      indent: 'off',
      quotes: 'off',
      semi: 'off',
      'comma-dangle': 'off',
      'max-len': 'off',

      // Next.js specific
      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-img-element': 'warn'
    }
  },

  // React 19 specific overrides
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    rules: {
      'react/jsx-no-target-blank': ['warn', { allowReferrer: true }]
    }
  }
])

export default eslintConfig
