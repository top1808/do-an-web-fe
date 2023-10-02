'use client';

import { InforProduct } from '@/models/productModels';
import React, { useEffect } from 'react';
import CarouselBanner from './components/CarouselBanner';
import Banner from './components/Banner';
import ListProducts from './components/ListProducts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingProduct } from '@/redux/reducers/productReducer';

const HomeUserComponent = () => {
	const { product } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	// const listProduct: InforProduct[] = [data, data, data, data, data, data, data];
	useEffect(() => {
		dispatch(gettingProduct());
	}, []);
	return (
		<div>
			<CarouselBanner />
			<Banner />
			<ListProducts listProducts={product.data ? product.data : []} />
		</div>
	);
};

export default HomeUserComponent;
