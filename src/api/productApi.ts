import { objectToQueryString } from '@/utils/FuntionHelpers';
import axiosClient from './axiosClient';
import { Product, ProductParams } from '@/models/productModels';

const URL = '/product';

const ProductApi = {
	getProducts(params: ProductParams) {
		const query = objectToQueryString(params);

		return axiosClient.get(URL + query);
	},
	createProduct(body: Product) {
		return axiosClient.post(URL + '/create', body);
	},
	deleteProduct(id: string) {
		return axiosClient.delete(URL + '/' + id);
	},
	getProductInfo(id: string) {
		return axiosClient.get(URL + '/' + id);
	},
	editProduct(body: Product) {
		return axiosClient.put(URL + '/update/' + body._id, body);
	},
	getAllProduct() {
		return axiosClient.get(URL + '/all');
	},
};

export default ProductApi;
