import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import {
	InnerBlocks,
	InspectorControls,
	AlignmentToolbar,
	BlockControls,
	PanelColorSettings
} from "@wordpress/editor";
import { PanelBody, RangeControl } from "@wordpress/components";

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

registerBlockType("guteblock/icon-list", {
	title: __("Icon List", "guteblock"),
	description: __("Block for showing icon list", "guteblock"),
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
				d="M20.31 14.14H8.36c-.55 0-1 .45-1 1s.45 1 1 1h11.95c.55 0 1-.45 1-1s-.45-1-1-1z"
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
				d="M16.91 17.59H8.36c-.55 0-1 .45-1 1s.45 1 1 1h8.55c.55 0 1-.45 1-1s-.45-1-1-1z"
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
		__("icon", "guteblock"),
		__("iconName", "guteblock"),
		__("iconContent", "guteblock")
	],
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
		}
	],
	supports: {
		html: false,
		align: ["wide", "full"]
	},
	edit({ className, attributes, setAttributes }) {
		const {
			columns,
			alignment,
			backgroundColor
		} = attributes;

		return (
			<div
				className={`${className} has-${columns}-columns align-${alignment}`}
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
					<PanelBody title={__("Layout", "guteblock")}>
						<RangeControl
							label={__("Columns", "guteblock")}
							value={columns}
							onChange={columns =>
								setAttributes({ columns })
							}
							min={1}
							max={4}
							step={1}
						/>
					</PanelBody>
				</InspectorControls>
				<InnerBlocks
					allowedBlocks={["guteblock/icon"]}
					template={[
						["guteblock/icon"],
						["guteblock/icon"],
						["guteblock/icon"]
					]}
					//templateLock="insert"
				/>
			</div>
		);
	},
	save({ attributes }) {
		const {
			columns, 
			alignment,
			backgroundColor,
			block_height
		} = attributes;

		return (
			<div
				className={`align-${alignment} has-${columns}-columns`}
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
