import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../store';
import { HistoryImport, Inventory, InventoryParams } from '@/models/inventoryModel';
import { PaginationModel } from '@/models/reponseModel';

interface InventoryState {
	loading: boolean;
	isImporting?: boolean;
	isGettingInventory?: boolean;
	isDeleting?: boolean;
	status: 'pending' | 'completed' | 'failed';
	data?: Inventory[];
	inventory?: Inventory | null;
	pagination?: PaginationModel;
}

const initialState: InventoryState = {
	loading: false,
	isImporting: false,
	isGettingInventory: false,
	isDeleting: false,
	status: 'pending',
	data: [],
	inventory: null,
	pagination: {},
};

const inventorySlice = createSlice({
	name: 'inventory',
	initialState: initialState,
	reducers: {
		gettingInventories: (state, action: PayloadAction<InventoryParams | null>) => {
			state.loading = true;
			state.status = 'pending';
		},
		getInventoriesSuccess: (state, action: PayloadAction<Inventory[]>) => {
			state.loading = false;
			state.data = action.payload;
		},
		getInventoriesFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.data = [];
			action.payload && toast.error(action.payload);
		},

		gettingInventory: (state, action: PayloadAction<string>) => {
			state.isGettingInventory = true;
		},
		getInventorySuccess: (state, action: PayloadAction<Inventory>) => {
			state.isGettingInventory = false;
			state.inventory = action.payload;
		},
		getInventoryFailed: (state, action: PayloadAction<string>) => {
			state.isGettingInventory = false;
			state.inventory = null;
			action.payload && toast.error(action.payload);
		},

		importingInventory: (state, action: PayloadAction<HistoryImport>) => {
			state.isImporting = true;
			state.status = 'pending';
		},
		importInventorySuccess: (state, action: PayloadAction<string>) => {
			state.isImporting = false;
			state.status = 'completed';
			toast.success(action.payload);
		},
		importInventoryFailed: (state, action: PayloadAction<string>) => {
			state.isImporting = false;
			state.status = 'failed';
			action.payload && toast.error(action.payload);
		},

		deletingHistoryImportInventory: (state, action: PayloadAction<HistoryImport>) => {
			state.isDeleting = true;
		},
		deleteHistoryImportSuccess: (state, action: PayloadAction<string>) => {
			state.isDeleting = false;
			toast.success(action.payload);
		},
		deleteHistoryImportFailed: (state, action: PayloadAction<string>) => {
			state.isDeleting = false;
			action.payload && toast.error(action.payload);
		},
	},
});

export const {
	getInventoryFailed,
	getInventorySuccess,
	gettingInventory,
	getInventoriesFailed,
	getInventoriesSuccess,
	gettingInventories,
	importInventoryFailed,
	importInventorySuccess,
	importingInventory,
	deleteHistoryImportFailed,
	deleteHistoryImportSuccess,
	deletingHistoryImportInventory,
} = inventorySlice.actions;
export const getInventoryState = (state: RootState) => state.inventory;
export default inventorySlice.reducer;
