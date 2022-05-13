import { configureStore } from "@reduxjs/toolkit";
import projectsSlice from "./projects.slice";

const store = configureStore({ reducer: { projects: projectsSlice } });
export default store;
