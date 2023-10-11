'use client';

import React from 'react';
import { Switch, SwitchProps } from 'antd';

interface MSwitchProps extends SwitchProps {}

const MSwitch: React.FC<MSwitchProps> = (props) => {
	const { ...rest } = props;
	return <Switch {...rest}></Switch>;
};

export default MSwitch;
