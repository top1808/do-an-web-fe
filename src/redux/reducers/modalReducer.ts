import { Order } from '@/models/orderModel';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ModalState {
	isOpen?: boolean;
	itemOrder?: Order | null;
	isOpenChat?: boolean;
}

const initialState: ModalState = {
	isOpen: false,
	itemOrder: null,
	isOpenChat: false,
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
	},
});
export const { toggleModalTransport, toggleChat } = modalSlice.actions;
export const getModalState = (state: RootState) => state.modal;
export default modalSlice.reducer;
