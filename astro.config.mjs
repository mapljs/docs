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

      expressiveCode: {
        themes: ["catppuccin-frappe", "catppuccin-latte"],
      },
      head: [
        {
          tag: "style",
          content: `
            @media (min-width: 615px) {
              .sl-link-button {
                padding-top: 0.5rem !important;
                padding-bottom: 0.5rem !important;
                padding-left: 1rem !important;
                padding-right: 1rem !important;
                font-size: 0.875rem !important;
                line-height: 1.25rem; !important;
              }
            }
          `,
        },
      ],
    }),

    tailwind(),
  ],
});
