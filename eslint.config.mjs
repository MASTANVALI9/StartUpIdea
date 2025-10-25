import { FlatCompat } from '@eslint/eslintrc'
 
const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
})
 
const eslintConfig = [
  ...compat.config({
    extends: ['next'],
    plugins: ['import'],
  }),
  {
    rules: {
      // React rules - Keep minimal for flexibility
      'react/no-unescaped-entities': 'warn',
      '@next/next/no-img-element': 'warn',

      // TypeScript rules - Enable for production quality
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',

      // React Hooks - Enable for proper dependency management
      'react-hooks/exhaustive-deps': 'warn',

      // Import rules - Keep strict for clean imports
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/namespace': 'error',
      'import/no-absolute-path': 'error',
      'import/no-dynamic-require': 'error',
      'import/no-self-import': 'error',
      'import/no-cycle': 'warn',
      'import/no-useless-path-segments': 'error',

      // Additional production-ready rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
]
 
export default eslintConfig
