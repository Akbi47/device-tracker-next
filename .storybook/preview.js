import "../src/styles/globals.scss";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { WithNextRouter } from "storybook-addon-next-router/dist/decorators";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

export const decorators = [WithNextRouter];
