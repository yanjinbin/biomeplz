import "@/App.css";
import Loading from "@/component/loading/index.jsx";
import { generateRoutes } from "@/store/reducer/permitSlice.jsx";
import { getUserInfoAsync } from "@/store/reducer/userSlice.js";
import { getAK } from "@/util/auth.js";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";

const App = () => {
	const dispatch = useDispatch();
	const routes = useSelector((state) => state.permit.routes);
	const navigate = useNavigate();
	const location = useLocation();
	useEffect(() => {
		const fetchData = async () => {
			if (getAK()) {
				const useInfo = await dispatch(getUserInfoAsync());
				dispatch(generateRoutes(useInfo.menus));
				return;
			}
			navigate("/login", { replace: true, state: { preLocation: location } });
			return;
		};
		fetchData();
	}, [dispatch, navigate, location]);

	const elements = useRoutes(routes);
	return (
		<>
			<Suspense fallback={<Loading />}>{routes && elements}</Suspense>
		</>
	);
};

export default App;
