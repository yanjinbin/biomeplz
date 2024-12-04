import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
	const navigate = useNavigate();
	const backHome = () => {
		navigate("/", { replace: true });
	};
	return (
		<Result
			status="404"
			title="404 找不到页面"
			subTitle="抱歉你访问的页面不存在"
			extra={
				<Button type="primary" onClick={backHome}>
					{"返回首页"}
				</Button>
			}
		/>
	);
};

export default NotFound;
