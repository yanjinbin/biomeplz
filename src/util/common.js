import SvgIcon from "@/component/svgIcon/index.jsx";

/**
 * 获取路由的面包屑对象
 * @param {Array} routes 路由数组
 * @returns {Object} 面包屑路径对象，例如：{"/home": "首页"}
 */
export const getBreadcrumbNameMap = (routes) => {
	const breadcrumbMap = { "/home": "首页" };

	const buildMap = (routes) => {
		for (const { path, menuPath, title, children } of routes) {
			const key = menuPath || `/${path}`;
			breadcrumbMap[key] = title;
			if (children) buildMap(children);
		}
	};

	buildMap(routes);
	return breadcrumbMap;
};

/**
 * 构造菜单项
 * @param {string} label 菜单项标签
 * @param {string} key 菜单项键值
 * @param {JSX.Element} icon 菜单项图标
 * @param {Array} [children] 子菜单项
 * @returns {Object} 菜单项对象
 */
const createMenuItem = (label, key, icon, children) => ({
	key,
	icon,
	children,
	label,
});

/**
 * 生成侧边栏菜单树
 * @param {Array} menuData 路由数组
 * @returns {Array} 菜单项数组
 */
export const getTreeMenu = (menuData) => {
	const menuItems = [];

	if (!menuData || menuData.length === 0) return menuItems;

	for (const { title, path, menuPath, icon, children, hidden } of menuData) {
		if (hidden) continue;

		const resolvedPath = menuPath || `/${path}`;
		const menuIcon = (
			<SvgIcon name={icon || "component"} width="14" height="14" color="#ccc" />
		);

		if (children) {
			menuItems.push(
				createMenuItem(title, resolvedPath, menuIcon, getTreeMenu(children)),
			);
		} else {
			menuItems.push(createMenuItem(title, resolvedPath, menuIcon));
		}
	}

	return menuItems;
};
