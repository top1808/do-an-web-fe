import Link from 'next/link';
import React from 'react';
import NotFoundImage from '../../../../public/images/not-found-admin.jpg';
import Image from 'next/image';
import MButton from '@/components/MButton';

const PageNotFoundUser = () => {
	return (
		<div className=' w-screen h-screen flex flex-col items-center '>
			<div className='w-2/3 h-2/3 '>
				<Image
					src={NotFoundImage}
					alt='404-not-found'
					className='w-full h-full'
				></Image>
			</div>
			<div className='pt-8'>
				<Link
					className='text-blue-700 text-xl'
					href={'/home'}
				>
					<MButton
						type='primary'
						className='bg-yellow-400 text-white '
						size='large'
					>
						Go to home
					</MButton>
				</Link>
			</div>
		</div>
	);
};

export default PageNotFoundUser;
