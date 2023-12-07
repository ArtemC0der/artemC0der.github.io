import { Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
	RichText,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	MediaUpload,
	PanelColorSettings
} from "@wordpress/editor";
import {
	PanelBody,
	Button,
	RangeControl,
	IconButton,
	SelectControl,
	ToggleControl,
	TextControl,
	ColorPicker
} from "@wordpress/components";
import classnames from "classnames";

class CallToAction extends Component {
	onChangeTitle = title => {
		this.props.setAttributes({ title });
	};

	onSelectImage = ({ id, url }) => {
		this.props.setAttributes({
			imageID: id,
			imageUrl: url
		});
	};

	onChangeAlignment = alignment => {
		this.props.setAttributes({ alignment });
	};

	toggleOverlay = () => {
		this.props.setAttributes({ overlay: !this.props.attributes.overlay });
	};

	onChangeOverlayColor = color => {
		this.props.setAttributes({ overlayColor: color.hex });
	};

	onChangeOverlayOpacity = overlayOpacity => {
		this.props.setAttributes({ overlayOpacity });
	};

	onChangeButtonTitle = buttonTitle => {
		this.props.setAttributes({ buttonTitle });
	};

	onChangeTitleColor = titleColor => {
		this.props.setAttributes({ titleColor });
	};

	toggleBackgroundStyle = () => {
		this.props.setAttributes({
			fixedBackground: !this.props.attributes.fixedBackground
		});
	};

	toggleButton = () => {
		this.props.setAttributes({
			enableButton: !this.props.attributes.enableButton
		});
	};

	onSelectAuthorImage = ({ id, url }) => {
		this.props.setAttributes({ author_image_id: id });
		this.props.setAttributes({ author_image: url });
	};

	onChangeButtonTextColor = buttonTextColor => {
		this.props.setAttributes({ buttonTextColor });
	};

	onChangeButtonBackgroundColor = buttonBackgroundColor => {
		this.props.setAttributes({ buttonBackgroundColor });
	};

	onChangeHoverButtonTextColor = hoverButtonTextColor => {
		this.props.setAttributes({ hoverButtonTextColor });
	};

	onChangeHoverButtonBackgroundColor = hoverButtonBackgroundColor => {
		this.props.setAttributes({ hoverButtonBackgroundColor });
	};

	onChangeButtonLink = buttonLink => {
		this.props.setAttributes({ buttonLink });
	};

	render() {
		const { className, attributes, setAttributes } = this.props;
		const {
			containerWidth,
			title,
			alignment,
			imageID,
			imageUrl,
			overlay,
			overlayColor,
			overlayOpacity,
			paddingTop,
			paddingBottom,
			backgroundColor,
			containerVerticalPadding,
			containerHorizontalPadding,
			titleColor,
			titleFontSize,
			titleTextTransform,
			enableButton,
			buttonTitle,
			buttonFontSize,
			buttonTextColor,
			buttonBackgroundColor,
			buttonBorderRadius,
			buttonVerticalMargin,
			buttonHorizontalMargin,
			buttonVerticalPadding,
			buttonHorizontalPadding,
			buttonTextTransform,
			hoverButtonTextColor,
			hoverButtonBackgroundColor,
			buttonLink,
			fixedBackground
		} = attributes;

		const classes = classnames(className, {
			"background-fixed": fixedBackground
		});

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
						title={__(
							"General Settings Settings",
							"guteblock"
						)}
					>
						<TextControl
							value={title}
							onChange={this.onChangeTitle}
							placeholder="Some settings"
							help={__(
								"This is a basic description",
								"guteblock"
							)}
						/>
						<RangeControl
							label={__(
								"Container Outer Width(%)",
								"guteblock"
							)}
							value={containerWidth}
							onChange={containerWidth =>
								setAttributes({ containerWidth })
							}
							min={50}
							max={100}
							step={1}
						/>
					</PanelBody>
					<PanelBody title={__("Spacing", "guteblock")}>
						<RangeControl
							label={__("Padding Top", "guteblock")}
							value={paddingTop}
							onChange={paddingTop =>
								setAttributes({ paddingTop })
							}
							min={50}
							max={500}
							step={10}
						/>

						<RangeControl
							label={__("Padding Bottom", "guteblock")}
							value={paddingBottom}
							onChange={paddingBottom =>
								setAttributes({ paddingBottom })
							}
							min={50}
							max={500}
							step={10}
						/>
						<RangeControl
							label={__(
								"Container Vertical Padding",
								"guteblock"
							)}
							value={containerVerticalPadding}
							onChange={containerVerticalPadding =>
								setAttributes({
									containerVerticalPadding
								})
							}
							min={0}
							max={100}
							step={1}
						/>
						{alignment != "center" && (
							<RangeControl
								label={__(
									"Container Horizontal Padding",
									"guteblock"
								)}
								value={containerHorizontalPadding}
								onChange={containerHorizontalPadding =>
									setAttributes({
										containerHorizontalPadding
									})
								}
								min={0}
								max={100}
								step={1}
							/>
						)}
					</PanelBody>
					<PanelBody title={__("Image Settings", "guteblock")}>
						<MediaUpload
							onSelect={this.onSelectImage}
							allowedTypes={["image"]}
							value={imageID} // To highlight the selected image in the Media Library
							render={({ open }) => {
								return (
									<>
										{imageUrl ? (
											<img
												src={imageUrl}
												alt=""
												onClick={open}
											/>
										) : (
											<IconButton
												className="components-icon-button-components-toolbar__control"
												label={__(
													"Edit Image",
													"guteblock"
												)}
												onClick={open}
												icon="format-image"
											/>
										)}
									</>
								);
							}}
						/>
						{imageUrl && (
							<ToggleControl
								label={__(
									"Fixed Background",
									"guteblock"
								)}
								onChange={this.toggleBackgroundStyle}
								checked={fixedBackground}
							/>
						)}
					</PanelBody>
					<PanelBody title={__("Overlay Settings", "guteblock")}>
						<ToggleControl
							label={__("Enable Overlay", "guteblock")}
							onChange={this.toggleOverlay}
							checked={overlay}
						/>
						{overlay && (
							<>
								<ColorPicker
									color={overlayColor}
									onChangeComplete={
										this.onChangeOverlayColor
									}
									disableAlpha
								/>
								<RangeControl
									label={__(
										"Overlay Opacity",
										"guteblock"
									)}
									value={overlayOpacity}
									onChange={
										this.onChangeOverlayOpacity
									}
									min={0}
									max={1}
									step={0.1}
								/>
							</>
						)}
					</PanelBody>
					<PanelBody title={__("Title Settings", "guteblock")}>
						<RangeControl
							label={__("Title Font Size", "guteblock")}
							value={titleFontSize}
							onChange={titleFontSize =>
								setAttributes({ titleFontSize })
							}
							min={35}
							max={50}
							step={0.1}
						/>
						<SelectControl
							label={__(
								"Title Text Transform",
								"guteblock"
							)}
							value={titleTextTransform}
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
							onChange={titleTextTransform =>
								setAttributes({
									titleTextTransform
								})
							}
						/>
						<PanelColorSettings
							title={__(
								"Title Color Settings",
								"guteblock"
							)}
							colorSettings={[
								{
									value: titleColor,
									onChange: this.onChangeTitleColor,
									label: __(
										"Title Font Color",
										"guteblock"
									)
								}
							]}
						/>
					</PanelBody>
					<PanelBody title={__("Button Settings", "guteblock")}>
						<ToggleControl
							label={__("Show Button", "guteblock")}
							onChange={this.toggleButton}
							checked={enableButton}
						/>
						{enableButton && (
							<>
								<TextControl
									value={buttonLink}
									onChange={this.onChangeButtonLink}
									placeholder="Button Link"
								/>
							</>
						)}
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
						<RangeControl
							label={__("Button Font Size", "guteblock")}
							value={buttonFontSize}
							onChange={buttonFontSize =>
								setAttributes({ buttonFontSize })
							}
							min={20}
							max={50}
							step={1}
						/>
						<PanelColorSettings
							title={__(
								"Button Color Settings",
								"guteblock"
							)}
							colorSettings={[
								{
									value: buttonTextColor,
									onChange: this
										.onChangeButtonTextColor,
									label: __(
										"Button Font Color",
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
								},
								{
									value: hoverButtonTextColor,
									onChange: this
										.onChangeHoverButtonTextColor,
									label: __(
										"Button Hover Font Color",
										"guteblock"
									)
								},
								{
									value: hoverButtonBackgroundColor,
									onChange: this
										.onChangeHoverButtonBackgroundColor,
									label: __(
										"Button Hover Background Color",
										"guteblock"
									)
								}
							]}
						/>
						<RangeControl
							label={__("Vertical Padding", "guteblock")}
							value={buttonVerticalPadding}
							onChange={buttonVerticalPadding =>
								setAttributes({ buttonVerticalPadding })
							}
							min={0}
							max={100}
							step={1}
						/>
						<RangeControl
							label={__("Horizontal Padding", "guteblock")}
							value={buttonHorizontalPadding}
							onChange={buttonHorizontalPadding =>
								setAttributes({
									buttonHorizontalPadding
								})
							}
							min={0}
							max={150}
							step={1}
						/>
						<RangeControl
							label={__("Vertical Margin", "guteblock")}
							value={buttonVerticalMargin}
							onChange={buttonVerticalMargin =>
								setAttributes({ buttonVerticalMargin })
							}
							min={0}
							max={100}
							step={1}
						/>
						{alignment != "center" && (
							<RangeControl
								label={__(
									"Horizontal Margin",
									"guteblock"
								)}
								value={buttonHorizontalMargin}
								onChange={buttonHorizontalMargin =>
									setAttributes({
										buttonHorizontalMargin
									})
								}
								min={0}
								max={100}
								step={1}
							/>
						)}
						<RangeControl
							label={__(
								"Button Border Radius",
								"guteblock"
							)}
							value={buttonBorderRadius}
							onChange={buttonBorderRadius =>
								setAttributes({ buttonBorderRadius })
							}
							min={0}
							max={100}
							step={1}
						/>
					</PanelBody>
				</InspectorControls>
				<div
					className={classes}
					style={{
						paddingTop: paddingTop,
						paddingBottom: paddingBottom,
						backgroundColor: backgroundColor,
						backgroundImage: `url(${imageUrl})`,
						backgroundSize: "cover",
						alignment: alignment
					}}
				>
					{overlay && (
						<div
							className={`wp-block-guteblock-cta__overlay ${fixedBackground}`}
							style={{
								backgroundColor: overlayColor,
								opacity: overlayOpacity
							}}
						></div>
					)}
					<div
						className="wp-block-guteblock-cta__contentOuter"
						style={{ maxWidth: `${containerWidth}%` }}
					>
						<div
							className="wp-block-guteblock-cta__container"
							style={{
								textAlign: alignment,
								paddingTop: `${containerVerticalPadding}px`,
								paddingBottom: `${containerVerticalPadding}px`,
								paddingLeft: `${containerHorizontalPadding}px`,
								paddingRight: `${containerHorizontalPadding}px`
							}}
						>
							<RichText
								className={
									"wp-block-guteblock-cta__title"
								}
								style={{
									color: titleColor,
									fontSize: `${titleFontSize}px`,
									textTransform: titleTextTransform
								}}
								tagName="h2"
								onChange={this.onChangeTitle}
								value={title}
							/>
							{enableButton && (
								<Button
									rel="noopener noreferrer"
									className={
										"wp-block-guteblock-cta__button"
									}
									style={{
										textTransform: buttonTextTransform,
										color: buttonTextColor,
										fontSize: `${buttonFontSize}px`,
										marginTop: `${buttonVerticalMargin}px`,
										marginBottom: `${buttonVerticalMargin}px`,
										marginLeft: `${buttonHorizontalMargin}px`,
										marginRight: `${buttonHorizontalMargin}px`,
										paddingTop: `${buttonVerticalPadding}px`,
										paddingBottom: `${buttonVerticalPadding}px`,
										paddingLeft: `${buttonHorizontalPadding}px`,
										paddingRight: `${buttonHorizontalPadding}px`,
										backgroundColor: buttonBackgroundColor,
										borderRadius: `${buttonBorderRadius}px`
									}}
								>
									<RichText
										style={{}}
										tagName="span"
										value={buttonTitle}
										onChange={
											this.onChangeButtonTitle
										}
									/>
								</Button>
							)}
						</div>
					</div>
				</div>
				<style
					dangerouslySetInnerHTML={{
						__html: [
							`.wp-block-guteblock-cta__button:hover {
							color: ${hoverButtonTextColor} !important;
							background-color: ${hoverButtonBackgroundColor} !important;
							transition: 1s ease all !important;
						}
						`
						].join("\n")
					}}
				></style>
			</>
		);
	}
}

export default CallToAction;
