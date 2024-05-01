import { Order } from '@/models/orderModel';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Inventory } from '@/models/inventoryModel';

interface ModalState {
	isOpen?: boolean;
	isOpenModalHistoryImport?: boolean;
	itemOrder?: Order | null;
	isOpenChat?: boolean;
	productImport?: Inventory | null;
}

const initialState: ModalState = {
	isOpen: false,
	isOpenModalHistoryImport: false,
	itemOrder: null,
	isOpenChat: false,
	productImport: null,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState: initialState,
	reducers: {
		toggleModalTransport: (state: ModalState, action: PayloadAction<Order | null>) => {
			state.isOpen = !state.isOpen;
			state.itemOrder = action?.payload;
		},
		toggleChat: (state: ModalState) => {
			state.isOpenChat = !state.isOpenChat;
		},

		toggleModalImportInventory: (state: ModalState, action: PayloadAction<Inventory | null>) => {
			state.isOpen = !state.isOpen;
			state.productImport = action.payload;
		},

		toggleModalHistoryImportInventory: (state: ModalState, action: PayloadAction<Inventory | null>) => {
			state.isOpenModalHistoryImport = !state.isOpenModalHistoryImport;
			state.productImport = action.payload;
		},
	},
});
export const { toggleModalTransport, toggleChat, toggleModalImportInventory, toggleModalHistoryImportInventory } = modalSlice.actions;
export const getModalState = (state: RootState) => state.modal;
export default modalSlice.reducer;
