import { objectToQueryString } from '@/utils/FuntionHelpers';
import axiosClient from './axiosClient';
import { HistoryImport, Inventory, InventoryParams } from '@/models/inventoryModel';

const URL = '/inventory';

const inventoryApi = {
	getData(params: InventoryParams) {
		const query = objectToQueryString(params);
		return axiosClient.get(URL + query);
	},
	create(body: Inventory) {
		return axiosClient.post(URL + '/create', body);
	},
	importBySKU(body: HistoryImport) {
		return axiosClient.post(URL + '/import-by-sku/' + body.inventoryId, body);
	},
	deleteHistoryImport(body: HistoryImport) {
		return axiosClient.post(URL + '/delete-history-import/' + body._id, body);
	},
	delete(id: string) {
		return axiosClient.delete(URL + '/' + id);
	},
	getById(id: string) {
		return axiosClient.get(URL + '/' + id);
	},
};

export default inventoryApi;
