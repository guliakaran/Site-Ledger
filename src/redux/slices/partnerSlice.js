import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { partnerApi } from '../../api/partnerApi';
import { STORAGE_KEYS } from '../../constants/storage';
import { storageService } from '../../services/storageService';

async function cachePartners(items, assignments) {
  await storageService.setJSON(STORAGE_KEYS.PARTNERS, items);
  if (assignments) {
    await storageService.setJSON(STORAGE_KEYS.PROJECT_PARTNERS, assignments);
  }
}

export const fetchPartners = createAsyncThunk('partners/fetchPartners', async (_, { rejectWithValue }) => {
  try {
    const items = await partnerApi.fetchPartners();
    await storageService.setJSON(STORAGE_KEYS.PARTNERS, items);
    return items;
  } catch (error) {
    return rejectWithValue(error.message || 'Unable to load partners.');
  }
});

export const createPartner = createAsyncThunk('partners/createPartner', async (payload, { getState, rejectWithValue }) => {
  try {
    const item = await partnerApi.createPartner(payload);
    await cachePartners([item, ...getState().partners.items]);
    return item;
  } catch (error) {
    return rejectWithValue(error.message || 'Unable to create partner.');
  }
});

export const updatePartner = createAsyncThunk('partners/updatePartner', async ({ id, data }, { getState, rejectWithValue }) => {
  try {
    const item = await partnerApi.updatePartner(id, data);
    await cachePartners(getState().partners.items.map((row) => (row.id === item.id ? item : row)));
    return item;
  } catch (error) {
    return rejectWithValue(error.message || 'Unable to update partner.');
  }
});

export const deletePartner = createAsyncThunk('partners/deletePartner', async (id, { getState, rejectWithValue }) => {
  try {
    await partnerApi.deletePartner(id);
    const state = getState().partners;
    await cachePartners(
      state.items.filter((row) => row.id !== id),
      state.projectPartners.filter((row) => row.partnerId !== id),
    );
    return id;
  } catch (error) {
    return rejectWithValue(error.message || 'Unable to delete partner.');
  }
});

export const fetchProjectPartners = createAsyncThunk(
  'partners/fetchProjectPartners',
  async (params, { rejectWithValue }) => {
    try {
      const items = await partnerApi.fetchProjectPartners(params);
      await storageService.setJSON(STORAGE_KEYS.PROJECT_PARTNERS, items);
      return items;
    } catch (error) {
      return rejectWithValue(error.message || 'Unable to load project partners.');
    }
  },
);

export const assignPartner = createAsyncThunk('partners/assignPartner', async (payload, { getState, rejectWithValue }) => {
  try {
    const item = await partnerApi.assignPartner(payload);
    const state = getState().partners;
    await cachePartners(state.items, [item, ...state.projectPartners]);
    return item;
  } catch (error) {
    return rejectWithValue(error.message || 'Unable to assign partner.');
  }
});

export const updateAssignment = createAsyncThunk(
  'partners/updateAssignment',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await partnerApi.updateAssignment(id, data);
    } catch (error) {
      return rejectWithValue(error.message || 'Unable to update assignment.');
    }
  },
);

export const removeAssignment = createAsyncThunk('partners/removeAssignment', async (id, { rejectWithValue }) => {
  try {
    await partnerApi.removeAssignment(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.message || 'Unable to remove assignment.');
  }
});

const partnerSlice = createSlice({
  name: 'partners',
  initialState: {
    items: [],
    selectedPartner: null,
    projectPartners: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    hydratePartners(state, action) {
      state.items = action.payload || [];
    },
    hydrateProjectPartners(state, action) {
      state.projectPartners = action.payload || [];
    },
    selectPartner(state, action) {
      state.selectedPartner = state.items.find((item) => item.id === action.payload) || null;
    },
    clearPartnerStatus(state) {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPartners.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPartners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPartner.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
        state.success = 'Partner added.';
      })
      .addCase(createPartner.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updatePartner.fulfilled, (state, action) => {
        state.items = state.items.map((item) => (item.id === action.payload.id ? action.payload : item));
        state.selectedPartner = action.payload;
        state.success = 'Partner updated.';
      })
      .addCase(deletePartner.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.projectPartners = state.projectPartners.filter((item) => item.partnerId !== action.payload);
        if (state.selectedPartner?.id === action.payload) {
          state.selectedPartner = null;
        }
        state.success = 'Partner removed.';
      })
      .addCase(fetchProjectPartners.fulfilled, (state, action) => {
        state.projectPartners = action.payload;
      })
      .addCase(assignPartner.fulfilled, (state, action) => {
        state.projectPartners = [action.payload, ...state.projectPartners];
        state.success = 'Partner assigned to project.';
      })
      .addCase(updateAssignment.fulfilled, (state, action) => {
        state.projectPartners = state.projectPartners.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        );
      })
      .addCase(removeAssignment.fulfilled, (state, action) => {
        state.projectPartners = state.projectPartners.filter((item) => item.id !== action.payload);
      });
  },
});

export const { hydratePartners, hydrateProjectPartners, selectPartner, clearPartnerStatus } = partnerSlice.actions;
export default partnerSlice.reducer;
