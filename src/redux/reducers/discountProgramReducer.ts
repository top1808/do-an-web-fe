import { DiscountProgram, DiscountProgramParams, DiscountProgramProduct, PayloadChangeStatusDiscountProgram } from '@/models/discountProgramModel';
import { ReponseDeleteSuccess } from '@/models/reponseModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../store';
import { parseOptionToJson } from '@/utils/FuntionHelpers';

interface DiscountProgramState {
	loading: boolean;
	isChangingStatus: boolean;
	status: 'pending' | 'completed' | 'failed';
	data?: DiscountProgram[];
	discountProgramEdit?: DiscountProgram | null;
	discountProgramPost?: DiscountProgram | null;
	discountProgramProductEdit?: DiscountProgramProduct | null;
}

const discountProgramInitValue = {
	name: '',
	dateStart: '',
	dateEnd: '',
	description: '',
	products: [],
	status: 'active',
};

const initialState: DiscountProgramState = {
	loading: false,
	isChangingStatus: false,
	status: 'pending',
	data: [],
	discountProgramEdit: null,
	discountProgramPost: discountProgramInitValue,
	discountProgramProductEdit: null,
};

const discountProgramSlice = createSlice({
	name: 'discountProgram',
	initialState: initialState,
	reducers: {
		addDiscountProgramProduct: (state, action: PayloadAction<DiscountProgramProduct | null>) => {
			const newProducts = [action.payload, ...(state.discountProgramPost?.products as DiscountProgramProduct[])];
			state.discountProgramPost = {
				...state.discountProgramPost,
				products: newProducts as DiscountProgramProduct[],
			};
		},
		deleteDiscountProgramProduct: (state, action: PayloadAction<number | null>) => {
			const newProducts = (state.discountProgramPost?.products as DiscountProgramProduct[]).filter((p, i) => i !== action.payload);
			state.discountProgramPost = {
				...state.discountProgramPost,
				products: newProducts as DiscountProgramProduct[],
			};
		},
		setDiscountProgramProductEdit: (state, action: PayloadAction<DiscountProgramProduct | null>) => {
			state.discountProgramProductEdit = action.payload;
		},

		editDiscountProgramProductEdit: (state, action: PayloadAction<DiscountProgramProduct | null>) => {
			const newProducts = state.discountProgramPost?.products?.map((p) => {
				if (p.productCode === action.payload?.productCode) {
					return action.payload;
				}
				return p;
			});
			state.discountProgramPost = {
				...state.discountProgramPost,
				products: newProducts as DiscountProgramProduct[],
			};
			state.discountProgramProductEdit = null;
		},

		gettingDiscountPrograms: (state, action: PayloadAction<DiscountProgramParams>) => {
			state.discountProgramEdit = null;
			state.discountProgramPost = discountProgramInitValue;
			state.loading = true;
			state.status = 'pending';
		},
		getDiscountProgramsSuccess: (state, action: PayloadAction<DiscountProgram[]>) => {
			state.loading = false;
			state.data = action.payload;
		},
		getDiscountProgramsFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.data = [];
			action.payload && toast.error(action.payload);
		},

		creatingDiscountProgram: (state, action: PayloadAction<DiscountProgram>) => {
			state.loading = true;
			state.status = 'pending';
		},
		createDiscountProgramSuccess: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'completed';
			action.payload && toast.success(action.payload);
			state.discountProgramPost = discountProgramInitValue;
		},
		createDiscountProgramFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'failed';
			action.payload && toast.error(action.payload);
		},

		deletingDiscountProgram: (state, action: PayloadAction<string>) => {
			state.loading = true;
		},
		deleteDiscountProgramSuccess: (state, action: PayloadAction<ReponseDeleteSuccess>) => {
			state.loading = false;
			state.data = state.data?.filter((item) => item._id !== action.payload.id);
			action.payload && toast.success(action.payload.message);
		},
		deleteDiscountProgramFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			action.payload && toast.error(action.payload);
		},

		gettingDiscountProgramInfo: (state, action: PayloadAction<string>) => {
			state.loading = true;
			state.discountProgramEdit = null;
			state.discountProgramPost = discountProgramInitValue;
		},
		getDiscountProgramInfoSuccess: (state, action: PayloadAction<DiscountProgram>) => {
			state.loading = false;
			state.discountProgramEdit = {
				...action.payload,
				products: action.payload.products?.map((item, index) => ({
					...item,
					index: index + 1,
					key: index,
					option1: item?.option1 || parseOptionToJson(item.options?.[0]),
					option2: item?.option2 || parseOptionToJson(item.options?.[1]),
				})),
			};
			state.discountProgramPost = {
				...action.payload,
				products: action.payload.products?.map((item, index) => ({
					...item,
					index: index + 1,
					key: index,
					option1: item?.option1 || parseOptionToJson(item.options?.[0]),
					option2: item?.option2 || parseOptionToJson(item.options?.[1]),
				})),
			};
		},
		getDiscountProgramInfoFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			action.payload && toast.error(action.payload);
		},

		edittingDiscountProgram: (state, action: PayloadAction<DiscountProgram>) => {
			state.loading = true;
			state.status = 'pending';
		},
		editDiscountProgramSuccess: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'completed';
			action.payload && toast.success(action.payload);
		},
		editDiscountProgramFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'failed';
			action.payload && toast.error(action.payload);
		},

		changingStatusDiscountProgram: (state, action: PayloadAction<PayloadChangeStatusDiscountProgram>) => {
			state.isChangingStatus = true;
		},
		changeStatusDiscountProgramSuccess: (state, action: PayloadAction<ReponseDeleteSuccess>) => {
			state.isChangingStatus = false;
			action.payload && toast.success(action.payload.message);
		},
		changeStatusDiscountProgramFailed: (state, action: PayloadAction<string>) => {
			state.isChangingStatus = false;
			action.payload && toast.error(action.payload);
		},
	},
});

export const {
	createDiscountProgramFailed,
	createDiscountProgramSuccess,
	creatingDiscountProgram,
	deleteDiscountProgramFailed,
	deleteDiscountProgramSuccess,
	deletingDiscountProgram,
	editDiscountProgramFailed,
	editDiscountProgramSuccess,
	edittingDiscountProgram,
	getDiscountProgramInfoFailed,
	getDiscountProgramInfoSuccess,
	getDiscountProgramsFailed,
	getDiscountProgramsSuccess,
	gettingDiscountProgramInfo,
	gettingDiscountPrograms,
	addDiscountProgramProduct,
	deleteDiscountProgramProduct,
	editDiscountProgramProductEdit,
	setDiscountProgramProductEdit,
	changeStatusDiscountProgramFailed,
	changeStatusDiscountProgramSuccess,
	changingStatusDiscountProgram,
} = discountProgramSlice.actions;
export const getDiscountProgramState = (state: RootState) => state.discountProgram;
export default discountProgramSlice.reducer;
