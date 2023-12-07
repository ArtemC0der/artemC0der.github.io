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
	TextControl,
	RangeControl,
	ButtonGroup,
	Button,
	ToggleControl,
	SelectControl
} from "@wordpress/components";
import classnames from 'classnames';

class SomeClassName extends Component {	
	
	onChangeTitle = title => {
		this.props.setAttributes({ title });
	};

	onChangeAlignment = alignment => {
		this.props.setAttributes({ alignment });
	};

	toggleToNewTab = () => {
		this.props.setAttributes({
			isNewTab: !this.props.attributes.isNewTab
		});
	};

	onChangeBackgroundColor = backgroundColor => {
		this.props.setAttributes({ backgroundColor });
	};

	onChangeTextColor = textColor => {
		this.props.setAttributes({ textColor });
	};

	onChangeHoverBackgroundColor = hoverBackgroundColor => {
		this.props.setAttributes({ hoverBackgroundColor });
	};

	onChangeHoverTextColor = hoverTextColor => {
		this.props.setAttributes({ hoverTextColor });
	};

	onChangeBorderColor = borderColor => {
		this.props.setAttributes({ borderColor });
	};
	
	render() {
		const { 
			className, 
			attributes,
			setAttributes } = this.props;
		const {
			title,
			alignment,
			borderRadius,
			link,
			isNewTab,
			verticalPadding,
			horizontalPadding,
			fontSize,
			fontWeight,
			textTransform,
			letterSpacing,
			backgroundColor,
			textColor,
			opacity,
			hoverBackgroundColor,
			hoverTextColor,
			hoverOpacity
		} = attributes;

		const classes = classnames(className, {
			[`align-${alignment}`]: alignment
		})

		const isStyle = RegExp(/is-style-/)
		const styleName = isStyle.test(attributes.className)
			? attributes.className.replace(isStyle, '')
			: null

		let bg, text;
		{styleName == 2 ? bg="transparent" : bg=backgroundColor}
		{styleName == 2 ? text=backgroundColor : text=textColor}

		let button;
		{isNewTab ? button = (
						<Button 
							className='wp-block-guteblock-button-inner'
							style={{
								borderRadius: borderRadius, 
								paddingLeft: horizontalPadding, 
								paddingRight: horizontalPadding, 
								paddingTop: verticalPadding, 
								paddingBottom: verticalPadding, 
								backgroundColor: bg, 
								border: `1px solid ${backgroundColor}`,
								opacity: opacity, 
								textDecoration: "none",
								color: text,
								fontSize: `${fontSize}px`,
								fontWeight: fontWeight,
								textTransform: textTransform,
								letterSpacing: `${letterSpacing}px`
							}}>						
							<RichText
								style={{
								}}
								tagName="span"
								onChange={this.onChangeTitle}
								value={title}
							/>   
						</Button> ) : 
					button = (
						<Button 
							className='wp-block-guteblock-button-inner'
							style={{
								borderRadius: borderRadius, 
								paddingLeft: horizontalPadding, 
								paddingRight: horizontalPadding, 
								paddingTop: verticalPadding, 
								paddingBottom: verticalPadding, 
								backgroundColor: bg, 
								border: `1px solid ${backgroundColor}`,
								opacity: opacity, 
								textDecoration: "none",
								color: text,
								fontSize: `${fontSize}px`,
								fontWeight: fontWeight,
								textTransform: textTransform,
								letterSpacing: `${letterSpacing}px`
							}}>					
							<RichText
								tagName="span"
								onChange={this.onChangeTitle}
								value={title}
							/>  
						</Button> )}
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
						<RangeControl
							label={__("Border Radius", "guteblock")}
							value={borderRadius}
							onChange={borderRadius =>
								setAttributes({ borderRadius })
							}
							min={0}
							max={60}
							step={1}
						/>
						<RangeControl
							label={__("Vertical Padding", "guteblock")}
							value={verticalPadding}
							onChange={verticalPadding =>
								setAttributes({ verticalPadding })
							}
							min={0}
							max={50}
							step={1}
						/>
						<RangeControl
							label={__("Horizontal Padding", "guteblock")}
							value={horizontalPadding}
							onChange={horizontalPadding =>
								setAttributes({ horizontalPadding })
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
						{(styleName !=2) &&
						(<PanelColorSettings
							title={__("Color Settings", "guteblock")}
							colorSettings={[
								{
									value: backgroundColor,
									onChange: this.onChangeBackgroundColor,
									label: __(
										"Button Color",
										"guteblock"
									)
								},
								{
									value: textColor,
									onChange: this.onChangeTextColor,
									label: __(
										"Button Text Color",
										"guteblock"
									)
								}						
							]}
						/>)}
						{(styleName ==2) &&
						(<PanelColorSettings
							title={__("Color Settings", "guteblock")}
							colorSettings={[
								{
									value: backgroundColor,
									onChange: this.onChangeBackgroundColor,
									label: __(
										"Button Color",
										"guteblock"
									)
								}						
							]}
						/>)}
						<PanelBody title={__("Button Link Options", "guteblock")}>
							<TextControl
								label={__("Link/ URL", "guteblock")}
								value= {link}
								onChange={link =>
									setAttributes({ link })
								}
								placeholder= "Paste URL"
							/>
							<ToggleControl
								label={__(
									"Open Link in New Tab",
									"guteblock"
								)}
								onChange={this.toggleToNewTab}
								checked={isNewTab}
							/>
						</PanelBody>
						<PanelBody title={__("Typography", "guteblock")}>
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
								value={fontWeight}
								options={ [
									{ label: 'Lighter', value: 'lighter' },
									{ label: 'Normal', value: 'normal' },
									{ label: 'Bold', value: 'bold' },
									{ label: '100', value: '100' },
									{ label: '200', value: '200' },
									{ label: '300', value: '300' },
									{ label: '400', value: '400' },
									{ label: '500', value: '500' },
									{ label: '600', value: '600' },
									{ label: '700', value: '700' },
									{ label: '800', value: '800' },
									{ label: '900', value: '900' },
								] }
								onChange={fontWeight =>
									setAttributes({ fontWeight })
								}
							/>
							<SelectControl
								label="Transform"
								value={textTransform}
								options={ [
									{ label: 'Normal', value: 'none' },
									{ label: 'Uppercase', value: 'uppercase' },
									{ label: 'Lowercase', value: 'lowercase' },
									{ label: 'Capitalize', value: 'capitalize' }
								] }
								onChange={textTransform =>
									setAttributes({ textTransform })
								}
							/>
							<RangeControl
								label={__("Letter Spacing", "guteblock")}
								value={letterSpacing}
								onChange={letterSpacing =>
									setAttributes({ letterSpacing })
								}
								min={-5}
								max={10}
								step={1}
							/>
						</PanelBody>
						<PanelBody title={__("Button Hover Settings", "guteblock")}>
							<PanelColorSettings
								title={__("Hover Colors", "guteblock")}
								colorSettings={[
									{
										value: hoverBackgroundColor,
										onChange: this.onChangeHoverBackgroundColor,
										label: __(
											"Button Hover Color",
											"guteblock"
										)
									},
									{
										value: hoverTextColor,
										onChange: this.onChangeHoverTextColor,
										label: __(
											"Button Hover Text Color",
											"guteblock"
										)
									}						
								]}
							/>
							<RangeControl
								label={__("Hover Opacity", "guteblock")}
								value={hoverOpacity}
								onChange={hoverOpacity =>
									setAttributes({ hoverOpacity })
								}
								min={0.1}
								max={1}
								step={0.1}
							/>
						</PanelBody>
					</PanelBody>
				</InspectorControls>				
				<div className={classes}>
					<ButtonGroup>
						{button}  
					</ButtonGroup>  
					<style
						dangerouslySetInnerHTML={{
							__html: [
								`.wp-block-guteblock-button-inner:hover { color: ${hoverTextColor} !important; background-color: ${hoverBackgroundColor} !important; border: 1px solid ${hoverBackgroundColor} !important; opacity: ${hoverOpacity} !important; }`
							].join("\n")
						}}
					></style>
				</div>
			</>
		);
	}
}

export default SomeClassName;