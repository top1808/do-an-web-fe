export interface Role {
	_id?: string;
	name?: string;
	permissionIds?: string[];
}

export interface Permission {
	_id?: string;
	name?: string;
}

export interface SetPermissionAction {
	roleId?: string;
	permissionId?: string;
}
