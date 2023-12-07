import "./style.editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/editor";
import { 
	Button,
	ButtonGroup
 } from "@wordpress/components";
import edit from "./edit.js";
import classnames from 'classnames';

const attributes = {
	title: {
		type: "string",
		source: "html",
		selector: "span",
		default: "Button Text"
	},
	align: {
		type: "string",
		default: "center"
	},
	alignment: {
		type: "string",
		default: "center"
	},
	borderRadius: {
		type: "number",
		default: 5
	},
	verticalPadding: {
		type: "number",
		default: 12
	},
	horizontalPadding: {
		type: "number",
		default: 24
	},
	link: {
		type: "string"
	},
	isNewTab: {
		type: "boolean",
		default: false
	},
	fontSize: {
		type: "number",
		default: 20
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
	backgroundColor: {
		type: "string",
		default: "#333333"
	},
	textColor: {
		type: "string",
		default: "#ffffff"
	},
	opacity: {
		type: "number",
		default: 1
	},
	hoverBackgroundColor: {
		type: "string"
	},
	hoverTextColor: {
		type: "string"
	},
	borderColor: {
		type: "string",
		default: "#333333"
	},
	hoverOpacity: {
		type: "number",
		default: 0.9
	},
};

registerBlockType("guteblock/button", {
	title: __("Button", "guteblock"),
	description: __("Block for adding button.", "guteblock"),
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
				x1={16.662}
				y1={1.889}
				x2={4.084}
				y2={17.134}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M17.92 4.33H6.07c-.55 0-1 .45-1 1v4.42c0 .55.45 1 1 1h11.84c.55 0 1-.45 1-1V5.33c.01-.55-.44-1-.99-1zm-1 4.43H7.07V6.33h9.84v2.43z"
				fill="url(#prefixSVGID1)"
			/>
			<linearGradient
				id="prefixSVGID2"
				gradientUnits="userSpaceOnUse"
				x1={21.049}
				y1={5.508}
				x2={8.471}
				y2={20.754}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M15.7 13.27H8.29c-1.77 0-3.21 1.44-3.21 3.21s1.44 3.21 3.21 3.21h7.42c1.77 0 3.21-1.44 3.21-3.21s-1.44-3.21-3.22-3.21zm0 4.42H8.29c-.67 0-1.21-.54-1.21-1.21 0-.67.54-1.21 1.21-1.21h7.42c.67 0 1.21.54 1.21 1.21 0 .67-.55 1.21-1.22 1.21z"
				fill="url(#prefix_SVGID_2)"
			/>
		</svg>
    ),
	category: "guteblock",
	keywords: [
		__("button", "guteblock")
	],
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
		}
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
			title,
			alignment,
			borderRadius,
			link,
			isNewTab,
			verticalPadding,
			horizontalPadding,
			fontSize,
			fontWeight,
			textTransform,
			letterSpacing,
			backgroundColor,
			textColor,
			opacity,
			hoverBackgroundColor,
			hoverTextColor,
			borderColor,
			hoverOpacity
		} = attributes;

		const classes = classnames({
			[`align-${alignment}`]: alignment
		})

		const isStyle = RegExp(/is-style-/)
		const styleName = isStyle.test(attributes.className)
			? attributes.className.replace(isStyle, '')
			: null

		let bg, text, border;
		{styleName == 2 ? bg="transparent" : bg=backgroundColor}
		{styleName == 2 ? text=backgroundColor : text=textColor}
		{styleName == 2 ? border=borderColor : border=backgroundColor}

		let button;
		{isNewTab ? button = (<Button 
						href={link}
						target="_blank"
						rel="noopener noreferrer"
						className='wp-block-guteblock-button-inner'
						style={{
							borderRadius: borderRadius,
							paddingLeft: horizontalPadding, 
							paddingRight: horizontalPadding, 
							paddingTop: verticalPadding, 
							paddingBottom: verticalPadding, 
							backgroundColor: bg, 
							border: `1px solid ${border}`,
							opacity: opacity, 
							textDecoration: "none",
							color: text,
							fontSize: `${fontSize}px`,
							fontWeight: fontWeight,
							textTransform: textTransform,
							letterSpacing: `${letterSpacing}px`
						}
						}>						
						<RichText.Content
							style={{
							}}
							tagName="span"
							value={title}
						/>     
					</Button> ) : 
					button = <Button 
						href={link}
						className='wp-block-guteblock-button-inner'
						style={{
							borderRadius: borderRadius, 
							paddingLeft: horizontalPadding, 
							paddingRight: horizontalPadding, 
							paddingTop: verticalPadding, 
							paddingBottom: verticalPadding, 
							backgroundColor: bg, 
							border: `1px solid ${border}`,
							opacity: opacity, 
							textDecoration: "none",
							color: text,
							fontSize: `${fontSize}px`,
							fontWeight: fontWeight,
							textTransform: textTransform,
							letterSpacing: `${letterSpacing}px`
						}}>					
						<RichText.Content
							tagName="span"
							value={title}
						/>     
					</Button> }
		return (
			<div className={classes}>	
				<ButtonGroup>
					{button}  
				</ButtonGroup>   
				<style
						dangerouslySetInnerHTML={{
							__html: [
								`.wp-block-guteblock-button-inner:hover { color: ${hoverTextColor} !important; background-color: ${hoverBackgroundColor} !important; border: 1px solid ${hoverBackgroundColor} !important; opacity: ${hoverOpacity} !important; }`
							].join("\n")
						}}
					></style> 
			</div>
		);
	}
});