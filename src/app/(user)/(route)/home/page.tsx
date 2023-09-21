'use client';
import React from 'react';
import CarouselBanner from './(components)/CarouselBanner';
import Banner from './(components)/Banner';
import ListProduct from './(components)/ListProduct';
import { CardType } from './(components)/CardProduct';
const data: CardType = {
	id: 'asdasdas',
	name: 'banh con cac',
	image: 'http://runecom06.runtime.vn/Uploads/shop97/images/product/salad_thit_nuong_vi_large.jpg',
	price: 3000,
	isFlashSale: true,
};
const UserPage = () => {
	const listProduct: CardType[] = [data, data, data, data, data, data, data];
	return (
		<>
			<CarouselBanner />
			<Banner />
			<ListProduct listProducts={listProduct} />
		</>
	);
};

export default UserPage;
