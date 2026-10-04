import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { projectApi } from '../../api/projectApi';
import { STORAGE_KEYS } from '../../constants/storage';
import { storageService } from '../../services/storageService';

async function cacheProjects(items) {
  await storageService.setJSON(STORAGE_KEYS.PROJECTS, items);
}

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (_, { rejectWithValue }) => {
  try {
    const items = await projectApi.fetchProjects();
    await cacheProjects(items);
    return items;
  } catch (error) {
    return rejectWithValue(error.message || 'Unable to load projects.');
  }
});

export const createProject = createAsyncThunk('projects/createProject', async (payload, { getState, rejectWithValue }) => {
  try {
    const item = await projectApi.createProject(payload);
    await cacheProjects([item, ...getState().projects.items]);
    return item;
  } catch (error) {
    return rejectWithValue(error.message || 'Unable to create project.');
  }
});

export const updateProject = createAsyncThunk('projects/updateProject', async ({ id, data }, { getState, rejectWithValue }) => {
  try {
    const item = await projectApi.updateProject(id, data);
    await cacheProjects(getState().projects.items.map((row) => (row.id === item.id ? item : row)));
    return item;
  } catch (error) {
    return rejectWithValue(error.message || 'Unable to update project.');
  }
});

export const deleteProject = createAsyncThunk('projects/deleteProject', async (id, { getState, rejectWithValue }) => {
  try {
    await projectApi.deleteProject(id);
    await cacheProjects(getState().projects.items.filter((row) => row.id !== id));
    return id;
  } catch (error) {
    return rejectWithValue(error.message || 'Unable to delete project.');
  }
});

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    items: [],
    selectedProject: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    hydrateProjects(state, action) {
      state.items = action.payload || [];
    },
    selectProject(state, action) {
      state.selectedProject = state.items.find((item) => item.id === action.payload) || null;
    },
    clearProjectStatus(state) {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        if (state.selectedProject) {
          state.selectedProject = action.payload.find((item) => item.id === state.selectedProject.id) || null;
        }
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [action.payload, ...state.items];
        state.selectedProject = action.payload;
        state.success = 'Project created.';
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map((item) => (item.id === action.payload.id ? action.payload : item));
        state.selectedProject = action.payload;
        state.success = 'Project updated.';
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        if (state.selectedProject?.id === action.payload) {
          state.selectedProject = null;
        }
        state.success = 'Project deleted.';
      });
  },
});

export const { hydrateProjects, selectProject, clearProjectStatus } = projectSlice.actions;
export default projectSlice.reducer;
