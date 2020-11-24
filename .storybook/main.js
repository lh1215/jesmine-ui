module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-viewport",
    "@storybook/addon-knobs",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-storysource",
  ],
};
