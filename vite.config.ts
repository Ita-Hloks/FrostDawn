import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), tsconfigPaths(), babel({
    filter: /\.[jt]sx?$/,
    babelConfig: {
      presets: ["@babel/preset-typescript"],
      plugins: [["babel-plugin-react-compiler", {}]],
    },
  })],
  server: {
    port: 5177,
    host: "0.0.0.0",
  },
});
