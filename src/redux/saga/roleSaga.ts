import { fork, put, call, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import {
	checkPermissionFailed,
	checkPermissionSuccess,
	checkingPermission,
	getPermissionFailed,
	getPermissionSuccess,
	getRoleFailed,
	getRoleSuccess,
	gettingPermission,
	gettingRole,
	setPermissionForRoleFailed,
	setPermissionForRoleSuccess,
	settingPermissionForRole,
} from '../reducers/roleReducer';
import roleApi from '@/api/roleApi';
import { SetPermissionAction, CheckPermissionState } from '@/models/roleModel';
import { CreateAction } from '@/models/actionModel';

function* onGetPermissions() {
	try {
		const response: AxiosResponse = yield call(roleApi.getPermissions);
		yield put(getPermissionSuccess(response.data.permissions));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getPermissionFailed(error.response.data.message));
	}
}

function* onGetRoles() {
	try {
		const response: AxiosResponse = yield call(roleApi.getRoles);
		yield put(getRoleSuccess(response.data.roles));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getRoleFailed(error.response.data.message));
	}
}

function* onSetPermission(action: CreateAction<SetPermissionAction>) {
	try {
		const params = action.payload as SetPermissionAction;
		const response: AxiosResponse = yield call(roleApi.setPerrmissionForRole, params);
		yield put(setPermissionForRoleSuccess(response.data));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(setPermissionForRoleFailed(error.response.data.message));
	}
}

function* onCheckPermission(action: CreateAction<string>) {
	try {
		const url = action.payload as string;
		const response: AxiosResponse = yield call(roleApi.checkPermissionUrl, url);
		yield put(checkPermissionSuccess(response.data));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(checkPermissionFailed(error.response.data.message));
	}
}

function* watchGetPermissionFlow() {
	yield takeEvery(gettingPermission.type, onGetPermissions);
}

function* watchGetRoleFlow() {
	yield takeEvery(gettingRole.type, onGetRoles);
}

function* watchSetPermissionFlow() {
	yield takeEvery(settingPermissionForRole.type, onSetPermission);
}

function* watchCheckPermissionFlow() {
	yield takeEvery(checkingPermission.type, onCheckPermission);
}

export function* RoleSaga() {
	yield fork(watchGetRoleFlow);
	yield fork(watchGetPermissionFlow);
	yield fork(watchSetPermissionFlow);
	yield fork(watchCheckPermissionFlow);
}
