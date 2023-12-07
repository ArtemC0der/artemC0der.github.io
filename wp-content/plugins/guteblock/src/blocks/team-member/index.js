import "./style.editor.scss";
import "./parent";
import { registerBlockType } from "@wordpress/blocks";
import { RichText } from "@wordpress/editor";
import { __ } from "@wordpress/i18n";
import edit from "./edit.js";

const attributes = {
	title: {
		type: "string",
		source: "html",
		selector: "h4"
	},
	info: {
		type: "string",
		source: "html",
		selector: "p"
	},
	id: {
		type: "number"
	},
	alt: {
		type: "string",
		source: "attribute",
		selector: "img",
		attribute: "alt",
		default: ""
	},
	url: {
		type: "string",
		source: "attribute",
		selector: "img",
		attribute: "src"
	},
	social: {
		type: "array",
		default: [],
		source: "query",
		selector: ".wp-block-guteblock-team-member__social ul li",
		query: {
			icon: {
				source: "attribute",
				attribute: "data-icon"
			},
			link: {
				source: "attribute",
				selector: "a",
				attribute: "href"
			}
		}
	},
	socialColor: {
		type: "string"
	},
	titleColor: {
		type: "string"
	},
	contentColor: {
		type: "string"
	}
};

registerBlockType("guteblock/team-member", {
	title: __("Team Member", "guteblock"),
	description: __("Block for showing team members", "guteblock"),
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
				x1={15.708}
				y1={0.619}
				x2={5.109}
				y2={16.829}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M12 11.06c-2.63 0-4.77-2.14-4.77-4.77S9.37 1.52 12 1.52s4.77 2.14 4.77 4.77-2.14 4.77-4.77 4.77zm0-7.54a2.77 2.77 0 100 5.54 2.77 2.77 0 000-5.54z"
				fill="url(#prefix__SVGID_1_)"
			/>
			<g>
				<linearGradient
					id="prefix__SVGID_2_"
					gradientUnits="userSpaceOnUse"
					x1={22.02}
					y1={4.746}
					x2={11.421}
					y2={20.956}
				>
					<stop offset={0} stopColor="#eb7d31" />
					<stop offset={1} stopColor="#ee576f" />
				</linearGradient>
				<path
					d="M18.97 22.11c-.55 0-1-.45-1-1 0-3.29-2.68-5.97-5.97-5.97s-5.97 2.68-5.97 5.97c0 .55-.45 1-1 1s-1-.45-1-1c0-4.39 3.57-7.97 7.97-7.97s7.97 3.57 7.97 7.97c0 .55-.45 1-1 1z"
					fill="url(#prefix__SVGID_2_)"
				/>
			</g>
		</svg>
	),
	category: "guteblock",
	keywords: [
		__("team", "guteblock"),
		__("member", "guteblock"),
		__("person", "guteblock")
	],
	parent: ["guteblock/team-members"], // Make the team member block available only inside the parent "Team Members" block.
	supports: {
		reusable: false,
		html: false
	},
	attributes,
	edit,
	save: ({ attributes }) => {
		const {
			title,
			info,
			url,
			alt,
			id,
			social,
			socialColor,
			titleColor,
			contentColor
		} = attributes;

		return (
			<div>
				{url && (
					<img
						className={id ? `wp-image-${id}` : null}
						src={url}
						alt={alt}
					/>
				)}
				<div className="content-outer">
					<div className="content-inner">
						{social.length > 0 && (
							<div
								className={
									"wp-block-guteblock-team-member__social"
								}
							>
								<ul>
									{social.map((item, index) => {
										return (
											<li
												key={index}
												data-icon={
													item.icon
												}
												style={{
													color: socialColor
												}}
											>
												<a
													href={
														item.link
													}
													target="_blank"
													rel="noopener noreferrer"
												>
													<i
														className={`demo-icon icon-${item.icon}`}
													></i>
												</a>
											</li>
										);
									})}
								</ul>
							</div>
						)}

						{title && (
							<RichText.Content
								className={
									"wp-block-guteblock-team-member__title"
								}
								tagName="h4"
								value={title}
								style={{ color: titleColor }}
							/>
						)}
						{info && (
							<RichText.Content
								className={
									"wp-block-guteblock-team-member__info"
								}
								tagName="p"
								value={info}
								style={{ color: contentColor }}
							/>
						)}
					</div>
				</div>
			</div>
		);
	}
});
