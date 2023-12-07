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
	grid_border_radius: {
		type: "number",
		default: 0
	},
	point_border_radius: {
		type: "number",
	},
	section_background: {
		type: "string"
	},
	grid_background: {
		type: "string",
		default: "#fff"
	},
	title_color: {
		type: "string",
		default: "#333"
	},
	content_color: {
		type: "string"
	},
	shadow: {
		type: "boolean"
	},
	test: {
		type: "boolean",
		default: "false"
	},
	cards: {
		type: "array",
		default: [
			{
				title: "",
				content: ""
			},
			{
				title: "",
				content: ""
			},
			{
				title: "",
				content: ""
			}
		]
	},
	showTitle: {
		type: "boolean",
		default: true
	},
	showButton: {
		type: "boolean",
		default: true
	},
	link: {
		type: "string"
	},
	newTab: {
		type: "boolean",
		default: false
	},
	showImage: {
		type: "boolean",
		default: true
	},
	button_color: {
		type: "string",
	},
	title_font_size: {
		type: "number"
	},
	link_font_size: {
		type: "number"
	},
	button_border_radius: {
		type: "number",
		default: 0
	},
	image_margin:{
		type: "number",
		default: 0
	},
	title_margin:{
		type: "number",
		default: 20
	},
	button_margin:{
		type: "number",
		default: 10
	}
};

registerBlockType("guteblock/card", {
	title: __("Card", "guteblock"),
	description: __("Block for adding cards.", "guteblock"),
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
			x1={19.47}
			y1={1.839}
			x2={4.098}
			y2={18.228}
			>
			<stop offset={0} stopColor="#eb7d31" />
			<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
			d="M20.3 4.12H3.69c-.55 0-1 .45-1 1v9.38c0 .55.45 1 1 1H20.3c.55 0 1-.45 1-1V5.12c0-.56-.44-1-1-1zm-1 9.38H4.69V6.12H19.3v7.38z"
			fill="url(#prefixSVGID1)"
			/>
			<linearGradient
			id="prefixSVGID2"
			gradientUnits="userSpaceOnUse"
			x1={21.884}
			y1={4.103}
			x2={6.511}
			y2={20.492}
			>
			<stop offset={0} stopColor="#eb7d31" />
			<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
			d="M11.43 17.91H4.56c-.55 0-1 .45-1 1s.45 1 1 1h6.87c.55 0 1-.45 1-1s-.45-1-1-1z"
			fill="url(#prefixSVGID2)"
			/>
			<linearGradient
			id="prefixSVGID3"
			gradientUnits="userSpaceOnUse"
			x1={19.47}
			y1={1.839}
			x2={4.098}
			y2={18.228}
			>
			<stop offset={0} stopColor="#eb7d31" />
			<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
			d="M7.17 10.81h9.66c.55 0 1-.45 1-1s-.45-1-1-1H7.17c-.55 0-1 .45-1 1s.44 1 1 1z"
			fill="url(#prefix_SVGID_3)"
			/>
			</svg>
	),
	category: "guteblock",
	keywords: [__("number box", "guteblock"), __("box", "guteblock")],
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
			isDefault: true
		},
		{
			name: "3",
			label: __("Style 3", "guteblock"),
			isDefault: true
		}
	],
	attributes,
	edit,
	save: ({ attributes }) => {
		const {
			alignment,
			cards,
			grid_border_radius,
			point_border_radius,
			section_background,
			grid_background,
			title_color,
			content_color,
			shadow,
			showTitle,
			showButton,
			newTab,
			showImage,
			button_color,
			title_font_size,
			link_font_size,
			button_border_radius,
			image_margin,
			title_margin,
			button_margin
		} = attributes;

		const classes = classnames({
			[`align-${alignment}`]: alignment,
			[`has-shadow`]: shadow
		});

		let showtitle;
		{showTitle ? showtitle="block" : showtitle="none"}
		let showbutton;
		{showButton ? showbutton="block" : showbutton="none"}
		let newtab;
		{newTab ? newtab="__blank" : newtab="_self"}
		let showimage;
		{showImage ? showimage="block" : showimage="none"}

		return (
			<div
				className={classes}
				style={{
					backgroundColor: section_background
				}}
			>
				<div className="wp-block-guteblock-card__container">
					{cards.map((cardbox, index) => {
						return (
							<div
								className="card__outer"
								key={index}
								style={{
									borderRadius: [
										`${grid_border_radius}px`
									],
									backgroundColor: grid_background,
									
								}}
							>
								<div
									className="card__point-outer"
									style={{
										borderRadius: [
											`${point_border_radius}%`
										],
										display: showimage,
										margin: `${image_margin}px 0`
									}}
								>
									<img
										src={
											cardbox.authorImageUrl
										}
										alt={cardbox.authorImageAlt}
										onClick={
											open
										}
										data-id={cardbox.authorImageID}
										style={{borderRadius: [
											`${point_border_radius}%`
										]}}
									/>
								</div>

								<RichText.Content
									className={
										"wp-block-guteblock-card__title"
									}
									tagName="h4"
									value={cardbox.title}
									style={{
										color: title_color,
										display: showtitle,
										fontSize: `${title_font_size}px`,
										margin: `${title_margin}px 0`
									}}
								/>
								<a href={cardbox.link} 
										target={newtab} 
										rel="noopener noreferrer"
										style={{color: content_color,
											fontSize:`${link_font_size}px`,
											
											textDecoration: button_color != undefined ? 'none': ' '}}>
								<div 
										className={
											"wp-block-guteblock-card__button"
										}
										
										style={{ 
											display: showbutton,
											backgroundColor: button_color,
											textTransform:"inherit",
											borderRadius: [
												`${button_border_radius}px`,
											],
											margin: `${button_margin}px 0`,
											fontSize:`${link_font_size}px`,
										}}>
								
								<RichText.Content
									className={
										"wp-block-guteblock-card__content"
									}
									value={cardbox.content}
									
								/>
								</div>
								</a>
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
