import axiosClient from './axiosClient';
import { Product } from '@/models/productModels';

const URL = '/product';

const ProductApi = {
	getProducts() {
		return axiosClient.get(URL);
	},
	createProduct(body: Product) {
		return axiosClient.post(URL + '/create', body);
	},
	deleteProduct(id: string) {
		return axiosClient.delete(URL + '/' + id);
	},
};

export default ProductApi;
