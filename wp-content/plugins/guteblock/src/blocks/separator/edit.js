import { Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import classnames from "classnames";
import {
	RichText,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	MediaUpload
} from "@wordpress/editor";
import {
	PanelBody,
	RangeControl,
	IconButton,
	ToggleControl,
	ColorPicker,
	TextControl
} from "@wordpress/components";

class SeparatorEdit extends Component {
	componentDidMount() {}

	onChangeTitle = title => {
		this.props.setAttributes({ title });
	};

	onSelectImage = ({ id, url }) => {
		this.props.setAttributes({
			imageID: id,
			imageUrl: url
		});
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

	toggleBackgroundStyle = () => {
		this.props.setAttributes({
			fixedBackground: !this.props.attributes.fixedBackground
		});
	};

	onChangeTextColor = color => {
		this.props.setAttributes({ textColor: color.hex });
	};

	toggleButton = () => {
		this.props.setAttributes({
			enableButton: !this.props.attributes.enableButton
		});
	};

	onChangeButtonText = buttonText => {
		this.props.setAttributes({ buttonText });
	};

	onChangeButtonLink = buttonLink => {
		this.props.setAttributes({ buttonLink });
	};

	onChangeButtonTextColor = color => {
		this.props.setAttributes({ buttonTextColor: color.hex });
	};

	onChangeButtonBackgroundColor = color => {
		this.props.setAttributes({ buttonBackgroundColor: color.hex });
	};

	onChangeButtonBorderRadius = buttonBorderRadius => {
		console.log(buttonBorderRadius);
		this.props.setAttributes({ buttonBorderRadius });
	};

	render() {
		const { className, attributes, setAttributes } = this.props;
		const {
			title,
			alignment,
			paddingTop,
			paddingBottom,
			imageID,
			imageUrl,
			overlay,
			overlayColor,
			overlayOpacity,
			fixedBackground,
			textColor,
			enableButton,
			buttonText,
			buttonLink,
			buttonTextColor,
			buttonBackgroundColor,
			buttonBorderRadius
		} = attributes;

		const classes = classnames(className, {
			"background-fixed": fixedBackground,
			[`align-${alignment}`]: alignment
		});

		return (
			<>
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
					<PanelBody title={__("Spacing", "guteblock")}>
						<RangeControl
							label={__("Padding Top(px)", "guteblock")}
							value={paddingTop}
							onChange={paddingTop =>
								setAttributes({ paddingTop })
							}
							min={50}
							max={500}
							step={10}
						/>

						<RangeControl
							label={__("Padding Bottom(px)", "guteblock")}
							value={paddingBottom}
							onChange={paddingBottom =>
								setAttributes({ paddingBottom })
							}
							min={50}
							max={500}
							step={10}
						/>
					</PanelBody>
					<PanelBody title={__("Text Color", "guteblock")}>
						<ColorPicker
							color={textColor}
							onChangeComplete={this.onChangeTextColor}
							disableAlpha
						/>
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
									help={__(
										"URL for the button.",
										"guteblock"
									)}
								/>
								<h4>
									{__(
										"Button Text Color",
										"guteblock"
									)}
								</h4>
								<ColorPicker
									color={buttonTextColor}
									onChangeComplete={
										this.onChangeButtonTextColor
									}
									disableAlpha
								/>
								<h4>
									{__(
										"Button Background Color",
										"guteblock"
									)}
								</h4>
								<ColorPicker
									color={buttonBackgroundColor}
									onChangeComplete={
										this
											.onChangeButtonBackgroundColor
									}
									disableAlpha
								/>
								<RangeControl
									label={__(
										"Button Border Radius",
										"guteblock"
									)}
									value={buttonBorderRadius}
									onChange={
										this
											.onChangeButtonBorderRadius
									}
									min={0}
									max={100}
									step={1}
								/>
							</>
						)}
					</PanelBody>
				</InspectorControls>

				<div
					className={classes}
					style={{
						paddingTop: paddingTop,
						paddingBottom: paddingBottom,
						backgroundImage: `url(${imageUrl})`
					}}
				>
					{overlay && (
						<div
							className={`wp-block-guteblock-separator__overlay ${fixedBackground}`}
							style={{
								backgroundColor: overlayColor,
								opacity: overlayOpacity
							}}
						></div>
					)}
					<div className="wp-block-guteblock-separator__contentOuter">
						<RichText
							className={
								"wp-block-guteblock-separator__title"
							}
							tagName="h2"
							onChange={this.onChangeTitle}
							value={title}
							placeholder={__("Title", "guteblock")}
							style={{
								color: textColor
							}}
						/>

						{enableButton && (
							<RichText
								className={
									"wp-block-guteblock-separator__button"
								}
								tagName="btn"
								onChange={this.onChangeButtonText}
								value={buttonText}
								placeholder={__(
									"Button Text",
									"guteblock"
								)}
								style={{
									color: buttonTextColor,
									backgroundColor: buttonBackgroundColor,
									borderRadius: [
										`${buttonBorderRadius}px`
									]
								}}
							/>
						)}
					</div>
				</div>
			</>
		);
	}
}

export default SeparatorEdit;
