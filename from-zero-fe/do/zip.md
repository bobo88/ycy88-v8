# 压缩 VUE

```ts
import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const result = id.substring(id.indexOf("node_modules"), id.length);
          if (result.includes("node_modules")) {
            if (result.includes("vue")) {
              return "vue"; // 其他 Vue 相关代码
            }
            if (result.includes("vue-router")) {
              return "vue-router"; // 单独拆分 vue-router
            }
            if (result.includes("pinia")) {
              return "pinia"; // 单独拆分 pinia
            }
            if (result.includes("axios")) {
              return "axios"; // 单独拆分 axios
            }
            if (result.includes("uuid")) {
              return "uuid"; // 单独拆分 uuid
            }
            if (result.includes("crypto-js")) {
              return "crypto-js"; // 单独拆分 crypto-js
            }
            if (result.includes("echarts")) {
              return "echarts"; // 单独拆分 echarts
            }
            if (result.includes("vue-simple-password-meter")) {
              return "vue-simple-password-meter"; // 单独拆分 vue-simple-password-meter
            }
            if (result.includes("vant")) {
              return "vant"; // 单独拆分 vant
            }
            if (result.includes("engine.io-parser")) {
              return "engine.io-parser"; // 单独拆分 engine.io-parser
            }
            if (result.includes("socket.io")) {
              return "socket.io"; // 单独拆分 socket.io
            }
            if (result.includes("zrender")) {
              return "zrender"; // 单独拆分 zrender
            }
            return "vendor"; // 其他依赖
          }
        },
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ["vue", "vue-router"],
      dts: "src/auto-imports.d.ts",
      eslintrc: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 配置 @ 指向 src 目录
    },
  },
  server: {
    proxy: {
      // xxx
    },
  },
});
```
