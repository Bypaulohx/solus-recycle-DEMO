import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
  base: '/solus-recycle-DEMO/',
  build: {
    manifest: true,
  },
  plugins: [
    tanstackRouter({ codeSplittingOptions: { addHmr: false, splitBehavior: () => [] }, generatedRouteTree: '.tanstack/routeTree.gen.ts' }),
    ...tanstackStart(),
    react(),
    tsconfigPaths(),
    tailwindcss(),
  ],
  server: { hmr: { overlay: false } },
});
