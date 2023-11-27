import axiosClient from './axiosClient';
import { Category } from '@/models/categoryModels';

const URL = '/category';

const CategoryApi = {
	getCategories() {
		return axiosClient.get(URL);
	},
	createCategory(body: Category) {
		return axiosClient.post(URL + '/create', body);
	},
	deleteCategory(id: string) {
		return axiosClient.delete(URL + '/' + id);
	},
	getCategoryInfo(id: string) {
		return axiosClient.get(URL + '/' + id);
	},
	editCategory(body: Category) {
		return axiosClient.put(URL + '/update/' + body._id, body);
	},
};

export default CategoryApi;
