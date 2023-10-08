import { ReponseState } from '@/models/actionModel';
import { Permission, Role, SetPermissionAction, CheckPermissionState } from '@/models/roleModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface RoleState {
	loading?: boolean;
	roles?: Role[] | null;
	permissions?: Permission[] | null;
	checkPermission?: CheckPermissionState | null;
}

const initialState: RoleState = {
	loading: false,
	roles: null,
	permissions: null,
	checkPermission: null,
};

const roleSlice = createSlice({
	name: 'role',
	initialState: initialState,
	reducers: {
		gettingRole: (state) => {
			state.loading = true;
		},
		getRoleSuccess: (state, action: PayloadAction<Role[]>) => {
			state.loading = false;
			state.roles = action.payload;
		},
		getRoleFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			action.payload && toast.error(action.payload);
		},
		gettingPermission: (state) => {
			state.loading = true;
		},
		getPermissionSuccess: (state, action: PayloadAction<Permission[]>) => {
			state.loading = false;
			state.permissions = action.payload;
		},
		getPermissionFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			action.payload && toast.error(action.payload);
		},
		settingPermissionForRole: (state, action: PayloadAction<SetPermissionAction>) => {
			state.loading = true;
		},
		setPermissionForRoleSuccess: (state, action: PayloadAction<ReponseState<Role[]>>) => {
			state.loading = false;
			state.roles = action.payload.data;
			action.payload && toast.success(action.payload.message);
		},
		setPermissionForRoleFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			action.payload && toast.error(action.payload);
		},
		checkingPermission: (state, action: PayloadAction<string>) => {
			state.loading = true;
		},
		checkPermissionSuccess: (state, action: PayloadAction<CheckPermissionState>) => {
			state.loading = false;
			state.checkPermission = action.payload;
		},
		checkPermissionFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.checkPermission = null;
			action.payload && toast.error(action.payload);
		},
	},
});

export const {
	gettingRole,
	getPermissionFailed,
	getPermissionSuccess,
	getRoleFailed,
	getRoleSuccess,
	gettingPermission,
	setPermissionForRoleFailed,
	setPermissionForRoleSuccess,
	settingPermissionForRole,
	checkPermissionFailed,
	checkPermissionSuccess,
	checkingPermission,
} = roleSlice.actions;
export default roleSlice.reducer;
