import constantRoutes from "@/router/router.js";
import { createSlice } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";

const permitSlice = createSlice({
	name: "permit",
	initialState: {
		routes: constantRoutes,
		permitRoutes: [],
	},
	reducers: {
		setRoutes(state, action) {
			state.routes = constantRoutes.map((item) => {
				if (item.path === "/") {
					return {
						...item,
						children: item.children.concat(action.payload.routes),
					};
				}
				return item;
			});
		},
		setPermitRoutes(state, _action) {
			state.permitRoutes = state.payload.routes;
		},
	},
});

const filterAsyncRoutes = (routes) => {
	const res = routes.map((route) => {
		const Component = route.component === "Layout" ? null : route.component;
		const transformedRoute = {
			path: route.path,
			menuPath: route.menuPath,
			// 必须大写哦
			element: Component ? <Component /> : null,
			redirect: route.redirect,
			title: route.title,
			hidden: !!Number(route.hidden),
			icon: route.icon || null,
			children: route.children ? filterAsyncRoutes(route.children) : undefined,
		};

		// 如果存在 redirect 属性且有子路由，则插入一个重定向路由
		if (route.redirect && transformedRoute.children) {
			transformedRoute.children = [
				{ index: true, element: <Navigate to={route.redirect} replace /> },
				...transformedRoute.children,
			];
		}
		return transformedRoute;
	});
	return res;
};

export const { setRoutes, setPermitRoutes } = permitSlice.actions;

export const generateRoutes = (payload) => (dispatch) => {
	const accessedRoutes = filterAsyncRoutes(payload);
	dispatch(setRoutes({ routes: accessedRoutes }));
	dispatch(setPermitRoutes({ routes: accessedRoutes }));
	return accessedRoutes;
};

export default permitSlice;
