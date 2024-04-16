import { ReponseDeleteSuccess } from '@/models/reponseModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../store';
import { Intent } from '@/models/chatbotModel';

interface ChatbotState {
	loading: boolean;
	status: 'pending' | 'completed' | 'failed';
	data?: Intent[];
	intentEdit?: Intent | null;
	isChatting?: boolean;
	myMessage?: string[];
	botResponses?: string[];
}

const initialState: ChatbotState = {
	loading: false,
	status: 'pending',
	data: [],
	intentEdit: null,
	isChatting: false,
	myMessage: [],
	botResponses: [],
};

const chatbotSlice = createSlice({
	name: 'chatbot',
	initialState: initialState,
	reducers: {
		gettingIntents: (state) => {
			state.loading = true;
			state.status = 'pending';
			state.intentEdit = null;
		},
		getIntentsSuccess: (state, action: PayloadAction<Intent[]>) => {
			state.loading = false;
			state.data = action.payload;
		},
		getIntentsFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.data = [];
			action.payload && toast.error(action.payload);
		},

		creatingIntents: (state, action: PayloadAction<Intent>) => {
			state.loading = true;
			state.status = 'pending';
		},
		createIntentSuccess: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'completed';
			action.payload && toast.success(action.payload);
		},
		createIntentsFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'failed';
			action.payload && toast.error(action.payload);
		},

		deletingIntents: (state, action: PayloadAction<string>) => {
			state.loading = true;
		},
		deleteIntentSuccess: (state, action: PayloadAction<ReponseDeleteSuccess>) => {
			state.loading = false;
			state.data = state.data?.filter((item) => item._id !== action.payload.id);
			action.payload && toast.success(action.payload.message);
		},
		deleteIntentsFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			action.payload && toast.error(action.payload);
		},

		edittingIntent: (state, action: PayloadAction<Intent>) => {
			state.loading = true;
			state.status = 'pending';
		},
		editIntentSuccess: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'completed';
			action.payload && toast.success(action.payload);
		},
		editIntentFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'failed';
			action.payload && toast.error(action.payload);
		},

		gettingIntent: (state, action: PayloadAction<string>) => {
			state.loading = true;
			state.intentEdit = null;
		},
		getIntentSuccess: (state, action: PayloadAction<Intent>) => {
			state.loading = false;
			state.intentEdit = action.payload;
		},
		getIntentFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			action.payload && toast.error(action.payload);
		},

		chatting: (state, action: PayloadAction<string>) => {
			state.isChatting = true;
			state.myMessage?.push(action.payload);
			state.botResponses?.push('');
		},
		chatSuccess: (state, action: PayloadAction<string>) => {
			state.isChatting = false;
			state.botResponses?.splice(state.botResponses?.length - 1, 1, action.payload);
		},
		chatFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.botResponses?.splice(state.botResponses?.length - 1, 1, 'Có vấn đề xảy ra.');
			action.payload && toast.error(action.payload);
		},

		clearAllChat: (state) => {
			state.myMessage = [];
			state.botResponses = [];
		},
	},
});

export const {
	gettingIntents,
	getIntentsFailed,
	getIntentsSuccess,
	creatingIntents,
	createIntentSuccess,
	createIntentsFailed,
	deleteIntentsFailed,
	deleteIntentSuccess,
	deletingIntents,
	editIntentFailed,
	editIntentSuccess,
	edittingIntent,
	getIntentFailed,
	getIntentSuccess,
	gettingIntent,
	chatFailed,
	chatSuccess,
	chatting,
	clearAllChat,
} = chatbotSlice.actions;
export const getChatbotState = (state: RootState) => state.chatbot;
export default chatbotSlice.reducer;
