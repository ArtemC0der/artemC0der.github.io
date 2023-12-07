import "./style.editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
//import { RichText } from "@wordpress/editor";
import edit from "./edit.js";
import "jquery";
//import classnames from "classnames";
//import { Button, Dashicon } from "@wordpress/components";
const attributes = {
	title: {
		type: "string",
		default: ""
	},
	bgColor: {
		type: "string",
		default: "#f1fbff"
	},
	bgColorTwo: {
		type: "string",
		default: "transparent"
	},
	borderLeftRadius: {
		type: "number",
		default: 0
	},
	borderRightRadius: {
		type: "number",
		default: 0
	},
	align: {
		type: "string",
		default: "wide"
	},
	alignment: {
		type: "string",
		default: "center"
	},
	buttonTitle: {
		type: "string",
		default: "Subscribe"
	},
	verticalOuterPadding: {
		type: "number",
		default: 25
	},
	horizontalOuterPadding: {
		type: "number",
		default: 15
	},
	verticalInnerPadding: {
		type: "number",
		default: 15
	},
	horizontalPadding: {
		type: "number",
		default: 15
	},
	inputBackgroundColor: {
		type: "string",
		default: "#3c3c3c"
	},
	inputTextColor: {
		type: "string",
		default: "#cecece"
	},
	inputTextFontWeight: {
		type: "string",
		default: "normal"
	},
	inputTextTransform: {
		type: "string",
		default: "none"
	},
	buttonBackgroundColor: {
		type: "string",
		default: "#21ade5"
	},
	buttonBackgroundColorTwo: {
		type: "string",
		default: "#eae03d"
	},
	buttonTextColor: {
		type: "string",
		default: "#ffffff"
	},
	fontSize: {
		type: "number",
		default: 14
	},
	buttonTextFontWeight: {
		type: "string",
		default: "normal"
	},
	buttonTextTransform: {
		type: "string",
		default: "none"
	},
	buttonLetterSpacing: {
		type: "number",
		default: 0
	},
	borderTopLeftRadius: {
		type: "number",
		default: 100
	},
	borderBottomLeftRadius: {
		type: "number",
		default: 100
	},
	borderBottomLeftRadiusTwo: {
		type: "number",
		default: 0
	},
	buttonHorizontalPadding: {
		type: "number",
		default: 25
	},
	icon: {
		type: "string",
		default: "arrow-right-alt"
	},
	iconColor: {
		type: "string",
		default: "#fffff"
	},
	iconSize: {
		type: "number",
		default: 15
	},
	hoverButtonBackgroundColor: {
		type: "string"
	},
	hoverButtonTextColor: {
		type: "string"
	},
	styleIs: {
		type: "number",
		default: 1
	},
	doubleOptIn: {
		type: "boolean",
		default: false
	}
};

registerBlockType("guteblock/newsletter", {
	title: __("Newsletter", "guteblock"),
	description: __("Block For Showing Newsletter", "guteblock"),
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
				x1={19.147}
				y1={0.201}
				x2={2.723}
				y2={17.328}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M19.92 3.59H4.07c-.55 0-1 .45-1 1v6.14c0 .55.45 1 1 1h15.84c.55 0 1-.45 1-1V4.59c.01-.56-.44-1-.99-1zm-1 6.14H5.07V5.59h13.84v4.14z"
				fill="url(#prefix__SVGID_1_)"
			/>
			<linearGradient
				id="prefix__SVGID_2_"
				gradientUnits="userSpaceOnUse"
				x1={22.879}
				y1={3.779}
				x2={6.455}
				y2={20.907}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M19.92 14.13H4.07c-.55 0-1 .45-1 1s.45 1 1 1h15.84c.55 0 1-.45 1-1s-.44-1-.99-1z"
				fill="url(#prefix__SVGID_2_)"
			/>
			<linearGradient
				id="prefix__SVGID_3_"
				gradientUnits="userSpaceOnUse"
				x1={27.823}
				y1={8.52}
				x2={11.399}
				y2={25.648}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M19.92 18.44h-5.13c-.55 0-1 .45-1 1s.45 1 1 1h5.13c.55 0 1-.45 1-1s-.45-1-1-1z"
				fill="url(#prefix__SVGID_3_)"
			/>
			<linearGradient
				id="prefix__SVGID_4_"
				gradientUnits="userSpaceOnUse"
				x1={21.332}
				y1={2.296}
				x2={4.908}
				y2={19.423}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M14.94 8.66h2.51c.55 0 1-.45 1-1s-.45-1-1-1h-2.51c-.55 0-1 .45-1 1s.44 1 1 1z"
				fill="url(#prefix__SVGID_4_)"
			/>
		</svg>
	),
	category: "guteblock",
	keywords: [
		__("input", "guteblock"),
		__("submit", "guteblock"),
		__("keyword3", "guteblock")
	],
	supports: {
		reusable: false,
		html: false,
		align: ["wide", "full"]
	},
	styles: [
		{
			name: "1",
			label: __("Basic", "guteblock"),
			isDefault: true
		},
		{
			name: "2",
			label: __("Transparent", "guteblock"),
			isDefault: false
		},
		{
			name: "3",
			label: __("Dash Icon", "guteblock"),
			isDefault: false
		}
	],
	attributes,
	edit,
	save: () => {
		return false;
	}
});
