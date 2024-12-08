import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import store from "@/store/index.js";
import { login, logout } from "@/store/reducer/userSlice.js";
import { setResponseInterceptor } from "@/util/request.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

// 设置axios的响应拦截器
setResponseInterceptor(store, login, logout);
createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
);
