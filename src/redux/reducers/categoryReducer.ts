import { Category } from '@/models/categoryModels';
import { ReponseDeleteSuccess } from '@/models/reponseModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../store';
interface CategoryState {
	loading: boolean;
	status: 'pending' | 'completed' | 'failed';
	data?: Category[];
	categoryEdit?: Category | null;
}

const initialState: CategoryState = {
	loading: false,
	status: 'pending',
	data: [],
	categoryEdit: null,
};

const categorySlice = createSlice({
	name: 'category',
	initialState: initialState,
	reducers: {
		gettingCategory: (state) => {
			state.status = 'pending';
			state.loading = true;
			state.categoryEdit = null;
		},
		getCategorieSuccess: (state, action: PayloadAction<Category[]>) => {
			state.loading = false;
			state.data = action.payload;
		},
		getCategoriesFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.data = [];
			action.payload && toast.error(action.payload);
		},

		creatingCategory: (state, action: PayloadAction<Category>) => {
			state.loading = true;
			state.status = 'pending';
		},
		createCategorySuccess: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'completed';
			action.payload && toast.success(action.payload);
		},
		createCategoryFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'failed';
			action.payload && toast.error(action.payload);
		},

		deletingCategory: (state, action: PayloadAction<string>) => {
			state.loading = true;
		},
		deleteCategorySuccess: (state, action: PayloadAction<ReponseDeleteSuccess>) => {
			state.loading = false;
			state.data = state.data?.filter((item) => item._id !== action.payload.id);
			action.payload && toast.success(action.payload.message);
		},
		deleteCategoryFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			action.payload && toast.error(action.payload);
		},

		gettingCategoryInfo: (state, action: PayloadAction<string>) => {
			state.loading = true;
			state.categoryEdit = null;
		},
		getCategoryInfoSuccess: (state, action: PayloadAction<Category>) => {
			state.loading = false;
			state.categoryEdit = action.payload;
		},
		getCategoryInfoFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			action.payload && toast.error(action.payload);
		},

		edittingCategory: (state, action: PayloadAction<Category>) => {
			state.loading = true;
			state.status = 'pending';
		},
		editCategorySuccess: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'completed';
			action.payload && toast.success(action.payload);
		},
		editCategoryFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'failed';
			action.payload && toast.error(action.payload);
		},
	},
});

export const {
	editCategoryFailed,
	editCategorySuccess,
	edittingCategory,
	getCategoryInfoFailed,
	getCategoryInfoSuccess,
	gettingCategoryInfo,
	createCategoryFailed,
	createCategorySuccess,
	creatingCategory,
	deleteCategoryFailed,
	deleteCategorySuccess,
	deletingCategory,
	getCategoriesFailed,
	getCategorieSuccess,
	gettingCategory,
} = categorySlice.actions;
export const getCategoryState = (state: RootState) => state.category;
export default categorySlice.reducer;
