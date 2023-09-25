import { Carousel } from 'antd';
import React from 'react';

const CarouselBanner = () => {
	const contentStyle: React.CSSProperties = {
		margin: 0,
		height: '160px',
		color: '#fff',
		lineHeight: '160px',
		textAlign: 'center',
	};
	const onChange = (currentSlide: number) => {};
	return (
		<Carousel
			effect='fade'
			autoplay
			afterChange={onChange}
			easing='ease-in-out'
		>
			<div>
				<h3
					style={contentStyle}
					className='bg-red-600'
				>
					1
				</h3>
			</div>
			<div>
				<h3
					style={contentStyle}
					className='bg-black'
				>
					2
				</h3>
			</div>
			<div>
				<h3
					style={contentStyle}
					className='bg-blue-600'
				>
					3
				</h3>
			</div>
			<div>
				<h3
					style={contentStyle}
					className='bg-green-600'
				>
					4
				</h3>
			</div>
		</Carousel>
	);
};

export default CarouselBanner;
