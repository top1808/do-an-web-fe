import MTitle from '@/components/MTitle';
import Link from 'next/link';
import React from 'react';

const PageNotFoundAdmin = () => {
	return (
		<div className="bg-[url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')] w-screen h-screen bg-no-repeat bg-center">
			<div className='text-center pt-32'>
				<MTitle
					level={1}
					className='text-2xl '
				>
					404 Not Found
				</MTitle>
				<Link
					className='text-blue-700 text-xl'
					href={'/admin'}
				>
					Go to admin page
				</Link>
			</div>
		</div>
	);
};

export default PageNotFoundAdmin;
