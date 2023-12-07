import "./style.editor.scss";
import { registerBlockType, createBlock } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/editor";
import edit from "./edit.js";
import classnames from "classnames";

const attributes = {
	blockid: {
		type: "string"
	},
	content: {
		type: "string",
		source: "html",
		selector: "p"
	},
	textColor: {
		type: "string",
		default: "#333333"
	},
	dropCapColor: {
		type: "string",
		default: "#ff0000"
	},
	fontSize: {
		type: "number",
		default: 100
	},
	align: {
		type: "string",
		default: "center"
	},
	alignment: {
		type: "string",
		default: "left"
	}
};

registerBlockType("guteblock/drop-cap", {
	title: __("Drop Cap", "guteblock"),
	description: __("Make your paragraph look more beautiful.", "guteblock"),
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
				x1={19.101}
				y1={3.939}
				x2={4.048}
				y2={16.047}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M10.66 7.87h9.59c.55 0 1-.45 1-1s-.45-1-1-1h-9.59c-.55 0-1 .45-1 1s.45 1 1 1z"
				fill="url(#prefix__SVGID_1_)"
			/>
			<linearGradient
				id="prefix__SVGID_2_"
				gradientUnits="userSpaceOnUse"
				x1={20.776}
				y1={6.021}
				x2={5.723}
				y2={18.129}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M20.25 9.3h-9.59c-.55 0-1 .45-1 1s.45 1 1 1h9.59c.55 0 1-.45 1-1s-.45-1-1-1z"
				fill="url(#prefix__SVGID_2_)"
			/>
			<linearGradient
				id="prefix__SVGID_3_"
				gradientUnits="userSpaceOnUse"
				x1={21.094}
				y1={6.417}
				x2={6.042}
				y2={18.525}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M20.25 12.73H3.75c-.55 0-1 .45-1 1s.45 1 1 1h16.5c.55 0 1-.45 1-1s-.45-1-1-1z"
				fill="url(#prefix__SVGID_3_)"
			/>
			<linearGradient
				id="prefix__SVGID_4_"
				gradientUnits="userSpaceOnUse"
				x1={22.769}
				y1={8.499}
				x2={7.716}
				y2={20.607}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M20.25 16.16H3.75c-.55 0-1 .45-1 1s.45 1 1 1h16.5c.55 0 1-.45 1-1s-.45-1-1-1z"
				fill="url(#prefix__SVGID_4_)"
			/>
			<linearGradient
				id="prefix__SVGID_5_"
				gradientUnits="userSpaceOnUse"
				x1={16.683}
				y1={0.933}
				x2={1.63}
				y2={13.04}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M4.92 10.2h2.05l.47 1.18h1.49L6.6 5.84H5.34l-2.33 5.55h1.45l.46-1.19zm1.03-2.72l.67 1.75H5.28l.67-1.75z"
				fill="url(#prefix__SVGID_5_)"
			/>
		</svg>
	),
	category: "guteblock",
	keywords: [__("dropcap", "guteblock"), __("drop cap", "guteblock")],
	supports: {
		reusable: false,
		html: false,
		align: ["center", "wide", "full"]
	},
	attributes,
	edit,
	transforms: {
		from: [
			{
				type: "block",
				blocks: ["core/paragraph"],
				transform: ({ content, align }) => {
					return createBlock("guteblock/drop-cap", {
						content: content,
						alignment: align
					});
				}
			}
		],
		to: [
			{
				type: "block",
				blocks: ["core/paragraph"],
				transform: ({ content, alignment }) => {
					return createBlock("core/paragraph", {
						content: content,
						align: alignment
					});
				}
			}
		]
	},
	save: ({ attributes }) => {
		const {
			content,
			textColor,
			dropCapColor,
			fontSize,
			alignment,
			blockid
		} = attributes;

		const classes = classnames({
			[`align-${alignment}`]: alignment
		});

		return (
			<div id={`block-${blockid}`} className={classes}>
				<RichText.Content
					className={"wp-block-guteblock-drop-cap__content"}
					tagName="p"
					value={content}
					style={{
						color: textColor
					}}
				/>
				<style
					dangerouslySetInnerHTML={{
						__html: [
							`#block-${blockid}.wp-block-guteblock-drop-cap p:first-child:first-letter, .wp-block-guteblock-drop-cap p:nth-of-type(1):first-letter { color: ${dropCapColor}; font-size: ${fontSize}px; }`
						].join("\n")
					}}
				></style>
			</div>
		);
	}
});
