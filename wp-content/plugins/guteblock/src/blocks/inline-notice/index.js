import "./style.editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/editor";
import edit from "./edit.js";
import classnames from 'classnames';
import {
	Dashicon
} from "@wordpress/components";
const attributes = {

	showCloseButton:{
		type: "boolean",
		default: false
	},
	mainBackgroundColor: {
		type: "string",
		default: "#ffffff"
	},
	verticalPadding: {
		type: "number",
		default: 100
	},
	outerContainerWidth: {
		type: "number",
		default: 60
	},
	backgroundColor: {
		type: "string",
		default: "blue"
	},
	title: {
		type: "string",
		default: ""
	},
	titleFontSize: {
		type: "number",
		default: 30
	},
	titleColor: {
		type: "string",
		default: "#ffffff"
	},
	titleTextTransform: {
		type: "string",
		default: "uppercase"
	},
	titleFontWeight: {
		type: "string",
		default: 400
	},
	verticalTitlePadding: {
		type: "number",
		default: 10
	},
	horizontalTitlePadding: {
		type: "number",
		default: 10
	},
	containerColor: {
		type: "string",
		default: "#ffffff"
	},
	borderWidth: {
		type: "number",
		default: 2
	},
	content: {
		type: "string",
		default: ""
	},
	contentFontSize: {
		type: "number",
		default: 30
	},
	contentLineHeight: {
		type: "number",
		default: 40
	},
	verticalContentPadding: {
		type: "number",
		default: 10
	},
	horizontalContentPadding: {
		type: "number",
		default: 10
	},
	contentColor: {
		type: "string",
		default: "#000000"
	},
	align: {
		type: "string",
		default: "wide"
	},
	alignment: {
		type: "string",
		default: "center"
	}
};

registerBlockType("guteblock/inline-notice", {
	title: __("Inline Notice", "guteblock"),
	description: __("Block for Inline Notice", "guteblock"),
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
				d="M7 15h13v1h-13v-1zm4-4v3h5v-3h-5zm-1 0h-3v1h3v-1zm-3 3h3v-1h-3v1zm13-1h-3v1h3v-1zm-6.951-6.573v-.396h-1.215v1.941h1.255v-.396h-.78v-.406h.698v-.393h-.698v-.35h.74zm1.396.261l.238 1.284h.5l.501-1.941h-.482l-.249 1.32-.238-1.32h-.492l-.27 1.345-.24-1.345h-.505l.46 1.941h.506l.271-1.284zm1.901.916c-.149 0-.324-.043-.466-.116l-.024-.013-.098.398.015.008c.102.058.318.119.547.119.581 0 .788-.328.788-.61 0-.272-.161-.458-.507-.586-.254-.096-.338-.145-.338-.247 0-.098.1-.161.254-.161.136 0 .266.03.388.088l.023.011.107-.39-.015-.007c-.145-.065-.311-.098-.495-.098-.442 0-.739.239-.739.593 0 .262.181.458.535.581.227.081.304.144.304.247 0 .117-.102.183-.279.183zm-5.325.368h.485v-1.941h-.438v1.189l-.641-1.189h-.535v1.941h.438v-1.327l.691 1.327zm8.979 1.028h-13v1h13v-1zm0 2h-3v1h3v-1zm-17-9v17.199c0 .771-1 .771-1 0v-15.199h-2v15.98c0 1.115.905 2.02 2.02 2.02h19.958c1.117 0 2.022-.904 2.022-2.02v-17.98h-21zm19 16h-17v-14h17v14z"
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
				d="M7 15h13v1h-13v-1zm4-4v3h5v-3h-5zm-1 0h-3v1h3v-1zm-3 3h3v-1h-3v1zm13-1h-3v1h3v-1zm-6.951-6.573v-.396h-1.215v1.941h1.255v-.396h-.78v-.406h.698v-.393h-.698v-.35h.74zm1.396.261l.238 1.284h.5l.501-1.941h-.482l-.249 1.32-.238-1.32h-.492l-.27 1.345-.24-1.345h-.505l.46 1.941h.506l.271-1.284zm1.901.916c-.149 0-.324-.043-.466-.116l-.024-.013-.098.398.015.008c.102.058.318.119.547.119.581 0 .788-.328.788-.61 0-.272-.161-.458-.507-.586-.254-.096-.338-.145-.338-.247 0-.098.1-.161.254-.161.136 0 .266.03.388.088l.023.011.107-.39-.015-.007c-.145-.065-.311-.098-.495-.098-.442 0-.739.239-.739.593 0 .262.181.458.535.581.227.081.304.144.304.247 0 .117-.102.183-.279.183zm-5.325.368h.485v-1.941h-.438v1.189l-.641-1.189h-.535v1.941h.438v-1.327l.691 1.327zm8.979 1.028h-13v1h13v-1zm0 2h-3v1h3v-1zm-17-9v17.199c0 .771-1 .771-1 0v-15.199h-2v15.98c0 1.115.905 2.02 2.02 2.02h19.958c1.117 0 2.022-.904 2.022-2.02v-17.98h-21zm19 16h-17v-14h17v14z"
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
		__("inline-notice", "guteblock")
	],
	supports: {
		reusable: false,
		html: false ,
		align: ["wide", "full"]
	},
	attributes,
	edit,
	save: ({ attributes }) => {
		
		const {
			mainBackgroundColor,
			verticalPadding,
			outerContainerWidth,
			backgroundColor,
			title,
			titleFontSize,
			titleColor,
			titleTextTransform,
			titleFontWeight,
			verticalTitlePadding,
			horizontalTitlePadding,
			borderWidth,
			containerColor,
			content,
			contentFontSize,
			contentLineHeight,
			verticalContentPadding,
			horizontalContentPadding,
			contentColor,
			alignment,
			showCloseButton			
		} = attributes;

		const classes = classnames({
			[`align-${alignment}`]: alignment
		})

		return (
			<div className={classes}
			style={{
				backgroundColor: mainBackgroundColor,
				paddingTop: `${verticalPadding}px`,
				paddingBottom: `${verticalPadding}px`
			}}>
					<div
						className={"wp-block-guteblock-inline-notice__outer_container"}
						style={{
							alignment : alignment,
							backgroundColor: backgroundColor,
							width: `${outerContainerWidth}%`
						}}
					>
						<div
							className={"wp-block-guteblock-inline-notice__inner_container"}
							style={{
								backgroundColor: backgroundColor
							}}
						>
							<RichText.Content
								className={
									"wp-block-guteblock-inline-notice__title"
								}
								style={{
									color: titleColor,
									fontSize: `${titleFontSize}px`,
									textTransform: titleTextTransform,
									fontWeight:titleFontWeight,
									paddingTop: `${verticalTitlePadding}px`,
									paddingBottom: `${verticalTitlePadding}px`,
									paddingLeft: `${horizontalTitlePadding}px`,
									paddingRight: `${horizontalTitlePadding}px`
								}}
								tagName="h4"
								value={title}
							/>
							{showCloseButton && (
								<div className="wp-block-guteblock-inline-notice__closeBtn">
									<Dashicon
										icon="dismiss"
										size={32}
										style={{ fill: titleColor }}
									/>
								</div>
							)}
						</div>
						<div
							className={"wp-block-guteblock-inline-notice__inner_content"}
							style={{
								backgroundColor: containerColor,
								margin: `${0}px ${borderWidth}px ${borderWidth}px ${borderWidth}px`
							}}
						>
							<RichText.Content
								className={
								"wp-block-guteblock-inline-notice__content"
								}
								tagName="p"
								style={{
									color: contentColor,
									fontSize: contentFontSize,
									lineHeight: `${contentLineHeight}px`,
									padding: `${verticalContentPadding}px ${horizontalContentPadding}px`
								}}
								value={content}						
							/>	
							</div>
						</div>
				</div>
		);
	}
});
