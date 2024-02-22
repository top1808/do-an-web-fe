import { Order } from '@/models/orderModel';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ModalState {
	isOpen?: boolean;
	itemOrder?: Order | null;
}

const initialState: ModalState = {
	isOpen: false,
	itemOrder: null,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState: initialState,
	reducers: {
		toggleModalTransport: (state: ModalState, action: PayloadAction<Order | null>) => {
			state.isOpen = !state.isOpen;
			state.itemOrder = action?.payload;
		},
	},
});
export const { toggleModalTransport } = modalSlice.actions;
export const getModalState = (state: RootState) => state.modal;
export default modalSlice.reducer;
