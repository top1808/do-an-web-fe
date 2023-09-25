import { Table, TableProps } from 'antd';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface MTableProps extends TableProps<any> {}

const MTable: React.FC<MTableProps> = (props) => {
	return <Table {...props} />;
};

export default MTable;
