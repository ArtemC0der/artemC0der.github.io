import { registerBlockType, createBlock } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import {
	InnerBlocks,
	InspectorControls,
	AlignmentToolbar,
	BlockControls,
	PanelColorSettings
} from "@wordpress/editor";
import { PanelBody, RangeControl, RadioControl } from "@wordpress/components";

const attributes = {
	columns: {
		type: "number",
		default: 3
	},
	align: {
		type: "string",
		default: "wide"
	},
	alignment: {
		type: "string",
		default: "center"
	},
	image_shape: {
		type: "string",
		default: "round"
	},
	backgroundColor: {
		type: "string"
	}
};

registerBlockType("guteblock/team-members", {
	title: __("Team Members", "guteblock"),
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
				x1={18.718}
				y1={2.083}
				x2={4.032}
				y2={18.339}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M6.43 13.4c1.34 0 2.53-.68 3.23-1.75.68.36 1.44.58 2.26.58.87 0 1.67-.24 2.38-.64a3.85 3.85 0 003.27 1.81c2.14 0 3.88-1.74 3.88-3.88 0-2.14-1.74-3.88-3.88-3.88-.34 0-.67.06-.99.15-.65-1.96-2.47-3.4-4.65-3.4-2.16 0-3.98 1.41-4.64 3.35-.28-.06-.57-.1-.86-.1-2.14 0-3.88 1.74-3.88 3.88 0 2.14 1.74 3.88 3.88 3.88zm13.02-3.88c0 1.04-.84 1.88-1.88 1.88-.77 0-1.43-.47-1.72-1.16.52-.69.85-1.53.94-2.44.02-.01.03 0 .05-.01a1.878 1.878 0 012.61 1.73zm-7.52-5.13c1.61 0 2.92 1.31 2.92 2.92s-1.31 2.92-2.92 2.92-2.92-1.31-2.92-2.92 1.31-2.92 2.92-2.92zm-5.5 3.25c.22 0 .42.04.63.11.09.98.46 1.86 1.03 2.59-.31.63-.94 1.05-1.66 1.05-1.04 0-1.88-.84-1.88-1.88s.84-1.87 1.88-1.87z"
				fill="url(#prefix__SVGID_1_)"
			/>
			<linearGradient
				id="prefix__SVGID_2_"
				gradientUnits="userSpaceOnUse"
				x1={23.86}
				y1={6.729}
				x2={9.175}
				y2={22.985}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M18.1 15.7c-.53 0-1.04.11-1.53.27a6.275 6.275 0 00-9.25-.03c-.46-.14-.94-.24-1.42-.24-2.7 0-4.9 2.2-4.9 4.9 0 .55.45 1 1 1s1-.45 1-1c0-1.6 1.3-2.9 2.9-2.9.08 0 .16.02.24.02-.33.77-.52 1.62-.52 2.51 0 .55.45 1 1 1s1-.45 1-1a4.31 4.31 0 018.62 0c0 .55.45 1 1 1s1-.45 1-1c0-.88-.18-1.73-.51-2.49.13-.02.25-.04.38-.04 1.6 0 2.9 1.3 2.9 2.9 0 .55.45 1 1 1s1-.45 1-1c-.01-2.7-2.2-4.9-4.91-4.9z"
				fill="url(#prefix__SVGID_2_)"
			/>
		</svg>
	),
	category: "guteblock",
	keywords: [
		__("team", "guteblock"),
		__("member", "guteblock"),
		__("person", "guteblock")
	],
	transforms: {
		from: [
			{
				type: "block",
				blocks: ["core/gallery"],
				transform: ({ columns, images }) => {
					let inner = images.map(({ alt, id, url }) =>
						createBlock("guteblock/team-member", {
							alt,
							id,
							url
						})
					);

					return createBlock(
						"guteblock/team-members",
						{
							columns
						},
						inner
					);
				}
			},
			{
				type: "block",
				blocks: ["core/image"],
				isMultiBlock: true,
				transform: attributes => {
					let inner = attributes.map(({ alt, id, url }) =>
						createBlock("guteblock/team-member", {
							alt,
							id,
							url
						})
					);

					return createBlock(
						"guteblock/team-members",
						{
							columns: 3
						},
						inner
					);
				}
			}
		]
	},
	attributes,
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
	supports: {
		html: false,
		align: ["wide", "full"]
	},
	edit({ className, attributes, setAttributes }) {
		const {
			columns,
			image_shape,
			alignment,
			backgroundColor
		} = attributes;

		return (
			<div
				className={`${className} has-${columns}-columns shape-${image_shape} align-${alignment}`}
				style={{
					backgroundColor: backgroundColor
				}}
			>
				<BlockControls>
					<AlignmentToolbar
						onChange={alignment =>
							setAttributes({ alignment })
						}
						value={alignment}
						isCollapsed={false}
					/>
				</BlockControls>
				<InspectorControls>
					<PanelColorSettings
						title={__("Color Settings", "guteblock")}
						colorSettings={[
							{
								value: backgroundColor,
								onChange: backgroundColor => {
									setAttributes({ backgroundColor });
								},
								label: __(
									"Background Color",
									"guteblock"
								)
							}
						]}
					/>

					<PanelBody title={__("Image Settings", "guteblock")}>
						<RadioControl
							label="Image Shape"
							help="The shape of the user image"
							selected={image_shape}
							options={[
								{
									label: "Round",
									value: "round",
									help: "dsafsadf asdf sadfdsa"
								},
								{ label: "Square", value: "square" }
							]}
							onChange={image_shape => {
								setAttributes({ image_shape });
							}}
						/>
					</PanelBody>
					<PanelBody title={__("Layout", "guteblock")}>
						<RangeControl
							label={__("Columns", "guteblock")}
							value={columns}
							onChange={columns =>
								setAttributes({ columns })
							}
							min={1}
							max={6}
							step={1}
						/>
					</PanelBody>
				</InspectorControls>
				<InnerBlocks
					allowedBlocks={["guteblock/team-member"]}
					template={[
						["guteblock/team-member"],
						["guteblock/team-member"],
						["guteblock/team-member"]
					]}
					//templateLock="insert"
				/>
			</div>
		);
	},
	save({ attributes }) {
		const {
			columns,
			image_shape,
			alignment,
			backgroundColor,
			block_height
		} = attributes;

		return (
			<div
				className={`align-${alignment} has-${columns}-columns shape-${image_shape}`}
				style={{
					backgroundColor: backgroundColor,
					height: block_height
				}}
			>
				<InnerBlocks.Content />
			</div>
		);
	}
});
