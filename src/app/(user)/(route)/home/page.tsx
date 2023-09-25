'use client';
import React from 'react';
import CarouselBanner from './(components)/CarouselBanner';
import Banner from './(components)/Banner';
import { InforProduct } from '@/models/productModels';
import ListProducts from './(components)/ListProducts';
const data: InforProduct = {
	id: 'asdasdas',
	name: 'banh con cac',
	image: 'http://runecom06.runtime.vn/Uploads/shop97/images/product/salad_thit_nuong_vi_large.jpg',
	price: 3000,
	isFlashSale: true,
};
const UserPage = () => {
	const listProduct: InforProduct[] = [data, data, data, data, data, data, data];
	return (
		<>
			<CarouselBanner />
			<Banner />
			<ListProducts listProducts={listProduct} />
		</>
	);
};

export default UserPage;
