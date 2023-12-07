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
		default: "left"
	},
	grid_border_radius: {
		type: "number",
		default: 20
	},
	image_border_radius: {
		type: "number",
		default: 10
	},
	section_background: {
		type: "string",
		default: "#b3e7fe"
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
		type: "string",
		default: "#333"
	},
	shadow: {
		type: "boolean"
	},
	testimonials: {
		type: "array",
		default: [
			{
				authorImageID: "",
				authorImageUrl: "",
				authorImageAlt: "",
				title: "",
				job_position: "",
				content: ""
			}
		]
	}
};

registerBlockType("guteblock/testimonial", {
	title: __("Testimonial", "guteblock"),
	description: __("Block for adding a testimonial.", "guteblock"),
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
				x1={21.524}
				y1={4.057}
				x2={5.186}
				y2={16.26}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M6.31 9.78c0 .55.45 1 1 1h13.1c.55 0 1-.45 1-1s-.45-1-1-1H7.31c-.55 0-1 .45-1 1z"
				fill="url(#prefix__SVGID_1_)"
			/>
			<linearGradient
				id="prefix__SVGID_2_"
				gradientUnits="userSpaceOnUse"
				x1={23.231}
				y1={6.343}
				x2={6.894}
				y2={18.546}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M17.69 14.73c0-.55-.45-1-1-1H7.31c-.55 0-1 .45-1 1s.45 1 1 1h9.38c.55 0 1-.44 1-1z"
				fill="url(#prefix__SVGID_2_)"
			/>
			<linearGradient
				id="prefix__SVGID_3_"
				gradientUnits="userSpaceOnUse"
				x1={28.033}
				y1={12.772}
				x2={11.696}
				y2={24.975}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M21.19 17.05H19.3v1.78h.87v.13c0 .6-.22.91-.67.91v.94c.65 0 1.15-.2 1.49-.6.34-.4.51-.91.51-1.53.01-.54-.1-1.08-.31-1.63z"
				fill="url(#prefix__SVGID_3_)"
			/>
			<linearGradient
				id="prefix__SVGID_4_"
				gradientUnits="userSpaceOnUse"
				x1={26.966}
				y1={11.343}
				x2={10.629}
				y2={23.546}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M16.33 17.05v1.78h.87v.13c0 .6-.22.91-.67.91v.94c.65 0 1.15-.2 1.48-.6s.5-.91.5-1.53c0-.56-.1-1.11-.3-1.63h-1.88z"
				fill="url(#prefix__SVGID_4_)"
			/>
			<linearGradient
				id="prefix__SVGID_5_"
				gradientUnits="userSpaceOnUse"
				x1={16.673}
				y1={-2.437}
				x2={0.336}
				y2={9.766}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M7.47 6.01c-.45 0-.67-.31-.67-.91v-.14h.87V3.19H5.79c-.2.52-.3 1.07-.3 1.63 0 .62.17 1.13.5 1.53s.83.6 1.48.6v-.94z"
				fill="url(#prefix__SVGID_5_)"
			/>
			<linearGradient
				id="prefix__SVGID_6_"
				gradientUnits="userSpaceOnUse"
				x1={15.607}
				y1={-3.865}
				x2={-0.731}
				y2={8.338}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M2.49 4.82c0 .62.17 1.13.51 1.53.34.4.83.6 1.49.6v-.94c-.44 0-.67-.3-.67-.91v-.14h.87V3.19H2.81c-.21.55-.32 1.09-.32 1.63z"
				fill="url(#prefix__SVGID_6_)"
			/>
		</svg>
	),
	category: "guteblock",
	keywords: [__("testimonial", "guteblock")],
	supports: {
		html: false,
		align: ["wide", "full"]
	},
	styles: [
		{
			name: "single",
			label: __("Single", "guteblock"),
			isDefault: true
		},
		{
			name: "multiple",
			label: __("Multiple", "guteblock"),
			isDefault: false
		}
	],
	attributes,
	edit,
	save: ({ attributes }) => {
		const {
			alignment,
			testimonials,
			grid_border_radius,
			image_border_radius,
			section_background,
			grid_background,
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
				<div className="wp-block-guteblock-testimonial__container">
					{testimonials.map((testimonial, index) => {
						return (
							<div
								className="testimonial__outer"
								key={index}
								style={{
									borderRadius: [
										`${grid_border_radius}px`
									],
									backgroundColor: grid_background
								}}
							>
								<div
									className="testimonial__image-outer"
									style={{
										borderRadius: [
											`${image_border_radius}%`
										]
									}}
								>
									<img
										src={
											testimonial.authorImageUrl
										}
										alt={
											testimonial.authorImageAlt
										}
										data-id={
											testimonial.authorImageID
										}
									/>
								</div>

								<RichText.Content
									className={
										"wp-block-guteblock-testimonial__title"
									}
									tagName="h4"
									value={testimonial.title}
									style={{
										color: title_color
									}}
								/>

								<RichText.Content
									className={
										"wp-block-guteblock-testimonial__jobposition"
									}
									tagName="p"
									value={testimonial.job_position}
									style={{
										color: title_color
									}}
								/>

								<RichText.Content
									className={
										"wp-block-guteblock-testimonial__content"
									}
									tagName="p"
									value={testimonial.content}
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
