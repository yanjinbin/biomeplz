import permitSlice from "@/store/reducer/permitSlice.js";
import tabSlice from "@/store/reducer/tabSlice.js";
import userSlice from "@/store/reducer/userSlice.js";
import { configureStore, createStore } from "@reduxjs/toolkit";

const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		permit: permitSlice.reducer,
		tab: tabSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			//关闭redux序列化检测
			serializableCheck: false,
		}),
});

export default store;
