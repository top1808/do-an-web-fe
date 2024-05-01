import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../store';
import { Review, ReviewParams } from '@/models/reviewModel';

interface ReviewState {
	loading: boolean;
	status: 'pending' | 'completed' | 'failed';
	data?: Review[];
}

const initialState: ReviewState = {
	loading: false,
	status: 'pending',
	data: [],
};

const reviewSlice = createSlice({
	name: 'review',
	initialState: initialState,
	reducers: {
		gettingReviews: (state, action: PayloadAction<ReviewParams | null>) => {
			state.loading = true;
			state.status = 'pending';
		},
		getReviewsSuccess: (state, action: PayloadAction<Review[]>) => {
			state.loading = false;
			state.data = action.payload;
		},
		getReviewsFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.data = [];
			action.payload && toast.error(action.payload);
		},
	},
});

export const { getReviewsFailed, getReviewsSuccess, gettingReviews } = reviewSlice.actions;
export const getReviewState = (state: RootState) => state.review;
export default reviewSlice.reducer;
