import { createSlice } from "@reduxjs/toolkit";

const projectsSlice = createSlice({
  name: "projects",
  initialState: { projects: [], project: {} },
  reducers: {
    getProjects(state, action) {
      console.log(action, "act");
      return { ...state, projects: action.payload };
    },
  },
});

export const { getProjects } = projectsSlice.actions;

export default projectsSlice.reducer;
