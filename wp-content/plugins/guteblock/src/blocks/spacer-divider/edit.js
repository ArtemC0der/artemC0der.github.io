import { Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { InspectorControls, PanelColorSettings } from "@wordpress/editor";
import { PanelBody, RangeControl } from "@wordpress/components";
import classnames from "classnames";

class SpacerDividerEdit extends Component {
	onChangeBackgroundColor = backgroundColor => {
		this.props.setAttributes({ backgroundColor });
	};
	onChangeSeparatorColor = separatorColor => {
		this.props.setAttributes({ separatorColor });
	};
	onChangeInsideColor = insideColor => {
		this.props.setAttributes({ insideColor });
	};
	onChangeOutsideColor = outsideColor => {
		this.props.setAttributes({ outsideColor });
	};

	render() {
		const { attributes, className, setAttributes } = this.props;
		const {
			paddingTop,
			paddingBottom,
			backgroundColor,
			separatorColor,
			separatorHeight,
			dashWidth,
			gutterWidth,
			insideColor,
			outsideColor
		} = attributes;

		const isStyle = RegExp(/is-style-/);
		const styleName = isStyle.test(attributes.className)
			? attributes.className.replace(isStyle, "")
			: null;

		const classes = classnames(className, {
			[`is-style-solid`]: !styleName // Setting style class if the style is not chosen.
		});

		let dashspacingcalc = 3;

		if (styleName == "dotted") {
			dashspacingcalc = 3;
		} else if (styleName == "dashed") {
			dashspacingcalc = dashWidth * 10;
		} else {
			dashspacingcalc = 100;
		}

		let colorsettings = [];
		if (styleName == "wave") {
			colorsettings = [
				{
					value: backgroundColor,
					onChange: this.onChangeBackgroundColor,
					label: __("Background Color", "guteblock")
				},
				{
					value: insideColor,
					onChange: this.onChangeInsideColor,
					label: __("Inside Color", "guteblock")
				},
				{
					value: outsideColor,
					onChange: this.onChangeOutsideColor,
					label: __("Outside Color", "guteblock")
				}
			];

			var outerStyle = {
				paddingBottom: paddingBottom,
				backgroundColor: backgroundColor
			};
		} else {
			colorsettings = [
				{
					value: backgroundColor,
					onChange: this.onChangeBackgroundColor,
					label: __("Background Color", "guteblock")
				},
				{
					value: separatorColor,
					onChange: this.onChangeSeparatorColor,
					label: __("Separator Color", "guteblock")
				}
			];

			outerStyle = {
				paddingTop: paddingTop,
				paddingBottom: paddingBottom,
				backgroundColor: backgroundColor
			};
		}

		return (
			<>
				<InspectorControls>
					<PanelColorSettings
						title={__("Color Settings", "guteblock")}
						colorSettings={colorsettings}
					/>
					{styleName != "wave" && (
						<PanelBody
							title={__("General Settings", "guteblock")}
						>
							<RangeControl
								label={__(
									"Separator Height",
									"guteblock"
								)}
								value={separatorHeight}
								onChange={separatorHeight =>
									setAttributes({ separatorHeight })
								}
								min={1}
								max={20}
								step={1}
							/>
							{styleName == "dashed" && (
								<RangeControl
									label={__(
										"Dash Width",
										"guteblock"
									)}
									value={dashWidth}
									onChange={dashWidth =>
										setAttributes({ dashWidth })
									}
									min={1}
									max={9}
									step={1}
								/>
							)}
							<RangeControl
								label={__("Gutter Width", "guteblock")}
								value={gutterWidth}
								onChange={gutterWidth =>
									setAttributes({ gutterWidth })
								}
								min={1}
								max={9}
								step={1}
							/>
						</PanelBody>
					)}
					<PanelBody
						title={__("Padding Settings", "guteblock")}
						initialOpen={false}
					>
						<RangeControl
							label={__("Padding Top", "guteblock")}
							value={paddingTop}
							onChange={paddingTop =>
								setAttributes({ paddingTop })
							}
							min={0}
							max={500}
							step={1}
						/>
						<RangeControl
							label={__("Padding Bottom", "guteblock")}
							value={paddingBottom}
							onChange={paddingBottom =>
								setAttributes({ paddingBottom })
							}
							min={0}
							max={500}
							step={1}
						/>
					</PanelBody>
				</InspectorControls>

				<div className={classes} style={outerStyle}>
					{styleName != "wave" && (
						<div
							className="wp-block-guteblock-spacer-divider__separator"
							style={{
								height: separatorHeight,
								backgroundImage: `linear-gradient(to right, ${separatorColor} ${dashspacingcalc}%, rgba(255, 255, 255, 0) 10%)`,
								backgroundSize: `${gutterWidth *
									10}px 100%`
							}}
						></div>
					)}
					{styleName == "wave" && (
						<div
							className="wp-block-guteblock-spacer-divider__waveContainer"
							style={{
								paddingTop: paddingTop,
								backgroundColor: insideColor
							}}
						>
							<svg
								id=""
								preserveAspectRatio="xMidYMax meet"
								className="svg-separator sep3"
								viewBox="0 0 1600 100"
								style={{ display: "block" }}
								data-height="100"
							>
								<path
									className=""
									style={{
										opacity: 1,
										fill: `${outsideColor}`
									}}
									d="M-40,71.627C20.307,71.627,20.058,32,80,32s60.003,40,120,40s59.948-40,120-40s60.313,40,120,40s60.258-40,120-40s60.202,40,120,40s60.147-40,120-40s60.513,40,120,40s60.036-40,120-40c59.964,0,60.402,40,120,40s59.925-40,120-40s60.291,40,120,40s60.235-40,120-40s60.18,40,120,40s59.82,0,59.82,0l0.18,26H-60V72L-40,71.627z"
								></path>
							</svg>
						</div>
					)}
				</div>
			</>
		);
	}
}

export default SpacerDividerEdit;
