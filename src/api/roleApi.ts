import axiosClient from './axiosClient';
import { SetPermissionAction } from '@/models/roleModel';

const URL = '/authorize';

const roleApi = {
	getRoles() {
		return axiosClient.get(URL + '/role');
	},
	getPermissions() {
		return axiosClient.get(URL + '/permission');
	},
	setPerrmissionForRole(params: SetPermissionAction) {
		return axiosClient.post(URL + '/role/give-permission', { permissionIds: params.permissionIds, roleId: params.roleId });
	},
	checkPermissionUrl(url: string) {
		return axiosClient.post(URL + '/permission/check', { url });
	},
};

export default roleApi;
