'use client';
import { MenuItem } from '@/models/productModels';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingCategory } from '@/redux/reducers/categoryReducer';
import { getItem } from '@/utils/FuntionHelpers';
import { Menu, type MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';

const SideBarUser: React.FC = () => {
	const dispatch = useAppDispatch();
	const { category } = useAppSelector((state) => state);
	const [itemsCategory, setItemsCategory] = useState<MenuItem[]>([]);

	const onClick: MenuProps['onClick'] = (e) => {
		console.log('click ', e);
	};
	useEffect(() => {
		dispatch(gettingCategory());
	}, []);
	useEffect(() => {
		if (category.data) {
			setItemsCategory(
				category.data?.map((item: any) => {
					return getItem(`${item.name}`, `${item._id}`);
				}),
			);
		}
	}, [category]);

	return (
		<>
			<Menu
				defaultSelectedKeys={['dashboard']}
				mode='inline'
				items={itemsCategory}
				onClick={onClick}
			/>
		</>
	);
};

export default SideBarUser;
