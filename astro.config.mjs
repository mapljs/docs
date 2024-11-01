// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "load",
  },

  integrations: [
    starlight({
      title: "Mapl",
      social: {
        github: "https://github.com/mapljs/app",
      },
      sidebar: [
        {
          label: "Guides",
          autogenerate: { directory: "guides" },
        },
      ],

      customCss: ["./src/styles/globals.css"],
      expressiveCode: {
        themes: ["catppuccin-frappe", "catppuccin-latte"],
      },
    }),

    tailwind(),
  ],
});
