'use client';
import { Button, Steps, message } from 'antd';
import React, { useState } from 'react';
const steps = [
	{
		title: 'First',
		content: 'First-content',
	},
	{
		title: 'Second',
		content: 'Second-content',
	},
	{
		title: 'Last',
		content: 'Last-content',
	},
];
interface ChildrenProps {
	children: React.ReactNode;
}
const CustomSteps: React.FC<ChildrenProps> = ({ children }) => {
	const [current, setCurrent] = useState(0);

	const next = () => {
		setCurrent(current + 1);
	};

	const prev = () => {
		setCurrent(current - 1);
	};

	const items = steps.map((item) => ({ key: item.title, title: item.title }));

	return (
		<>
			<Steps
				current={current}
				items={items}
			/>
			<div>{steps[current].content}</div>
			{current === 0 ? <div>{children}</div> : <></>}
			<div style={{ marginTop: 24 }}>
				{current < steps.length - 1 && (
					<Button
						type='primary'
						onClick={() => next()}
					>
						Next
					</Button>
				)}
				{current === steps.length - 1 && (
					<Button
						type='primary'
						onClick={() => message.success('Processing complete!')}
					>
						Done
					</Button>
				)}
				{current > 0 && (
					<Button
						style={{ margin: '0 8px' }}
						onClick={() => prev()}
					>
						Previous
					</Button>
				)}
			</div>
		</>
	);
};

export default CustomSteps;
