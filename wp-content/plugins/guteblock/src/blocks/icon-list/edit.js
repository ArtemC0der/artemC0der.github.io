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
	Dashicon,
	ToggleControl,
	RangeControl,
	Toolbar
} from "@wordpress/components";
import classnames from 'classnames';

class SomeClassName extends Component {	
	onChangeAlignment = alignment => {
		this.props.setAttributes({ alignment });
	};
	onChangeTitle = title => {
		this.props.setAttributes({ title });
	};
	onChangeInfo = info => {
		this.props.setAttributes({ info });
	};
	onChangeTitleColor = titleColor => {
		this.props.setAttributes({ titleColor });
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
	onChangeContentColor = contentColor => {
		this.props.setAttributes({ contentColor });
	};
	onChangeIconSize = iconSize => {
		this.props.setAttributes({ iconSize });
	};
	onChangeboxShadowColor = boxShadowColor => {
		this.props.setAttributes({ boxShadowColor });
	};
	onChangeiconBackground = iconBackground => {
		this.props.setAttributes({ iconBackground });
	};
	onChangeBgColor = bgcolor => {
		this.props.setAttributes({ bgcolor });
	};
	onChangeIconColor = iconColor => {
		this.props.setAttributes({ iconColor });
	};
	render() {
		const { 
			className, 
			attributes , 
			setAttributes 
		} = this.props;

		const {
			title,
			info,
			alignment,
			titleColor,
			contentColor,
			iconSize,
			bgcolor,
			boxShadow,
			boxShadowColor,
			showIcon,
			icon,
			iconColor,
			paddingTop,
			paddingBottom,
			iconBackground,
			icon_border_radius
		} = attributes;

		const classes = classnames(className, {
			[`align-${alignment}`]: alignment
		})
		
		const isStyle = RegExp(/is-style-/)
		const styleName = isStyle.test(attributes.className)
			? attributes.className.replace(isStyle, '')
			: null
		// console.log(styleName);
		
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
				<PanelColorSettings
					title={__("Color Settings", "guteblock")}
					colorSettings={[
						{
							value: iconColor,
							onChange: this.onChangeIconColor,
							label: __("Icon Color", "guteblock")
						},
						{
							value: iconBackground,
							onChange: this.onChangeiconBackground,
							label: __(
								"Icon Background Color",
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
									color: "#fff"
								}
							]
						},
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
									color: "#fff"
								}
							]
						},
						{
							value: boxShadowColor,
							onChange: this.onChangeboxShadowColor,
							label: __("BoxShadow Color", "guteblock")
						},
						{
							value: titleColor,
							onChange: this.onChangeTitleColor,
							label: __("Icon Title Color", "guteblock"),
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
									color: "#000000"
								}
							]
						},
						{
							value: contentColor,
							onChange: this.onChangeContentColor,
							label: __(
								"Icon Description Color",
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
									color: "#000000"
								}
							]
						}
					]}
				/>
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
									"yes",
									"no",
									"edit",
									"star-filled",
									"sticky",
									"admin-tools",
									"hammer"
								].map(this.createToolbarControl)}
							/>
							{(styleName != "2") && (<RangeControl
								label={__(
									"Icon Size",
									"guteblock"
								)}
								value={iconSize}
								onChange={this.onChangeIconSize}
								min={10}
								max={200}
								step={1}
							/>)}
							<RangeControl
								label={__(
									"Icon Border Radius (%)",
									"guteblock"
								)}
								value={icon_border_radius}
								onChange={icon_border_radius =>
									setAttributes({ icon_border_radius })
								}
								min={0}
								max={100}
								step={1}
							/>
							<RangeControl
								label={__(
									"Box Shadow",
									"guteblock"
								)}
								value={boxShadow}
								onChange={boxShadow =>
									setAttributes({ boxShadow })
								}
								min={0}
								max={5}
								step={1}
							/>
						</>
					)}
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

			<div className={classes} 
				style={{
					backgroundColor: bgcolor,
					paddingTop: paddingTop,
					paddingBottom: paddingBottom,
					boxShadow:`${boxShadow}px ${boxShadow}px ${boxShadow}px ${boxShadow}px ${boxShadowColor}`,
					alignment : alignment
				}}
			>
				{showIcon && (
					<Dashicon
						icon={icon}
						size={iconSize}
						style={{ fill: iconColor,
							backgroundColor:iconBackground,
							borderRadius: [
								`${icon_border_radius}%`
							] }}
					/>
				)}
				<div className="wp-block-guteblock-icon__content">
				<RichText
					className = {
						"wp-block-guteblock-icon__title"
					}
					tagName="h4"
					onChange={this.onChangeTitle}
					value={title}
					placeholder={__(
						"Title here",
						"guteblock"
					)}
					formattingControls={[]}
					style={{ color: titleColor }}
				/>
				<RichText
					className={
						"wp-block-guteblock-icon__info"
					}
					tagName="p"
					onChange={this.onChangeInfo}
					value={info}
					placeholder={__(
						"Description",
						"guteblock"
					)}
					formattingControls={[]}
					style={{ color: contentColor }}
				/>
				<div className="clear"></div>
				</div>
			</div>
			</>
		);
	}
}

export default SomeClassName;