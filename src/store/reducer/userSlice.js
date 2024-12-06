import userApi from "@/api/user/index.js";
import { getAK, getRK, removeAK, removeRK, setAK, setRK } from "@/util/auth.js";
import { createSlice } from "@reduxjs/toolkit";
// 导入加载用户路由的方法
import { generateRoutes } from "./permitSlice.js";

/**
 * 创建一个用户状态切片
 */
// 声明一个用户切片, 用于用户相关的全局状态管理
const userSlice = createSlice({
	// 切片名字
	name: "user",
	// 状态初始值
	initialState: () => {
		// 如果localStorage中有从其中取，否则为null
		const token = getAK() || null;
		const refreshToken = getRK() || null;

		// 用户初始状态
		return {
			token,
			refreshToken,
			userinfo: { avatar: null },
		};
	},
	// 操作状态的方法
	reducers: {
		//  localstorage和state 都需要 持久化 rk和ak
		login(state, action) {
			state.token = action.payload.token;
			state.refreshToken = action.payload.refreshToken;
			// 将数据持久化
			setAK(state.token);
			setRK(state.refreshToken);
		},
		setUserinfo(state, action) {
			const { payload } = action;
			state.userinfo = payload;
		},
		logout(state, _action) {
			state.token = null;
			state.refreshToken = null;
			state.userinfo = { avatar: null };
			// 移除存储中的信息
			removeAK();
			removeRK();
		},
	},
});
// 导出经过redux包装的action对象
export const { login, setUserinfo, logout } = userSlice.actions;

// 基于用户状态封装的方法
// 用户登录
export const loginAsync = (payload) => async (dispatch) => {
	const { data } = await userApi.login.login(payload);
	dispatch(login(data));
	const userinfo = await dispatch(getUserInfoAsync());
	dispatch(generateRoutes(userinfo.menus));
};

// 异步获取用户信息
export const getUserInfoAsync = () => async (dispatch) => {
	const { data } = await userApi.center.get();
	dispatch(
		setUserinfo({
			...data,
			avatar: data.avatar
				? `${process.env.React_APP_IMG_API}/${data.avatar}`
				: null,
		}),
	);
	return data;
};
// 导出切片对象
export default userSlice;
