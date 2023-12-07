import "./style.editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/editor";
import { Dashicon } from "@wordpress/components";
import edit from "./edit.js";
import "./parent";
import classnames from 'classnames';

const attributes = {
	title: {
		type: "string",
		source: "html",
		selector: "h4"
	},
	info: {
		type: "string",
		source: "html",
		selector: "p"
	},
	align: {
		type: "string",
		default: "wide"
	},
	alignment: {
		type: "string",
		default: "center"
	},
	titleColor: {
		type: "string",
		default: "#000000"
	},
	contentColor: {
		type: "string",
		default: "#000000"
	},
	icon: {
		type: "string",
		default: "yes"
	},
	bgcolor: {
		type: "string",
		default: "#fff"
	},
	iconBackground: {
		type: "string",
		default: "#fff"
	},
	iconColor: {
		type: "string",
		default: "#000000"
	},
	showIcon: {
		type: "boolean",
		default: true
	},
	iconSize: {
		type: "number",
		default: 50
	},
	paddingTop: {
		type: "number",
		default: 30
	},
	paddingBottom: {
		type: "number",
		default: 30
	},
	icon_border_radius: {
		type: "number",
		default: 50
	},
	boxShadow: {
		type: "number",
		default: 0
	},
	boxShadowColor: {
		type: "string",
		default: "#000000"
	}
};

registerBlockType("guteblock/icon", {
	title: __("Icon", "guteblock"),
	description: __("Block for showing icon", "guteblock"),
	icon: (
		<svg
			id="prefix__Layer_1"
			x={0}
			y={0}
			viewBox="0 0 24 24"
			xmlSpace="preserve"
			>
			<linearGradient
				id="prefix__SVGID_1_"
				gradientUnits="userSpaceOnUse"
				x1={18.676}
				y1={2.907}
				x2={3.728}
				y2={15.472}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M8.36 7.56h11.95c.55 0 1-.45 1-1s-.45-1-1-1H8.36c-.55 0-1 .45-1 1s.44 1 1 1z"
				fill="url(#prefix__SVGID_1_)"
			/>
			<linearGradient
				id="prefix__SVGID_2_"
				gradientUnits="userSpaceOnUse"
				x1={19.668}
				y1={4.087}
				x2={4.72}
				y2={16.652}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M8.36 11h8.55c.55 0 1-.45 1-1s-.45-1-1-1H8.36c-.55 0-1 .45-1 1s.44 1 1 1z"
				fill="url(#prefix__SVGID_2_)"
			/>
			<linearGradient
				id="prefix__SVGID_3_"
				gradientUnits="userSpaceOnUse"
				x1={22.905}
				y1={7.938}
				x2={7.957}
				y2={20.503}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M20.31 14.14H8.36c-.55 0-1 .45-1 1s.45 1 1 1h11.95c.55 0 1-.45 1-1s-.45-1-1-1z"
				fill="url(#prefix__SVGID_3_)"
			/>
			<linearGradient
				id="prefix__SVGID_4_"
				gradientUnits="userSpaceOnUse"
				x1={23.896}
				y1={9.118}
				x2={8.949}
				y2={21.683}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M16.91 17.59H8.36c-.55 0-1 .45-1 1s.45 1 1 1h8.55c.55 0 1-.45 1-1s-.45-1-1-1z"
				fill="url(#prefix__SVGID_4_)"
			/>
			<linearGradient
				id="prefix__SVGID_5_"
				gradientUnits="userSpaceOnUse"
				x1={18.974}
				y1={3.262}
				x2={4.026}
				y2={15.827}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<circle cx={4.84} cy={15.14} r={1.15} fill="url(#prefix__SVGID_5_)" />
			<linearGradient
				id="prefix__SVGID_6_"
				gradientUnits="userSpaceOnUse"
				x1={14.745}
				y1={-1.769}
				x2={-0.203}
				y2={10.796}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<circle cx={4.84} cy={6.56} r={1.15} fill="url(#prefix__SVGID_6_)" />
		</svg>
	),
	category: "guteblock",
	keywords: [
		__("icon", "guteblock"),
		__("iconName", "guteblock"),
		__("iconContent", "guteblock")
	],
	supports: {
		reusable: false,
		html: false ,
		align: ["wide", "full"]
	},
	parent: ["guteblock/icon-list"],
	attributes,
	edit,
	save: ({ attributes }) => {
		const {
			title,
			alignment,
			info,
			titleColor,
			contentColor,
			icon,
			bgcolor,
			iconBackground,
			iconColor,
			showIcon,
			boxShadow,
			boxShadowColor,
			iconSize,
			paddingTop,
			paddingBottom,
			icon_border_radius
		} = attributes;

		const classes = classnames({
			[`align-${alignment}`]: alignment
		})
			
		return (
			<div className={classes} 
				style={{
						backgroundColor: bgcolor,
						paddingTop: paddingTop,
						paddingBottom: paddingBottom,
						alignment : alignment,
						boxShadow:`${boxShadow}px ${boxShadow}px ${boxShadow}px ${boxShadow}px ${boxShadowColor}`
				}}
			>
				<div className="wp-block-guteblock-icon__icon">
					{showIcon && (
						<Dashicon
							icon={icon}
							size={iconSize}
							style={{ fill: iconColor,
								backgroundColor:iconBackground,
								borderRadius: [
								`${icon_border_radius}%`
							], }}
						/>
					)}
				</div>
				<div className="wp-block-guteblock-icon__content">
				{title && (
					<RichText.Content
						className={
							"wp-block-guteblock-icon__title"
						}
						tagName="h4"
						value={title}
						style={{ color: titleColor }}
					/>
				)}						
				{info && (
					<RichText.Content
						className={
							"wp-block-guteblock-icon__info"
						}
						tagName="p"
						value={info}
						style={{ color: contentColor }}
					/>
				)} 
				</div>               
			</div>
		);
	}
});
