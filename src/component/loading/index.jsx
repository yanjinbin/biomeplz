import { Spin } from "antd";

const Loading = (props) => {
	const { loadingText } = props;
	return (
		<div className="loading">
			<Spin size="large" />
			<h3 className={"loading-text"}>{loadingText}</h3>
		</div>
	);
};

export default Loading;
