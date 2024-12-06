import { getRK } from "@/util/auth.js";
import request from "@/util/request.js";

const userApi = {
	// 登陆
	login: {
		getCheckCode: getCheckCode,
		loginByPwd: loginByPwd,
		loginBySms: loginBySms,
		refreshAK: refreshToken,
	},
	center: {
		getUserinfo: getUserinfo,
		updateUserinfo: updateUserinfo,
	},
	manage: {},
};

function getCheckCode(uuid) {
	return request({
		url: `/user/checkCode?uuid=${uuid}`,
		method: "get",
	});
}

function loginByPwd({ email, password }) {
	return request({
		url: "/user/login/password",
		method: "post",
		data: { email, password },
	});
}

function loginBySms({ phone, sms }) {
	return request({
		url: "/user/login/sms",
		method: "post",
		data: { phone, sms },
	});
}

function refreshToken() {
	return request({
		url: "/user/refreshToken",
		method: "post",
		data: { refreshToken: getRK() },
	});
}

function getUserinfo() {
	return request({
		url: "/user/userinfo",
		method: "get",
	});
}

function updateUserinfo(data) {
	return request({
		url: "/user/userinfo",
		method: "put",
		data: data,
	});
}

export default userApi;
