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
	Dashicon,
	ToggleControl,
	PanelBody,
	SelectControl,
	RangeControl
} from "@wordpress/components";
import classnames from 'classnames';

class InlineNotice extends Component {	
	
	toggleCloseButton = () => {
		this.props.setAttributes({
			showCloseButton: !this.props.attributes.showCloseButton
		});
	};

	onChangeMainBackgroundColor = mainBackgroundColor => {
		this.props.setAttributes({ mainBackgroundColor });
	};

	onChangeBackgroundColor = backgroundColor => {
		this.props.setAttributes({ backgroundColor });
	};

	onChangeTitleColor = titleColor => {
		this.props.setAttributes({ titleColor });
	};

	onChangeContainerColor = containerColor => {
		this.props.setAttributes({ containerColor });
	};

	onChangeContentColor = contentColor => {
		this.props.setAttributes({ contentColor });
	};

	onChangeBackgroundColor = backgroundColor => {
		this.props.setAttributes({ backgroundColor });
	};

	onChangeTitle = title => {
		this.props.setAttributes({ title });
	};

	onChangeContent = content => {
		this.props.setAttributes({ content });
	};

	onChangeAlignment = alignment => {
		this.props.setAttributes({ alignment });
	};
	
	render() {
		const { className, attributes, setAttributes } = this.props;
		const {
			mainBackgroundColor,
			verticalPadding,
			backgroundColor,
			outerContainerWidth,
			title,
			titleFontSize,
			titleTextTransform,
			titleFontWeight,
			verticalTitlePadding,
			horizontalTitlePadding,
			titleColor,
			borderWidth,
			containerColor,
			content,
			contentFontSize,
			contentLineHeight,
			verticalContentPadding,
			horizontalContentPadding,
			contentColor,
			alignment,
			showCloseButton
		} = attributes;

		const classes = classnames(className, {
			[`align-${alignment}`]: alignment
		})
		
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
							label={__(
								"Enable Close Button",
								"guteblock"
							)}
							onChange={this.toggleCloseButton}
							checked={showCloseButton}
						/>
					<PanelColorSettings
						title={__(
							"Color Settings",
							"guteblock"
						)}
						colorSettings={[
							{
								value: mainBackgroundColor,
								onChange: this.onChangeMainBackgroundColor,
								label: __(
									"Background Color",
									"guteblock"
								)
							},
							{
								value: backgroundColor,
								onChange: this.onChangeBackgroundColor,
								label: __(
									"Outer Container Color",
									"guteblock"
								)
							},
							{
								value: containerColor,
								onChange: this.onChangeContainerColor,
								label: __(
									"Inner Container Color",
									"guteblock"
								)
							},
							{
								value: titleColor,
								onChange: this.onChangeTitleColor,
								label: __(
									"Title Color",
									"guteblock"
								)
							},
							{
								value: contentColor,
								onChange: this.onChangeContentColor,
								label: __(
									"Description Color",
									"guteblock"
								)
							}
						]}
					/>
					<RangeControl
						label={__(
							"Border Width",
							"guteblock"
						)}
						value={borderWidth}
						onChange={borderWidth =>
							setAttributes({ borderWidth })
						}
						min={0.6}
						max={5}
						step={0.1}
					/>
					<RangeControl
						label={__(
							"Vertical Padding(px)",
							"guteblock"
						)}
						value={verticalPadding}
						onChange={verticalPadding =>
							setAttributes({ verticalPadding })
						}
						min={0}
						max={250}
						step={1}
					/>
					</PanelBody>
					<PanelBody title={__("Container Settings", "guteblock")}>
						<RangeControl
							label={__(
								"Container Width(%)",
								"guteblock"
							)}
							value={outerContainerWidth}
							onChange={outerContainerWidth =>
								setAttributes({ outerContainerWidth })
							}
							min={50}
							max={100}
							step={1}
						/>
						<PanelBody title={__("Title Settings", "guteblock")}>
							<RangeControl
								label={__(
									"Title Font Size(px)",
									"guteblock"
								)}
								value={titleFontSize}
								onChange={titleFontSize =>
									setAttributes({ titleFontSize })
								}
								min={30}
								max={50}
								step={1}
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
							<SelectControl
								label="Title Font Weight"
								value={titleFontWeight}
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
								onChange={titleFontWeight =>
									setAttributes({ titleFontWeight })
								}
							/>
							<RangeControl
								label={__(
									"Vertical Title Padding(px)",
									"guteblock"
								)}
								value={verticalTitlePadding}
								onChange={verticalTitlePadding =>
									setAttributes({ verticalTitlePadding })
								}
								min={0}
								max={50}
								step={1}
							/>
							<RangeControl
							label={__(
								"horizontal Title Padding(px)",
								"guteblock"
							)}
							value={horizontalTitlePadding}
							onChange={horizontalTitlePadding =>
								setAttributes({ horizontalTitlePadding })
							}
							min={0}
							max={50}
							step={1}
						/>
						</PanelBody>
						<PanelBody title={__("Content Settings", "guteblock")}>
							<RangeControl
									label={__(
										"Content Font Size(px)",
										"guteblock"
									)}
									value={contentFontSize}
									onChange={contentFontSize =>
										setAttributes({ contentFontSize })
									}
									min={15}
									max={50}
									step={1}
							/>
							<RangeControl
									label={__(
										"Content Line Height(px)",
										"guteblock"
									)}
									value={contentLineHeight}
									onChange={contentLineHeight =>
										setAttributes({ contentLineHeight })
									}
									min={15}
									max={50}
									step={1}
							/>
							<RangeControl
								label={__(
									"Vertical Content Padding(px)",
									"guteblock"
								)}
								value={verticalContentPadding}
								onChange={verticalContentPadding =>
									setAttributes({ verticalContentPadding })
								}
								min={0}
								max={50}
								step={1}
							/>
							<RangeControl
								label={__(
									"horizontal Content Padding(px)",
									"guteblock"
								)}
								value={horizontalContentPadding}
								onChange={horizontalContentPadding =>
									setAttributes({ horizontalContentPadding })
								}
								min={0}
								max={50}
								step={1}
							/>
						</PanelBody>
					</PanelBody>
				</InspectorControls>				

				<div className={classes}
				style={{
					backgroundColor: mainBackgroundColor,
					paddingTop: `${verticalPadding}px`,
					paddingBottom: `${verticalPadding}px`
				}}>
					<div
						className={"wp-block-guteblock-inline-notice__outer_container"}
						style={{
							alignment : alignment,
							backgroundColor: backgroundColor,
							width: `${outerContainerWidth}%`
						}}
					>
						<div
							className={"wp-block-guteblock-inline-notice__inner_container"}
							style={{
								backgroundColor: backgroundColor
							}}
						>
							<RichText
								className={
								"wp-block-guteblock-inline-notice__title"
								}
								onChange={this.onChangeTitle}
								style={{
									color: titleColor,
									textTransform: titleTextTransform,
									fontWeight: titleFontWeight,
									fontSize: `${titleFontSize}px`,
									paddingTop: `${verticalTitlePadding}px`,
									paddingBottom: `${verticalTitlePadding}px`,
									paddingLeft: `${horizontalTitlePadding}px`,
									paddingRight: `${horizontalTitlePadding}px`
								}}
								value={title}
								tagName="h4"
								placeholder={__(
									"Title here...",
									"guteblock"
								)}						
							/>
							{showCloseButton && (
								<div className="wp-block-guteblock-inline-notice__closeBtn">
									<Dashicon
										icon="dismiss"
										size={32}
										style={{ fill: titleColor }}
									/>
								</div>
							)}
						</div>
					<div
						className={"wp-block-guteblock-inline-notice__inner_content"}
						style={{
							backgroundColor: containerColor,
							margin: `${0}px ${borderWidth}px ${borderWidth}px ${borderWidth}px`
						}}
					>
							<RichText
								className={
								"wp-block-guteblock-inline-notice__content"
								}
								style={{
									color: contentColor,
									fontSize: contentFontSize,
									lineHeight: `${contentLineHeight}px`,
									padding: `${verticalContentPadding}px ${horizontalContentPadding}px`
								}}
								tagName="p"
								onChange={this.onChangeContent}
								value={content}
								placeholder={__(
									"Description here...",
									"guteblock"
								)}						
							/>
					</div>
				</div>
			</div>
			</>
		);
	}
}

export default InlineNotice;