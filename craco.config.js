// 1. 仅引入必要的 3 个模块（path、CracoLessPlugin、Webpack 插件）
const path = require("path");
const CracoLessPlugin = require("craco-less");
const { NormalModuleReplacementPlugin } = require('webpack');

module.exports = {
  webpack: {
    alias: {
      // 你的原有别名配置（path 已正确引入）
      "@": path.resolve(__dirname, "src"),
    },
    plugins: [
      // 2. 处理 node: 协议（如 node:console → console）
      new NormalModuleReplacementPlugin(
        /^node:(.+)$/,
        (resource) => {
          resource.request = resource.request.replace(/^node:/, '');
        }
      ),
      // 3. 核心：用自定义空模块替代 console 模块（无需任何额外依赖）
      new NormalModuleReplacementPlugin(
        /^console$/, // 精准匹配 "console" 模块请求
        (resource) => {
          // 指向 src 目录下的 empty-console.js（你之前已创建）
          resource.request = path.resolve(__dirname, "src/empty-console.js");
        }
      ),
    ],
    // 注意：已删除所有包含 console-browserify 的 configure 配置！
  },
  devServer: {
    port: 3001, // 你的原有端口配置
  },
  plugins: [
    // 4. 你的原有 Less 配置（完全不变）
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "rgb(0, 82, 204)",
              "@font-size-base": "16px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};