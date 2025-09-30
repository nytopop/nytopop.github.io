import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { execSync } from "child_process";

export default defineConfig({
  plugins: [tailwindcss()],

  define: {
    __GIT_VERSION__: JSON.stringify(
      execSync("git describe --always --dirty").toString("utf8").trim(),
    ),
  },
});
