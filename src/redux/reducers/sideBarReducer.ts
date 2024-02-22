import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface SideBarState {
	isOpen: boolean;
}

const initialState: SideBarState = {
	isOpen: true,
};

const sideBarSlice = createSlice({
	name: 'sideBar',
	initialState: initialState,
	reducers: {
		toggle: (state: SideBarState) => {
			state.isOpen = !state.isOpen;
		},
	},
});

export const { toggle } = sideBarSlice.actions;
export const getSideBarState = (state: RootState) => state.sideBar;
export default sideBarSlice.reducer;
