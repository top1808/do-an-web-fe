'use client';
import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MImage from '@/components/MImage';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import { faCartShopping, faMagnifyingGlass, faPenToSquare, faPhone, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col } from 'antd';
import Link from 'next/link';
import React from 'react';

const Header = () => {
	return (
		<header>
			<MRow
				justify={'space-between'}
				className='bg-red-600 h-8'
			>
				<MCol>
					<MText>
						<FontAwesomeIcon icon={faPhone} /> Hotline:0908770095
					</MText>
				</MCol>
				<MCol>
					<ul>
						<li>
							<Link href={'/'}>
								<FontAwesomeIcon icon={faPenToSquare} /> Checking Your Orders
							</Link>
						</li>

						<li>
							<Link href={'/'}>
								<FontAwesomeIcon icon={faCartShopping} /> Cart
							</Link>
						</li>
						<li>
							<Link href={'/login'}>
								<FontAwesomeIcon icon={faUser} /> Login
							</Link>
						</li>
					</ul>
				</MCol>
			</MRow>
			<MRow
				justify={'space-between'}
				className='bg-gray-400'
			>
				<MCol>
					<Link href={'/'}>
						<MImage src='../../../public/images/logo.png' />
					</Link>
				</MCol>
				<MCol>
					<MInput
						className='pl-2 bg-white border-black text-xs h-4 '
						placeholder='Search...'
					></MInput>
					<MButton className='h-4 bg-black w-6'>
						<FontAwesomeIcon
							color='white'
							icon={faMagnifyingGlass}
						/>
					</MButton>
				</MCol>
			</MRow>
			<MRow className=''>
				<ul className='flex gap-2'>
					<li className='p-2'>
						<Link href={'/'}>Home</Link>
					</li>
					<li className='p-2'>
						<Link href={'/products'}>Products</Link>
					</li>
					<li className='p-2'>
						<Link href={'/news'}>News</Link>
					</li>
					<li className='p-2'>
						<Link href={'/about'}>About</Link>
					</li>
					<li className='p-2'>
						<Link href={'/contact'}>Contact</Link>
					</li>
				</ul>
			</MRow>
		</header>
	);
};

export default Header;
