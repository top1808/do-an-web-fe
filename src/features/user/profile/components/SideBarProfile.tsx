import { faBell, faClockRotateLeft, faKey, faRectangleList, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

const SideBarProfile = () => {
	return (
		<div className='w1/4'>
			<div>
				<h3>Menu tài khoản</h3>
				<ul>
					<li className='py-2'>
						<Link href={'/profile'}>
							<FontAwesomeIcon
								color='blue'
								icon={faUser}
							/>
							&nbsp;&nbsp; Thông tin tài khoản
						</Link>
					</li>
					<li className=' py-2'>
						<Link href={'/profile/notification'}>
							<FontAwesomeIcon
								color='red'
								icon={faBell}
							/>
							&nbsp;&nbsp; Thông báo
						</Link>
					</li>
					<li className=' py-2'>
						<Link href={'/profile/change-password'}>
							<FontAwesomeIcon
								color='green'
								icon={faKey}
							/>
							&nbsp;&nbsp; Đổi mật khẩu
						</Link>
					</li>
					<li className='py-2'>
						<Link href={'/profile/purchased'}>
							<FontAwesomeIcon icon={faClockRotateLeft} />
							&nbsp;&nbsp; Lịch sử mua hàng
						</Link>
					</li>
					<li className=' py-2'>
						<Link href={'/'}>
							<FontAwesomeIcon
								color='purple'
								icon={faRightFromBracket}
							/>
							&nbsp;&nbsp; Đăng xuất
						</Link>
					</li>
				</ul>
			</div>
			{/* <div className='mt-4'>
				<h3>Menu giao dịch</h3>
				<ul>
					<li className='py-2'>
						<Link href={'/'}>
							<FontAwesomeIcon icon={faRectangleList} />
							&nbsp;&nbsp; Tình trạng đơn hàng
						</Link>
					</li>
					
				</ul>
			</div> */}
		</div>
	);
};

export default SideBarProfile;
