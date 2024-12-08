import Layout from "@/layout/component/layout.jsx";
import NotFound from "@/page/404/index.jsx";
import Home from "@/page/home/index.jsx";
import Login from "@/page/login/index.jsx";
import { Navigate } from "react-router-dom";

const constantRoutes = [
	{ path: "login", title: "登录", element: <Login /> },
	{
		path: "/",
		title: "首页",
		hidden: true,
		element: <Layout />,
		children: [
			{ index: true, element: <Navigate to={"/home"} replace /> },
			// hidden:false代表要显示在侧边导航栏，其余皆不显示
			{ path: "home", title: "首页", element: <Home />, hidden: false },
		],
	},
	{ path: "*", title: "404页面", element: <NotFound /> },
];
export default constantRoutes;
