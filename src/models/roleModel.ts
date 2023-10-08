export interface Role {
	_id?: string;
	name?: string;
	permissionIds?: string[];
}

export interface Permission {
	_id?: string;
	name?: string;
	method?: string;
	url?: string;
}

export interface PermissionGroup {
	name?: string;
	permissions?: Permission[];
}

export interface SetPermissionAction {
	roleId?: string;
	permissionIds?: string[];
}

export interface CheckPermissionState {
	url?: string;
	canView?: boolean;
	canCreate?: boolean;
	canEdit?: boolean;
	canDelete?: boolean;
}
