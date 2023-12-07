import { Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	InnerBlocks,
	BlockControls,
	AlignmentToolbar,
	PanelColorSettings
} from "@wordpress/editor";
import { PanelBody, RangeControl, ToggleControl } from "@wordpress/components";
import classnames from "classnames";

class ContainerEdit extends Component {
	onChangeAlignment = alignment => {
		this.props.setAttributes({ alignment });
	};

	toggleBackgroundBoxShadow = () => {
		this.props.setAttributes({
			background_box_shadow: !this.props.attributes
				.background_box_shadow
		});
	};
	toggleGradientBackground = () => {
		this.props.setAttributes({
			gradeint_background: !this.props.attributes.gradeint_background
		});
	};
	togglePadding = () => {
		this.props.setAttributes({
			container_padding: !this.props.attributes.container_padding
		});
	};
	toggleMargin = () => {
		this.props.setAttributes({
			container_margin: !this.props.attributes.container_margin
		});
	};
	togglePadding = () => {
		this.props.setAttributes({
			container_padding: !this.props.attributes.container_padding
		});
	};

	render() {
		const { className, attributes, setAttributes } = this.props;
		const {
			alignment,
			background_color,
			background_border_radius,
			background_box_shadow,
			background_box_shadow_color,
			background_box_x_axis,
			background_box_y_axis,
			gradeint_background,
			button_gradeint_color_1,
			button_gradeint_color_2,
			button_gradient_direction,
			container_margin,
			margin_top,
			margin_bottom,
			container_padding,
			padding_top,
			padding_bottom
		} = attributes;

		const classes = classnames(className, {
			[`align-${alignment}`]: alignment
		});

		let BoxShadowColor;
		{
			background_box_shadow
				? (BoxShadowColor = background_box_shadow_color)
				: (BoxShadowColor = "transparent");
		}
		let BoxShadowX;
		{
			background_box_shadow
				? (BoxShadowX = background_box_x_axis)
				: (BoxShadowX = "0");
		}
		let BoxShadowY;
		{
			background_box_shadow
				? (BoxShadowY = background_box_y_axis)
				: (BoxShadowY = "0");
		}

		return (
			<>
				<BlockControls>
					<AlignmentToolbar
						onChange={this.onChangeAlignment}
						value={alignment}
						isCollapsed={false}
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={__("Panel Settings", "guteblock")}>
						<RangeControl
							label={__("Border Radius (px)", "guteblock")}
							value={background_border_radius}
							onChange={background_border_radius =>
								setAttributes({
									background_border_radius
								})
							}
							min={0}
							max={100}
							step={1}
						/>
						<ToggleControl
							label={__("Box Shadow", "guteblock")}
							onChange={this.toggleBackgroundBoxShadow}
							checked={background_box_shadow}
						/>
						<ToggleControl
							label={__(
								"Gradient Background",
								"guteblock"
							)}
							onChange={this.toggleGradientBackground}
							checked={gradeint_background}
						/>

						<ToggleControl
							label={__("Margin", "guteblock")}
							onChange={this.toggleMargin}
							checked={container_margin}
						/>
						<ToggleControl
							label={__("Padding", "guteblock")}
							onChange={this.togglePadding}
							checked={container_padding}
						/>
						{background_box_shadow && (
							<PanelColorSettings
								title={__(
									"Box Shadow Settings",
									"guteblock"
								)}
								initialOpen={false}
								colorSettings={[
									{
										value: background_box_shadow_color,
										onChange: color => {
											setAttributes({
												background_box_shadow_color: color
											});
										},
										label: __(
											"Box Shadow Color",
											"guteblock"
										)
									}
								]}
							>
								<RangeControl
									label={__(
										"Box Shadow (px)",
										"guteblock"
									)}
									value={background_box_x_axis}
									onChange={background_box_x_axis =>
										setAttributes({
											background_box_x_axis
										})
									}
									min={0}
									max={15}
									step={1}
								/>
								<RangeControl
									label={__(
										"Box Shadow Spread (px)",
										"guteblock"
									)}
									value={background_box_y_axis}
									onChange={background_box_y_axis =>
										setAttributes({
											background_box_y_axis
										})
									}
									min={0}
									max={50}
									step={1}
								/>
							</PanelColorSettings>
						)}
					</PanelBody>

					{container_margin && (
						<PanelBody
							title={__("Margin Settings", "guteblock")}
							initialOpen={false}
						>
							<RangeControl
								label={__(
									"Margin Top (px)",
									"guteblock"
								)}
								value={margin_top}
								onChange={margin_top =>
									setAttributes({ margin_top })
								}
								min={0}
								max={100}
								step={1}
							/>
							<RangeControl
								label={__(
									"Margin Bottom (px)",
									"guteblock"
								)}
								value={margin_bottom}
								onChange={margin_bottom =>
									setAttributes({ margin_bottom })
								}
								min={0}
								max={100}
								step={1}
							/>
						</PanelBody>
					)}
					{container_padding && (
						<PanelBody
							title={__("Padding Settings", "guteblock")}
							initialOpen={false}
						>
							<RangeControl
								label={__(
									"Padding Top (px)",
									"guteblock"
								)}
								value={padding_top}
								onChange={padding_top =>
									setAttributes({ padding_top })
								}
								min={30}
								max={100}
								step={1}
							/>
							<RangeControl
								label={__(
									"Padding Bottom (px)",
									"guteblock"
								)}
								value={padding_bottom}
								onChange={padding_bottom =>
									setAttributes({ padding_bottom })
								}
								min={30}
								max={100}
								step={1}
							/>
						</PanelBody>
					)}
					{gradeint_background === true ? (
						<>
							<PanelColorSettings
								title={__(
									"Background Customization ",
									"guteblock"
								)}
								initialOpen={false}
								colorSettings={[
									{
										value: button_gradeint_color_1,
										onChange: color => {
											setAttributes({
												button_gradeint_color_1: color
											});
										},
										label: __(
											"Gradient Button Color (1)",
											"guteblock"
										)
									},
									{
										value: button_gradeint_color_2,
										onChange: color => {
											setAttributes({
												button_gradeint_color_2: color
											});
										},
										label: __(
											"Gradient Button Color (2)",
											"guteblock"
										)
									}
								]}
							>
								<RangeControl
									label={__(
										"Gradient Direction (Deg)",
										"guteblock"
									)}
									value={button_gradient_direction}
									onChange={button_gradient_direction =>
										setAttributes({
											button_gradient_direction
										})
									}
									min={0}
									max={360}
									step={1}
								/>
							</PanelColorSettings>
						</>
					) : (
						<>
							<PanelColorSettings
								title={__(
									"Background Customization",
									"guteblock"
								)}
								initialOpen={false}
								colorSettings={[
									{
										value: background_color,
										onChange: color => {
											setAttributes({
												background_color: color
											});
										},
										label: __(
											"Background Color",
											"guteblock"
										)
									}
								]}
							></PanelColorSettings>
						</>
					)}
				</InspectorControls>
				{gradeint_background === true ? (
					<>
						<div
							className={classes}
							style={{
								borderRadius: `${background_border_radius}px`,
								boxShadow: `0px ${BoxShadowX}px ${BoxShadowY}px ${BoxShadowColor}`,
								backgroundImage: `linear-gradient(${button_gradient_direction}deg, ${button_gradeint_color_1}, ${button_gradeint_color_2})`,
								marginTop: `${margin_top}px`,
								marginBottom: `${margin_bottom}px`,
								paddingTop: `${padding_top}px`,
								paddingBottom: `${padding_bottom}px`
							}}
						>
							<InnerBlocks />
						</div>
					</>
				) : (
					<>
						<div
							className={classes}
							style={{
								backgroundColor: background_color,
								borderRadius: `${background_border_radius}px`,
								boxShadow: `0px ${BoxShadowX}px ${BoxShadowY}px ${BoxShadowColor}`,
								marginTop: `${margin_top}px`,
								marginBottom: `${margin_bottom}px`,
								paddingTop: `${padding_top}px`,
								paddingBottom: `${padding_bottom}px`
							}}
						>
							<InnerBlocks />
						</div>
					</>
				)}
			</>
		);
	}
}

export default ContainerEdit;
