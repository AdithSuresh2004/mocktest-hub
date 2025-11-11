declare module "@tailwindcss/vite" {
  import type { Plugin } from "vite";
  const tailwindcss: () => Plugin;
  export default tailwindcss;
}

declare module "vite-plugin-compression" {
  import type { Plugin } from "vite";
  const viteCompression: (options?: any) => Plugin;
  export default viteCompression;
}

declare module "vite-plugin-commonjs" {
  import type { Plugin } from "vite";
  const commonjs: (options?: any) => Plugin;
  export default commonjs;
}
