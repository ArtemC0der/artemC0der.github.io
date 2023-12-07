import "./style.editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/editor";
import edit from "./edit.js";
import classnames from "classnames";
import SocialLinks from "./social.js";

const attributes = {
	author_name: {
		type: "string",
		source: "html",
		selector: "h4"
	},
	author_description: {
		type: "string",
		source: "html",
		selector: "p"
	},
	author_image: {
		type: "string"
	},
	author_image_id: {
		type: "number"
	},
	author_link_enable: {
		type: "boolean",
		default: false
	},
	author_link: {
		type: "string"
	},
	align: {
		type: "string",
		default: "center"
	},
	alignment: {
		type: "string",
		default: "center"
	},
	paddingTop: {
		type: "number",
		default: 50
	},
	paddingBottom: {
		type: "number",
		default: 30
	},
	is_first_load: {
		type: "boolean",
		default: true
	},
	social_facebook: {
		type: "string"
	},
	social_twitter: {
		type: "string"
	},
	social_instagram: {
		type: "string"
	},
	social_pinterest: {
		type: "string"
	},
	social_youtube: {
		type: "string"
	},
	social_linkedin: {
		type: "string"
	},
	backgroundColor: {
		type: "string"
	},
	imageBorderColor: {
		type: "string"
	},
	titleColor: {
		type: "string"
	},
	textColor: {
		type: "string"
	}
	// imageShape: {
	// 	type: "string",
	// 	default: 'round'
	// },
	// imageWidth: {
	// 	type: "number",
	// },
	// imageHeight: {
	// 	type: "number",
	// }
};

registerBlockType("guteblock/author-profile", {
	title: __("Author Profile", "guteblock"),
	description: __("Block for showing author profile", "guteblock"),
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
				x1={20.08}
				y1={0.805}
				x2={1.658}
				y2={19.227}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M12 11.84c1.63 0 2.95-1.33 2.95-2.95S13.63 5.93 12 5.93 9.05 7.26 9.05 8.88s1.32 2.96 2.95 2.96zm0-3.91c.53 0 .95.43.95.95s-.42.96-.95.96-.95-.43-.95-.95.42-.96.95-.96z"
				fill="url(#prefix__SVGID_1_)"
			/>
			<linearGradient
				id="prefix__SVGID_2_"
				gradientUnits="userSpaceOnUse"
				x1={23.798}
				y1={4.523}
				x2={5.376}
				y2={22.945}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M8.39 18.07c.55 0 1-.45 1-1 0-1.44 1.17-2.61 2.61-2.61s2.61 1.17 2.61 2.61c0 .55.45 1 1 1s1-.45 1-1c0-2.54-2.07-4.61-4.61-4.61s-4.61 2.07-4.61 4.61c0 .55.45 1 1 1z"
				fill="url(#prefix__SVGID_2_)"
			/>
			<linearGradient
				id="prefix__SVGID_3_"
				gradientUnits="userSpaceOnUse"
				x1={21.637}
				y1={2.362}
				x2={3.216}
				y2={20.784}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M20.34 2.85H3.66c-.55 0-1 .45-1 1v16.29c0 .55.45 1 1 1h16.68c.55 0 1-.45 1-1V3.85c0-.55-.45-1-1-1zm-1 16.3H4.66V4.85h14.68v14.3z"
				fill="url(#prefix__SVGID_3_)"
			/>
		</svg>
	),
	category: "guteblock",
	keywords: [__("author", "guteblock")],
	supports: {
		reusable: false,
		html: false,
		align: ["center", "wide", "full"]
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
		}
	],
	attributes,
	edit,
	save: ({ attributes }) => {
		const {
			author_name,
			author_description,
			author_image,
			author_link_enable,
			author_link,
			alignment,
			paddingTop,
			paddingBottom,
			social_facebook,
			social_twitter,
			social_instagram,
			social_pinterest,
			social_linkedin,
			social_youtube,
			backgroundColor,
			imageBorderColor,
			titleColor,
			textColor
		} = attributes;

		const classes = classnames({
			[`align-${alignment}`]: alignment
		});

		const isStyle = RegExp(/is-style-/)
		const styleName = isStyle.test(attributes.className)
			? attributes.className.replace(isStyle, '')
			: null
		
		return (
			<div
				className={classes}
				style={{
					paddingTop: paddingTop,
					paddingBottom: paddingBottom,
					backgroundColor: backgroundColor
				}}
			>
				<div className="wp-block-guteblock-author-profile__container">
					
					<div
						className="wp-block-guteblock-author-profile__avatarOuter"
						style={{
							borderColor: imageBorderColor
						}}
					>
						<img
							src={author_image}
							alt={author_name}
						/>
					</div>

					{(styleName != 2) && (
						<SocialLinks 
							social_facebook={social_facebook}
							social_twitter={social_twitter}
							social_instagram={social_instagram}
							social_pinterest={social_pinterest}
							social_youtube={social_youtube}
							social_linkedin={social_linkedin}									  
						/>
					)}								
					<div className="wp-block-guteblock-author-profile__contentOuter">
						
						{author_link_enable && 
							<a
								href={author_link}
								target="_blank"
								rel="noopener noreferrer"
							>
								<RichText.Content
									className={
										"wp-block-guteblock-author-profile__authorName"
									}
									tagName="h4"							
									value={author_name}
									style={{ color: titleColor }}
								/>
							</a>

						} 
						{!author_link_enable &&

							<RichText.Content
								className={
									"wp-block-guteblock-author-profile__authorName"
								}
								tagName="h4"							
								value={author_name}
								style={{ color: titleColor }}
							/>	

						}												
						<RichText.Content
							className={
								"wp-block-guteblock-author-profile__authorDescription"
							}
							tagName="p"
							value={author_description}
							style={{ color: textColor }}
						/>
						{(styleName == 2) && (
							<SocialLinks 
								social_facebook={social_facebook}
								social_twitter={social_twitter}
								social_instagram={social_instagram}
								social_pinterest={social_pinterest}
								social_youtube={social_youtube}
								social_linkedin={social_linkedin}									  
							/>
						)}
					</div>
					<div className="clear"></div>
				</div>
			</div>
		);
	}
});
