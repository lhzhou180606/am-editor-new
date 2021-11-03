import React from 'react';
import Spin from 'antd/es/spin';
import 'antd/es/spin/style';
import './index.less';

export type LoadingType = {
	text?: string;
	loading?: boolean;
};

const Loading: React.FC<LoadingType> = ({ text, loading, children }) => {
	return (
		<Spin className="loading" tip={text} spinning={loading}>
			{children}
		</Spin>
	);
};

export default Loading;
