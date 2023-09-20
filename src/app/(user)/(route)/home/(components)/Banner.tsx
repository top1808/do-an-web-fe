import React from 'react';
import banner from '../../../../../../public/images/banner.jpg';
const Banner = () => {
	const bannerStyles: React.CSSProperties = {
		height: '240px',
		width: '100%',
		verticalAlign: 'middle',
	};
	return (
		<div className='mt-2'>
			<img
				src={banner.src}
				alt='banner'
				style={bannerStyles}
			/>
		</div>
	);
};

export default Banner;
