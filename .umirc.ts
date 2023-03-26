import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/login', component: '@/pages/Login' },
    { path: '/back', component: '@/layouts/BackLayout' },
  ],
  fastRefresh: {},
  title: '项目管理系统1.0',
  proxy: { '/project': { target: 'http://localhost:8082', changeOrigin: true } },
  /*
  部署时打开注释
  base:页面路由前缀
  publicPath:css、js、图片等静态资源文件的前缀
 */
  // base: '/project/',
  // publicPath: '/project/',
});
