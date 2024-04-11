import React from 'react';

const MLoadingThreeDot = () => {
	return (
		<div className='flex space-x-2 justify-center items-center'>
			<div className='h-1 w-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
			<div className='h-1 w-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
			<div className='h-1 w-1 bg-white rounded-full animate-bounce'></div>
		</div>
	);
};

export default MLoadingThreeDot;
