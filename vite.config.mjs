import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteMockServe } from "vite-plugin-mock";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

const version = require("./package.json").version;
// 支持构建命令传入构建版本
const versionName = process.env.VERSION_NAME || version;
// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		viteMockServe({
			// 是 项目根目录 不是src
			mockPath: "mock",
		}),

		// 注册所有的svg文件生成svg雪碧图
		createSvgIconsPlugin({
			iconDirs: [resolve(process.cwd(), "src/assets/Icon/svg")], // icon存放的目录
			symbolId: "[name]",
			inject: "body-last", // 插入的位置
			customDomId: "__svg__icons__dom__", // svg的id
		}),
	],
	envDir: "env",
	server: {
		host: "0.0.0.0",
		cors: true,
		port: 5173,
		strictPort: true,
		open: true,
		proxy: {
			"^/api": {
				target: "http://127.0.0.1:9999", // 真实接口地址, 后端给的基地址
				changeOrigin: true, // 允许跨域
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
			"^/stat": {
				target: "http://127.0.0.1:9004", // 真实接口地址, 后端给的基地址
				changeOrigin: true, // 允许跨域
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},

	build: {
		manifest: true,
		assetsDir: `./${versionName}`, // 版本号
		sourcemap: true,
	},
	esbuild: {
		drop: ["console", "debugger"],
	},

	css: {
		devSourcemap: true,
		modules: {
			// kebab-case(foo.module.scss) -> camelCase(foo.jsx)
			localsConvention: "camelCase",
		},
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
			// '@': '/src',
		},
		extensions: [".js", ".mjs", ".vue", ".json", ".less", ".scss", ".css"],
	},
	test: {
		dir: "__test__", // 测试文件夹
	},
});
