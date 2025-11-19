import antfu from "@antfu/eslint-config";

export default antfu(
  {
    type: "app",
    react: true,
    typescript: true,
    formatters: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
    },
  },
  {
    rules: {
      "ts/no-redeclare": "off",
      "ts/consistent-type-definitions": ["error", "type"],
      "no-console": ["warn"], // 开发 warn，生产环境 error
      "antfu/no-top-level-await": ["off"],
      "node/prefer-global/process": ["off"],
      "node/no-process-env": ["error"],
      "perfectionist/sort-imports": ["error", {
        "type": "natural",          // 自然排序：a < A < b < B
        "groups": [],               // 不分组 → 不产生空行
        "newlines-between": "never",// 禁止在 import 之间空行
        "order": "asc"
      }],
      "unicorn/filename-case": [
        "error",
        {
          cases: {
            kebabCase: true,
            pascalCase: true,
            camelCase: true,
          },
          ignore: ["README.md"],
        },
      ],
    },
  },
);
