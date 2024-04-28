'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import MSkeleton from '@/components/MSkeleton';
import { getReviewState, gettingReviews } from '@/redux/reducers/reviewReducer';
import { ReviewParams } from '@/models/reviewModel';
import ReviewTable from './components/Table';

const AdminInventoryComponent = () => {
	const review = useAppSelector(getReviewState);
	const dispatch = useAppDispatch();
	const myParams = useParams();

	useEffect(() => {
		const params: ReviewParams = {
			offset: myParams?.offset as string,
			limit: myParams?.limit as string,
		};
		dispatch(gettingReviews(params));
	}, [dispatch, myParams?.limit, myParams?.offset]);

	return (
		<MSkeleton loading={review.loading}>
			<ReviewTable />
		</MSkeleton>
	);
};

export default AdminInventoryComponent;
