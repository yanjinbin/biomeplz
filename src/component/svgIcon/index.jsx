import React from "react";

const SvgIcon = React.memo(({ width, height, name, color, className }) => {
	return (
		<svg
			className={className.trim() || "svg-icon"}
			aria-hidden="true"
			width={width}
			height={height}
			fill={color}
		>
			<use href={`#icon-${name}`} />
		</svg>
	);
});
export default SvgIcon;
