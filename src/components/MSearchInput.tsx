import { Form, InputProps } from 'antd';
import React, { useState } from 'react';
import MInput from './MInput';
import MButton from './MButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
interface MSearchInputProps extends InputProps {
	onSearch?: () => void;
}
type FieldType = {
	valuesearch?: string;
	buttonsearch?: string;
};
export const MSearchInput: React.FC<MSearchInputProps> = (props) => {
	const [valueSearch, setValueSearch] = useState('');
	return (
		<Form
			onFinish={props.onSearch}
			className='flex gap-0 h-8 relative'
		>
			<Form.Item<FieldType>
				className='h-full'
				name={'valuesearch'}
			>
				<MInput
					className='pl-4 pr-8 h-8 border-black text-lg sm:w-60 md:w-60 lg:w-80 xl:w-96 2xl:w-96 '
					placeholder='Search...'
					onChange={(e) => setValueSearch(e.target.value)}
					value={valueSearch}
				/>
				<FontAwesomeIcon
					className={`${valueSearch ? 'visible' : 'invisible'} absolute top-1 right-2 leading-8 cursor-pointer`}
					onClick={() => setValueSearch('')}
					icon={faXmark}
					size='xl'
				/>
			</Form.Item>

			<Form.Item<FieldType>
				name={'buttonsearch'}
				className='h-full'
			>
				<MButton className=' bg-black w-10'>
					<FontAwesomeIcon
						color='white'
						icon={faMagnifyingGlass}
					/>
				</MButton>
			</Form.Item>
		</Form>
	);
};
