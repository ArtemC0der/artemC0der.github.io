import "./style.editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/editor";
import edit from "./edit.js";
import classnames from "classnames";
import { Button } from "@wordpress/components";
const attributes = {
	containerWidth: {
		type: "number",
		default: 90
	},
	title: {
		type: "string",
		default: "Title"
	},
	align: {
		type: "string",
		default: "wide"
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
	containerVerticalPadding: {
		type: "string",
		default: 10
	},
	containerHorizontalPadding: {
		type: "string",
		default: 10
	},
	backgroundColor: {
		type: "string",
		default: "#676767"
	},
	fixedBackground: {
		type: "boolean",
		default: false
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
	enableButton: {
		type: "boolean",
		default: true
	},
	titleColor: {
		type: "string"
	},
	titleFontSize: {
		type: "number",
		default: 35
	},
	titleTextTransform: {
		type: "string",
		default: "Uppercase"
	},
	buttonTextColor: {
		type: "string"
	},
	buttonBackgroundColor: {
		type: "string"
	},
	buttonTitle: {
		type: "string",
		default: "click"
	},
	buttonFontSize: {
		type: "number",
		default: 20
	},
	buttonBorderRadius: {
		type: "number"
	},
	buttonHorizontalMargin: {
		type: "number",
		default: 0
	},
	buttonVerticalMargin: {
		type: "number",
		default: 15
	},
	buttonVerticalPadding: {
		type: "number",
		default: 20
	},
	buttonHorizontalPadding: {
		type: "number",
		default: 20
	},
	buttonTextTransform: {
		type: "string",
		default: "Uppercase"
	},
	hoverButtonTextColor: {
		type: "string"
	},
	hoverButtonBackgroundColor: {
		type: "string"
	},
	buttonLink: {
		type: "string",
		default: "#"
	}
};

registerBlockType("guteblock/cta", {
	title: __("Call To Action", "guteblock"),
	description: __("Boiler template for a new block", "guteblock"),
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
				x1={17.226}
				y1={-0.516}
				x2={0.861}
				y2={14.617}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M4.07 5.32h15.84c.55 0 1-.45 1-1s-.45-1-1-1H4.07c-.55 0-1 .45-1 1s.45 1 1 1z"
				fill="url(#prefix__SVGID_1_)"
			/>
			<linearGradient
				id="prefix__SVGID_2_"
				gradientUnits="userSpaceOnUse"
				x1={24.218}
				y1={7.045}
				x2={7.854}
				y2={22.179}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				fill="url(#prefix__SVGID_2_)"
				d="M18.79 16.99H4.74v2.72H19.25v-2.72h-.23z"
			/>
			<linearGradient
				id="prefix__SVGID_3_"
				gradientUnits="userSpaceOnUse"
				x1={24.02}
				y1={6.83}
				x2={7.655}
				y2={21.964}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M19.92 11.24h-3.5c-.55 0-1 .45-1 1s.45 1 1 1h3.5c.55 0 1-.45 1-1s-.45-1-1-1z"
				fill="url(#prefix__SVGID_3_)"
			/>
			<linearGradient
				id="prefix__SVGID_4_"
				gradientUnits="userSpaceOnUse"
				x1={17.726}
				y1={0.024}
				x2={1.361}
				y2={15.157}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M14.28 8.39c0-.55-.45-1-1-1H4.07c-.55 0-1 .45-1 1s.45 1 1 1h9.21c.55 0 1-.44 1-1z"
				fill="url(#prefix__SVGID_4_)"
			/>
		</svg>
	),
	category: "guteblock",
	keywords: [__("call to action", "guteblock"), __("cta", "guteblock")],
	supports: {
		reusable: false,
		html: false,
		align: ["wide", "full"]
	},
	styles: [
		{
			name: "basic",
			label: __("Content Left", "guteblock"),
			isDefault: true
		},
		{
			name: "right",
			label: __("Content Right", "guteblock"),
			isDefault: false
		}
	],
	attributes,
	edit,
	save: ({ className, attributes }) => {
		const {
			containerWidth,
			title,
			alignment,
			paddingTop,
			paddingBottom,
			imageUrl,
			fixedBackground,
			overlay,
			overlayColor,
			overlayOpacity,
			backgroundColor,
			containerVerticalPadding,
			containerHorizontalPadding,
			titleColor,
			titleFontSize,
			titleTextTransform,
			enableButton,
			buttonTitle,
			buttonFontSize,
			buttonTextColor,
			buttonBackgroundColor,
			buttonBorderRadius,
			buttonVerticalMargin,
			buttonHorizontalMargin,
			buttonVerticalPadding,
			buttonHorizontalPadding,
			buttonTextTransform,
			hoverButtonTextColor,
			hoverButtonBackgroundColor,
			buttonLink
		} = attributes;

		const classes = classnames(className, {
			"background-fixed": fixedBackground
		});

		return (
			<div
				className={classes}
				style={{
					paddingTop: paddingTop,
					paddingBottom: paddingBottom,
					backgroundColor: backgroundColor,
					backgroundImage: `url(${imageUrl})`,
					backgroundSize: "cover",
					alignment: alignment
				}}
			>
				{overlay && (
					<div
						className="wp-block-guteblock-cta__overlay"
						style={{
							backgroundColor: overlayColor,
							opacity: overlayOpacity
						}}
					></div>
				)}
				<div
					className="wp-block-guteblock-cta__contentOuter"
					style={{ maxWidth: `${containerWidth}%` }}
				>
					<div
						className="wp-block-guteblock-cta__container"
						style={{
							textAlign: alignment,
							paddingTop: `${containerVerticalPadding}px`,
							paddingBottom: `${containerVerticalPadding}px`,
							paddingLeft: `${containerHorizontalPadding}px`,
							paddingRight: `${containerHorizontalPadding}px`
						}}
					>
						<RichText.Content
							className={"wp-block-guteblock-cta__title"}
							style={{
								color: titleColor,
								fontSize: `${titleFontSize}px`,
								textTransform: titleTextTransform
							}}
							tagName="h2"
							value={title}
						/>
						{enableButton && (
							<Button
								target="_blank"
								rel="noopener noreferrer"
								className={
									"wp-block-guteblock-cta__button"
								}
								style={{
									textTransform: buttonTextTransform,
									color: buttonTextColor,
									fontSize: buttonFontSize,
									marginTop: `${buttonVerticalMargin}px`,
									marginBottom: `${buttonVerticalMargin}px`,
									marginLeft: `${buttonHorizontalMargin}px`,
									marginRight: `${buttonHorizontalMargin}px`,
									paddingTop: `${buttonVerticalPadding}px`,
									paddingBottom: `${buttonVerticalPadding}px`,
									paddingLeft: `${buttonHorizontalPadding}px`,
									paddingRight: `${buttonHorizontalPadding}px`,
									backgroundColor: buttonBackgroundColor,
									borderRadius: `${buttonBorderRadius}px`
								}}
								href={buttonLink}
							>
								<RichText.Content
									style={{
										backgroundColor: "#fff"
									}}
									value={buttonTitle}
								/>
							</Button>
						)}
					</div>
				</div>
				<style
					dangerouslySetInnerHTML={{
						__html: [
							`.wp-block-guteblock-cta__button:hover {
								color: ${hoverButtonTextColor} !important;
								background-color: ${hoverButtonBackgroundColor} !important;
								transition: 1s ease all !important;
							}
							`
						].join("\n")
					}}
				></style>
			</div>
		);
	}
});
