import MSpin from '@/components/MSpin';
import React from 'react';

const loading = () => {
	return (
		<div className='h-full w-full flex items-center justify-center'>
			<MSpin size='large' />
		</div>
	);
};

export default loading;
