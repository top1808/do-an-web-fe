'use client';
import MCol from '@/components/MCol';
import MImage from '@/components/MImage';
import MRow from '@/components/MRow';
import { MSearchInput } from '@/components/MSearchInput';
import { faCartShopping, faMagnifyingGlass, faPenToSquare, faPhone, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import logo from '../../../public/images/logo.png';

const Header = () => {
	return (
		<header
			style={{ backgroundColor: '#FA5130' }}
			className='py-2 px-32'
		>
			<MRow
				justify={'space-between'}
				className=' py-2 px-8'
			>
				<MCol
					xs={4}
					xl={8}
					className='max-sm:w-36 sm:w-36 md:w-36 lg:w-40 xl:w-60 2xl:w-80'
				>
					<Link href={'/home'}>
						<MImage
							preview={false}
							src={logo.src}
						/>
					</Link>
				</MCol>
				<MCol
					xs={8}
					xl={8}
					className='max-sm:mt-2 sm:mt-2  2xl:0'
				>
					<div className='h-full flex items-center w-full justify-center'>
						<MSearchInput onSearch={() => {}} />
					</div>
				</MCol>
				<MCol
					xs={12}
					xl={8}
					className='max-sm:mt-2 2xl:0'
				>
					<ul className='flex gap-6 h-full text-lg items-center w-full justify-end text-white	'>
						<li>
							<Link href={'/cart'}>
								<FontAwesomeIcon
									icon={faCartShopping}
									color='white'
								/>
								Cart
							</Link>
						</li>
						<li>
							<Link href={'/login'}>
								<FontAwesomeIcon
									icon={faUser}
									color='white'
								/>
								Sign in
							</Link>
						</li>
					</ul>
				</MCol>
			</MRow>
		</header>
	);
};

export default Header;
