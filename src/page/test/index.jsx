import ids from "virtual:svg-icons-names";
import SvgIcon from "@/component/svgIcon/index.jsx";
const Test = () => {
	console.log("---<", ids.length);
	return (
		<div>
			<SvgIcon name={"ic-analysis"} height={14} fill={"#ccc"} width={14} />
		</div>
	);
};
export default Test;
