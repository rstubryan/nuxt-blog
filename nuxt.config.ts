import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@components": fileURLToPath(
          new URL("./app/components", import.meta.url),
        ),
        "@composables": fileURLToPath(
          new URL("./app/composables", import.meta.url),
        ),
        "@assets": fileURLToPath(new URL("./app/assets", import.meta.url)),
        "@layouts": fileURLToPath(new URL("./app/layouts", import.meta.url)),
        "@pages": fileURLToPath(new URL("./app/pages", import.meta.url)),
        "@middleware": fileURLToPath(
          new URL("./app/middleware", import.meta.url),
        ),
        "@utils": fileURLToPath(new URL("./app/utils", import.meta.url)),
        "@lib": fileURLToPath(new URL("./app/lib", import.meta.url)),
      },
    },
  },

  runtimeConfig: {
    public: {
      baseApiUrl: process.env.NUXT_BASE_API_URL || "http://localhost:8000/api",
    },
  },

  modules: ["shadcn-nuxt", "@nuxt/eslint"],
  shadcn: {
    prefix: "",
    componentDir: "./app/components/ui",
  },
});