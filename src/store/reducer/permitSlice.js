import constantRoutes from "@/router/router.js";
import { createSlice } from "@reduxjs/toolkit";
import { lazy } from "react";
import { Navigate } from "react-router-dom";

const permitSlice = createSlice({
	name: "permit",
	initialState: {
		routes: constantRoutes,
		permitRoutes: [],
	},
	reducers: {
		setRoutes(state, action) {},
		setPermitRoutes(state, action) {},
	},
});
