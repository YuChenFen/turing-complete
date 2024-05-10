import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import { resolve } from "path";

const pathReslove = (path) => resolve(process.cwd(), path);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [pathReslove('src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    })
  ],
  base: '/tlwb'
})
