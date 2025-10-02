import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { execSync } from "child_process";

export default defineConfig({
  plugins: [tailwindcss()],

  define: {
    __GIT_VERSION__: JSON.stringify(
      execSync("git describe --always --dirty").toString("utf8").trim(),
    ),
    __GIT_VERSION_CLEAN__: JSON.stringify(
      execSync("git describe --always").toString("utf8").trim(),
    ),
  },
});
