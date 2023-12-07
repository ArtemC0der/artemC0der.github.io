import "./style.editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/editor";
import edit from "./edit.js";
import classnames from "classnames";

const attributes = {
	title: {
		type: "string",
		source: "html",
		selector: "h4"
	},
	align: {
		type: "string",
		default: "full"
	},
	alignment: {
		type: "string",
		default: "center"
	},
	paddingTop: {
		type: "number",
		default: 200
	},
	paddingBottom: {
		type: "number",
		default: 200
	},
	imageID: {
		type: "number"
	},
	imageUrl: {
		type: "string"
	},
	overlay: {
		type: "boolean",
		default: false
	},
	overlayColor: {
		type: "string"
	},
	overlayOpacity: {
		type: "number",
		default: 0.3
	},
	fixedBackground: {
		type: "boolean",
		default: false
	},
	textColor: {
		type: "string",
		default: "#ffffff"
	},
	enableButton: {
		type: "boolean",
		default: false
	},
	buttonText: {
		type: "string",
		default: "Click Me"
	},
	buttonLink: {
		type: "string",
		default: "#"
	},
	buttonTextColor: {
		type: "string",
		default: "#ffffff"
	},
	buttonBackgroundColor: {
		type: "string",
		default: "#1ebbff"
	},
	buttonBorderRadius: {
		type: "number",
		default: 5
	}
};

registerBlockType("guteblock/separator", {
	title: __("Separator", "guteblock"),
	description: __("Separator block.", "guteblock"),
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
				x1={17.578}
				y1={0.229}
				x2={4.915}
				y2={14.662}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M19.75 3.62H4.25c-.55 0-1 .45-1 1v3.93c0 .55.45 1 1 1h15.5c.55 0 1-.45 1-1V4.62c0-.55-.45-1-1-1zm-1 3.93H5.25V5.62h13.5v1.93z"
				fill="url(#prefix__SVGID_1_)"
			/>
			<linearGradient
				id="prefix__SVGID_2_"
				gradientUnits="userSpaceOnUse"
				x1={22.946}
				y1={4.938}
				x2={10.283}
				y2={19.371}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M19.75 14.45H4.25c-.55 0-1 .45-1 1v3.93c0 .55.45 1 1 1h15.5c.55 0 1-.45 1-1v-3.93c0-.56-.45-1-1-1zm-1 3.93H5.25v-1.93h13.5v1.93z"
				fill="url(#prefix__SVGID_2_)"
			/>
			<linearGradient
				id="prefix__SVGID_3_"
				gradientUnits="userSpaceOnUse"
				x1={20.262}
				y1={2.583}
				x2={7.599}
				y2={17.016}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M19.75 11H4.25c-.55 0-1 .45-1 1s.45 1 1 1h15.5c.55 0 1-.45 1-1s-.45-1-1-1z"
				fill="url(#prefix__SVGID_3_)"
			/>
		</svg>
	),
	category: "guteblock",
	keywords: [__("separator", "guteblock")],
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
			alignment,
			paddingTop,
			paddingBottom,
			imageUrl,
			overlay,
			overlayColor,
			overlayOpacity,
			textColor,
			fixedBackground,
			enableButton,
			buttonText,
			buttonLink,
			buttonTextColor,
			buttonBackgroundColor,
			buttonBorderRadius
		} = attributes;
		const classes = classnames({
			"background-fixed": fixedBackground,
			[`align-${alignment}`]: alignment
		});

		return (
			<div
				className={classes}
				style={{
					paddingTop: paddingTop,
					paddingBottom: paddingBottom,
					backgroundImage: `url(${imageUrl})`
				}}
			>
				{overlay && (
					<div
						className="wp-block-guteblock-separator__overlay"
						style={{
							backgroundColor: overlayColor,
							opacity: overlayOpacity
						}}
					></div>
				)}
				<div className="wp-block-guteblock-separator__contentOuter">
					<RichText.Content
						className={"wp-block-guteblock-seperator__title"}
						tagName="h4"
						value={title}
						style={{
							color: textColor
						}}
					/>
					{enableButton && (
						<a href={buttonLink}>
							<RichText.Content
								className={
									"wp-block-guteblock-separator__button"
								}
								tagName="btn"
								value={buttonText}
								style={{
									color: buttonTextColor,
									backgroundColor: buttonBackgroundColor,
									borderRadius: [
										`${buttonBorderRadius}px`
									]
								}}
							/>
						</a>
					)}
				</div>
			</div>
		);
	}
});
