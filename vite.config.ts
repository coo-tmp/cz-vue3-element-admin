import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')], // 指定icons路径
      symbolId: 'icon-[dir]-[name]', // symbolId格式
    }),
    Components({
      // 自动生成/components.d.ts
      dirs: ['src/components'], // 默认值（包含子孙目录）
      dts: true, // 默认值
    }),
    AutoImport({
      dts: 'src/auto-imports.d.ts', // 自定义路径（确保在tsconfig.json的include包含该文件）
      // dts: true, // 使用默认路径（自动生成/auto-imports.d.ts）

      eslintrc: {
        enabled: true,
      },

      vueTemplate: true, // Auto import inside Vue template
      imports: [
        'vue',
        // {
        //   // 自定义
        //   '@/utils/basic/DomUtil': [
        //     ['default', 'DomUtil'], // import DomUtil from '@/utils/basic/DomUtil';],
        //   ],
        // },
      ],
      dirs: [
        // 'src/utils', // only root modules
        'src/utils/**', // all nested modules
        'src/types/**',
        'src/stores/modules/**',
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    // CSS 预处理器
    preprocessorOptions: {
      //define global scss variable
      scss: {
        javascriptEnabled: true,
        additionalData: `@use "@/layouts/scss/index.scss" as *;`, // 默认scss文件
      },
    },
  },
});
