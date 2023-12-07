import "./style.editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import edit from "./edit.js";
import classnames from "classnames";

const attributes = {
	align: {
		type: "string",
		default: "full"
	},
	paddingTop: {
		type: "number",
		default: 50
	},
	paddingBottom: {
		type: "number",
		default: 50
	},
	backgroundColor: {
		type: "string"
	},
	separatorColor: {
		type: "string",
		default: "#000000"
	},
	insideColor: {
		type: "string",
		default: "#fff"
	},
	outsideColor: {
		type: "string",
		default: "#273a4c"
	},
	separatorHeight: {
		type: "number",
		default: 2
	},
	dashWidth: {
		type: "number",
		default: 4
	},
	gutterWidth: {
		type: "number",
		default: 3
	}
};

registerBlockType("guteblock/spacer-divider", {
	title: __("Spacer and Divider Block", "guteblock"),
	description: __("Block for seperating sections in a page.", "guteblock"),
	icon: (
		<svg
			id="prefix__Layer_1"
			x={0}
			y={0}
			viewBox="0 0 24 24"
			xmlSpace="preserve"
		>
			<style />
			<linearGradient
				id="prefix__SVGID_1_"
				gradientUnits="userSpaceOnUse"
				x1={18.513}
				y1={2.451}
				x2={1.115}
				y2={14.722}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M4.06 8.04h15.88c.55 0 1-.45 1-1s-.45-1-1-1H4.06c-.55 0-1 .45-1 1s.45 1 1 1z"
				fill="url(#prefix__SVGID_1_)"
			/>
			<linearGradient
				id="prefix__SVGID_2_"
				gradientUnits="userSpaceOnUse"
				x1={18.623}
				y1={2.607}
				x2={1.226}
				y2={14.878}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M4.06 13h2.5c.55 0 1-.45 1-1s-.45-1-1-1h-2.5c-.55 0-1 .45-1 1s.45 1 1 1z"
				fill="url(#prefix__SVGID_2_)"
			/>
			<linearGradient
				id="prefix__SVGID_3_"
				gradientUnits="userSpaceOnUse"
				x1={20.846}
				y1={5.759}
				x2={3.449}
				y2={18.03}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M13.81 11h-3.63c-.55 0-1 .45-1 1s.45 1 1 1h3.63c.55 0 1-.45 1-1s-.44-1-1-1z"
				fill="url(#prefix__SVGID_3_)"
			/>
			<linearGradient
				id="prefix__SVGID_4_"
				gradientUnits="userSpaceOnUse"
				x1={23.07}
				y1={8.911}
				x2={5.672}
				y2={21.182}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M19.94 11h-2.5c-.55 0-1 .45-1 1s.45 1 1 1h2.5c.55 0 1-.45 1-1s-.45-1-1-1z"
				fill="url(#prefix__SVGID_4_)"
			/>
			<linearGradient
				id="prefix__SVGID_5_"
				gradientUnits="userSpaceOnUse"
				x1={20.542}
				y1={5.327}
				x2={3.144}
				y2={17.598}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<circle
				cx={4.06}
				cy={16.96}
				r={1}
				fill="url(#prefix__SVGID_5_)"
			/>
			<linearGradient
				id="prefix__SVGID_6_"
				gradientUnits="userSpaceOnUse"
				x1={21.539}
				y1={6.741}
				x2={4.141}
				y2={19.012}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<circle
				cx={7.06}
				cy={16.96}
				r={1}
				fill="url(#prefix__SVGID_6_)"
			/>
			<linearGradient
				id="prefix__SVGID_7_"
				gradientUnits="userSpaceOnUse"
				x1={24.529}
				y1={10.98}
				x2={7.131}
				y2={23.252}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<circle
				cx={16.06}
				cy={16.96}
				r={1}
				fill="url(#prefix__SVGID_7_)"
			/>
			<linearGradient
				id="prefix__SVGID_8_"
				gradientUnits="userSpaceOnUse"
				x1={22.535}
				y1={8.153}
				x2={5.138}
				y2={20.424}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<circle
				cx={10.06}
				cy={16.96}
				r={1}
				fill="url(#prefix__SVGID_8_)"
			/>
			<linearGradient
				id="prefix__SVGID_9_"
				gradientUnits="userSpaceOnUse"
				x1={25.525}
				y1={12.392}
				x2={8.127}
				y2={24.664}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<circle
				cx={19.06}
				cy={16.96}
				r={1}
				fill="url(#prefix__SVGID_9_)"
			/>
			<linearGradient
				id="prefix__SVGID_10_"
				gradientUnits="userSpaceOnUse"
				x1={23.533}
				y1={9.567}
				x2={6.135}
				y2={21.838}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<circle
				cx={13.06}
				cy={16.96}
				r={1}
				fill="url(#prefix__SVGID_10_)"
			/>
		</svg>
	),
	category: "guteblock",
	keywords: [__("spacer", "guteblock"), __("divider", "guteblock")],
	supports: {
		reusable: false,
		html: false,
		align: ["wide", "full"]
	},
	attributes,
	styles: [
		{
			name: "solid",
			label: __("Solid", "guteblock"),
			isDefault: true
		},
		{
			name: "dotted",
			label: __("Dotted", "guteblock"),
			isDefault: false
		},
		{
			name: "dashed",
			label: __("Dashed", "guteblock"),
			isDefault: false
		},
		{
			name: "wave",
			label: __("Wave", "guteblock"),
			isDefault: false
		}
	],
	edit,
	save: ({ attributes }) => {
		const {
			paddingTop,
			paddingBottom,
			backgroundColor,
			separatorColor,
			separatorHeight,
			dashWidth,
			gutterWidth,
			insideColor,
			outsideColor
		} = attributes;

		const isStyle = RegExp(/is-style-/);
		const styleName = isStyle.test(attributes.className)
			? attributes.className.replace(isStyle, "")
			: "solid";

		const classes = classnames({
			[`is-style-solid`]: !styleName // Setting style class if the style is not chosen.
		});

		let dashspacingcalc = 3;

		if (styleName == "dotted") {
			dashspacingcalc = 3;
		} else if (styleName == "dashed") {
			dashspacingcalc = dashWidth * 10;
		} else {
			dashspacingcalc = 100;
		}

		if (styleName == "wave") {
			var outerStyle = {
				paddingBottom: paddingBottom,
				backgroundColor: backgroundColor
			};
		} else {
			outerStyle = {
				paddingTop: paddingTop,
				paddingBottom: paddingBottom,
				backgroundColor: backgroundColor
			};
		}

		return (
			<div className={classes} style={outerStyle}>
				{styleName != "wave" && (
					<div
						className="wp-block-guteblock-spacer-divider__separator"
						style={{
							height: separatorHeight,
							backgroundImage: `linear-gradient(to right, ${separatorColor} ${dashspacingcalc}%, rgba(255, 255, 255, 0) 10%)`,
							backgroundSize: `${gutterWidth * 10}px 100%`
						}}
					></div>
				)}
				{styleName == "wave" && (
					<div
						className="wp-block-guteblock-spacer-divider__waveContainer"
						style={{
							paddingTop: paddingTop,
							backgroundColor: insideColor
						}}
					>
						<svg
							id=""
							preserveAspectRatio="xMidYMax meet"
							className="svg-separator sep3"
							viewBox="0 0 1600 100"
							style={{ display: "block" }}
							data-height="100"
						>
							<path
								className=""
								style={{
									opacity: 1,
									fill: `${outsideColor}`
								}}
								d="M-40,71.627C20.307,71.627,20.058,32,80,32s60.003,40,120,40s59.948-40,120-40s60.313,40,120,40s60.258-40,120-40s60.202,40,120,40s60.147-40,120-40s60.513,40,120,40s60.036-40,120-40c59.964,0,60.402,40,120,40s59.925-40,120-40s60.291,40,120,40s60.235-40,120-40s60.18,40,120,40s59.82,0,59.82,0l0.18,26H-60V72L-40,71.627z"
							></path>
						</svg>
					</div>
				)}
			</div>
		);
	}
});
