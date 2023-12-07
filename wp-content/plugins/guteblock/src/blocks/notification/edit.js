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
	PanelBody,
	Toolbar,
	Dashicon,
	ToggleControl,
	RangeControl
} from "@wordpress/components";

import classnames from "classnames";

class NotificationEdit extends Component {
	onChangeTitle = title => {
		this.props.setAttributes({ title });
	};
	onChangeDescription = description => {
		this.props.setAttributes({ description });
	};
	onChangeIconSize = iconSize => {
		this.props.setAttributes({ iconSize });
	};
	onChangeAlignment = alignment => {
		this.props.setAttributes({ alignment });
	};

	toggleShowIcon = () => {
		this.props.setAttributes({
			showIcon: !this.props.attributes.showIcon
		});
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

	onChangeBgColor = bgcolor => {
		this.props.setAttributes({ bgcolor });
	};

	onChangeIconColor = iconcolor => {
		this.props.setAttributes({ iconcolor });
	};

	onChangeTextColor = textcolor => {
		this.props.setAttributes({ textcolor });
	};

	onChangeCloseButtonColor = closeButtonColor => {
		this.props.setAttributes({ closeButtonColor });
	};

	toggleCloseButton = () => {
		this.props.setAttributes({
			showCloseButton: !this.props.attributes.showCloseButton
		});
	};

	toggleShadow = () => {
		this.props.setAttributes({
			enableShadow: !this.props.attributes.enableShadow
		});
	};

	render() {
		const { className, attributes, setAttributes } = this.props;
		const {
			title,
			description,
			alignment,
			icon,
			bgcolor,
			textcolor,
			iconcolor,
			showIcon,
			iconSize,
			paddingTop,
			paddingBottom,
			showCloseButton,
			closeButtonColor,
			enableShadow
		} = attributes;

		const classes = classnames(className, {
			[`align-${alignment}`]: alignment,
			[`has-shadow`]: enableShadow
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
					<PanelBody title={__("Icon Settings", "guteblock")}>
						<ToggleControl
							label={__("Show Icon", "guteblock")}
							onChange={this.toggleShowIcon}
							checked={showIcon}
						/>
						{showIcon && (
							<>
								<Toolbar
									controls={[
										"yes-alt",
										"warning",
										"dismiss",
										"star-filled",
										"admin-generic",
										"editor-help",
										"heart"
									].map(this.createToolbarControl)}
								/>
								<RangeControl
									label={__(
										"Icon Size",
										"guteblock"
									)}
									value={iconSize}
									onChange={this.onChangeIconSize}
									min={10}
									max={200}
									step={1}
								/>
							</>
						)}
					</PanelBody>
					<PanelColorSettings
						title={__("Color Settings", "guteblock")}
						colorSettings={[
							{
								value: bgcolor,
								onChange: this.onChangeBgColor,
								label: __(
									"Background Color",
									"guteblock"
								),
								colors: [
									{
										name: "Error",
										color: "#e75264"
									},
									{
										name: "Warning",
										color: "#d0d70b"
									},
									{
										name: "Success",
										color: "#66c538"
									}
								]
							},
							{
								value: iconcolor,
								onChange: this.onChangeIconColor,
								label: __("Icon Color", "guteblock")
							},
							{
								value: textcolor,
								onChange: this.onChangeTextColor,
								label: __("Text Color", "guteblock")
							},
							{
								value: closeButtonColor,
								onChange: this.onChangeCloseButtonColor,
								label: __(
									"Close Button Color",
									"guteblock"
								)
							}
						]}
					/>
					<PanelBody title={__("Other Settings", "guteblock")}>
						<ToggleControl
							label={__(
								"Enable Close Button",
								"guteblock"
							)}
							onChange={this.toggleCloseButton}
							checked={showCloseButton}
						/>
						<ToggleControl
							label={__("Enable Shadow", "guteblock")}
							onChange={this.toggleShadow}
							checked={enableShadow}
						/>
						{/* {showCloseButton &&
							<>													
								<RangeControl
									label={__("Close Button Size", "guteblock")}
									value={closeButtonSize}
									onChange={ this.onChangeCloseButtonSize }
									min={10}
									max={50}
									step={1}
								/>
							</>
						} */}
					</PanelBody>
					<PanelBody title={__("Padding Settings", "guteblock")}>
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

				<div
					className={classes}
					style={{
						backgroundColor: bgcolor,
						color: textcolor,
						paddingTop: paddingTop,
						paddingBottom: paddingBottom
					}}
				>
					{showCloseButton && (
						<div className="wp-block-guteblock-notification__closeBtn">
							<Dashicon
								icon="dismiss"
								size={32}
								style={{ color: closeButtonColor }}
							/>
						</div>
					)}
					{showIcon && (
						<Dashicon
							icon={icon}
							size={iconSize}
							style={{ color: iconcolor }}
						/>
					)}
					<RichText
						className={
							"wp-block-guteblock-notification__title"
						}
						tagName="h3"
						onChange={this.onChangeTitle}
						value={title}
						placeholder={__("Title", "guteblock")}
					/>
					<RichText
						className={
							"wp-block-guteblock-notification__description"
						}
						tagName="p"
						onChange={this.onChangeDescription}
						value={description}
						placeholder={__("Description", "guteblock")}
					/>
				</div>
			</>
		);
	}
}

export default NotificationEdit;
