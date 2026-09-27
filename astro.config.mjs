// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://andymcdonald.scot",
  base: "/",
  // The blog used to be paginated; it is one page now
  redirects: {
    "/blog/2": "/blog",
  },
});
