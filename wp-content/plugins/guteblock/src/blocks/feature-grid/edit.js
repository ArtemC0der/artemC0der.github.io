import { Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
	RichText,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	PanelColorSettings,
	ContrastChecker,
	MediaUpload,
	URLInput
} from "@wordpress/editor";
import {
	PanelBody,
	RangeControl,
	Tooltip,
	Dashicon,
	ToggleControl,
	IconButton,
	SelectControl,
	Button
} from "@wordpress/components";
import classnames from "classnames";

class FeatureGridsEdit extends Component {
	state = {
		selectedBox: 0
	};

	componentDidMount() {}

	onChangeTitle = title => {
		this.props.setAttributes({ title });
	};

	onChangeAlignment = alignment => {
		this.props.setAttributes({ alignment });
	};

	addNewFeatureGrid = () => {
		const { setAttributes, attributes } = this.props;
		const { featureGrids } = attributes;
		setAttributes({
			featureGrids: [
				...featureGrids,
				{
					title: "",
					content: ""
				}
			]
		});
		this.setState({
			selectedBox: featureGrids.length
		});
	};

	updateFeatureGrid = (type, value) => {
		const { setAttributes, attributes } = this.props;
		const { featureGrids } = attributes;
		const { selectedBox } = this.state;
		let new_featureGrids = [...featureGrids];
		new_featureGrids[selectedBox][type] = value;
		setAttributes({ featureGrids: new_featureGrids });
	};

	removeFeatureGrid = (e, index) => {
		e.preventDefault();

		const { setAttributes, attributes } = this.props;
		const { featureGrids } = attributes;

		setAttributes({
			featureGrids: [
				...featureGrids.slice(0, index),
				...featureGrids.slice(index + 1)
			]
		});
	};

	toggleShadow = () => {
		this.props.setAttributes({ shadow: !this.props.attributes.shadow });
	};

	toggleToNewTab = () => {
		this.props.setAttributes({
			isNewTab: !this.props.attributes.isNewTab
		});
	};

	onSelectImage = ({ id, url, alt }) => {
		this.updateFeatureGrid("authorImageID", id);
		this.updateFeatureGrid("authorImageUrl", url);
		this.updateFeatureGrid("authorImageAlt", alt);
	};

	render() {
		const { className, attributes, setAttributes } = this.props;
		const {
			align,
			alignment,
			featureGrids,
			grid_border_radius,
			section_background,
			grid_background,
			title_color,
			content_color,
			shadow,
			image_border_radius,
			shadow_background,
			title_size,
			content_size,
			fontWeight,
			textTransform,
			letterSpacing,
			contentFontWeight,
			contentLetterSpacing,
			contentTextTransform,
			innerPadding,
			buttonBgColor,
			buttonTextColor,
			buttonBorderRadius,
			buttonVerticalPadding,
			buttonHorizontalPadding,
			opacity,
			fontSize,
			isNewTab,
			buttonFontWeight,
			buttonTextTransform,
			buttonLetterSpacing,
			buttonVerticalMargin,
			actual_price_color,
			offer_price_color,
			verticalMargin
		} = attributes;

		if (!align) {
			this.props.setAttributes({ align: "full" });
		}

		const classes = classnames(className, {
			[`align${align}`]: align,
			[`align-${alignment}`]: alignment,
			[`has-shadow`]: shadow
		});

		const isStyle = RegExp(/is-style-/);
		const styleName = isStyle.test(attributes.className)
			? attributes.className.replace(isStyle, "")
			: null;

		console.log(styleName);

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
					<PanelBody
						title={__("General Settings", "guteblock")}
						initialOpen={false}
					>
						<ToggleControl
							label={__("Shadow", "guteblock")}
							onChange={this.toggleShadow}
							checked={shadow}
						/>

						{shadow ? (
							<PanelColorSettings
								title={__(
									"Shadow Background Color",
									"guteblock"
								)}
								colorSettings={[
									{
										value: shadow_background,
										onChange: color => {
											setAttributes({
												shadow_background: color
											});
										},
										label: __(
											"Shadow Background Color",
											"guteblock"
										)
									}
								]}
							></PanelColorSettings>
						) : (
							setAttributes({
								shadow_background: "transparent"
							})
						)}

						<RangeControl
							label={__(
								"Grid Border Radius (px)",
								"guteblock"
							)}
							value={grid_border_radius}
							onChange={grid_border_radius =>
								setAttributes({ grid_border_radius })
							}
							min={0}
							max={100}
							step={1}
						/>
						{styleName != 3 && (
							<RangeControl
								label={__(
									"Image Border Radius (%)",
									"guteblock"
								)}
								value={image_border_radius}
								onChange={image_border_radius =>
									setAttributes({
										image_border_radius
									})
								}
								min={0}
								max={100}
								step={1}
							/>
						)}

						<RangeControl
							label={__(
								"Content Inner Padding",
								"guteblock"
							)}
							value={innerPadding}
							onChange={innerPadding =>
								setAttributes({ innerPadding })
							}
							min={0}
							max={20}
							step={1}
						/>
					</PanelBody>
					{styleName != 2 && styleName != 3 && (
						<PanelColorSettings
							initialOpen={false}
							title={__("Color Settings", "guteblock")}
							colorSettings={[
								{
									value: section_background,
									onChange: color => {
										setAttributes({
											section_background: color
										});
									},
									label: __(
										"Section Background Color",
										"guteblock"
									)
								},
								{
									value: grid_background,
									onChange: color => {
										setAttributes({
											grid_background: color
										});
									},
									label: __(
										"Grid Background Color",
										"guteblock"
									)
								},
								{
									value: title_color,
									onChange: color => {
										setAttributes({
											title_color: color
										});
									},
									label: __(
										"Title Color",
										"guteblock"
									)
								},
								{
									value: content_color,
									onChange: color => {
										setAttributes({
											content_color: color
										});
									},
									label: __(
										"Content Color",
										"guteblock"
									)
								},
								{
									value: buttonBgColor,
									onChange: color => {
										setAttributes({
											buttonBgColor: color
										});
									},
									label: __(
										"Button Background Color",
										"guteblock"
									)
								},
								{
									value: buttonTextColor,
									onChange: color => {
										setAttributes({
											buttonTextColor: color
										});
									},
									label: __(
										"Button Text Color",
										"guteblock"
									)
								}
							]}
						>
							<ContrastChecker
								textColor={title_color}
								backgroundColor={grid_background}
							/>
							<ContrastChecker
								textColor={content_color}
								backgroundColor={grid_background}
							/>
						</PanelColorSettings>
					)}
					{styleName == 2 && (
						<PanelColorSettings
							initialOpen={false}
							title={__("Color Settings", "guteblock")}
							colorSettings={[
								{
									value: section_background,
									onChange: color => {
										setAttributes({
											section_background: color
										});
									},
									label: __(
										"Section Background Color",
										"guteblock"
									)
								},
								{
									value: grid_background,
									onChange: color => {
										setAttributes({
											grid_background: color
										});
									},
									label: __(
										"Grid Background Color",
										"guteblock"
									)
								},
								{
									value: title_color,
									onChange: color => {
										setAttributes({
											title_color: color
										});
									},
									label: __(
										"Title Color",
										"guteblock"
									)
								},
								{
									value: actual_price_color,
									onChange: color => {
										setAttributes({
											actual_price_color: color
										});
									},
									label: __(
										"Actual Price Color",
										"guteblock"
									)
								},
								{
									value: offer_price_color,
									onChange: color => {
										setAttributes({
											offer_price_color: color
										});
									},
									label: __(
										"Offer Price Color",
										"guteblock"
									)
								},
								{
									value: buttonBgColor,
									onChange: color => {
										setAttributes({
											buttonBgColor: color
										});
									},
									label: __(
										"Button Background Color",
										"guteblock"
									)
								},
								{
									value: buttonTextColor,
									onChange: color => {
										setAttributes({
											buttonTextColor: color
										});
									},
									label: __(
										"Button Text Color",
										"guteblock"
									)
								}
							]}
						>
							<ContrastChecker
								textColor={title_color}
								backgroundColor={grid_background}
							/>
							<ContrastChecker
								textColor={content_color}
								backgroundColor={grid_background}
							/>
						</PanelColorSettings>
					)}
					{styleName == 3 && (
						<PanelColorSettings
							initialOpen={false}
							title={__("Color Settings", "guteblock")}
							colorSettings={[
								{
									value: section_background,
									onChange: color => {
										setAttributes({
											section_background: color
										});
									},
									label: __(
										"Section Background Color",
										"guteblock"
									)
								},
								{
									value: grid_background,
									onChange: color => {
										setAttributes({
											grid_background: color
										});
									},
									label: __(
										"Grid Background Color",
										"guteblock"
									)
								},
								{
									value: title_color,
									onChange: color => {
										setAttributes({
											title_color: color
										});
									},
									label: __(
										"Title Color",
										"guteblock"
									)
								},
								{
									value: content_color,
									onChange: color => {
										setAttributes({
											content_color: color
										});
									},
									label: __(
										"Content Color",
										"guteblock"
									)
								},
								{
									value: buttonTextColor,
									onChange: color => {
										setAttributes({
											buttonTextColor: color
										});
									},
									label: __(
										"Button Text Color",
										"guteblock"
									)
								}
							]}
						>
							<ContrastChecker
								textColor={title_color}
								backgroundColor={grid_background}
							/>
							<ContrastChecker
								textColor={content_color}
								backgroundColor={grid_background}
							/>
						</PanelColorSettings>
					)}
					<PanelBody
						title={__("Typography", "guteblock")}
						initialOpen={false}
					>
						<RangeControl
							label={__("Vertical Margin", "guteblock")}
							value={verticalMargin}
							onChange={verticalMargin =>
								setAttributes({ verticalMargin })
							}
							min={0}
							max={50}
							step={1}
						/>
						<PanelBody
							title={__("Title Settings", "guteblock")}
						>
							<RangeControl
								label={__(
									"Title Font Size",
									"guteblock"
								)}
								value={title_size}
								onChange={title_size =>
									setAttributes({ title_size })
								}
								min={0}
								max={35}
								step={1}
							/>
							<SelectControl
								label="Title Font Weight"
								value={fontWeight}
								options={[
									{
										label: "Lighter",
										value: "lighter"
									},
									{
										label: "Normal",
										value: "normal"
									},
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
								onChange={fontWeight =>
									setAttributes({ fontWeight })
								}
							/>
							<SelectControl
								label="Title Text Transform"
								value={textTransform}
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
								onChange={textTransform =>
									setAttributes({ textTransform })
								}
							/>
							<RangeControl
								label={__(
									"Title Letter Spacing",
									"guteblock"
								)}
								value={letterSpacing}
								onChange={letterSpacing =>
									setAttributes({ letterSpacing })
								}
								min={0}
								max={10}
								step={1}
							/>
						</PanelBody>
						<PanelBody
							title={__("Content Settings", "guteblock")}
						>
							<RangeControl
								label={__(
									"Content Font Size",
									"guteblock"
								)}
								value={content_size}
								onChange={content_size =>
									setAttributes({ content_size })
								}
								min={0}
								max={25}
								step={1}
							/>
							<SelectControl
								label="Content Font Weight"
								value={contentFontWeight}
								options={[
									{
										label: "Lighter",
										value: "lighter"
									},
									{
										label: "Normal",
										value: "normal"
									},
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
								onChange={contentFontWeight =>
									setAttributes({
										contentFontWeight
									})
								}
							/>
							<SelectControl
								label="Content Text Transform"
								value={contentTextTransform}
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
								onChange={contentTextTransform =>
									setAttributes({
										contentTextTransform
									})
								}
							/>
							<RangeControl
								label={__(
									"Content Letter Spacing",
									"guteblock"
								)}
								value={contentLetterSpacing}
								onChange={contentLetterSpacing =>
									setAttributes({
										contentLetterSpacing
									})
								}
								min={0}
								max={10}
								step={1}
							/>
						</PanelBody>
					</PanelBody>
					{styleName != 3 && (
						<PanelBody
							title={__("Button Settings", "guteblock")}
							initialOpen={false}
						>
							<RangeControl
								label={__("Border Radius", "guteblock")}
								value={buttonBorderRadius}
								onChange={buttonBorderRadius =>
									setAttributes({
										buttonBorderRadius
									})
								}
								min={0}
								max={60}
								step={1}
							/>
							<RangeControl
								label={__(
									"Vertical Padding",
									"guteblock"
								)}
								value={buttonVerticalPadding}
								onChange={buttonVerticalPadding =>
									setAttributes({
										buttonVerticalPadding
									})
								}
								min={0}
								max={50}
								step={1}
							/>
							<RangeControl
								label={__(
									"Horizontal Padding",
									"guteblock"
								)}
								value={buttonHorizontalPadding}
								onChange={buttonHorizontalPadding =>
									setAttributes({
										buttonHorizontalPadding
									})
								}
								min={0}
								max={100}
								step={1}
							/>
							<RangeControl
								label={__(
									"Vertical Margin",
									"guteblock"
								)}
								value={buttonVerticalMargin}
								onChange={buttonVerticalMargin =>
									setAttributes({
										buttonVerticalMargin
									})
								}
								min={0}
								max={100}
								step={1}
							/>
							<RangeControl
								label={__("Opacity", "guteblock")}
								value={opacity}
								onChange={opacity =>
									setAttributes({ opacity })
								}
								min={0.1}
								max={1}
								step={0.1}
							/>
							<ToggleControl
								label={__(
									"Open Link in New Tab",
									"guteblock"
								)}
								onChange={this.toggleToNewTab}
								checked={isNewTab}
							/>
							<RangeControl
								label={__("Font Size", "guteblock")}
								value={fontSize}
								onChange={fontSize =>
									setAttributes({ fontSize })
								}
								min={0}
								max={25}
								step={1}
							/>
							<SelectControl
								label="Font Weight"
								value={buttonFontWeight}
								options={[
									{
										label: "Lighter",
										value: "lighter"
									},
									{
										label: "Normal",
										value: "normal"
									},
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
								onChange={buttonFontWeight =>
									setAttributes({ buttonFontWeight })
								}
							/>
							<SelectControl
								label="Transform"
								value={buttonTextTransform}
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
								onChange={buttonTextTransform =>
									setAttributes({
										buttonTextTransform
									})
								}
							/>
							<RangeControl
								label={__(
									"Letter Spacing",
									"guteblock"
								)}
								value={buttonLetterSpacing}
								onChange={buttonLetterSpacing =>
									setAttributes({
										buttonLetterSpacing
									})
								}
								min={-5}
								max={10}
								step={1}
							/>
						</PanelBody>
					)}
					{styleName == 3 && (
						<PanelBody
							title={__("Button Settings", "guteblock")}
							initialOpen={false}
						>
							<RangeControl
								label={__(
									"Vertical Margin",
									"guteblock"
								)}
								value={buttonVerticalMargin}
								onChange={buttonVerticalMargin =>
									setAttributes({
										buttonVerticalMargin
									})
								}
								min={0}
								max={100}
								step={1}
							/>
							<ToggleControl
								label={__(
									"Open Link in New Tab",
									"guteblock"
								)}
								onChange={this.toggleToNewTab}
								checked={isNewTab}
							/>
							<RangeControl
								label={__("Font Size", "guteblock")}
								value={fontSize}
								onChange={fontSize =>
									setAttributes({ fontSize })
								}
								min={0}
								max={25}
								step={1}
							/>
							<SelectControl
								label="Font Weight"
								value={buttonFontWeight}
								options={[
									{
										label: "Lighter",
										value: "lighter"
									},
									{
										label: "Normal",
										value: "normal"
									},
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
								onChange={buttonFontWeight =>
									setAttributes({ buttonFontWeight })
								}
							/>
							<SelectControl
								label="Transform"
								value={buttonTextTransform}
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
								onChange={buttonTextTransform =>
									setAttributes({
										buttonTextTransform
									})
								}
							/>
							<RangeControl
								label={__(
									"Letter Spacing",
									"guteblock"
								)}
								value={buttonLetterSpacing}
								onChange={buttonLetterSpacing =>
									setAttributes({
										buttonLetterSpacing
									})
								}
								min={-5}
								max={10}
								step={1}
							/>
						</PanelBody>
					)}
				</InspectorControls>

				<div
					className={classes}
					style={{
						backgroundColor: section_background
					}}
				>
					<div className="wp-block-guteblock-feature-grid__container">
						{featureGrids.map((featureGrid, index) => {
							return (
								<div
									className="feature-grid__outer"
									key={index}
									onClick={() =>
										this.setState({
											selectedBox: index
										})
									}
									style={{
										borderRadius: [
											`${grid_border_radius}px`
										],
										backgroundColor: grid_background,
										boxShadow: `0 0 29px -19px ${shadow_background}`
									}}
								>
									<div className="feature-grid__remove-btn">
										<Dashicon
											icon={"trash"}
											size={30}
											onClick={e => {
												this.removeFeatureGrid(
													e,
													index
												);
											}}
										/>
									</div>

									{styleName != 3 && (
										<div className="feature-grid__image-outer">
											<MediaUpload
												onSelect={
													this
														.onSelectImage
												}
												allowedTypes={[
													"image"
												]}
												value={
													featureGrid.authorImageID
												} // To highlight the selected image in the Media Library
												render={({
													open
												}) => {
													return (
														<>
															{featureGrid.authorImageUrl ? (
																<img
																	style={{
																		borderRadius: [
																			`${image_border_radius}%`
																		]
																	}}
																	src={
																		featureGrid.authorImageUrl
																	}
																	alt="{featureGrid.authorImageAlt}"
																	onClick={
																		open
																	}
																	data-id="{featureGrid.authorImageID}"
																/>
															) : (
																<IconButton
																	className="components-icon-button-components-toolbar__control"
																	label={__(
																		"Edit Image",
																		"guteblock"
																	)}
																	style={{
																		borderRadius: [
																			`${image_border_radius}%`
																		]
																	}}
																	onClick={
																		open
																	}
																	icon="format-image"
																/>
															)}
														</>
													);
												}}
											/>
										</div>
									)}

									{styleName != 2 && (
										<div
											className="feature-grid__content-outer"
											style={{
												marginTop: `${verticalMargin}px`
											}}
										>
											<RichText
												className={
													"wp-block-guteblock-feature-grid__title"
												}
												tagName="h4"
												onChange={title =>
													this.updateFeatureGrid(
														"title",
														title
													)
												}
												value={
													featureGrid.title
												}
												placeholder={__(
													"Title",
													"guteblock"
												)}
												style={{
													color: title_color,
													fontSize: `${title_size}px`,
													textTransform: textTransform,
													fontWeight: fontWeight,
													letterSpacing: `${letterSpacing}px`,
													padding: `0 ${innerPadding}px`
												}}
											/>

											<RichText
												className={
													"wp-block-guteblock-feature-grid__content"
												}
												tagName="p"
												onChange={content =>
													this.updateFeatureGrid(
														"content",
														content
													)
												}
												value={
													featureGrid.content
												}
												placeholder={__(
													"Description for this block. Use this section to describe the features of the product.",
													"guteblock"
												)}
												style={{
													color: content_color,
													fontSize: `${content_size}px`,
													textTransform: contentTextTransform,
													fontWeight: contentFontWeight,
													letterSpacing: `${contentLetterSpacing}px`,
													padding: `0 ${innerPadding}px`
												}}
											/>
										</div>
									)}

									{styleName == 2 && (
										<div
											className="feature-grid__content-outer"
											style={{
												marginTop: `${verticalMargin}px`
											}}
										>
											<RichText
												className={
													"wp-block-guteblock-feature-grid__title"
												}
												tagName="h4"
												onChange={title =>
													this.updateFeatureGrid(
														"title",
														title
													)
												}
												value={
													featureGrid.title
												}
												placeholder={__(
													"Product Name",
													"guteblock"
												)}
												style={{
													color: title_color,
													fontSize: `${title_size}px`,
													textTransform: textTransform,
													fontWeight: fontWeight,
													letterSpacing: `${letterSpacing}px`,
													padding: `0 ${innerPadding}px`
												}}
											/>

											<RichText
												className={
													"wp-block-guteblock-feature-grid__actual_content"
												}
												tagName="p"
												onChange={actualPrice =>
													this.updateFeatureGrid(
														"actualPrice",
														actualPrice
													)
												}
												value={
													featureGrid.actualPrice
												}
												placeholder={__(
													"Actual Price",
													"guteblock"
												)}
												style={{
													color: actual_price_color,
													fontSize: `${content_size}px`,
													textTransform: contentTextTransform,
													fontWeight: contentFontWeight,
													letterSpacing: `${contentLetterSpacing}px`,
													padding: `0 ${innerPadding}px`
												}}
											/>

											<RichText
												className={
													"wp-block-guteblock-feature-grid__offer_content"
												}
												tagName="p"
												onChange={offerPrice =>
													this.updateFeatureGrid(
														"offerPrice",
														offerPrice
													)
												}
												value={
													featureGrid.offerPrice
												}
												placeholder={__(
													"Offer Price",
													"guteblock"
												)}
												style={{
													color: offer_price_color,
													fontSize: `${content_size}px`,
													textTransform: contentTextTransform,
													fontWeight: contentFontWeight,
													letterSpacing: `${contentLetterSpacing}px`,
													padding: `0 ${innerPadding}px`
												}}
											/>
										</div>
									)}
									<div className="wp-block-guteblock-feature-grid__button_outer">
										{styleName != 3 && (
											<Button
												className="wp-block-guteblock-feature-grid__button"
												style={{
													color: buttonTextColor,
													backgroundColor: buttonBgColor,
													borderRadius: `${buttonBorderRadius}px`,
													padding: `${buttonVerticalPadding}px ${buttonHorizontalPadding}px`,
													fontSize: `${fontSize}px`,
													fontWeight: buttonFontWeight,
													textTransform: buttonTextTransform,
													letterSpacing: buttonLetterSpacing,
													opacity: opacity,
													marginTop: `${buttonVerticalMargin}px`
												}}
											>
												<RichText
													className={
														"wp-block-guteblock-feature-grid__button_text"
													}
													value={
														featureGrid.buttonText
													}
													onChange={buttonText =>
														this.updateFeatureGrid(
															"buttonText",
															buttonText
														)
													}
													tagName="span"
													placeholder={__(
														"Button Text",
														"guteblock"
													)}
												/>
											</Button>
										)}
										{styleName == 3 && (
											<Button
												className="wp-block-guteblock-feature-grid__button"
												style={{
													color: buttonTextColor,
													fontSize: `${fontSize}px`,
													fontWeight: buttonFontWeight,
													textTransform: buttonTextTransform,
													letterSpacing: buttonLetterSpacing,
													marginTop: `${buttonVerticalMargin}px`
												}}
											>
												<RichText
													className={
														"wp-block-guteblock-feature-grid__button_text"
													}
													value={
														featureGrid.buttonText
													}
													onChange={buttonText =>
														this.updateFeatureGrid(
															"buttonText",
															buttonText
														)
													}
													tagName="span"
													placeholder={__(
														"Button Text",
														"guteblock"
													)}
												/>
											</Button>
										)}
										<URLInput
											className={
												"wp-block-guteblock-feature-grid__button_link"
											}
											label={__(
												"URL",
												"guteblock"
											)}
											value={featureGrid.link}
											onChange={link =>
												this.updateFeatureGrid(
													"link",
													link
												)
											}
										/>
									</div>
									<div className="clear"></div>
								</div>
							);
						})}
						<div className="clear"></div>
						<Tooltip text={__("Add Box", "guteblock")}>
							<button
								className={
									"wp-block-guteblock-feature-grid__addFeatureGrid"
								}
								onClick={this.addNewFeatureGrid}
							>
								<Dashicon icon={"plus"} size={20} />
							</button>
						</Tooltip>
					</div>
				</div>
			</>
		);
	}
}

export default FeatureGridsEdit;
