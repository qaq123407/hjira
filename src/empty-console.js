// src/empty-console.js
export default {
  // 模拟 console 常用方法，避免导入报错
  log: () => {},
  error: () => {}, // 关键：添加 error 方法导出
  warn: () => {},
  info: () => {},
  debug: () => {},
};