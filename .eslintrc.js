module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
        "extends": [
            "airbnb-base",
            "prettier"
        ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "no-restricted-globals": [0],
        "camelcase": [0, {"properties": "never"}],
        "array-callback-return" : [0]
        // "camelcase": ["error", {properties: "never"}]
    }
};
