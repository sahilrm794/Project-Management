import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../configs/api";

// Expect caller to dispatch: dispatch(fetchWorkspaces({ getToken }))
export const fetchWorkspaces = createAsyncThunk(
  "workspace/fetchWorkspaces",
  async ({ getToken } = {}) => {
    try {
      const token = getToken ? await getToken() : null;
      const { data } = await api.get("/api/workspaces", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return data.workspaces || [];
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
      return [];
    }
  }
);

const initialState = {
  workspaces: [],
  currentWorkspace: null,
  loading: false,
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspaces: (state, action) => {
      state.workspaces = action.payload;
    },
    setCurrentWorkspace: (state, action) => {
      localStorage.setItem("currentWorkspaceId", action.payload);
      state.currentWorkspace = state.workspaces.find((w) => w.id === action.payload) || null;
    },
    addWorkspace: (state, action) => {
      state.workspaces.push(action.payload);
      if (state.currentWorkspace?.id !== action.payload.id) {
        state.currentWorkspace = action.payload;
      }
    },
    updateWorkspace: (state, action) => {
      state.workspaces = state.workspaces.map((w) =>
        w.id === action.payload.id ? action.payload : w
      );
      if (state.currentWorkspace?.id === action.payload.id) {
        state.currentWorkspace = action.payload;
      }
    },
    deleteWorkspace: (state, action) => {
      // assume action.payload is workspace id (id)
      state.workspaces = state.workspaces.filter((w) => w.id !== action.payload);
      if (state.currentWorkspace?.id === action.payload) {
        state.currentWorkspace = state.workspaces[0] || null;
      }
    },
    addProject: (state, action) => {
      // make sure currentWorkspace exists
      if (!state.currentWorkspace) return;
      state.currentWorkspace.projects = state.currentWorkspace.projects || [];
      state.currentWorkspace.projects.push(action.payload);

      state.workspaces = state.workspaces.map((w) =>
        w.id === state.currentWorkspace.id
          ? { ...w, projects: (w.projects || []).concat(action.payload) }
          : w
      );
    },
    addTask: (state, action) => {
      // expect action.payload: { projectId, ...task }
      if (!state.currentWorkspace) return;
      const { projectId } = action.payload;

      // update currentWorkspace
      state.currentWorkspace.projects = (state.currentWorkspace.projects || []).map((p) => {
        if (p.id === projectId) {
          p.tasks = p.tasks || [];
          p.tasks.push(action.payload);
        }
        return p;
      });

      // update workspace list
      state.workspaces = state.workspaces.map((w) =>
        w.id === state.currentWorkspace.id
          ? {
              ...w,
              projects: (w.projects || []).map((p) =>
                p.id === projectId ? { ...p, tasks: (p.tasks || []).concat(action.payload) } : p
              ),
            }
          : w
      );
    },
    updateTask: (state, action) => {
      // expect action.payload: full task with projectId and id
      if (!state.currentWorkspace) return;
      const { projectId, id } = action.payload;

      state.currentWorkspace.projects = (state.currentWorkspace.projects || []).map((p) => {
        if (p.id === projectId) {
          p.tasks = (p.tasks || []).map((t) => (t.id === id ? action.payload : t));
        }
        return p;
      });

      state.workspaces = state.workspaces.map((w) =>
        w.id === state.currentWorkspace.id
          ? {
              ...w,
              projects: (w.projects || []).map((p) =>
                p.id === projectId ? { ...p, tasks: (p.tasks || []).map((t) => (t.id === id ? action.payload : t)) } : p
              ),
            }
          : w
      );
    },
    deleteTask: (state, action) => {
      // expect action.payload = { projectId, taskIds: [id1, id2] }
      if (!state.currentWorkspace) return;
      const { projectId, taskIds } = action.payload;

      // update currentWorkspace
      state.currentWorkspace.projects = (state.currentWorkspace.projects || []).map((p) => {
        if (p.id === projectId) {
          p.tasks = (p.tasks || []).filter((t) => !taskIds.includes(t.id));
        }
        return p;
      });

      // update workspace list
      state.workspaces = state.workspaces.map((w) =>
        w.id === state.currentWorkspace.id
          ? {
              ...w,
              projects: (w.projects || []).map((p) =>
                p.id === projectId ? { ...p, tasks: (p.tasks || []).filter((t) => !taskIds.includes(t.id)) } : p
              ),
            }
          : w
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWorkspaces.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchWorkspaces.fulfilled, (state, action) => {
      state.workspaces = action.payload;
      if (action.payload.length > 0) {
        const localStorageCurrentWorkspaceId = localStorage.getItem("currentWorkspaceId");
        if (localStorageCurrentWorkspaceId) {
          // ensure same type (string) comparison, or coerce types as needed
          const findWorkspace = action.payload.find((w) => String(w.id) === String(localStorageCurrentWorkspaceId));
          if (findWorkspace) {
            state.currentWorkspace = findWorkspace;
          } else {
            state.currentWorkspace = action.payload[0];
          }
        } else {
          state.currentWorkspace = action.payload[0];
        }
      }
      state.loading = false;
    });
    builder.addCase(fetchWorkspaces.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {
  setWorkspaces,
  setCurrentWorkspace,
  addWorkspace,
  updateWorkspace,
  deleteWorkspace,
  addProject,
  addTask,
  updateTask,
  deleteTask,
} = workspaceSlice.actions;
export default workspaceSlice.reducer;
