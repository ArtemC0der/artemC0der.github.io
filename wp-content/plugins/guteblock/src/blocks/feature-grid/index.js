import "./style.editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/editor";
import { Button } from "@wordpress/components";
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
	grid_border_radius: {
		type: "number",
		default: 0
	},
	section_background: {
		type: "string",
		default: "#fff"
	},
	grid_background: {
		type: "string",
		default: "#f8f8f8"
	},
	shadow_background: {
		type: "string",
		default: "transparent"
	},
	title_color: {
		type: "string",
		default: "#333"
	},
	content_color: {
		type: "string",
		default: "#333"
	},
	actual_price_color: {
		type: "string",
		default: "#333"
	},
	offer_price_color: {
		type: "string",
		default: "#333"
	},
	shadow: {
		type: "boolean"
	},
	image_border_radius: {
		type: "number"
	},
	title_size: {
		type: "number"
	},
	content_size: {
		type: "number"
	},
	fontWeight: {
		type: "string",
		default: "normal"
	},
	textTransform: {
		type: "string",
		default: "none"
	},
	letterSpacing: {
		type: "number",
		default: 0
	},
	contentFontWeight: {
		type: "string",
		default: "normal"
	},
	contentTextTransform: {
		type: "string",
		default: "none"
	},
	contentLetterSpacing: {
		type: "number",
		default: 0
	},
	innerPadding: {
		type: "number",
		default: 0
	},
	buttonBgColor: {
		type: "string",
		default: "#000"
	},
	buttonTextColor: {
		type: "string"
	},
	buttonBorderRadius: {
		type: "number"
	},
	buttonVerticalPadding: {
		type: "number",
		default: 5
	},
	buttonHorizontalPadding: {
		type: "number",
		default: 10
	},
	opacity: {
		type: "number",
		default: 1
	},
	fontSize: {
		type: "number"
	},
	buttonFontWeight: {
		type: "number",
		default: 500
	},
	buttonTextTransform: {
		type: "string",
		default: "normal"
	},
	buttonLetterSpacing: {
		type: "number",
		default: 0
	},
	isNewTab: {
		type: "boolean"
	},
	link: {
		type: "string",
		source: "html",
		selector: "span"
	},
	buttonVerticalMargin: {
		type: "number"
	},
	verticalMargin: {
		type: "number",
		default: 5
	},
	featureGrids: {
		type: "array",
		default: [
			{
				title: "",
				content: "",
				buttonText: {
					type: "string",
					default: "Button Text"
				},
				link: "",
				actualPrice: "",
				offerPrice: ""
			},
			{
				title: "",
				content: "",
				buttonText: {
					type: "string",
					default: "Button Text"
				},
				link: "",
				actualPrice: "",
				offerPrice: ""
			},
			{
				title: "",
				content: "",
				buttonText: {
					type: "string",
					default: "Button Text"
				},
				link: "",
				actualPrice: "",
				offerPrice: ""
			}
		]
	}
};

registerBlockType("guteblock/feature-grid", {
	title: __("Feature Grid", "guteblock"),
	description: __("Block for adding feature grids.", "guteblock"),
	icon: (
		<svg
			id="prefixLayer_1"
			x={0}
			y={0}
			viewBox="0 0 24 24"
			xmlSpace="preserve"
		>
			<linearGradient
				id="prefixSVGID1"
				gradientUnits="userSpaceOnUse"
				x1={20.757}
				y1={2.667}
				x2={6.65}
				y2={17.702}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M18.58 21.01H5.42c-.55 0-1-.45-1-1V3.99c0-.55.45-1 1-1h13.17c.55 0 1 .45 1 1v16.02c-.01.55-.45 1-1.01 1zm-12.16-2h11.17V4.99H6.42v14.02z"
				fill="url(#prefixSVGID1)"
			/>
			<linearGradient
				id="prefixSVGID2"
				gradientUnits="userSpaceOnUse"
				x1={21.319}
				y1={3.195}
				x2={7.213}
				y2={18.23}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M15.56 14.13H8.44c-.55 0-1-.45-1-1s.45-1 1-1h7.11c.55 0 1 .45 1 1s-.44 1-.99 1z"
				fill="url(#prefixSVGID2)"
			/>
			<g>
				<linearGradient
					id="prefixSVGID3"
					gradientUnits="userSpaceOnUse"
					x1={23.097}
					y1={4.863}
					x2={8.991}
					y2={19.898}
				>
					<stop offset={0} stopColor="#eb7d31" />
					<stop offset={1} stopColor="#ee576f" />
				</linearGradient>
				<path
					d="M15.56 17.69H8.44c-.55 0-1-.45-1-1s.45-1 1-1h7.11c.55 0 1 .45 1 1s-.44 1-.99 1z"
					fill="url(#prefix_SVGID_3)"
				/>
			</g>
		</svg>
	),
	category: "guteblock",
	keywords: [
		__("feature grid", "guteblock"),
		__("feature", "guteblock"),
		__("features", "guteblock")
	],
	supports: {
		html: false,
		align: ["wide", "full"]
	},
	styles: [
		{
			name: "1",
			label: __("Style 1", "guteblock"),
			isDefault: true
		},
		{
			name: "2",
			label: __("Style 2", "guteblock"),
			isDefault: false
		},
		{
			name: "3",
			label: __("Style 3", "guteblock"),
			isDefault: false
		}
	],
	attributes,
	edit,
	save: ({ attributes }) => {
		const {
			align,
			alignment,
			featureGrids,
			grid_border_radius,
			section_background,
			grid_background,
			title_color,
			content_color,
			image_border_radius,
			shadow_background,
			title_size,
			content_size,
			textTransform,
			letterSpacing,
			fontWeight,
			contentTextTransform,
			contentFontWeight,
			contentLetterSpacing,
			innerPadding,
			buttonTextColor,
			buttonBgColor,
			buttonBorderRadius,
			buttonVerticalPadding,
			buttonHorizontalPadding,
			fontSize,
			buttonFontWeight,
			buttonTextTransform,
			buttonLetterSpacing,
			isNewTab,
			opacity,
			buttonVerticalMargin,
			actual_price_color,
			offer_price_color,
			verticalMargin
		} = attributes;

		const classes = classnames({
			[`align${align}`]: align,
			[`align-${alignment}`]: alignment
		});

		const isStyle = RegExp(/is-style-/);
		const styleName = isStyle.test(attributes.className)
			? attributes.className.replace(isStyle, "")
			: null;

		let target;
		{
			isNewTab ? (target = "_blank") : (target = "_self");
		}

		return (
			<div
				className={classes}
				style={{
					backgroundColor: section_background
				}}
			>
				<div className="wp-block-guteblock-feature-grid__container">
					{featureGrids.map((featureGrid, index) => {
						return (
							<div
								className="feature-grid__outer"
								key={index}
								style={{
									borderRadius: [
										`${grid_border_radius}px`
									],
									backgroundColor: grid_background,
									boxShadow: `0 0 29px -19px ${shadow_background}`
								}}
							>
								{styleName != 3 && (
									<div className="feature-grid__image-outer">
										<img
											style={{
												borderRadius: [
													`${image_border_radius}%`
												]
											}}
											src={
												featureGrid.authorImageUrl
											}
											alt={
												featureGrid.authorImageAlt
											}
											data-id={
												featureGrid.authorImageID
											}
										/>
									</div>
								)}
								{styleName != 2 && (
									<div
										className="feature-grid__content-outer"
										style={{
											marginTop: `${verticalMargin}px`
										}}
									>
										<RichText.Content
											className={
												"wp-block-guteblock-feature-grid__title"
											}
											tagName="h4"
											value={featureGrid.title}
											style={{
												color: title_color,
												fontSize: `${title_size}px`,
												textTransform: textTransform,
												fontWeight: fontWeight,
												letterSpacing: `${letterSpacing}px`,
												padding: `0 ${innerPadding}px`
											}}
										/>

										<RichText.Content
											className={
												"wp-block-guteblock-feature-grid__content"
											}
											tagName="p"
											value={
												featureGrid.content
											}
											style={{
												color: content_color,
												fontSize: content_size,
												textTransform: contentTextTransform,
												fontWeight: contentFontWeight,
												letterSpacing: `${contentLetterSpacing}px`,
												padding: `0 ${innerPadding}px`
											}}
										/>
									</div>
								)}

								{styleName == 2 && (
									<div
										className="feature-grid__content-outer"
										style={{
											marginTop: `${verticalMargin}px`
										}}
									>
										<RichText.Content
											className={
												"wp-block-guteblock-feature-grid__title"
											}
											tagName="h4"
											value={featureGrid.title}
											style={{
												color: title_color,
												fontSize: `${title_size}px`,
												textTransform: textTransform,
												fontWeight: fontWeight,
												letterSpacing: `${letterSpacing}px`,
												padding: `0 ${innerPadding}px`
											}}
										/>

										<RichText.Content
											className={
												"wp-block-guteblock-feature-grid__actual_content"
											}
											tagName="p"
											value={
												featureGrid.actualPrice
											}
											style={{
												color: actual_price_color,
												fontSize: content_size,
												textTransform: contentTextTransform,
												fontWeight: contentFontWeight,
												letterSpacing: `${contentLetterSpacing}px`,
												padding: `0 ${innerPadding}px`
											}}
										/>

										<RichText.Content
											className={
												"wp-block-guteblock-feature-grid__offer_content"
											}
											tagName="p"
											value={
												featureGrid.offerPrice
											}
											style={{
												color: offer_price_color,
												fontSize: content_size,
												textTransform: contentTextTransform,
												fontWeight: contentFontWeight,
												letterSpacing: `${contentLetterSpacing}px`,
												padding: `0 ${innerPadding}px`
											}}
										/>
									</div>
								)}
								{styleName != 3 && (
									<Button
										href={featureGrid.link}
										target={target}
										rel="noopener noreferrer"
										className="wp-block-guteblock-feature-grid__button"
										style={{
											color: buttonTextColor,
											backgroundColor: buttonBgColor,
											borderRadius: `${buttonBorderRadius}px`,
											padding: `${buttonVerticalPadding}px ${buttonHorizontalPadding}px`,
											fontSize: `${fontSize}px`,
											fontWeight: buttonFontWeight,
											textTransform: buttonTextTransform,
											letterSpacing: buttonLetterSpacing,
											opacity: opacity,
											marginTop: `${buttonVerticalMargin}px`
										}}
									>
										<RichText.Content
											className={
												"wp-block-guteblock-feature-grid__button_text"
											}
											value={
												featureGrid.buttonText
											}
										/>
									</Button>
								)}
								{styleName == 3 && (
									<Button
										href={featureGrid.link}
										target={target}
										rel="noopener noreferrer"
										className="wp-block-guteblock-feature-grid__button"
										style={{
											color: buttonTextColor,
											fontSize: `${fontSize}px`,
											fontWeight: buttonFontWeight,
											textTransform: buttonTextTransform,
											letterSpacing: buttonLetterSpacing,
											marginTop: `${buttonVerticalMargin}px`
										}}
									>
										<RichText.Content
											className={
												"wp-block-guteblock-feature-grid__button_text"
											}
											value={
												featureGrid.buttonText
											}
										/>
									</Button>
								)}
								<div className="clear"></div>
							</div>
						);
					})}
					<div className="clear"></div>
				</div>
			</div>
		);
	}
});
