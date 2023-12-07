import "./style.editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
//import { RichText } from "@wordpress/editor";
import edit from "./edit.js";
//import classnames from 'classnames';

const attributes = {
	numberofwords: {
		type: "number",
		default: 20
	},
	numberofposts: {
		type: "number",
		default: 2
	},
	postCategories: {
		type: "string"
	},
	columns: {
		type: "number",
		default: 3
	},
	align: {
		type: "string",
		default: "wide"
	},
	alignment: {
		type: "string",
		default: "center"
	},
	enable_excerpt: {
		type: "boolean",
		default: true
	},
	enable_excerpt_dots: {
		type: "boolean",
		default: true
	},
	title_fontsize: {
		type: "number",
		default: 23
	},
	content_fontsize: {
		type: "number",
		default: 14
	}
};

registerBlockType("guteblock/post-grid", {
	title: __("Post Grid", "guteblock"),
	description: __("Block for showing post grid.", "guteblock"),
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
				x1={20.931}
				y1={0.687}
				x2={5.257}
				y2={16.825}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M11.23 6.62h9.82c.55 0 1-.45 1-1s-.45-1-1-1h-9.82c-.55 0-1 .45-1 1s.45 1 1 1z"
				fill="url(#prefix__SVGID_1_)"
			/>
			<linearGradient
				id="prefix__SVGID_2_"
				gradientUnits="userSpaceOnUse"
				x1={22.859}
				y1={2.559}
				x2={7.185}
				y2={18.697}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M21.05 8.48h-9.82c-.55 0-1 .45-1 1s.45 1 1 1h9.82c.55 0 1-.45 1-1s-.45-1-1-1z"
				fill="url(#prefix__SVGID_2_)"
			/>
			<linearGradient
				id="prefix__SVGID_3_"
				gradientUnits="userSpaceOnUse"
				x1={16.238}
				y1={-3.871}
				x2={0.564}
				y2={12.267}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M7.35 4.35h-4.4c-.55 0-1 .45-1 1v4.4c0 .55.45 1 1 1h4.4c.55 0 1-.45 1-1v-4.4c0-.55-.45-1-1-1zm-1 4.4h-2.4v-2.4h2.4v2.4z"
				fill="url(#prefix__SVGID_3_)"
			/>
			<linearGradient
				id="prefix__SVGID_4_"
				gradientUnits="userSpaceOnUse"
				x1={25.382}
				y1={5.008}
				x2={9.709}
				y2={21.146}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M21.05 13.52h-9.82c-.55 0-1 .45-1 1s.45 1 1 1h9.82c.55 0 1-.45 1-1s-.45-1-1-1z"
				fill="url(#prefix__SVGID_4_)"
			/>
			<linearGradient
				id="prefix__SVGID_5_"
				gradientUnits="userSpaceOnUse"
				x1={27.309}
				y1={6.881}
				x2={11.636}
				y2={23.02}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M21.05 17.38h-9.82c-.55 0-1 .45-1 1s.45 1 1 1h9.82c.55 0 1-.45 1-1s-.45-1-1-1z"
				fill="url(#prefix__SVGID_5_)"
			/>
			<linearGradient
				id="prefix__SVGID_6_"
				gradientUnits="userSpaceOnUse"
				x1={20.688}
				y1={0.451}
				x2={5.014}
				y2={16.589}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M7.35 13.25h-4.4c-.55 0-1 .45-1 1v4.4c0 .55.45 1 1 1h4.4c.55 0 1-.45 1-1v-4.4c0-.55-.45-1-1-1zm-1 4.4h-2.4v-2.4h2.4v2.4z"
				fill="url(#prefix__SVGID_6_)"
			/>
		</svg>
	),
	category: "guteblock",
	keywords: [
		__("post grid", "guteblock"),
		__("posts", "guteblock"),
		__("grid", "guteblock")
	],
	supports: {
		reusable: false,
		html: false,
		align: ["wide", "full"]
	},
	attributes,
	edit,
	save: () => {
		return false;
	}
});
