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
        {
          label: "Advanced",
          autogenerate: { directory: "advanced" },
        },
      ],

      expressiveCode: {
        themes: ["catppuccin-frappe", "catppuccin-latte"],
      },
      head: [
        {
          tag: "style",
          content: `
            @media (min-width: 800px) {
              .sl-link-button {
                padding: 0.5rem 1.2rem 0.5rem 1.3rem !important;
                border-radius: 24px !important;
                font-size: 15px !important;
              }
            }
          `,
        },
      ],
    }),

    tailwind(),
  ],
});
