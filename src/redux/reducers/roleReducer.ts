import { Permission, Role, SetPermissionAction } from '@/models/roleModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface RoleState {
	loading?: boolean;
	roles?: Role[] | null;
	permissions?: Permission[] | null;
}

const initialState: RoleState = {
	loading: false,
	roles: null,
	permissions: null,
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
		setPermissionForRoleSuccess: (state, action: PayloadAction<string>) => {
			state.loading = false;
			action.payload && toast.success(action.payload);
		},
		setPermissionForRoleFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
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
} = roleSlice.actions;
export default roleSlice.reducer;
