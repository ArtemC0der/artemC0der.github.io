import { Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
	RichText,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	PanelColorSettings
} from "@wordpress/editor";
import {
	Button,
	Toolbar,
	ToggleControl,
	Dashicon,
	PanelBody,
	TextControl,
	RangeControl,
	SelectControl
} from "@wordpress/components";
import classnames from "classnames";

class Newsletter extends Component {
	onChangeTitle = title => {
		this.props.setAttributes({ title });
	};
	onChangeBgColor = bgColor => {
		this.props.setAttributes({ bgColor });
	};
	onChangeBgColorTwo = bgColorTwo => {
		this.props.setAttributes({ bgColorTwo });
	};
	onChangeAlignment = alignment => {
		this.props.setAttributes({ alignment });
	};
	onChangeIconSize = iconSize => {
		this.props.setAttributes({ iconSize });
	};
	onChangeButtonTitle = buttonTitle => {
		this.props.setAttributes({ buttonTitle });
	};
	onChangeButtonTextColor = buttonTextColor => {
		this.props.setAttributes({ buttonTextColor });
	};
	onChangeButtonBackgroundColor = buttonBackgroundColor => {
		this.props.setAttributes({ buttonBackgroundColor });
	};
	onChangeButtonBackgroundColorTwo = buttonBackgroundColorTwo => {
		this.props.setAttributes({ buttonBackgroundColorTwo });
	};
	onChangeInputTextColor = inputTextColor => {
		this.props.setAttributes({ inputTextColor });
	};
	onChangeinputBackgroundColor = inputBackgroundColor => {
		this.props.setAttributes({ inputBackgroundColor });
	};
	onChangeInputBackgroundColorTwo = inputBackgroundColorTwo => {
		this.props.setAttributes({ inputBackgroundColorTwo });
	};
	onChangeIconSize = iconSize => {
		this.props.setAttributes({ iconSize });
	};
	createToolbarControl = type => {
		return {
			icon: `${type}`,
			title: `${type}`,
			isActive: type === this.props.attributes.icon,
			onClick: () => {
				this.props.setAttributes({ icon: type });
			}
		};
	};

	onChangeEnableDoubleOptIn = () => {
		this.props.setAttributes({
			doubleOptIn: !this.props.attributes.doubleOptIn
		});
	};
	onChangeButtonHoverBackgroundColor = hoverButtonBackgroundColor => {
		this.props.setAttributes({ hoverButtonBackgroundColor });
	};

	onChangeButtonHoverTextColor = hoverButtonTextColor => {
		this.props.setAttributes({ hoverButtonTextColor });
	};
	render() {
		const { className, attributes, setAttributes } = this.props;
		const {
			styleIs,
			doubleOptIn,
			title,
			bgColor,
			bgColorTwo,
			alignment,
			buttonTitle,
			borderLeftRadius,
			borderRightRadius,
			verticalOuterPadding,
			horizontalOuterPadding,
			verticalInnerPadding,
			horizontalPadding,
			fontSize,
			inputBackgroundColor,
			inputTextColor,
			inputTextTransform,
			inputTextFontWeight,
			buttonTextFontWeight,
			buttonTextColor,
			borderTopLeftRadius,
			borderBottomLeftRadius,
			borderBottomLeftRadiusTwo,
			buttonHorizontalPadding,
			buttonBackgroundColor,
			buttonTextTransform,
			buttonLetterSpacing,
			icon,
			hoverButtonTextColor,
			hoverButtonBackgroundColor
		} = attributes;

		const classes = classnames(className, {
			[`align-${alignment}`]: alignment
		});

		const isStyle = RegExp(/is-style-/);
		const styleName = isStyle.test(attributes.className)
			? attributes.className.replace(isStyle, "")
			: 1;
		setAttributes({ styleIs: styleName });

		let bg,
			TopLeft,
			btnTopLeft,
			btnBottomLeft,
			btnBottomLeftThreeOne,
			placehoderThreeOne,
			placeholder,
			r;
		{
			styleIs == 3
				? (btnBottomLeftThreeOne = borderBottomLeftRadiusTwo)
				: (btnBottomLeftThreeOne = borderBottomLeftRadius);
		}
		{
			styleName == 1 ? (bg = bgColor) : (bg = bgColorTwo);
		}
		{
			styleName == 2 ? (TopLeft = 100) : (TopLeft = borderLeftRadius);
		}
		{
			styleName != 1
				? (btnTopLeft = 0)
				: (btnTopLeft = borderTopLeftRadius);
		}
		{
			styleName == 2
				? (btnBottomLeft = 30)
				: (btnBottomLeft = btnBottomLeftThreeOne);
		}
		{
			styleName == 3
				? (placehoderThreeOne = "Subscribe Now")
				: (placehoderThreeOne = "Enter Your Email Id");
		}
		{
			styleName == 2
				? (placeholder = "Your mail Id goes here...")
				: (placeholder = placehoderThreeOne);
		}
		{
			styleName == 1 ? (r = borderRightRadius) : (r = 0);
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
					<PanelBody title={__("General Settings", "guteblock")}>
						<ToggleControl
							// value={doubleOptIn}
							label={__(
								"Enable Double Opt-in",
								"guteblock"
							)}
							onChange={this.onChangeEnableDoubleOptIn}
							checked={doubleOptIn}
						/>
						<p className="description">
							{__(
								"Send contacts an opt-in confirmation email when they subscribe to your list.",
								"guteblock"
							)}
						</p>
						{styleName != 1 && (
							<PanelColorSettings
								title={__(
									"Outer Background Color",
									"guteblock"
								)}
								colorSettings={[
									{
										value: bgColorTwo,
										onChange: this
											.onChangeBgColorTwo,
										label: __(
											"Background Color",
											"guteblock"
										)
									}
								]}
							/>
						)}
						{styleName == 1 && (
							<PanelColorSettings
								title={__(
									"Outer Background Color",
									"guteblock"
								)}
								colorSettings={[
									{
										value: bgColor,
										onChange: this
											.onChangeBgColor,
										label: __(
											"Background Color",
											"guteblock"
										)
									}
								]}
							/>
						)}
						{styleName != 2 && (
							<RangeControl
								label={__(
									"Border Left Radius(px)",
									"guteblock"
								)}
								value={TopLeft}
								onChange={borderLeftRadius =>
									setAttributes({ borderLeftRadius })
								}
								min={0}
								max={100}
								step={1}
							/>
						)}
						{styleName != 2 && (
							<RangeControl
								label={__(
									"Border Right Radius(px)",
									"guteblock"
								)}
								value={borderRightRadius}
								onChange={borderRightRadius =>
									setAttributes({
										borderRightRadius
									})
								}
								min={0}
								max={100}
								step={1}
							/>
						)}
						<RangeControl
							label={__(
								"Vertical Outer Padding(px)",
								"guteblock"
							)}
							value={verticalOuterPadding}
							onChange={verticalOuterPadding =>
								setAttributes({ verticalOuterPadding })
							}
							min={0}
							max={100}
							step={1}
						/>
						<RangeControl
							label={__(
								"Horizontal Outer Padding(px)",
								"guteblock"
							)}
							value={horizontalOuterPadding}
							onChange={horizontalOuterPadding =>
								setAttributes({
									horizontalOuterPadding
								})
							}
							min={0}
							max={100}
							step={1}
						/>
						<RangeControl
							label={__(
								"Vertical Inner Padding(px)",
								"guteblock"
							)}
							value={verticalInnerPadding}
							onChange={verticalInnerPadding =>
								setAttributes({ verticalInnerPadding })
							}
							min={0}
							max={50}
							step={1}
						/>
						<RangeControl
							label={__("Font Size(px)", "guteblock")}
							value={fontSize}
							onChange={fontSize =>
								setAttributes({ fontSize })
							}
							min={10}
							max={100}
							step={1}
						/>
						{styleName == 3 && (
							<Toolbar
								controls={[
									"arrow-right-alt",
									"arrow-right-alt2",
									"video-alt3",
									"controls-play"
								].map(this.createToolbarControl)}
							/>
						)}
					</PanelBody>
					<PanelBody title={__("Button Settings", "guteblock")}>
						{styleName == 1 && (
							<RangeControl
								label={__(
									"Border Top Left Radius(px)",
									"guteblock"
								)}
								value={borderTopLeftRadius}
								onChange={borderTopLeftRadius =>
									setAttributes({
										borderTopLeftRadius
									})
								}
								min={0}
								max={100}
								step={1}
							/>
						)}
						{styleName == 1 && (
							<RangeControl
								label={__(
									"Border Bottom Left Radius(px)",
									"guteblock"
								)}
								value={btnBottomLeft}
								onChange={borderBottomLeftRadius =>
									setAttributes({
										borderBottomLeftRadius
									})
								}
								min={0}
								max={100}
								step={1}
							/>
						)}
						<RangeControl
							label={__(
								"Button Horizontal Padding(px)",
								"guteblock"
							)}
							value={buttonHorizontalPadding}
							onChange={buttonHorizontalPadding =>
								setAttributes({
									buttonHorizontalPadding
								})
							}
							min={15}
							max={50}
							step={1}
						/>
						<PanelColorSettings
							title={__("Button Color", "guteblock")}
							colorSettings={[
								{
									value: buttonTextColor,
									onChange: this
										.onChangeButtonTextColor,
									label: __(
										"Button Text Color",
										"guteblock"
									)
								},
								{
									value: buttonBackgroundColor,
									onChange: this
										.onChangeButtonBackgroundColor,
									label: __(
										"Button Background Color",
										"guteblock"
									)
								}
							]}
						/>
						{styleName != 3 && (
							<PanelBody
								title={__(
									"Button Text Settings",
									"guteblock"
								)}
							>
								<SelectControl
									label={__(
										"Button Text Transform",
										"guteblock"
									)}
									value={buttonTextTransform}
									options={[
										{
											label: "Normal",
											value: "none"
										},
										{
											label: "Uppercase",
											value: "uppercase"
										},
										{
											label: "Lowercase",
											value: "lowercase"
										},
										{
											label: "Capitalize",
											value: "capitalize"
										}
									]}
									onChange={buttonTextTransform =>
										setAttributes({
											buttonTextTransform
										})
									}
								/>
								<SelectControl
									label="Font Weight"
									value={buttonTextFontWeight}
									options={[
										{
											label: "Lighter",
											value: "lighter"
										},
										{
											label: "Normal",
											value: "normal"
										},
										{
											label: "Bold",
											value: "bold"
										},
										{
											label: "100",
											value: "100"
										},
										{
											label: "200",
											value: "200"
										},
										{
											label: "300",
											value: "300"
										},
										{
											label: "400",
											value: "400"
										},
										{
											label: "500",
											value: "500"
										},
										{
											label: "600",
											value: "600"
										},
										{
											label: "700",
											value: "700"
										},
										{
											label: "800",
											value: "800"
										},
										{ label: "900", value: "900" }
									]}
									onChange={buttonTextFontWeight =>
										setAttributes({
											buttonTextFontWeight
										})
									}
								/>
								<RangeControl
									label={__(
										"Button Text Letter Spacing(px)",
										"guteblock"
									)}
									value={buttonLetterSpacing}
									onChange={buttonLetterSpacing =>
										setAttributes({
											buttonLetterSpacing
										})
									}
									min={-2}
									max={4}
									step={1}
								/>
								<PanelBody
									title={__(
										"Button Hover Settings",
										"guteblock"
									)}
								>
									<PanelColorSettings
										title={__(
											"Hover Colors",
											"guteblock"
										)}
										colorSettings={[
											{
												value: hoverButtonBackgroundColor,
												onChange: this
													.onChangeButtonHoverBackgroundColor,
												label: __(
													"Button Hover Color",
													"guteblock"
												)
											},
											{
												value: hoverButtonTextColor,
												onChange: this
													.onChangeButtonHoverTextColor,
												label: __(
													"Button Hover Text Color",
													"guteblock"
												)
											}
										]}
									/>
								</PanelBody>
							</PanelBody>
						)}
						{styleName == 3 && (
							<PanelBody
								title={__(
									"Button Hover Settings",
									"guteblock"
								)}
							>
								<PanelColorSettings
									title={__(
										"Hover Colors",
										"guteblock"
									)}
									colorSettings={[
										{
											value: hoverButtonBackgroundColor,
											onChange: this
												.onChangeButtonHoverBackgroundColor,
											label: __(
												"Button Hover Color",
												"guteblock"
											)
										},
										{
											value: hoverButtonTextColor,
											onChange: this
												.onChangeButtonHoverTextColor,
											label: __(
												"Button Hover Text Color",
												"guteblock"
											)
										}
									]}
								/>
							</PanelBody>
						)}
					</PanelBody>
					<PanelBody title={__("Input Settings", "guteblock")}>
						<SelectControl
							label={__(
								"Input Text Transform",
								"guteblock"
							)}
							value={inputTextTransform}
							options={[
								{ label: "Normal", value: "none" },
								{
									label: "Uppercase",
									value: "uppercase"
								},
								{
									label: "Lowercase",
									value: "lowercase"
								},
								{
									label: "Capitalize",
									value: "capitalize"
								}
							]}
							onChange={inputTextTransform =>
								setAttributes({ inputTextTransform })
							}
						/>
						<SelectControl
							label="Font Weight"
							value={inputTextFontWeight}
							options={[
								{ label: "Lighter", value: "lighter" },
								{ label: "Normal", value: "normal" },
								{ label: "Bold", value: "bold" },
								{ label: "100", value: "100" },
								{ label: "200", value: "200" },
								{ label: "300", value: "300" },
								{ label: "400", value: "400" },
								{ label: "500", value: "500" },
								{ label: "600", value: "600" },
								{ label: "700", value: "700" },
								{ label: "800", value: "800" },
								{ label: "900", value: "900" }
							]}
							onChange={inputTextFontWeight =>
								setAttributes({ inputTextFontWeight })
							}
						/>
						<PanelColorSettings
							title={__("Input Color", "guteblock")}
							colorSettings={[
								{
									value: inputTextColor,
									onChange: this
										.onChangeInputTextColor,
									label: __(
										"Input Text Color",
										"guteblock"
									)
								},
								{
									value: inputBackgroundColor,
									onChange: this
										.onChangeinputBackgroundColor,
									label: __(
										"Input Background Color",
										"guteblock"
									)
								}
							]}
						/>
					</PanelBody>
				</InspectorControls>

				<div
					className={classes}
					style={{
						backgroundColor: bg,
						paddingLeft: horizontalOuterPadding,
						paddingRight: horizontalOuterPadding,
						paddingTop: verticalOuterPadding,
						paddingBottom: verticalOuterPadding,
						alignment: alignment
					}}
				>
					<div className="wp-block-guteblock-newsletter__container">
						<TextControl
							type="email"
							className={
								"wp-block-guteblock-newsletter__input"
							}
							// onChange={this.onChangeTitle}
							placeholder={__(placeholder, "guteblock")}
							value={title}
							onChange={title => setAttributes({ title })}
							// tagName="h4"
							// formattingControls={[]}
							style={{
								paddingLeft: horizontalPadding,
								paddingRight:
									horizontalPadding +
									4.5 * fontSize +
									2 * buttonHorizontalPadding,
								paddingTop: verticalInnerPadding,
								paddingBottom: verticalInnerPadding,
								textTransform: inputTextTransform,
								fontWeight: inputTextFontWeight,
								borderTopLeftRadius: TopLeft,
								borderBottomLeftRadius: TopLeft,
								borderTopRightRadius: r,
								borderBottomRightRadius: r,
								fontSize: fontSize,
								backgroundColor: inputBackgroundColor,
								color: inputTextColor,
								border: "none"
							}}
						/>
						<TextControl
							className={
								"wp-block-guteblock-newsletter__hiddeninput"
							}
							type="hidden"
							name="double-optin"
							value={doubleOptIn}
						/>
						<Button
							target="_blank"
							rel="noopener noreferrer"
							className="wp-block-guteblock-newsletter-inner"
							style={{
								paddingLeft: buttonHorizontalPadding,
								paddingRight: buttonHorizontalPadding,
								paddingTop: verticalInnerPadding,
								paddingBottom: verticalInnerPadding,
								borderTopLeftRadius: btnTopLeft,
								borderBottomLeftRadius: btnBottomLeft,
								borderTopRightRadius: r,
								borderBottomRightRadius: r,
								backgroundColor: buttonBackgroundColor,
								textTransform: buttonTextTransform,
								fontWeight: buttonTextFontWeight,
								textDecoration: "none",
								letterSpacing: `${buttonLetterSpacing}px`,
								border: "none",
								color: buttonTextColor,
								fontSize: fontSize
							}}
						>
							{styleName != 3 && (
								<div className="wp-block-guteblock-newsletter__content">
									<RichText
										style={{}}
										tagName="span"
										value={buttonTitle}
										onChange={
											this.onChangeButtonTitle
										}
									/>
								</div>
							)}
							{styleName == 3 && (
								<div className="wp-block-guteblock-newsletter__content">
									<Dashicon
										icon={icon}
										size={fontSize}
										fill={buttonTextColor}
									/>
								</div>
							)}
						</Button>
						<style
							dangerouslySetInnerHTML={{
								__html: [
									`.wp-block-guteblock-newsletter-inner:hover { color: ${hoverButtonTextColor} !important; background-color: ${hoverButtonBackgroundColor} !important; }`
								].join("\n")
							}}
						></style>
					</div>
				</div>
			</>
		);
	}
}

export default Newsletter;
