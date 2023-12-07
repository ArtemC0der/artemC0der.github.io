import "./style.editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/editor";
import { Dashicon } from "@wordpress/components";
import edit from "./edit.js";
import classnames from "classnames";

const attributes = {
	title: {
		type: "string",
		source: "html",
		selector: "h3"
	},
	description: {
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
	icon: {
		type: "string",
		default: "yes-alt"
	},
	bgcolor: {
		type: "string",
		default: "#66c538"
	},
	textcolor: {
		type: "string",
		default: "#ffffff"
	},
	iconcolor: {
		type: "string",
		default: "#ffffff"
	},
	showIcon: {
		type: "boolean",
		default: true
	},
	iconSize: {
		type: "number",
		default: 100
	},
	paddingTop: {
		type: "number",
		default: 50
	},
	paddingBottom: {
		type: "number",
		default: 30
	},
	showCloseButton: {
		type: "boolean",
		default: true
	},
	closeButtonColor: {
		type: "string",
		default: "#ffffff"
	},
	enableShadow: {
		type: "boolean",
		default: false
	}
};

registerBlockType("guteblock/notification", {
	title: __("Notification", "guteblock"),
	description: __("Block for displaying notifications", "guteblock"),
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
				x1={20.894}
				y1={4.218}
				x2={6.538}
				y2={16.795}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M20.3 2.72H3.69c-.55 0-1 .45-1 1v16.59c0 .55.45 1 1 1H20.3c.55 0 1-.45 1-1V3.72c0-.55-.44-1-1-1zm-1 16.59H4.69V4.72H19.3v14.59z"
				fill="url(#prefix__SVGID_1_)"
			/>
			<linearGradient
				id="prefix__SVGID_2_"
				gradientUnits="userSpaceOnUse"
				x1={19.108}
				y1={2.179}
				x2={4.752}
				y2={14.757}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M10.54 10.97c.19.19.44.29.71.29.27 0 .52-.11.71-.29l3.18-3.18a.996.996 0 10-1.41-1.41l-2.47 2.47-.57-.57a.996.996 0 10-1.41 1.41l1.26 1.28z"
				fill="url(#prefix__SVGID_2_)"
			/>
			<linearGradient
				id="prefix__SVGID_3_"
				gradientUnits="userSpaceOnUse"
				x1={22.635}
				y1={6.204}
				x2={8.278}
				y2={18.782}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M14.29 13.23a.996.996 0 00-1.41 0l-.88.88-.88-.88a.996.996 0 10-1.41 1.41l.88.88-.89.89a.996.996 0 00.71 1.7c.26 0 .51-.1.71-.29l.88-.88.88.88c.2.2.45.29.71.29s.51-.1.71-.29a.996.996 0 000-1.41l-.88-.88.88-.88c.38-.4.38-1.03-.01-1.42z"
				fill="url(#prefix__SVGID_3_)"
			/>
		</svg>
	),
	category: "guteblock",
	keywords: [__("notification", "guteblock"), __("alert", "guteblock")],
	// styles: [
	// 	{
	// 		name: "inline",
	// 		label: __("Inline", "guteblock"),
	// 		isDefault: true
	// 	},
	// 	{
	// 		name: "multiline",
	// 		label: __("Multiple", "guteblock"),
	// 		isDefault: false
	// 	},
	// 	{
	// 		name: "modern",
	// 		label: __("Modern", "guteblock"),
	// 		isDefault: false
	// 	}
	// ],
	supports: {
		reusable: false,
		html: false,
		align: ["wide", "full"]
	},
	attributes,
	edit,
	save: ({ attributes }) => {
		const {
			title,
			description,
			alignment,
			bgcolor,
			textcolor,
			paddingTop,
			paddingBottom,
			showIcon,
			icon,
			iconSize,
			iconcolor,
			showCloseButton,
			closeButtonColor,
			enableShadow
		} = attributes;

		const classes = classnames({
			[`align-${alignment}`]: alignment,
			[`has-shadow`]: enableShadow
		});

		return (
			<div
				className={classes}
				style={{
					backgroundColor: bgcolor,
					color: textcolor,
					paddingTop: paddingTop,
					paddingBottom: paddingBottom
				}}
			>
				{showCloseButton && (
					<div className="wp-block-guteblock-notification__closeBtn">
						<Dashicon
							icon="dismiss"
							size={32}
							style={{ color: closeButtonColor }}
						/>
					</div>
				)}
				{showIcon && (
					<Dashicon
						icon={icon}
						size={iconSize}
						style={{ color: iconcolor }}
					/>
				)}
				<RichText.Content
					className={"wp-block-guteblock-notification__title"}
					tagName="h3"
					value={title}
				/>
				<RichText.Content
					className={
						"wp-block-guteblock-notification__description"
					}
					tagName="p"
					value={description}
				/>
			</div>
		);
	}
});
