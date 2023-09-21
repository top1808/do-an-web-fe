'use client';
import MCol from '@/components/MCol';
import MImage from '@/components/MImage';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import Link from 'next/link';
import React from 'react';
import logo from '../../../public/images/logo.png';
const Footer = () => {
	return (
		<footer className='mt-4 px-32 py-8 bg-blue-200'>
			<MRow justify={'center'}>
				<MCol>
					<Link href={'/home'}>
						<MImage
							preview={false}
							src={logo.src}
							alt='logo'
						/>
					</Link>
				</MCol>
			</MRow>
			<MRow className='gap-10 mt-2'>
				<MCol>
					<MText>Giới thiệu</MText>
					<ul>
						<li>
							<Link
								href={'/'}
								className=''
							>
								Về chúng tôi
							</Link>
						</li>
						<li>Lĩnh vực hoạt động</li>
						<li>Liên hệ với chúng tôi</li>
						<li>Tin tức - Sự kiện</li>
						<li>
							<li>Lĩnh vực hoạt động</li>
						</li>
					</ul>
				</MCol>
				<MCol>
					<MText>CHĂM SÓC KHÁCH HÀNG</MText>
					<ul>
						<li>
							<Link
								href={'/'}
								className=''
							>
								Hướng dẫn mua hàng
							</Link>
						</li>
						<li>Qui định đổi trả</li>
						<li>Chính sách bán hàng</li>
						<li>Chính sách bảo mật</li>
					</ul>
				</MCol>
				<MCol>
					<MText>Folow us</MText>
				</MCol>
			</MRow>
		</footer>
	);
};

export default Footer;
