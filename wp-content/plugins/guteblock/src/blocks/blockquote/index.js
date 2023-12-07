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
		default: "wide"
	},
	alignment: {
		type: "string",
		default: "center"
	},
	autherName: {
		type: "string",
		source: "html",
		selector: "h5"
	},
	isHeadTitleShow: {
		type: "boolean",
		default: true
	},
	fontSizeForHead: {
		type: "number",
		default: 14
	},
	alignmentForHead: {
		type: "string",
		default: "left"
	},
	qouteContent: {
		type: "string",
		source: "html",
		selector: "p"
	},

	//padding for header title
	paddingForHeadseprate: {
		type: "object",
		default: {
			top: 10,
			bottom: 1,
			right: 1,
			left: 10
		}
	},
	//margin section for header one
	marginForHeadseprate: {
		type: "object",
		default: {
			top: 5,
			bottom: 0,
			left: 0,
			right: 5
		}
	},
	letterSpacingForTitle: {
		type: "string",
		default: 1
	},
	colorForHead: {
		type: "string",
		default: "#000"
	},
	HeaderTransformTo: {
		type: "string",
		default: "none"
	},
	headerFontWeight: {
		type: "string"
	},
	//conatiner - Main
	conatinerMainBackgroundColor: {
		type: "string",
		default: "#f9f9f9"
	},
	containerPadding: {
		type: "object",
		default: {
			top: 0,
			left: 0,
			right: 0,
			bottom: 0
		}
	},
	containerMargin: {
		type: "object",
		default: {
			top: 0,
			left: "auto",
			right: "auto",
			bottom: 0,
			isToggler: true
		}
	},
	containerBorderRadius: {
		type: "number",
		default: 0
	},
	//conatiner-sub
	innerContainerWidth: {
		type: "number",
		default: 80
	},
	innerContainerColor: {
		type: "string",
		default: "#fff"
	},

	innerContainerPadding: {
		type: "object",
		default: {
			top: 40,
			bottom: 60,
			left: 5,
			right: 5
		}
	},
	innerConatinerBoxShadow: {
		type: "object",
		default: {
			xoffset: 2,
			yOffset: 2,
			Blur: 3,
			spreadShadow: 3,
			colorShadow: "#eee"
		}
	},
	isBoxShadowISneeded: {
		type: "boolean",
		default: false
	},
	innerConatinerBorderRadius: {
		type: "number",
		default: 0
	},
	isSameAsContainerColor: {
		type: "boolean",
		default: false
	},

	//content-p
	contentColor: {
		type: "string",
		default: "#000"
	},
	lineHieghtContent: {
		type: "number",
		default: 40
	},
	letterSpacingContent: {
		type: "number",
		default: 0
	},
	fontWeigthContent: {
		type: "string"
	},
	contentTransformTo: {
		type: "string",
		default: "none"
	},
	contentPadding: {
		type: "object",
		default: {
			top: 0,
			bottom: 0,
			right: 15,
			left: 15
		}
	},

	//icon settings
	iconGeneral: {
		type: "object",
		default: {
			size: 40,
			color: "#e6e5e5",
			opacity: 0.4
		}
	},
	iconAbove: {
		type: "object",
		default: {
			horizontal: 10,
			vertical: 10,
			isShown: true
		}
	},
	iconBelow: {
		type: "object",
		default: {
			horizontal: 10,
			vertical: 10,
			isShown: true
		}
	},
	//author Name
	authorAlign: {
		type: "string",
		default: "center"
	},
	authorIsShown: {
		type: "boolean",
		default: false
	},
	authorFontSize: {
		type: "number",
		default: 15
	},
	authorFontColor: {
		type: "string",
		default: "#000"
	}
};
registerBlockType("guteblock/blockquote", {
	title: __("Block Quote", "guteblock"),
	description: __(
		"The Blockquote block can be used to highlight significant parts of a post. Use different quote styles to maximize visibility.",
		"guteblock"
	),
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
				x1={20.387}
				y1={5.258}
				x2={3.036}
				y2={17.391}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M9.75 9.75h11.29c.55 0 1-.45 1-1s-.45-1-1-1H9.75c-.55 0-1 .45-1 1s.45 1 1 1z"
				fill="url(#prefixSVGID1)"
			/>
			<linearGradient
				id="prefixSVGID2"
				gradientUnits="userSpaceOnUse"
				x1={20.99}
				y1={6.12}
				x2={3.639}
				y2={18.253}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M21.04 11.34H3.16c-.55 0-1 .45-1 1s.45 1 1 1h17.89c.55 0 1-.45 1-1s-.45-1-1.01-1z"
				fill="url(#prefixSVGID2)"
			/>
			<linearGradient
				id="prefixSVGID3"
				gradientUnits="userSpaceOnUse"
				x1={21.592}
				y1={6.981}
				x2={4.241}
				y2={19.114}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M14.45 14.92H3.16c-.55 0-1 .45-1 1s.45 1 1 1h11.3c.55 0 1-.45 1-1s-.46-1-1.01-1z"
				fill="url(#prefixSVGID3)"
			/>
			<linearGradient
				id="prefixSVGID4"
				gradientUnits="userSpaceOnUse"
				x1={24.663}
				y1={11.373}
				x2={7.312}
				y2={23.506}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M17.47 14.55c-.26 0-.48.09-.67.28-.19.19-.29.42-.29.69 0 .23.09.45.26.66.17.21.44.31.81.31 0 .31-.04.56-.13.78-.09.21-.21.39-.35.53-.15.14-.36.24-.65.32v.74c.47-.06.86-.23 1.19-.5s.58-.6.77-.98c.19-.38.28-.79.28-1.22 0-.49-.12-.88-.36-1.17-.25-.3-.53-.44-.86-.44z"
				fill="url(#prefixSVGID4)"
			/>
			<linearGradient
				id="prefixSVGID5"
				gradientUnits="userSpaceOnUse"
				x1={25.608}
				y1={12.725}
				x2={8.257}
				y2={24.858}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M20.34 14.55c-.26 0-.48.09-.67.28-.19.19-.29.42-.29.69 0 .23.09.45.26.66.17.21.44.31.81.31 0 .31-.04.56-.13.78-.09.21-.21.39-.36.53s-.36.24-.64.32v.74c.47-.06.86-.23 1.19-.5s.58-.6.77-.98c.19-.38.28-.79.28-1.22 0-.49-.12-.88-.36-1.17-.24-.3-.52-.44-.86-.44z"
				fill="url(#prefixSVGID5)"
			/>
			<linearGradient
				id="prefixSVGID6"
				gradientUnits="userSpaceOnUse"
				x1={15.999}
				y1={-1.018}
				x2={-1.352}
				y2={11.115}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M3.64 9.48c.26 0 .48-.09.67-.28.2-.19.29-.42.29-.69 0-.23-.09-.45-.26-.66-.17-.21-.44-.31-.8-.31 0-.31.04-.56.13-.78.09-.21.21-.39.35-.53.15-.13.36-.24.65-.31v-.74c-.47.07-.87.23-1.19.5-.32.27-.58.6-.77.98-.19.38-.28.79-.28 1.22 0 .49.12.88.36 1.17.24.29.52.43.85.43z"
				fill="url(#prefixSVGID6)"
			/>
			<linearGradient
				id="prefixSVGID7"
				gradientUnits="userSpaceOnUse"
				x1={16.945}
				y1={0.335}
				x2={-0.406}
				y2={12.468}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M6.52 9.48c.26 0 .48-.09.67-.28.19-.19.29-.42.29-.69 0-.23-.09-.45-.26-.66-.17-.21-.44-.31-.8-.31 0-.31.04-.56.13-.78.09-.21.2-.39.35-.52.15-.14.36-.25.65-.32v-.74c-.47.06-.86.23-1.19.5-.32.27-.58.6-.77.98-.19.38-.28.79-.28 1.22 0 .49.12.88.36 1.17.23.29.52.43.85.43z"
				fill="url(#prefix_SVGID_7)"
			/>
		</svg>
	),
	category: "guteblock",
	keywords: [__("blockquote", "guteblock"), __("quote", "guteblock")],
	supports: {
		reusable: false,
		html: false,
		align: ["wide", "full"]
	},
	attributes,
	edit,
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
		}
	],
	save: ({ attributes }) => {
		const {
			title,
			alignment,
			autherName,
			isHeadTitleShow,
			fontSizeForHead,
			alignmentForHead,
			paddingForHeadseprate,
			marginForHeadseprate,
			qouteContent,
			letterSpacingForTitle,
			colorForHead,
			HeaderTransformTo,
			headerFontWeight,
			conatinerMainBackgroundColor,
			containerPadding,
			containerMargin,
			containerBorderRadius,
			contentColor,
			contentTransformTo,
			letterSpacingContent,
			fontWeigthContent,
			lineHieghtContent,
			innerContainerWidth,
			innerContainerColor,
			innerContainerPadding,
			innerConatinerBorderRadius,
			innerConatinerBoxShadow,
			iconGeneral,
			iconAbove,
			iconBelow,
			authorIsShown,
			authorAlign,
			contentPadding,
			isBoxShadowISneeded,
			authorFontSize,
			authorFontColor
		} = attributes;

		const classes = classnames({
			[`align-${alignment}`]: alignment
		});

		const isStyle = RegExp(/is-style-/);
		const styleName = isStyle.test(attributes.className)
			? attributes.className.replace(isStyle, "")
			: null;
		return (
			<div
				className={classes}
				style={{
					backgroundColor: conatinerMainBackgroundColor,
					paddingTop: `${containerPadding.top}px`,
					paddingBottom: `${containerPadding.bottom}px`,
					paddingRight: `${containerPadding.right}px`,
					paddingLeft: `${containerPadding.left}px`,
					marginTop: `${containerMargin.top}px`,
					marginLeft:
						containerMargin.left !== "auto"
							? `${containerMargin.left}px`
							: "auto",
					marginRight:
						containerMargin.right !== "auto"
							? `${containerMargin.right}px`
							: "auto",
					marginBottom: `${containerMargin.bottom}px`,
					borderRadius: `${containerBorderRadius}px`
				}}
			>
				<div
					className={
						"wp-block-guteblock-blockquote__Inner-container"
					}
					style={{
						width: `${innerContainerWidth}%`,
						backgroundColor: innerContainerColor,
						paddingTop: `${innerContainerPadding.top}px`,
						paddingBottom: `${innerContainerPadding.bottom}px`,
						paddingRight: `${innerContainerPadding.right}px`,
						paddingLeft: `${innerContainerPadding.left}px`,
						borderRadius: `${innerConatinerBorderRadius}px`,
						boxShadow: isBoxShadowISneeded
							? `${innerConatinerBoxShadow.xoffset}px  ${innerConatinerBoxShadow.yOffset}px ${innerConatinerBoxShadow.Blur}px ${innerConatinerBoxShadow.spreadShadow}px ${innerConatinerBoxShadow.colorShadow}`
							: "none"
					}}
				>
					{isHeadTitleShow ? (
						<div
							className={
								"wp-block-guteblock-blockquote__title-outer align-left"
							}
						>
							<RichText.Content
								className={
									"wp-block-guteblock-blockquote__title"
								}
								tagName="h4"
								value={title}
								placeholder={__(
									"Your Qoute",
									"guteblock"
								)}
								style={{
									fontSize: `${fontSizeForHead}px`,
									textAlign: `${alignmentForHead}`,
									paddingTop: `${paddingForHeadseprate.top}px`,
									paddingBottom: `${paddingForHeadseprate.bottom}px`,
									paddingRight: `${paddingForHeadseprate.right}px`,
									paddingLeft: `${paddingForHeadseprate.left}px`,
									marginBottom: `${marginForHeadseprate.bottom}px`,
									marginTop: `${marginForHeadseprate.top}px`,
									marginLeft: `${marginForHeadseprate.left}px`,
									marginRight: `${marginForHeadseprate.right}px`,
									letterSpacing: `${letterSpacingForTitle}px`,
									color: `${colorForHead}`,
									textTransform: HeaderTransformTo,
									fontWeight: headerFontWeight
								}}
							/>
						</div>
					) : null}
					{styleName === "1" ? (
						<>
							<div
								className={
									"wp-block-guteblock-blockquote__content-outer"
								}
							>
								{!iconAbove.isShown ? (
									<>
										<div
											className="wp-block-guteblock-blockquote__svgTracker"
											style={{
												marginBottom: `${iconGeneral.size -
													10}px`
											}}
										>
											<div
												className="wp-block-guteblock-blockquote__svgTracker svgController-up"
												style={{
													fill:
														iconGeneral.color,
													opacity:
														iconGeneral.opacity,
													top: `${iconAbove.vertical}%`,
													left: `${iconAbove.horizontal}%`
												}}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={
														iconGeneral.size
													}
													height={
														iconGeneral.size
													}
													viewBox="0 0 24 24"
												>
													<path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
												</svg>
											</div>
										</div>
									</>
								) : null}
								<div className="wp-block-guteblock-blockquote__contentReal">
									<RichText.Content
										value={qouteContent}
										className={
											"wp-block-guteblock-blockquote__content"
										}
										tagName="p"
										style={{
											letterSpacing: `${letterSpacingContent}px`,
											color: `${contentColor}`,
											textTransform: contentTransformTo,
											fontWeight: fontWeigthContent,
											lineHeight: `${lineHieghtContent}px`,
											paddingTop: `${contentPadding.top}px`,
											paddingBottom: `${contentPadding.bottom}px`,
											paddingRight: `${contentPadding.right}px`,
											paddingLeft: `${contentPadding.left}px`
										}}
									/>
								</div>
								{!iconBelow.isShown ? (
									<>
										<div className="wp-block-guteblock-blockquote__svgTracker">
											<div
												className="wp-block-guteblock-blockquote__svgTracker svgController-down"
												style={{
													fill:
														iconGeneral.color,
													opacity:
														iconGeneral.opacity,
													right: `${iconBelow.vertical}%`
												}}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={
														iconGeneral.size
													}
													height={
														iconGeneral.size
													}
													viewBox="0 0 24 24"
												>
													<path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
												</svg>
											</div>
										</div>
									</>
								) : null}
								{authorIsShown ? (
									<RichText.Content
										className={
											"wp-block-guteblock-blockquote content-author"
										}
										style={{
											textAlign: `${authorAlign}`,
											fontSize: `${authorFontSize}px`,
											color: `${authorFontColor}`
										}}
										tagName="h5"
										value={autherName}
									/>
								) : null}
							</div>
						</>
					) : (
						<>
							<div
								className={
									"wp-block-guteblock-blockquote__content-outer__secondStyle"
								}
							>
								{!iconAbove.isShown ? (
									<>
										<div
											className="wp-block-guteblock-blockquote__svgTracker svgController-up"
											style={{
												fill:
													iconGeneral.color,
												opacity:
													iconGeneral.opacity,
												top: `${iconAbove.vertical}%`,
												left: `${iconAbove.horizontal}%`
											}}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={
													iconGeneral.size
												}
												height={
													iconGeneral.size
												}
												viewBox="0 0 24 24"
											>
												<path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
											</svg>
										</div>
									</>
								) : null}
								<div className="wp-block-guteblock-blockquote__contentReal">
									<RichText.Content
										value={qouteContent}
										className={
											"wp-block-guteblock-blockquote__content"
										}
										tagName="p"
										style={{
											letterSpacing: `${letterSpacingContent}px`,
											color: `${contentColor}`,
											textTransform: contentTransformTo,
											fontWeight: fontWeigthContent,
											lineHeight: `${lineHieghtContent}px`,
											paddingTop: `${contentPadding.top}px`,
											paddingBottom: `${contentPadding.bottom}px`,
											paddingRight: `${contentPadding.right}px`,
											paddingLeft: `${contentPadding.left}px`
										}}
									/>
								</div>
								{!iconBelow.isShown ? (
									<>
										<div
											className="wp-block-guteblock-blockquote__svgTracker svgController-down"
											style={{
												fill:
													iconGeneral.color,
												opacity:
													iconGeneral.opacity,
												right: `${iconBelow.vertical}%`
											}}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={
													iconGeneral.size
												}
												height={
													iconGeneral.size
												}
												viewBox="0 0 24 24"
											>
												<path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
											</svg>
										</div>
									</>
								) : null}
								{authorIsShown ? (
									<RichText.Content
										className={
											"wp-block-guteblock-blockquote content-author"
										}
										style={{
											textAlign: `${authorAlign}`,
											fontSize: `${authorFontSize}px`,
											color: `${authorFontColor}`
										}}
										tagName="h5"
										value={autherName}
									/>
								) : null}
							</div>
						</>
					)}
				</div>
			</div>
		);
	}
});
