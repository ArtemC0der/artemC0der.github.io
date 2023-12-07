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
		default: 100
	},
	section_background: {
		type: "string",
		default: "#b3e7fe"
	},
	grid_background: {
		type: "string",
		default: "#fff"
	},
	point_background: {
		type: "string",
		default: "#fff"
	},
	point_color: {
		type: "string",
		default: "#333"
	},
	title_color: {
		type: "string",
		default: "#333"
	},
	content_color: {
		type: "string",
		default: "#333"
	},
	shadow: {
		type: "boolean"
	},
	numberboxes: {
		type: "array",
		default: [
			{
				title: "",
				content: ""
			}
		]
		// source: "query",
		// selector: ".wp-block-guteblock-numberbox__outer",
		// query: {
		// 	authorImageID: {
		// 		source: "attribute",
		// 		selector: "img",
		// 		attribute: "data-id"
		// 	},
		// 	authorImageUrl: {
		// 		source: "attribute",
		// 		selector: "img",
		// 		attribute: "src"
		// 	},
		// 	authorImageAlt: {
		// 		source: "attribute",
		// 		selector: "img",
		// 		attribute: "alt"
		// 	},
		// 	title: {
		// 		source: "html",
		// 		selector: "h4",
		// 	},
		// 	content: {
		// 		source: "html",
		// 		selector: "p"
		// 	}
		// }
	}
};

registerBlockType("guteblock/numberbox", {
	title: __("Number Box", "guteblock"),
	description: __("Block for adding number boxes.", "guteblock"),
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
				x1={19.592}
				y1={1.751}
				x2={5.261}
				y2={12.195}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M10.24 3.88H3.56c-.55 0-1 .45-1 1v12.24c0 .55.45 1 1 1h6.68c.55 0 1-.45 1-1V4.88c0-.55-.44-1-1-1zm-1 12.24H4.56V5.88h4.68v10.24z"
				fill="url(#prefix__SVGID_1_)"
			/>
			<linearGradient
				id="prefix__SVGID_2_"
				gradientUnits="userSpaceOnUse"
				x1={23.13}
				y1={6.604}
				x2={8.798}
				y2={17.049}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M20.44 3.88h-6.68c-.55 0-1 .45-1 1v12.24c0 .55.45 1 1 1h6.68c.55 0 1-.45 1-1V4.88c0-.55-.45-1-1-1zm-1 12.24h-4.68V5.88h4.68v10.24z"
				fill="url(#prefix__SVGID_2_)"
			/>
			<linearGradient
				id="prefix__SVGID_3_"
				gradientUnits="userSpaceOnUse"
				x1={19.786}
				y1={2.016}
				x2={5.454}
				y2={12.461}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M6.33 11.83h1.15l.23.75h.72L7.31 9.42h-.82l-1.11 3.17h.72l.23-.76zm.57-1.92c.01.05.03.12.06.21s.15.47.36 1.15h-.83c.23-.72.37-1.18.41-1.36z"
				fill="url(#prefix__SVGID_3_)"
			/>
			<linearGradient
				id="prefix__SVGID_4_"
				gradientUnits="userSpaceOnUse"
				x1={23.278}
				y1={6.808}
				x2={8.947}
				y2={17.253}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M17.13 10.09l-.02 2.56h.7v-3.3h-.57l-.86.67.34.41c.05-.03.3-.23.41-.34z"
				fill="url(#prefix__SVGID_4_)"
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
		}
	],
	attributes,
	edit,
	save: ({ attributes }) => {
		const {
			alignment,
			numberboxes,
			grid_border_radius,
			point_border_radius,
			section_background,
			point_background,
			grid_background,
			point_color,
			title_color,
			content_color,
			shadow
		} = attributes;

		const classes = classnames({
			[`align-${alignment}`]: alignment,
			[`has-shadow`]: shadow
		});

		return (
			<div
				className={classes}
				style={{
					backgroundColor: section_background
				}}
			>
				<div className="wp-block-guteblock-numberbox__container">
					{numberboxes.map((numberbox, index) => {
						return (
							<div
								className="numberbox__outer"
								key={index}
								style={{
									borderRadius: [
										`${grid_border_radius}px`
									],
									backgroundColor: grid_background
								}}
							>
								<div
									className="numberbox__point-outer"
									style={{
										borderRadius: [
											`${point_border_radius}%`
										],
										backgroundColor: point_background,
										color: point_color
									}}
								></div>

								<RichText.Content
									className={
										"wp-block-guteblock-numberbox__title"
									}
									tagName="h4"
									value={numberbox.title}
									style={{
										color: title_color
									}}
								/>

								<RichText.Content
									className={
										"wp-block-guteblock-numberbox__jobposition"
									}
									tagName="p"
									value={numberbox.job_position}
									style={{
										color: title_color
									}}
								/>

								<RichText.Content
									className={
										"wp-block-guteblock-numberbox__content"
									}
									tagName="p"
									value={numberbox.content}
									style={{
										color: content_color
									}}
								/>
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
