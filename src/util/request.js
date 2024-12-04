import { getAK, setAK, setRK } from "@/util/auth.js";
import Axios from "axios";

import { message } from "antd";

const TIME_OUT = 2000; //ms单位

const Authorization = "Authorization";

const RefreshTokenUrl = "http://127.0.0.1:9999/user/refreshToken";

const BaseUrl = import.meta.env.MODE === "production" ? "" : "/api";

let isRefreshing = false;
let requests = [];
const instance = Axios.create({
	baseURL: BaseUrl,
	timeout: TIME_OUT,
});

// login, sms, check code, rk
const whitelistUrls = [
	"/user/login",
	"/user/check_code",
	"/user/refresh_token",
	"/user/sms",
];

instance.interceptors.request.use(
	(config) => {
		const { url, headers } = config;
		if (typeof url === "string" && !whitelistUrls.includes(url)) {
			const ak = getAK();
			if (ak && ak.length > 0 && headers) {
				headers[Authorization] = ak;
			}
		}
		return config;
	},
	(error) => {
		console.error("请求拦截器错误:", error.message || error);
		return Promise.reject(error);
	},
);

export function setResponseInterceptor(store, login, logout) {
	// 是否正在刷新的标记
	const isRefreshing = false;
	// 重试队列，每一项将是一个待执行的函数形式
	const requests = [];
	// 添加响应拦截器
	instance.interceptors.response.use(
		(response) => {
			if (response.config.responseType === "blob") {
				// 处理blob类型 http 请求
				return handleBlobResponse(response);
			}
			// 处理 application/json请求
			return handleJsonResponse(
				response,
				store,
				login,
				logout,
				requests,
				isRefreshing,
			);
		},
		(error) => {
			return Promise.reject(error);
		},
	);
}

function handleBlobResponse(response) {
	if (response.status !== 200) {
		message.error("请求失败=>\t", response.status);
		return Promise.reject();
	}
	if (!response.headers["content-disposition"]) {
		message.error("暂无接口访问权限");
		return Promise.reject();
	}
	return response;
}

function handleJsonResponse(response, store, login, logout, requests) {
	if (response.data.code === 0) {
		return response.data;
	}

	const errMsg = response.data.message || "系统错误";
	// http 401 not authorized , token 过期了
	if (response.data.code === 401) {
		return handleTokenExpiration(response, store, login, logout, requests);
	}
	message.error(errMsg);
	return Promise.reject(errMsg);
}

function handleTokenExpiration(response, store, login, logout, requests) {
	const config = response.config;
	if (!isRefreshing) {
		isRefreshing = true;
		return refreshToken(store, login, logout, requests, config, isRefreshing);
	}
	// 处于刷新refresh token 状态, 入列刷新请求队列
	return queueRequestForRetry(config, requests);
}

function refreshToken(store, login, logout, config) {
	return Axios({
		// rk 刷新access token
		url: RefreshTokenUrl,
		method: "POST",
		data: { refreshToken: store.getState().user.refreshToken },
	})
		.then((res) => {
			const { token, refreshToken } = res.data.data;
			store.dispatch(login({ token, refreshToken }));
			setAK(token);
			setRK(refreshToken);
			for (const cb of requests) {
				cb(token);
			}
			requests = [];
			return instance({
				...config,
				headers: {
					...config.headers,
					Authorization: token,
				},
			});
		})
		.catch((e) => {
			store.dispatch(logout());
			console.log(e.message);
			window.location.href = "/login";
		})
		.finally(() => {
			isRefreshing = false;
		});
}

function queueRequestForRetry(config, requests) {
	return new Promise((resolve) => {
		requests.push((token) => {
			config.baseURL = "/api";
			if (config.headers) {
				config.headers[Authorization] = token;
			}
			resolve(
				instance({
					...config,
					headers: {
						...config.headers,
						Authorization: token,
					},
				}),
			);
		});
	});
}

export default instance;
