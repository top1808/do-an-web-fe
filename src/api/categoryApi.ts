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
};

export default CategoryApi;
