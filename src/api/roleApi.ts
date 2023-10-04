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
		return axiosClient.put(URL + '/role/give-permission/' + params.roleId, { permissionId: params.permissionId });
	},
};

export default roleApi;
