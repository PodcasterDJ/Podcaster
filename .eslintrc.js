module.exports = {
    root: true,
    env: {
        node: true
    },
    eslintConfig: {
        root: true,
        extends: [
            "plugin:vue/essential",
            "plugin:prettier/recommended",
            "eslint:recommended"
        ]
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "global-require": "off",
        "no-new": 0, // Intrusive when using Chart.js instances.
        "no-underscore-dangle": 0, // Chart.js uses underscore dangles (_) internally.
        "import/no-unresolved": 0, // False positives regarding imports that use aliases.
        "vue/script-indent": [
            "warn",
            2,
            {
                baseIndent: 1
            }
        ]
    },
    overrides: [
        {
            files: ["*.vue"],
            rules: {
                "max-len": "off"
            }
        }
    ],
    parserOptions: {
        parser: "babel-eslint"
    }
};
