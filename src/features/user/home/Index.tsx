'use client';

import { InforProduct } from '@/models/productModels';
import React from 'react';
import CarouselBanner from './components/CarouselBanner';
import Banner from './components/Banner';
import ListProducts from './components/ListProducts';

const data: InforProduct = {
	id: 'asdasdas',
	name: 'banh trung thu',
	image: 'http://runecom06.runtime.vn/Uploads/shop97/images/product/salad_thit_nuong_vi_large.jpg',
	price: 3000,
	isFlashSale: true,
};
const HomeUserComponent = () => {
	const listProduct: InforProduct[] = [data, data, data, data, data, data, data];
	return (
		<div>
			<CarouselBanner />
			<Banner />
			<ListProducts listProducts={listProduct} />
		</div>
	);
};

export default HomeUserComponent;
