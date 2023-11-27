import React, { useEffect, useRef, useState } from 'react';
import MButton from './MButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import uploadApi from '@/api/uploadApi';
import Image from 'next/image';
import { Upload, UploadProps } from 'antd';

interface MUploadImageProps extends UploadProps {
	onUploadSuccess?: (data: string) => void;
	image?: string;
}

const MUploadImage: React.FC<MUploadImageProps> = ({ onUploadSuccess, image, ...rest }) => {
	const uploadRef = useRef<HTMLInputElement | null>(null);

	const [imageLocal, setImageLocal] = useState<string>('');

	const onUploadImage = async (e: any) => {
		const file = e.target.files[0];
		if (file) {
			const formData = new FormData();
			formData.append('image', file);
			const res = await uploadApi.uploadImage(formData);
			setImageLocal(res.data.image.data);
			onUploadSuccess?.(res.data.image.data);
		}
	};

	useEffect(() => {
		setImageLocal(image || '');
	}, [image]);

	return (
		<div className='flex flex-col items-center justify-center'>
			<div
				className='mb-2 border-2 border-dashed border-gray-400 bg-gray-100 flex justify-center items-center'
				style={{ width: 150, height: 150 }}
			>
				{imageLocal && (
					<Image
						src={imageLocal}
						alt='123'
						width={144}
						height={140}
						style={{ objectFit: 'contain' }}
					/>
				)}
			</div>

			<MButton
				type='primary'
				icon={<FontAwesomeIcon icon={faImage} />}
				onClick={() => uploadRef?.current?.click()}
			>
				Upload
			</MButton>

			<input
				ref={uploadRef}
				type='file'
				onChange={onUploadImage}
				style={{ display: 'none' }}
			/>
		</div>
	);
};

export default MUploadImage;
