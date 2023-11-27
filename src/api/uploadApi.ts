import axios from 'axios';

const baseUrl = process.env.API_UPLOAD_URL;

const uploadApi = {
	uploadImage(formData: FormData) {
		return axios.post(baseUrl + 'image/upload', formData);
	},
};

export default uploadApi;
