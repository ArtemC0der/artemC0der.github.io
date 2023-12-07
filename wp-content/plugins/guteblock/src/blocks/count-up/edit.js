import { Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
	RichText,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	PanelColorSettings
} from "@wordpress/editor";
import { PanelBody,ToggleControl, RangeControl } from "@wordpress/components";
import classnames from "classnames";

class CountUpEdit extends Component {
	onChangeTitle = title => {
		this.props.setAttributes({ title });
	};
	onChangePrefix = prefix => {
		this.props.setAttributes({ prefix });
	};
	onChangeNumber = number => {
		this.props.setAttributes({ number });
	};

	onChangeAlignment = alignment => {
		this.props.setAttributes({ alignment });
	};

	onChangeTitleColor = titlecolor => {
		this.props.setAttributes({ titlecolor });
	};
	onChangePrefixColor = prefixColor => {
		this.props.setAttributes({ prefixColor });
	};
	onChangeNumberColor = textColor => {
		this.props.setAttributes({ textColor });
	};


	toggleShowTitle = () => {
		this.props.setAttributes({
			showTitle: !this.props.attributes.showTitle
		});
	};
	toggleShowPrefix = () => {
		this.props.setAttributes({
			showPrefix: !this.props.attributes.showPrefix
		});
	};

	render() {
		const { className,
				attributes,
				setAttributes
			} = this.props;

		const { title, 
				prefix, 
				number, 
				alignment, 
				textColor, 
				prefixColor, 
				titlecolor, 
				showTitle, 
				showPrefix, 
				backgroundColor, 
				boxShadowColor, 
				borderRadius, 
				boxShadow, 
				titleFontSize, 
				prefixFontSize, 
				numberFontSize, 
				titlePadding, 
				counterPadding } = attributes;

		const classes = classnames(className, {
			[`align-${alignment}`]: alignment
		});


		let display;
		{showTitle ? display="block" : display="none"}
		let prefixDisplay;
		{showPrefix ? prefixDisplay="block" : prefixDisplay="none"}
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
					<PanelBody title={__("General Settings", "guteblock")} >
					<ToggleControl
							label={__("Show Title", "guteblock")}
							onChange={this.toggleShowTitle}
							checked={showTitle}
					/>
					<ToggleControl
							label={__("Show Counter", "guteblock")}
							onChange={this.toggleShowPrefix}
							checked={showPrefix}
					/>
					<RangeControl
							label={__("Title Padding ", "guteblock")}
							value={titlePadding}
							onChange={titlePadding =>
								setAttributes({ titlePadding })
							}
							min={0}
							max={35}
							step={1}
						/>
						<RangeControl
							label={__("Counter Padding ", "guteblock")}
							value={counterPadding}
							onChange={counterPadding =>
								setAttributes({ counterPadding })
							}
							min={0}
							max={35}
							step={1}
						/>
					
					
						
					</PanelBody >
					<PanelColorSettings
						title={__("Background Settings", "guteblock")}
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
							},
							{
								value: boxShadowColor,
								onChange: boxShadowColor => {
									setAttributes({ boxShadowColor });
								},
								label: __(
									"Box Shadow Color",
									"guteblock"
								)
							}
						]}
					>
						<RangeControl
							label={__("Border Radius", "guteblock")}
							value={borderRadius}
							onChange={borderRadius =>
								setAttributes({ borderRadius })
							}
							min={0}
							max={100}
							step={1}
						/>
						<RangeControl
							label={__("Box Shadow", "guteblock")}
							value={boxShadow}
							onChange={boxShadow =>
								setAttributes({ boxShadow })
							}
							min={0}
							max={5}
							step={1}
						/>
					</PanelColorSettings>
					<PanelBody  title={__("Font Size Settings", "guteblock")}>
						<RangeControl
							label={__("Title Font size ", "guteblock")}
							value={titleFontSize}
							onChange={titleFontSize =>
								setAttributes({ titleFontSize })
							}
							min={12}
							max={55}
							step={1}
						/>
						<RangeControl
							label={__("Prefix Font size ", "guteblock")}
							value={prefixFontSize}
							onChange={prefixFontSize =>
								setAttributes({ prefixFontSize })
							}
							min={12}
							max={55}
							step={1}
						/>
						<RangeControl
							label={__("Number Font size ", "guteblock")}
							value={numberFontSize}
							onChange={numberFontSize =>
								setAttributes({ numberFontSize })
							}
							min={12}
							max={55}
							step={1}
						/>
						</PanelBody>
					
					
						<PanelColorSettings
						title={__("Font Color Settings", "guteblock")}
						colorSettings={[
							{
								value: titlecolor,
								onChange: this.onChangeTitleColor,
								label: __(
									"Title Color",
									"guteblock"
								)
							},
							{
								value: prefixColor,
								onChange: this.onChangePrefixColor,
								label: __(
									"Prefix Color",
									"guteblock"
								)
							},
							{
								value: textColor,
								onChange: this.onChangeNumberColor,
								label: __(
									"Number Color",
									"guteblock"
								)
							}
						]}
					/>
				</InspectorControls>
				<div className={classes} 
					style={{
						backgroundColor:backgroundColor,
						borderRadius: borderRadius,
						boxShadow:`${boxShadow}px ${boxShadow}px ${boxShadow}px ${boxShadow}px ${boxShadowColor}`}}>
					<RichText
						style={{color:titlecolor, 
								display: display, 
								fontSize:`${titleFontSize}px`, 
								padding:`${titlePadding}px 0px`}}
						onChange={this.onChangeTitle}
						value={title}
						tagName={"h2"}
						placeholder={__("Title", "guteblock")}
					/>
					
					<div className="wp-block-guteblock-count-up__container" 
							style={{display:prefixDisplay, 
									padding:`${counterPadding}px 0px`}} >
						<RichText
							className={
								"wp-block-guteblock-count-up__prefix"
							}
							style={{color:prefixColor, 
									fontSize:`${prefixFontSize}px`}}
							tagName="h3"
							onChange={this.onChangePrefix}
							value={prefix}
							placeholder={__("Prefix ", "guteblock")}
						/>
						<RichText
							className={
								"wp-block-guteblock-count-up__number"
							}
							style={{color:textColor, 
									fontSize:`${numberFontSize}px`}}
							tagName="h3"
							onChange={this.onChangeNumber}
							value={number}
							placeholder={__("Number", "guteblock")}
						/>
					</div>
				</div>
		
			</>
		);
	}
}

export default CountUpEdit;
