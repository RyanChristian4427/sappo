module.exports =  {
    parser:  '@typescript-eslint/parser',
    extends:  [
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended'
    ],
    settings: {
        react: {
            version: "16.11"
        }
    },
    parserOptions:  {
        ecmaVersion:  2018,
        sourceType:  'module',
    },
    rules:  {
        "quotes": "off",
        "@typescript-eslint/quotes": ["warn", "single"],
        "@typescript-eslint/no-use-before-define": ["error", { "classes": false }],
        "arrow-parens": "warn",
        "@typescript-eslint/ban-ts-ignore": ["warn"],
        "@typescript-eslint/interface-name-prefix": "off",
        "semi": "off",
        "@typescript-eslint/semi": ["warn"]
    },
};
