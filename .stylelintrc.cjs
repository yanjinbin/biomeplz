module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-scss',
    'stylelint-prettier/recommended'
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'layer',
        ],
      },
    ],
  }
}
