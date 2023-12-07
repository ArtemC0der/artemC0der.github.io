import { Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	PanelColorSettings,
	MediaUploadCheck,
	MediaUpload
} from "@wordpress/editor";
import {
	Tooltip,
	Dashicon,
	TabPanel,
	PanelBody,
	PanelRow,
	TextControl,
	Toolbar,
	RangeControl,
	ToggleControl,
	Dropdown,
	Button,
	IconButton,
	SelectControl
} from "@wordpress/components";
import classnames from 'classnames';

class AccordionEdit extends Component {
	state = {
		status: null,
		selectedAccordion: 0,
	};

	componentDidMount() {
		this.setState({
			status: true
		});
	}
	onChangeTitle = title => {
		this.props.setAttributes({ title });
	};

	onChangeContent = content => {
		this.props.setAttributes({ content });
	};

	onToggleAccordion = () => {
		this.setState({
			status: !this.state.status
		});
	};

	onChangeAlignment = alignment => {
		this.props.setAttributes({ alignment });
	};
	//adding a new accordion
	addNewAccordion = () => {
		const { setAttributes, attributes } = this.props;
		const { accordions } = attributes;
		setAttributes({
			accordions: [
				...accordions,
				{
					title: "",
					content: "",
					iconImage: "",
					isIconImage: false,
					controlIcon: "",
					controllcontent: "",
					status: false,
					innerTitle: "",
					isInnerTitleShown: false,
					longContentWithSplit: "",
					islongContentWithSplit: false
				}
			]
		});
		this.setState({
			selectedAccordion: accordions.length
		});
	};

	//upadting accordion
	updateAccordion = (type, value, index) => {
		const { setAttributes, attributes } = this.props;
		const { accordions } = attributes;
		let new_accordions = [...accordions];
		new_accordions[index][type] = value;
		setAttributes({ accordions: new_accordions });
	};

	//removing a accordion
	removeAccordion = (e, index) => {
		e.preventDefault();
		const { setAttributes, attributes } = this.props;
		const { accordions } = attributes;

		setAttributes({
			accordions: [
				...accordions.slice(0, index),
				...accordions.slice(index + 1)
			]
		});
	};

	//conver to rgb
	hexToRgb = hex => {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16)
			  }
			: null;
	};

	//main Container
	onChangeMainBackgroundColor = conatinerBgColor => {
		var bgColor = this.hexToRgb(conatinerBgColor);
		const NewVal = {
			r: bgColor.r,
			g: bgColor.g,
			b: bgColor.b,
			a: this.props.attributes.conatinerBgColor.a,
			realColor: conatinerBgColor
		};
		this.props.setAttributes({ conatinerBgColor: NewVal });
	};
	toggleConatinerMarginEqualler = () => {
		const newval = {
			top: this.props.attributes.containerMargin.top,
			bottom: this.props.attributes.containerMargin.top,
			isSameNeeded: !this.props.attributes.containerMargin.isSameNeeded
		};
		this.props.setAttributes({
			containerMargin: newval
		});
	};

	toggleConatinerPaddingEqualler = () => {
		const newval = {
			top: this.props.attributes.containerPadding.top,
			bottom: this.props.attributes.containerPadding.bottom,
			left: this.props.attributes.containerPadding.left,
			right: this.props.attributes.containerPadding.right,
			isEqualPadding: !this.props.attributes.containerPadding
				.isEqualPadding
		};
		this.props.setAttributes({
			containerPadding: newval
		});
	};
	//inner conatiner
	onChangeInnerConatinerBackgroundColor = IconatinerBgColor => {
		var bgColor = this.hexToRgb(IconatinerBgColor);
		const NewVal = {
			r: bgColor.r,
			g: bgColor.g,
			b: bgColor.b,
			a: this.props.attributes.IconatinerBgColor.a,
			realColor: IconatinerBgColor
		};
		this.props.setAttributes({ IconatinerBgColor: NewVal });
	};

	toggleIConatinerMarginEqualler = () => {
		const newval = {
			top: this.props.attributes.IcontainerMargin.top,
			bottom: this.props.attributes.IcontainerMargin.top,
			isSameNeeded: !this.props.attributes.IcontainerMargin
				.isSameNeeded
		};
		this.props.setAttributes({
			IcontainerMargin: newval
		});
	};

	toggleIConatinerPaddingEqualler = () => {
		const newval = {
			top: this.props.attributes.IcontainerPadding.top,
			bottom: this.props.attributes.IcontainerPadding.top,
			left: this.props.attributes.IcontainerPadding.top,
			right: this.props.attributes.IcontainerPadding.top,
			isEqualPadding: !this.props.attributes.IcontainerPadding
				.isEqualPadding
		};
		this.props.setAttributes({
			IcontainerPadding: newval
		});
	};

	onChangeIConatinerBoxShadowColor = theNewVal => {
		const newVal = {
			xoffset: this.props.attributes.IConatinerBoxShadow.xoffset,
			yOffset: this.props.attributes.IConatinerBoxShadow.yOffset,
			Blur: this.props.attributes.IConatinerBoxShadow.Blur,
			spreadShadow: this.props.attributes.IConatinerBoxShadow
				.spreadShadow,
			colorShadow: theNewVal,
			isNeeded: this.props.attributes.IConatinerBoxShadow.isNeeded
		};
		this.props.setAttributes({
			IConatinerBoxShadow: newVal
		});
	};

	toggleBoxShadowIContainer = () => {
		const newVal = {
			xoffset: this.props.attributes.IConatinerBoxShadow.xoffset,
			yOffset: this.props.attributes.IConatinerBoxShadow.yOffset,
			Blur: this.props.attributes.IConatinerBoxShadow.Blur,
			spreadShadow: this.props.attributes.IConatinerBoxShadow
				.spreadShadow,
			colorShadow: this.props.attributes.IConatinerBoxShadow
				.colorShadow,
			isNeeded: !this.props.attributes.IConatinerBoxShadow.isNeeded
		};
		this.props.setAttributes({
			IConatinerBoxShadow: newVal
		});
	};
	//accordion single conatiner
	toggleAConatinerPaddingEqualler = () => {
		const newval = {
			top: this.props.attributes.AcontainerPadding.top,
			bottom: this.props.attributes.AcontainerPadding.top,
			left: this.props.attributes.AcontainerPadding.top,
			right: this.props.attributes.AcontainerPadding.top,
			isEqualPadding: !this.props.attributes.AcontainerPadding
				.isEqualPadding
		};
		this.props.setAttributes({
			AcontainerPadding: newval
		});
	};
	toggleAConatinerMarginEqualler = () => {
		const newval = {
			top: this.props.attributes.AcontainerMargin.top,
			bottom: this.props.attributes.AcontainerMargin.top,
			isSameNeeded: !this.props.attributes.AcontainerMargin
				.isSameNeeded
		};
		this.props.setAttributes({
			AcontainerMargin: newval
		});
	};
	onChangeAConatinerBackgroundColor = AconatinerBgColor => {
		console.log("called", AconatinerBgColor);

		var bgColor = this.hexToRgb(AconatinerBgColor);
		const NewVal = {
			r: bgColor.r,
			g: bgColor.g,
			b: bgColor.b,
			a: this.props.attributes.conatinerBgColor.a,
			realColor: AconatinerBgColor
		};
		this.props.setAttributes({ AconatinerBgColor: NewVal });
	};
	onChangeAConatinerBoxShadowColor = theNewVal => {
		const newVal = {
			xoffset: this.props.attributes.AConatinerBoxShadow.xoffset,
			yOffset: this.props.attributes.AConatinerBoxShadow.yOffset,
			Blur: this.props.attributes.AConatinerBoxShadow.Blur,
			spreadShadow: this.props.attributes.AConatinerBoxShadow
				.spreadShadow,
			colorShadow: theNewVal,
			isNeeded: this.props.attributes.AConatinerBoxShadow.isNeeded
		};
		this.props.setAttributes({
			AConatinerBoxShadow: newVal
		});
	};
	toggleBoxShadowAContainer = () => {
		const newVal = {
			xoffset: this.props.attributes.AConatinerBoxShadow.xoffset,
			yOffset: this.props.attributes.AConatinerBoxShadow.yOffset,
			Blur: this.props.attributes.AConatinerBoxShadow.Blur,
			spreadShadow: this.props.attributes.AConatinerBoxShadow
				.spreadShadow,
			colorShadow: this.props.attributes.AConatinerBoxShadow
				.colorShadow,
			isNeeded: !this.props.attributes.AConatinerBoxShadow.isNeeded
		};
		this.props.setAttributes({
			AConatinerBoxShadow: newVal
		});
	};
	onChangeAConatinerSeparatorColor = AcontainerSeparatorBgColor => {
		this.props.setAttributes({ AcontainerSeparatorBgColor });
	};
	//content conatiner functions
	toggleCcontainerPaddingEqualler = () => {
		const newval = {
			top: this.props.attributes.CcontainerPadding.top,
			bottom: this.props.attributes.CcontainerPadding.top,
			left: this.props.attributes.CcontainerPadding.top,
			right: this.props.attributes.CcontainerPadding.top,
			isEqualPadding: !this.props.attributes.CcontainerPadding
				.isEqualPadding
		};
		this.props.setAttributes({
			CcontainerPadding: newval
		});
	};
	toggleCcontainerMarginEqualler = () => {
		const newval = {
			top: this.props.attributes.CcontainerMargin.top,
			bottom: this.props.attributes.CcontainerMargin.top,
			isSameNeeded: !this.props.attributes.CcontainerMargin
				.isSameNeeded
		};
		this.props.setAttributes({
			CcontainerMargin: newval
		});
	};
	toggleCcontainerContentSplitter = () => {
		this.props.setAttributes({
			CcontainerSplitIsNeeded: !this.props.attributes
				.CcontainerSplitIsNeeded
		});
	};
	//Ihead
	toggleIHeadingPaddingEqualler = () => {
		const newval = {
			top: this.props.attributes.IHeadingPadding.top,
			bottom: this.props.attributes.IHeadingPadding.top,
			left: this.props.attributes.IHeadingPadding.top,
			right: this.props.attributes.IHeadingPadding.top,
			isEqualPadding: !this.props.attributes.IHeadingPadding
				.isEqualPadding
		};
		this.props.setAttributes({
			IHeadingPadding: newval
		});
	};
	toggleIHeadingMarginEqualler = () => {
		const newval = {
			top: this.props.attributes.IHeadingMargin.top,
			bottom: this.props.attributes.IHeadingMargin.top,
			isSameNeeded: !this.props.attributes.IHeadingMargin.isSameNeeded
		};
		this.props.setAttributes({
			IHeadingMargin: newval
		});
	};
	onChangeIHeadingFontSetupColor = newColor => {
		const newVal = {
			size: this.props.attributes.IHeadingFontSetup.size,
			weight: this.props.attributes.IHeadingFontSetup.weight,
			color: newColor,
			style: this.props.attributes.IHeadingFontSetup.style,
			align: this.props.attributes.IHeadingFontSetup.align,
			lSpace: this.props.attributes.IHeadingFontSetup.lSpace
		};
		this.props.setAttributes({
			IHeadingFontSetup: newVal
		});
	};

	//ATITLE
	toggleATitlePaddingEqualler = () => {
		const newval = {
			top: this.props.attributes.ATitlePadding.top,
			bottom: this.props.attributes.ATitlePadding.top,
			left: this.props.attributes.ATitlePadding.top,
			right: this.props.attributes.ATitlePadding.top,
			isEqualPadding: !this.props.attributes.ATitlePadding
				.isEqualPadding
		};
		this.props.setAttributes({
			ATitlePadding: newval
		});
	};
	toggleATitleMarginEqualler = () => {
		const newval = {
			top: this.props.attributes.ATitleMargin.top,
			bottom: this.props.attributes.ATitleMargin.top,
			isSameNeeded: !this.props.attributes.ATitleMargin.isSameNeeded
		};
		this.props.setAttributes({
			ATitleMargin: newval
		});
	};
	onChangeATitleFontSetupColor = newColor => {
		const newVal = {
			size: this.props.attributes.ATitleFontSetup.size,
			weight: this.props.attributes.ATitleFontSetup.weight,
			color: newColor,
			style: this.props.attributes.ATitleFontSetup.style,
			align: this.props.attributes.ATitleFontSetup.align,
			lSpace: this.props.attributes.ATitleFontSetup.lSpace
		};
		this.props.setAttributes({
			ATitleFontSetup: newVal
		});
	};
	//center title in heading
	updateACTitleFontSetup = (type, value) => {
		const { setAttributes, attributes } = this.props;
		const { ACTitleFontSetup } = attributes;
		let new_ACTitleFontSetups = { ...ACTitleFontSetup };
		new_ACTitleFontSetups[type] = value;
		setAttributes({ ACTitleFontSetup: new_ACTitleFontSetups });
	};

	//content font setup
	updateContentFontSetup = (type, value) => {
		const { setAttributes, attributes } = this.props;
		const { ContentFontSetup } = attributes;
		let new_ContentFontSetup = { ...ContentFontSetup };
		new_ContentFontSetup[type] = value;
		setAttributes({ ContentFontSetup: new_ContentFontSetup });
	};
	//lengthy content font setup
	updatelengthyContentFontSetup = (type, value) => {
		const { setAttributes, attributes } = this.props;
		const { lengthyContentFontSetup } = attributes;
		let new_lengthyContentFontSetup = { ...lengthyContentFontSetup };
		new_lengthyContentFontSetup[type] = value;
		setAttributes({
			lengthyContentFontSetup: new_lengthyContentFontSetup
		});
	};
	//additional content setup
	updateAdditionalContentFontSetup = (type, value) => {
		const { setAttributes, attributes } = this.props;
		const { AdditionalContentFontSetup } = attributes;
		let new_AdditionalContentFontSetup = {
			...AdditionalContentFontSetup
		};
		new_AdditionalContentFontSetup[type] = value;
		setAttributes({
			AdditionalContentFontSetup: new_AdditionalContentFontSetup
		});
	};

	onChangeiconImageBgSetupd = IconImageBgColor => {
		var bgColor = this.hexToRgb(IconImageBgColor);
		const NewVal = {
			r: bgColor.r,
			g: bgColor.g,
			b: bgColor.b,
			a: this.props.attributes.iconImageBgSetup.a,
			realColor: IconImageBgColor
		};
		this.props.setAttributes({ iconImageBgSetup: NewVal });
	};
	updateiconImageSetup = (type, value) => {
		const { setAttributes, attributes } = this.props;
		const { iconImageSetup } = attributes;
		let new_iconImageSetup = {
			...iconImageSetup
		};
		new_iconImageSetup[type] = value;
		setAttributes({
			iconImageSetup: new_iconImageSetup
		});
	};
	updatetitleSepratorSettings = (type, value) => {
		const { setAttributes, attributes } = this.props;
		const { titleSepratorSettings } = attributes;
		let new_titleSepratorSettings = { ...titleSepratorSettings };
		new_titleSepratorSettings[type] = value;
		setAttributes({ titleSepratorSettings: new_titleSepratorSettings });
	};
	toggleisTitleImageIsneeded = () => {
		this.props.setAttributes({
			isTitleImageIsneeded: !this.props.attributes.isTitleImageIsneeded
		});
	};
	updateiconNormalSetup = (type, value) => {
		const { setAttributes, attributes } = this.props;
		const { iconNormalSetup } = attributes;
		let new_iconNormalSetup = { ...iconNormalSetup };
		new_iconNormalSetup[type] = value;
		setAttributes({ iconNormalSetup: new_iconNormalSetup });
	};
	updateiconBelowSetup = (type, value) => {
		const { setAttributes, attributes } = this.props;
		const { iconBelowSetup } = attributes;
		let new_iconBelowSetup = { ...iconBelowSetup };
		new_iconBelowSetup[type] = value;
		setAttributes({ iconBelowSetup: new_iconBelowSetup });
	};
	render() {
				const { className, attributes, setAttributes } = this.props;
				const {
					alignment,
					accordions,
					conatinerBgColor,
					containerPadding,
					containerMargin,
					IConatinerWidth,
					IconatinerBgColor,
					IcontainerPadding,
					IcontainerMargin,
					IcontainerBorderRadius,
					IConatinerBoxShadow,
					AconatinerBgColor,
					AcontainerPadding,
					AcontainerMargin,
					AConatinerBoxShadow,
					AcontainerBorderRadius,
					AcontainerSepartorWidth,
					AcontainerSeparatorBgColor,
					AcontainerSeparatorBgOpacity,
					AconatinerSeparatorIsNeeded,
					AconatinerSeparatorheight,
					CcontainerPadding,
					CcontainerMargin,
					CcontainerSplitIsNeeded,
					IHeading,
					IHeadingPadding,
					IHeadingMargin,
					isIHeadShown,
					IHeadingFontSetup,
					ATitleMargin,
					ATitlePadding,
					ATitleFontSetup,
					ACTitleIsShown,
					ACTitleFontSetup,
					ContentFontSetup,
					lengthyContentFontSetup,
					AdditionalContentFontSetup,
					iconImageBgSetup,
					iconImageSetup,
					titleSepratorSettings,
					isTitleImageIsneeded,
					iconNormalSetup,
					activateIconPosToBelow,
					iconBelowSetup
				} = attributes;

				const classes = classnames(className, {
					[`align-${alignment}`]: alignment,
					[`gb-accordion-open`]: this.state.status
				});

				const isStyle = RegExp(/is-style-/);
				const styleName = isStyle.test(attributes.className)
					? attributes.className.replace(isStyle, "")
					: null;
				
				let EnableWidth = "Enable Separator";
				if (AconatinerSeparatorIsNeeded) {
					EnableWidth = "Hide Separtor";
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
							<TabPanel
								className="wp-block-guteblock-accordion Tab-main-controll"
								activeClass="wp-block-guteblock-accordion Tab-main-controll active-class"
								tabs={[
									{
										name: "Container",
										title: (
											<div className="wp-block-guteblock-accordion svgHolder">
												<svg
													viewBox="0 0 24 24"
													x={0}
													y={0}
													height="40"
													width="40"
												>
													<switch>
														<g>
															<linearGradient
																id="prefix__a"
																gradientUnits="userSpaceOnUse"
																x1={
																	20.674
																}
																y1={
																	4.188
																}
																x2={
																	6.269
																}
																y2={
																	17.66
																}
															>
																<stop
																	offset={
																		0
																	}
																	stopColor="#eb7d31"
																/>
																<stop
																	offset={
																		1
																	}
																	stopColor="#ee576f"
																/>
															</linearGradient>
															<path
																fill="url(#prefix__a)"
																d="M17.2 13.5h-.3v2.6H8.2V7.5h2.6v-.3c0-1 .3-2 .7-2.9H5v15.1h15.1v-6.5c-.9.4-1.9.6-2.9.6z"
															/>
															<linearGradient
																id="prefix__b"
																gradientUnits="userSpaceOnUse"
																x1={
																	19.157
																}
																y1={
																	3.893
																}
																x2={
																	6.735
																}
																y2={
																	20.922
																}
															>
																<stop
																	offset={
																		0
																	}
																	stopColor="#eb7d31"
																/>
																<stop
																	offset={
																		1
																	}
																	stopColor="#ee576f"
																/>
															</linearGradient>
															<path
																fill="url(#prefix__b)"
																d="M16.8 12.6h-1.1c-.5 0-.9-.4-.9-.9v-.3-.1h-.1l-.2.2c-.3.3-.9.3-1.2 0l-.8-.8c-.2-.2-.2-.4-.2-.6 0-.2.1-.4.3-.6l.2-.2v-.1h-.4c-.5 0-.9-.4-.9-.9v-1c0-.5.4-.9.9-.9h.4v-.1l-.2-.2c-.2-.2-.2-.4-.2-.6 0-.2.1-.4.3-.6l.8-.8c.3-.3.9-.3 1.2 0l.2.2h.1V4c0-.5.4-.9.9-.9H17c.5 0 .9.4.9.9v.4h.1v-.3c.3-.3.9-.3 1.2 0l.8.8c.2.2.2.4.2.6 0 .2-.1.4-.3.6l-.2.2v.1h.4c.5 0 .9.4.9.9v1.1c0 .5-.4.9-.9.9h-.3-.1v.1l.3.2c.2.2.2.4.2.6 0 .2-.1.4-.2.6l-.8.8c-.2.2-.4.2-.6.2-.2 0-.4-.1-.6-.2l-.2-.2h-.1v.4c0 .4-.4.8-.9.8zm-2-1.9c.1 0 .2 0 .3.1.3.1.4.3.4.6v.3c0 .1.1.3.3.3h1.1c.1 0 .3-.1.3-.3v-.3c0-.3.2-.5.4-.6.3-.1.5-.1.7.1l.2.2c.1.1.3.1.4 0l.8-.8s.1-.1.1-.2 0-.1-.1-.2l-.2-.2c-.2-.2-.2-.5-.1-.7.1-.3.3-.4.6-.4h.3c.1 0 .3-.1.3-.3v-1c0-.1-.1-.3-.3-.3H20c-.3 0-.5-.2-.6-.4-.1-.3 0-.5.1-.7l.2-.2s.1-.1.1-.2 0-.1-.1-.2l-.8-.8c-.1-.1-.3-.1-.4 0l-.2.2c-.3.2-.5.3-.8.2-.3-.1-.4-.3-.4-.6V4c0-.1-.1-.3-.3-.3h-1.1c-.1 0-.3.1-.3.3v.3c0 .3-.2.5-.4.6-.3.1-.5 0-.7-.1l-.2-.2c-.1-.1-.3-.1-.4 0l-.7.7s-.1.1-.1.2 0 .1.1.2l.2.2c.2.2.2.5.1.7-.1.3-.3.4-.6.4h-.3c-.1 0-.3.1-.3.3v1.1c0 .1.1.3.3.3h.3c.3 0 .5.2.6.4.1.3 0 .5-.1.7l-.2.2s-.1.1-.1.2 0 .1.1.2l.8.8c.1.1.3.1.4 0l.2-.2c.1-.2.2-.3.4-.3z"
															/>
															<linearGradient
																id="prefix__c"
																gradientUnits="userSpaceOnUse"
																x1={
																	19.156
																}
																y1={
																	3.893
																}
																x2={
																	6.735
																}
																y2={
																	20.922
																}
															>
																<stop
																	offset={
																		0
																	}
																	stopColor="#eb7d31"
																/>
																<stop
																	offset={
																		1
																	}
																	stopColor="#ee576f"
																/>
															</linearGradient>
															<path
																fill="url(#prefix__c)"
																d="M16.3 10.2c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zm0-4.1c-1 0-1.7.8-1.7 1.7s.8 1.7 1.7 1.7S18 8.8 18 7.8s-.8-1.7-1.7-1.7z"
															/>
														</g>
													</switch>
												</svg>
												<h5>Container</h5>
											</div>
										),
										className:
											"wp-block-guteblock-accordion tab-one-main"
									},
									{
										name: "Contents",
										title: (
											<div className="wp-block-guteblock-accordion svgHolder">
												<svg
													viewBox="0 0 24 24"
													x={0}
													y={0}
													height="40"
													width="40"
												>
													<switch>
														<g>
															<linearGradient
																id="prefix__a"
																gradientUnits="userSpaceOnUse"
																x1={
																	18.635
																}
																y1={
																	3.732
																}
																x2={
																	6.931
																}
																y2={
																	19.777
																}
															>
																<stop
																	offset={
																		0
																	}
																	stopColor="#eb7d31"
																/>
																<stop
																	offset={
																		1
																	}
																	stopColor="#ee576f"
																/>
															</linearGradient>
															<path
																fill="url(#prefix__a)"
																d="M16.4 11.9h-1c-.4 0-.8-.4-.8-.8v-.3-.1h-.1l-.2.3c-.3.3-.8.3-1.1 0l-.7-.7c-.2-.2-.2-.4-.2-.6 0-.2.1-.4.2-.6l.2-.2v-.1h-.4c-.4 0-.8-.4-.8-.8V7c0-.4.4-.8.8-.8h.4v-.1l-.2-.2c-.2-.2-.2-.4-.2-.6 0-.2.1-.4.2-.6l.7-.7c.3-.3.8-.3 1.1 0l.2.2h.1v-.4c0-.4.4-.8.8-.8h1c.4 0 .8.4.8.8v.4h.1l.2-.2c.3-.3.8-.3 1.1 0l.7.7c.2.2.2.4.2.6 0 .2-.1.4-.2.6l-.1.1v.1h.4c.4 0 .8.4.8.8v1c0 .4-.4.8-.8.8h-.3-.1v.1l.2.2c.2.2.2.4.2.6 0 .2-.1.4-.2.6l-.7.8c-.2.2-.4.2-.6.2-.2 0-.4-.1-.6-.2l-.2-.2h-.1v.4c0 .3-.3.7-.8.7zm-1.9-1.7h.2c.2.1.4.3.4.6v.3c0 .1.1.2.2.2h1c.1 0 .2-.1.2-.2v-.3c0-.3.1-.5.4-.6.2-.1.5 0 .7.1l.2.2c.1.1.2.1.3 0l.9-.7s.1-.1.1-.2 0-.1-.1-.2l-.2-.2c-.2-.2-.2-.4-.1-.7.1-.2.3-.4.6-.4h.3c.1 0 .2-.1.2-.2v-1c0-.1-.1-.2-.2-.2h-.3c-.3 0-.5-.1-.6-.4-.1-.2 0-.5.1-.7l.2-.2s.1-.1.1-.2 0-.1-.1-.2l-.7-.7c-.1-.1-.2-.1-.3 0l-.2.2c-.2.2-.4.2-.7.1-.2-.1-.4-.3-.4-.6v-.2c0-.1-.1-.2-.2-.2h-1c-.1 0-.2.1-.2.2v.3c0 .3-.1.5-.4.6-.2.1-.5 0-.7-.1l-.2-.2c-.1-.1-.2-.1-.3 0l-.7.7s-.1.1-.1.2 0 .1.1.2v.1c.2.2.2.4.1.7-.1.2-.3.4-.6.4h-.3c-.1 0-.2.1-.2.2v1c0 .1.1.2.2.2h.3c.3 0 .5.1.6.4.1.2 0 .5-.1.7l-.2.2s-.1.1-.1.2 0 .1.1.2l.7.7c.1.1.2.1.3 0l.2-.2c.2-.1.4-.1.5-.1z"
															/>
															<linearGradient
																id="prefix__b"
																gradientUnits="userSpaceOnUse"
																x1={
																	18.635
																}
																y1={
																	3.732
																}
																x2={
																	6.931
																}
																y2={
																	19.777
																}
															>
																<stop
																	offset={
																		0
																	}
																	stopColor="#eb7d31"
																/>
																<stop
																	offset={
																		1
																	}
																	stopColor="#ee576f"
																/>
															</linearGradient>
															<path
																fill="url(#prefix__b)"
																d="M15.9 9.6c-1.2 0-2.2-1-2.2-2.2s1-2.2 2.2-2.2 2.2 1 2.2 2.2-1 2.2-2.2 2.2zm0-3.8c-.9 0-1.6.7-1.6 1.6S15 9 15.9 9c.9 0 1.6-.7 1.6-1.6s-.7-1.6-1.6-1.6z"
															/>
															<linearGradient
																id="prefix__c"
																gradientUnits="userSpaceOnUse"
																x1={
																	19.378
																}
																y1={
																	3.792
																}
																x2={
																	6.614
																}
																y2={
																	17.359
																}
															>
																<stop
																	offset={
																		0
																	}
																	stopColor="#eb7d31"
																/>
																<stop
																	offset={
																		1
																	}
																	stopColor="#ee576f"
																/>
															</linearGradient>
															<path
																fill="url(#prefix__c)"
																d="M13.8 15c-.6 1-1.5 1.6-2.8 1.6-1.1 0-1.9-.3-2.6-1.1-.7-.7-1-1.6-1-2.7s.3-2 1-2.7c.6-.7 1.4-1 2.5-1-.1-.4-.1-.8-.1-1.2 0-.7.1-1.3.3-1.9H11c-2 0-3.7.7-5 2-1.3 1.3-2 2.9-2 4.9 0 2 .7 3.6 2 4.9 1.3 1.3 3 1.9 4.9 1.9 1.8 0 3.2-.5 4.4-1.6.9-.8 1.6-1.8 1.9-3.1h-3.4z"
															/>
														</g>
													</switch>
												</svg>
												<h5>Content</h5>
											</div>
										),
										className:
											"wp-block-guteblock-accordion tab-one-main"
									},
									{
										name: "Icon",
										title: (
											<div className="wp-block-guteblock-accordion svgHolder">
											<svg
												id="prefix__Layer_1"
												x={0}
												y={0}
												viewBox="0 0 24 24"
												xmlSpace="preserve"
												height="40"
												width="40"
											>
												<style />
												<linearGradient
													id="prefix__SVGID_1_"
													gradientUnits="userSpaceOnUse"
													x1={19.182}
													y1={2.3}
													x2={2.927}
													y2={14.969}
												>
													<stop
														offset={0}
														stopColor="#eb7d31"
													/>
													<stop
														offset={1}
														stopColor="#ee576f"
													/>
												</linearGradient>
												<path
													d="M7.47 10.93h.93v.93c0 .55.45 1 1 1s1-.45 1-1v-.93h.93c.55 0 1-.45 1-1s-.45-1-1-1h-.93V8c0-.55-.45-1-1-1s-1 .45-1 1v.93h-.93c-.55 0-1 .45-1 1s.44 1 1 1z"
													fill="url(#prefix__SVGID_1_)"
												/>
												<linearGradient
													id="prefix__SVGID_2_"
													gradientUnits="userSpaceOnUse"
													x1={21.332}
													y1={5.06}
													x2={5.077}
													y2={17.729}
												>
													<stop
														offset={0}
														stopColor="#eb7d31"
													/>
													<stop
														offset={1}
														stopColor="#ee576f"
													/>
												</linearGradient>
												<path
													d="M8.69 17.02c.2.2.45.29.71.29s.51-.1.71-.29l2.19-2.19a.996.996 0 10-1.41-1.41L9.4 14.9l-1.49-1.49a.996.996 0 10-1.41 1.41l2.19 2.2z"
													fill="url(#prefix__SVGID_2_)"
												/>
												<linearGradient
													id="prefix__SVGID_3_"
													gradientUnits="userSpaceOnUse"
													x1={21.023}
													y1={4.663}
													x2={4.768}
													y2={17.332}
												>
													<stop
														offset={0}
														stopColor="#eb7d31"
													/>
													<stop
														offset={1}
														stopColor="#ee576f"
													/>
												</linearGradient>
												<path
													d="M19.94 14.04c-.4 0-.79-.04-1.17-.1v4.2H4.44V5.86h8.31c.17-.71.45-1.38.82-2H3.44c-.55 0-1 .45-1 1v14.28c0 .55.45 1 1 1h16.34c.55 0 1-.45 1-1v-5.15c-.28.03-.56.05-.84.05z"
													fill="url(#prefix__SVGID_3_)"
												/>
												<linearGradient
													id="prefix__SVGID_4_"
													gradientUnits="userSpaceOnUse"
													x1={20.292}
													y1={4.564}
													x2={9.115}
													y2={19.886}
												>
													<stop
														offset={0}
														stopColor="#eb7d31"
													/>
													<stop
														offset={1}
														stopColor="#ee576f"
													/>
												</linearGradient>
												<path
													d="M18.2 12.36h-.99a.77.77 0 01-.77-.77v-.28c0-.03-.01-.05-.04-.06-.03-.01-.05-.01-.07.01l-.2.2c-.3.3-.78.3-1.08 0l-.7-.7a.79.79 0 01-.22-.54c0-.21.08-.4.23-.54l.2-.2c.02-.02.03-.04.01-.07-.01-.03-.03-.04-.06-.04h-.28a.77.77 0 01-.77-.77v-.99c0-.42.34-.77.77-.77h.28c.03 0 .05-.01.06-.04.01-.03.01-.05-.01-.07l-.2-.2a.688.688 0 01-.23-.53c0-.21.08-.4.23-.54l.7-.7c.3-.3.79-.3 1.08 0l.2.2c.02.02.04.03.07.01.03-.01.04-.03.04-.06v-.28c0-.42.34-.77.77-.77h.99c.42 0 .77.34.77.77v.28c0 .03.01.05.04.06.03.01.05.01.07-.01l.2-.2a.78.78 0 011.08 0l.7.7c.13.15.21.34.21.54 0 .21-.08.4-.23.54l-.2.2c-.02.02-.03.04-.01.07.01.03.03.04.06.04h.28c.42 0 .77.34.77.77v.99c0 .42-.34.77-.77.77h-.28c-.03 0-.05.01-.06.04-.01.03-.01.05.01.07l.2.2a.773.773 0 010 1.08l-.7.7a.773.773 0 01-1.08 0l-.2-.2c-.02-.02-.04-.03-.07-.01-.03.01-.04.03-.04.06v.28a.76.76 0 01-.76.76zm-1.82-1.65c.08 0 .16.02.23.05.23.09.37.31.37.56v.28c0 .13.1.23.23.23h.99c.13 0 .23-.1.23-.23v-.28c0-.25.14-.46.37-.56.23-.1.48-.05.65.13l.2.2c.09.09.24.09.32 0l.7-.7c.04-.04.07-.1.07-.16s-.02-.12-.07-.16l-.2-.2a.598.598 0 01.43-1.02h.28c.13 0 .23-.1.23-.23V7.61c0-.13-.1-.23-.23-.23h-.28a.598.598 0 01-.43-1.02l.2-.2c.04-.04.07-.1.07-.16s-.02-.12-.07-.16l-.7-.7c-.09-.09-.24-.09-.32 0l-.2.2c-.17.17-.42.23-.65.13a.589.589 0 01-.37-.56v-.28c0-.13-.1-.23-.23-.23h-.99c-.13 0-.23.1-.23.23v.28a.598.598 0 01-1.02.43l-.2-.2a.223.223 0 00-.32 0l-.7.7c-.04.04-.07.1-.07.16s.02.12.07.16l.2.2a.598.598 0 01-.43 1.02h-.28c-.13.01-.23.11-.23.23v.99c0 .13.1.23.23.23h.28a.598.598 0 01.43 1.02l-.2.2c-.04.04-.07.1-.07.16s.02.12.07.16l.7.7c.09.09.23.09.32 0l.2-.2c.11-.1.26-.16.42-.16z"
													fill="url(#prefix__SVGID_4_)"
												/>
												<linearGradient
													id="prefix__SVGID_5_"
													gradientUnits="userSpaceOnUse"
													x1={20.292}
													y1={4.564}
													x2={9.115}
													y2={19.886}
												>
													<stop
														offset={0}
														stopColor="#eb7d31"
													/>
													<stop
														offset={1}
														stopColor="#ee576f"
													/>
												</linearGradient>
												<path
													d="M17.7 10.2c-1.15 0-2.09-.94-2.09-2.09s.94-2.09 2.09-2.09 2.09.94 2.09 2.09-.93 2.09-2.09 2.09zm0-3.64c-.85 0-1.55.7-1.55 1.55 0 .85.7 1.55 1.55 1.55.85 0 1.55-.7 1.55-1.55 0-.85-.69-1.55-1.55-1.55z"
													fill="url(#prefix__SVGID_5_)"
												/>
											</svg>
											<h5>
												Icon
											</h5>
											</div>
										),
										className:
											"wp-block-guteblock-accordion tab-one-main"
									}
								]}
							>
								{tab => {
									switch (tab.name) {
										case "Container":
											return (
												<>
													{/* //PADDING */}
													<PanelBody
														title="Padding Settings"
														initialOpen={
															false
														}
													>
														<PanelRow>
															<h4
																style={{
																	textAlign:
																		"center",
																	color:
																		"brown",
																	width:
																		"100%"
																}}
															>
																This
																is
																for
																controlling
																Padding
															</h4>
														</PanelRow>
														<Toolbar>
															<TextControl
																label="Top"
																value={
																	containerPadding.top
																}
																type="number"
																onChange={paddingVal => {
																	const newVal = {
																		top: paddingVal,
																		bottom:
																			containerPadding.bottom,
																		left:
																			containerPadding.left,
																		right:
																			containerPadding.right,
																		isEqualPadding:
																			containerPadding.isEqualPadding
																	};
																	setAttributes(
																		{
																			containerPadding: newVal
																		}
																	);
																}}
															/>
															<TextControl
																label="Bottom"
																value={
																	containerPadding.bottom
																}
																type="number"
																onChange={paddingVal => {
																	const newVal = {
																		top:
																			containerPadding.top,
																		bottom: paddingVal,
																		left:
																			containerPadding.left,
																		right:
																			containerPadding.right,
																		isEqualPadding:
																			containerPadding.isEqualPadding
																	};
																	this.props.setAttributes(
																		{
																			containerPadding: newVal
																		}
																	);
																}}
															/>
															<TextControl
																label="Left"
																value={
																	containerPadding.left
																}
																type="number"
																onChange={paddingVal => {
																	const newVal = {
																		top:
																			containerPadding.top,
																		bottom:
																			containerPadding.bottom,
																		left: paddingVal,
																		right:
																			containerPadding.right,
																		isEqualPadding:
																			containerPadding.isEqualPadding
																	};
																	this.props.setAttributes(
																		{
																			containerPadding: newVal
																		}
																	);
																}}
															/>
															<TextControl
																label="Right"
																value={
																	containerPadding.right
																}
																type="number"
																onChange={paddingVal => {
																	const newVal = {
																		top:
																			containerPadding.top,
																		bottom:
																			containerPadding.bottom,
																		left:
																			containerPadding.left,
																		right: paddingVal,
																		isEqualPadding:
																			containerPadding.isEqualPadding
																	};
																	this.props.setAttributes(
																		{
																			containerPadding: newVal
																		}
																	);
																}}
															/>
														</Toolbar>
														<Tooltip text="Use Padding Top To Adjust Value">
															<ToggleControl
																label={__(
																	"Enable Equal Padding for all Side",
																	"guteblock"
																)}
																onChange={
																	this
																		.toggleConatinerPaddingEqualler
																}
																checked={
																	containerPadding.isEqualPadding
																}
															/>
														</Tooltip>
													</PanelBody>
													<div className="wp-block-guteblock-accordion__seprator" />
													{/* MARGIN */}
													<PanelBody
														title="Margin Settings"
														initialOpen={
															false
														}
													>
														<PanelRow>
															<h4
																style={{
																	textAlign:
																		"center",
																	color:
																		"brown",
																	width:
																		"100%"
																}}
															>
																This
																is
																for
																controlling
																Margin
															</h4>
														</PanelRow>
														<Toolbar>
															<TextControl
																label="Margin Bottom"
																value={
																	containerMargin.bottom
																}
																type="number"
																onChange={marginVal => {
																	const newVal = {
																		top:
																			containerMargin.top,
																		bottom: marginVal,
																		isSameNeeded:
																			containerMargin.isSameNeeded
																	};
																	setAttributes(
																		{
																			containerMargin: newVal
																		}
																	);
																}}
															/>
															<TextControl
																label="Margin Top"
																value={
																	containerMargin.top
																}
																type="number"
																onChange={marginVal => {
																	const newVal = {
																		top: marginVal,
																		bottom:
																			containerMargin.bottom,
																		isSameNeeded:
																			containerMargin.isSameNeeded
																	};
																	setAttributes(
																		{
																			containerMargin: newVal
																		}
																	);
																}}
															/>
														</Toolbar>
														<ToggleControl
															label={__(
																"Enable Equal Margin for Bottom & Top",
																"guteblock"
															)}
															onChange={
																this
																	.toggleConatinerMarginEqualler
															}
															checked={
																containerMargin.isSameNeeded
															}
														/>
													</PanelBody>
													<div className="wp-block-guteblock-accordion__seprator" />
													<Dropdown
														className="wp-block-guteblock-accordion__colorDropDown"
														contentClassName="inner-popover-content-Width"
														position="top left"
														renderToggle={({
															isOpen,
															onToggle
														}) => (
															<div className="wp-block-guteblock-accordion__widthAligner">
																<Button
																	onClick={
																		onToggle
																	}
																	aria-expanded={
																		isOpen
																	}
																	className="wp-block-guteblock-accordion__widthAligner ButtonOnMainColor"
																>
																	Background
																	Settings
																</Button>
															</div>
														)}
														renderContent={() => (
															<div className="inner-popover-content-Width">
																<TabPanel
																	className="wp-block-guteblock-accordion innerTabOnMainconatiner"
																	activeClass="wp-block-guteblock-accordion innerTabOnMainconatiner active-class2"
																	tabs={[
																		{
																			name:
																				"tab1",
																			title:
																				"Color",
																			className:
																				"wp-block-guteblock-accordion tabOne"
																		},
																		{
																			name:
																				"tab2",
																			title:
																				"Image",
																			className:
																				"wp-block-guteblock-accordion tabOne"
																		}
																	]}
																>
																	{tab => {
																		if (
																			tab.name ===
																			"tab1"
																		) {
																			return (
																				<>
																					{/* COLOR SETTING */}
																					<PanelBody
																						title="Color Settings"
																						initialOpen={
																							false
																						}
																					>
																						<RangeControl
																							label={__(
																								"Background Brightness",
																								"guteblock"
																							)}
																							value={
																								conatinerBgColor.a
																							}
																							onChange={aChange => {
																								const newAval = {
																									r:
																										conatinerBgColor.r,
																									g:
																										conatinerBgColor.g,
																									b:
																										conatinerBgColor.b,
																									a: aChange,
																									realColor:
																										conatinerBgColor.realColor
																								};
																								setAttributes(
																									{
																										conatinerBgColor: newAval
																									}
																								);
																							}}
																							min={
																								0.1
																							}
																							max={
																								1
																							}
																							step={
																								0.01
																							}
																						/>
																						<PanelColorSettings
																							title={__(
																								"Color Settings",
																								"guteblock"
																							)}
																							colorSettings={[
																								{
																									value:
																										conatinerBgColor.realColor,
																									onChange: this
																										.onChangeMainBackgroundColor,
																									label: __(
																										"Background Color",
																										"guteblock"
																									)
																								}
																							]}
																						/>
																					</PanelBody>
																				</>
																			);
																		} else {
																			return (
																				<p>
																					Have
																					a
																					look
																					on
																					our
																					Guteblock Pro 
																					plugin
																				</p>
																			);
																		}
																	}}
																</TabPanel>
															</div>
														)}
													/>
													<div className="wp-block-guteblock-accordion__seprator" />
													<TabPanel
														className="wp-block-guteblock-accordion tab-container-controll"
														activeClass="wp-block-guteblock-accordion tab-container-controll active-class"
														tabs={[
															{
																name:
																	"Inner",
																title: (
																	<div className="wp-block-guteblock-accordion svgHolder">
																		<svg
																			id="prefix__Layer_1"
																			x={
																				0
																			}
																			y={
																				0
																			}
																			viewBox="0 0 24 24"
																			xmlSpace="preserve"
																			height="40"
																			width="40"
																		>
																			<style />
																			<linearGradient
																				id="prefix__SVGID_1_"
																				gradientUnits="userSpaceOnUse"
																				x1={
																					19.89
																				}
																				y1={
																					4.269
																				}
																				x2={
																					4.289
																				}
																				y2={
																					19.176
																				}
																			>
																				<stop
																					offset={
																						0
																					}
																					stopColor="#eb7d31"
																				/>
																				<stop
																					offset={
																						1
																					}
																					stopColor="#ee576f"
																				/>
																			</linearGradient>
																			<path
																				d="M19.68 6.63h-.29c-.03 0-.05-.01-.06-.04-.01-.03-.01-.05.01-.07l.2-.2c.15-.15.24-.35.24-.57 0-.21-.08-.42-.24-.57l-.74-.74c-.3-.3-.83-.3-1.14 0l-.21.21c-.02.02-.04.03-.07.01-.03-.01-.04-.03-.04-.06v-.29c0-.44-.36-.8-.8-.8H15.5c-.44 0-.8.36-.8.8v.29c0 .03-.01.05-.04.06-.03.01-.05.01-.07-.01l-.19-.21a.815.815 0 00-1.14 0l-.74.74a.81.81 0 00-.01 1.14l.21.21c.02.02.03.04.01.07-.01.03-.03.04-.06.04h-.27c-.44 0-.8.36-.8.8v1.04c0 .44.36.8.8.8h.29c.03 0 .05.01.06.04.01.03.01.05-.01.07l-.2.2c-.15.15-.24.35-.24.57 0 .21.08.42.24.57l.74.74c.31.31.82.31 1.14 0l.21-.21c.02-.02.04-.03.07-.01.03.01.04.03.04.06v.29c0 .44.36.8.8.8h1.04c.44 0 .8-.36.8-.8v-.3c0-.03.01-.05.04-.06.03-.01.05-.01.07.01l.21.21c.15.15.35.23.57.23.21 0 .42-.08.57-.23l.74-.74a.81.81 0 00.01-1.14l-.21-.21c-.02-.02-.03-.04-.01-.07.01-.03.03-.04.06-.04h.29c.44 0 .8-.36.8-.8V7.43c-.04-.44-.4-.8-.84-.8zm.24 1.84c0 .13-.11.24-.24.24h-.29c-.26 0-.48.15-.58.39-.1.24-.05.5.14.69l.21.21c.05.05.07.1.07.17 0 .06-.02.12-.07.17l-.74.74c-.09.09-.25.09-.34 0l-.21-.21a.63.63 0 00-.69-.14c-.24.1-.39.32-.39.58v.29c0 .13-.11.24-.24.24h-1.04c-.13 0-.24-.11-.24-.24v-.3c0-.26-.15-.48-.39-.58a.687.687 0 00-.24-.05c-.16 0-.32.06-.44.19l-.2.2c-.09.09-.24.09-.34 0l-.74-.74a.22.22 0 01-.07-.17c0-.07.02-.12.07-.17l.21-.21a.63.63 0 00.14-.69.619.619 0 00-.58-.39h-.29c-.13 0-.24-.11-.24-.24V7.43c0-.13.11-.24.24-.24h.29c.26 0 .48-.15.58-.39.1-.24.05-.5-.14-.69l-.21-.21a.22.22 0 01-.07-.17c0-.06.02-.12.07-.17l.74-.74c.09-.09.24-.09.34 0l.21.21c.18.18.45.24.69.14.24-.1.39-.32.39-.58v-.28c0-.13.11-.24.24-.24h1.04c.13 0 .24.11.24.24v.29c0 .26.15.48.39.58.24.1.5.05.69-.14l.21-.21c.09-.09.25-.09.34 0l.74.74c.05.05.07.1.07.17s-.02.12-.07.17l-.21.21a.63.63 0 00-.14.69c.1.24.32.39.58.39h.29c.13 0 .24.11.24.24v1.03z"
																				fill="url(#prefix__SVGID_1_)"
																			/>
																			<linearGradient
																				id="prefix__SVGID_2_"
																				gradientUnits="userSpaceOnUse"
																				x1={
																					19.89
																				}
																				y1={
																					4.269
																				}
																				x2={
																					4.289
																				}
																				y2={
																					19.176
																				}
																			>
																				<stop
																					offset={
																						0
																					}
																					stopColor="#eb7d31"
																				/>
																				<stop
																					offset={
																						1
																					}
																					stopColor="#ee576f"
																				/>
																			</linearGradient>
																			<path
																				d="M16.04 5.76a2.19 2.19 0 10-.001 4.379 2.19 2.19 0 00.001-4.379zm0 3.81a1.62 1.62 0 110-3.24 1.62 1.62 0 010 3.24z"
																				fill="url(#prefix__SVGID_2_)"
																			/>
																			<linearGradient
																				id="prefix__SVGID_3_"
																				gradientUnits="userSpaceOnUse"
																				x1={
																					19.149
																				}
																				y1={
																					4.785
																				}
																				x2={
																					6.565
																				}
																				y2={
																					17.928
																				}
																			>
																				<stop
																					offset={
																						0
																					}
																					stopColor="#eb7d31"
																				/>
																				<stop
																					offset={
																						1
																					}
																					stopColor="#ee576f"
																				/>
																			</linearGradient>
																			<path
																				d="M16.83 14.43v4.07h-6.71v-2.06h3.11c.55 0 1-.45 1-1v-1.52c-.74-.29-1.41-.71-2-1.21v1.73H5.52v-6.7h4.24c-.01-.15-.02-.3-.02-.46 0-.53.06-1.04.17-1.54H4.52c-.55 0-1 .45-1 1v8.7c0 .55.45 1 1 1h3.6v3.06c0 .55.45 1 1 1h8.71c.55 0 1-.45 1-1v-5.34c-.62.17-1.27.27-1.94.27h-.06z"
																				fill="url(#prefix__SVGID_3_)"
																			/>
																		</svg>
																		<h5>
																			Inner
																			Container
																		</h5>
																	</div>
																),
																className:
																	"wp-block-guteblock-accordion tab-one-container"
															},
															{
																name:
																	"Accordion",
																title: (
																	<div className="wp-block-guteblock-accordion svgHolder">
																		<svg
																			id="prefix__Layer_1"
																			x={
																				0
																			}
																			y={
																				0
																			}
																			viewBox="0 0 24 24"
																			xmlSpace="preserve"
																			height="40"
																			width="40"
																		>
																			<style />
																			<linearGradient
																				id="prefix__SVGID_1_"
																				gradientUnits="userSpaceOnUse"
																				x1={
																					18.225
																				}
																				y1={
																					-0.82
																				}
																				x2={
																					2.624
																				}
																				y2={
																					14.087
																				}
																			>
																				<stop
																					offset={
																						0
																					}
																					stopColor="#eb7d31"
																				/>
																				<stop
																					offset={
																						1
																					}
																					stopColor="#ee576f"
																				/>
																			</linearGradient>
																			<path
																				d="M3.72 11.24h10.1c-.6-.57-1.08-1.24-1.43-2H4.72V7.57h7.17a6.4 6.4 0 01-.08-.99c0-.34.03-.68.09-1.01H3.72c-.55 0-1 .45-1 1v3.67c0 .55.45 1 1 1z"
																				fill="url(#prefix__SVGID_1_)"
																			/>
																			<linearGradient
																				id="prefix__SVGID_2_"
																				gradientUnits="userSpaceOnUse"
																				x1={
																					24.019
																				}
																				y1={
																					5.244
																				}
																				x2={
																					8.419
																				}
																				y2={
																					20.151
																				}
																			>
																				<stop
																					offset={
																						0
																					}
																					stopColor="#eb7d31"
																				/>
																				<stop
																					offset={
																						1
																					}
																					stopColor="#ee576f"
																				/>
																			</linearGradient>
																			<path
																				d="M21.45 13.33H3.72c-.55 0-1 .45-1 1V18c0 .55.45 1 1 1h17.73c.55 0 1-.45 1-1v-3.67c0-.55-.44-1-1-1zm-1 3.67H4.72v-1.67h15.73V17z"
																				fill="url(#prefix__SVGID_2_)"
																			/>
																			<linearGradient
																				id="prefix__SVGID_3_"
																				gradientUnits="userSpaceOnUse"
																				x1={
																					22.073
																				}
																				y1={
																					3.207
																				}
																				x2={
																					6.472
																				}
																				y2={
																					18.114
																				}
																			>
																				<stop
																					offset={
																						0
																					}
																					stopColor="#eb7d31"
																				/>
																				<stop
																					offset={
																						1
																					}
																					stopColor="#ee576f"
																				/>
																			</linearGradient>
																			<path
																				d="M21.86 5.56h-.29c-.03 0-.05-.01-.06-.04-.01-.03-.01-.05.01-.07l.2-.2c.15-.15.24-.35.24-.57 0-.21-.08-.42-.24-.57L21 3.37c-.3-.3-.83-.3-1.14 0l-.21.21c-.02.02-.04.03-.07.01-.03-.01-.04-.03-.04-.06v-.29c0-.44-.36-.8-.8-.8H17.7c-.44 0-.8.36-.8.8v.29c0 .03-.01.05-.04.06-.03.01-.05.01-.07-.01l-.21-.21a.815.815 0 00-1.14 0l-.74.74a.81.81 0 00-.01 1.14l.21.21c.02.02.03.04.01.07-.01.03-.03.04-.06.04h-.29c-.44 0-.8.36-.8.8v1.04c0 .44.36.8.8.8h.29c.03 0 .05.01.06.04.01.03.01.05-.01.07l-.2.2c-.15.15-.24.35-.24.57 0 .21.08.42.24.57l.74.74c.31.31.82.31 1.14 0l.21-.21c.02-.02.04-.03.07-.01.03.01.04.03.04.06v.29c0 .44.36.8.8.8h1.04c.44 0 .8-.36.8-.8v-.29c0-.03.01-.05.04-.06.03-.01.05-.01.07.01l.21.21c.15.15.35.23.57.23.21 0 .42-.08.57-.23l.74-.74a.81.81 0 00.01-1.14l-.21-.21c-.02-.02-.03-.04-.01-.07.01-.03.03-.04.06-.04h.29c.44 0 .8-.36.8-.8V6.37a.822.822 0 00-.82-.81zm.24 1.85c0 .13-.11.24-.24.24h-.29c-.26 0-.48.15-.58.39-.1.24-.05.5.14.69l.21.21c.05.05.07.1.07.17 0 .06-.02.12-.07.17l-.74.72c-.09.09-.25.09-.34 0l-.21-.21a.63.63 0 00-.69-.14c-.24.1-.39.32-.39.58v.29c0 .13-.11.24-.24.24H17.7c-.13 0-.24-.11-.24-.24v-.29c0-.26-.15-.48-.39-.58a.687.687 0 00-.24-.05c-.16 0-.32.06-.44.19l-.21.21c-.09.09-.24.09-.34 0l-.74-.74a.22.22 0 01-.07-.17c0-.07.02-.12.07-.17l.21-.21a.63.63 0 00.14-.69.619.619 0 00-.58-.39h-.29c-.13 0-.24-.11-.24-.24V6.37c0-.13.11-.24.24-.24h.29c.26 0 .48-.15.58-.39.1-.24.05-.5-.14-.69l-.21-.21a.22.22 0 01-.07-.17c0-.06.02-.12.07-.17l.74-.74c.09-.09.24-.09.34 0l.21.21c.18.18.45.24.69.14.24-.1.39-.32.39-.58v-.29c-.01-.13.1-.24.23-.24h1.04c.13 0 .24.11.24.24v.29c0 .26.15.48.39.58.24.1.5.05.69-.14l.21-.21c.09-.09.25-.09.34 0l.74.74c.05.05.07.1.07.17s-.02.12-.07.17l-.21.21a.63.63 0 00-.14.69c.1.24.32.39.58.39h.29c.13 0 .24.11.24.24v1.04z"
																				fill="url(#prefix__SVGID_3_)"
																			/>
																			<linearGradient
																				id="prefix__SVGID_4_"
																				gradientUnits="userSpaceOnUse"
																				x1={
																					22.072
																				}
																				y1={
																					3.207
																				}
																				x2={
																					6.472
																				}
																				y2={
																					18.113
																				}
																			>
																				<stop
																					offset={
																						0
																					}
																					stopColor="#eb7d31"
																				/>
																				<stop
																					offset={
																						1
																					}
																					stopColor="#ee576f"
																				/>
																			</linearGradient>
																			<path
																				d="M18.22 4.7a2.19 2.19 0 10-.001 4.379A2.19 2.19 0 0018.22 4.7zm0 3.81a1.62 1.62 0 110-3.24 1.62 1.62 0 010 3.24z"
																				fill="url(#prefix__SVGID_4_)"
																			/>
																		</svg>
																		<h5>
																			Accordion
																			Container
																		</h5>
																	</div>
																),
																className:
																	"wp-block-guteblock-accordion tab-one-container"
															},
															{
																name:
																	"Content",
																title: (
																	<div className="wp-block-guteblock-accordion svgHolder">
																		<svg
																			id="prefix__Layer_1"
																			x={
																				0
																			}
																			y={
																				0
																			}
																			viewBox="0 0 24 24"
																			xmlSpace="preserve"
																			width="40"
																			height="40"
																		>
																			<style />
																			<linearGradient
																				id="prefix__SVGID_1_"
																				gradientUnits="userSpaceOnUse"
																				x1={
																					19.993
																				}
																				y1={
																					3.7
																				}
																				x2={
																					8.816
																				}
																				y2={
																					19.023
																				}
																			>
																				<stop
																					offset={
																						0
																					}
																					stopColor="#eb7d31"
																				/>
																				<stop
																					offset={
																						1
																					}
																					stopColor="#ee576f"
																				/>
																			</linearGradient>
																			<path
																				d="M17.9 11.49h-.99a.77.77 0 01-.77-.77v-.28c0-.03-.01-.05-.04-.06-.03-.01-.05-.01-.07.01l-.2.2c-.3.3-.78.3-1.08 0l-.7-.7a.79.79 0 01-.22-.54c0-.21.08-.4.23-.54l.2-.2c.02-.02.03-.04.01-.07-.01-.03-.03-.04-.06-.04h-.28a.77.77 0 01-.77-.77v-.98c0-.42.34-.77.77-.77h.28c.03 0 .05-.01.06-.04.01-.03.01-.05-.01-.07l-.2-.2a.773.773 0 01-.22-.54c0-.21.08-.4.23-.54l.7-.7c.3-.3.79-.3 1.08 0l.2.2c.02.02.04.03.07.01.03-.01.04-.03.04-.06v-.27c0-.42.34-.77.77-.77h.99c.42 0 .77.34.77.77v.28c0 .03.01.05.04.06.03.01.05.01.07-.01l.2-.2a.78.78 0 011.08 0l.7.7c.14.15.22.34.22.54 0 .21-.08.4-.23.54l-.2.2c-.02.02-.03.04-.01.07.01.03.03.04.06.04h.28c.42 0 .77.34.77.77v.99c0 .42-.34.77-.77.77h-.28c-.03 0-.05.01-.06.04-.01.03-.01.05.01.07l.2.2a.773.773 0 010 1.08l-.7.7a.773.773 0 01-1.08 0l-.2-.2c-.02-.02-.04-.03-.07-.01-.03.01-.04.03-.04.06v.28c-.01.41-.35.75-.78.75zm-1.82-1.64c.08 0 .16.02.23.05.23.09.37.31.37.56v.28c0 .13.1.23.23.23h.99c.13 0 .23-.1.23-.23v-.28c0-.25.14-.46.37-.56.23-.1.48-.05.65.13l.2.2c.09.09.24.09.32 0l.7-.7c.04-.04.07-.1.07-.16s-.02-.12-.07-.16L20.18 9a.598.598 0 01.43-1.02h.28c.13 0 .23-.1.23-.23v-1c0-.13-.1-.23-.23-.23h-.28a.598.598 0 01-.43-1.02l.2-.2c.04-.04.07-.1.07-.16s-.02-.12-.07-.16l-.7-.7c-.09-.09-.24-.09-.32 0l-.2.2c-.18.16-.43.22-.66.12a.589.589 0 01-.37-.56v-.27c0-.13-.1-.23-.23-.23h-.99c-.13 0-.23.1-.23.23v.28a.598.598 0 01-1.02.43l-.2-.2a.223.223 0 00-.32 0l-.7.7c-.04.04-.07.1-.07.16s.02.12.07.16l.2.2a.598.598 0 01-.43 1.02h-.28c-.13 0-.23.1-.23.23v.99c0 .13.1.23.23.23h.28c.25 0 .46.14.56.37.08.23.03.48-.14.66l-.2.2c-.04.04-.07.1-.07.16s.02.12.07.16l.7.7c.09.09.23.09.32 0l.2-.2c.12-.11.27-.17.43-.17z"
																				fill="url(#prefix__SVGID_1_)"
																			/>
																			<linearGradient
																				id="prefix__SVGID_2_"
																				gradientUnits="userSpaceOnUse"
																				x1={
																					19.992
																				}
																				y1={
																					3.7
																				}
																				x2={
																					8.816
																				}
																				y2={
																					19.023
																				}
																			>
																				<stop
																					offset={
																						0
																					}
																					stopColor="#eb7d31"
																				/>
																				<stop
																					offset={
																						1
																					}
																					stopColor="#ee576f"
																				/>
																			</linearGradient>
																			<path
																				d="M17.41 9.34c-1.15 0-2.09-.94-2.09-2.09s.94-2.09 2.09-2.09 2.09.94 2.09 2.09-.94 2.09-2.09 2.09zm0-3.64c-.85 0-1.55.7-1.55 1.55s.7 1.55 1.55 1.55c.85 0 1.55-.7 1.55-1.55s-.7-1.55-1.55-1.55z"
																				fill="url(#prefix__SVGID_2_)"
																			/>
																			<linearGradient
																				id="prefix__SVGID_3_"
																				gradientUnits="userSpaceOnUse"
																				x1={
																					14.795
																				}
																				y1={
																					7.626
																				}
																				x2={
																					7.942
																				}
																				y2={
																					14.91
																				}
																			>
																				<stop
																					offset={
																						0
																					}
																					stopColor="#eb7d31"
																				/>
																				<stop
																					offset={
																						1
																					}
																					stopColor="#ee576f"
																				/>
																			</linearGradient>
																			<path
																				d="M10.49 14.48c-.49.25-1.02.21-1.53-.14-.41-.28-.67-.65-.74-1.11-.07-.46.04-.9.33-1.33.29-.43.66-.69 1.11-.78.45-.1.88-.01 1.29.27.07-.17.16-.33.26-.48.18-.26.39-.47.62-.65a.078.078 0 01-.04-.04c-.77-.54-1.59-.72-2.45-.57-.86.15-1.55.61-2.07 1.37-.52.77-.71 1.58-.53 2.44.17.86.64 1.54 1.42 2.07.69.47 1.41.67 2.15.58.58-.07 1.1-.3 1.56-.69l-1.38-.94z"
																				fill="url(#prefix__SVGID_3_)"
																			/>
																			<linearGradient
																				id="prefix__SVGID_4_"
																				gradientUnits="userSpaceOnUse"
																				x1={
																					10.327
																				}
																				y1={
																					4.954
																				}
																				x2={
																					11.427
																				}
																				y2={
																					19.806
																				}
																			>
																				<stop
																					offset={
																						0
																					}
																					stopColor="#eb7d31"
																				/>
																				<stop
																					offset={
																						1
																					}
																					stopColor="#ee576f"
																				/>
																			</linearGradient>
																			<path
																				d="M17.55 12.87v4.56H4.65V7.29h7.4c-.01-.1-.02-.2-.02-.3 0-.54.08-1.06.21-1.55H3.73c-.51 0-.92.41-.92.92v11.99c0 .51.41.92.92.92h14.75c.51 0 .92-.41.92-.92v-5.97c-.58.26-1.2.43-1.85.49z"
																				fill="url(#prefix__SVGID_4_)"
																			/>
																		</svg>
																		<h5>
																			Contents
																			Container
																		</h5>
																	</div>
																),
																className:
																	"wp-block-guteblock-accordion tab-one-container"
															}
														]}
													>
														{tabInner => {
															switch (
																tabInner.name
															) {
																case "Inner":
																	return (
																		<>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			<RangeControl
																				label={__(
																					"Width (%)",
																					"guteblock"
																				)}
																				value={
																					IConatinerWidth
																				}
																				onChange={aChange => {
																					if (
																						aChange ===
																						undefined
																					) {
																						setAttributes(
																							{
																								IConatinerWidth: 50
																							}
																						);
																					} else {
																						setAttributes(
																							{
																								IConatinerWidth: aChange
																							}
																						);
																					}
																				}}
																				allowReset
																				min={
																					20
																				}
																				max={
																					100
																				}
																				step={
																					0.5
																				}
																			/>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			{/* COLOR SETTING */}
																			<PanelBody
																				title="Choose Color"
																				initialOpen={
																					false
																				}
																			>
																				<RangeControl
																					label={__(
																						"Background Brightness",
																						"guteblock"
																					)}
																					value={
																						IconatinerBgColor.a
																					}
																					onChange={aChange => {
																						if (
																							aChange ===
																							undefined
																						) {
																							const newAval = {
																								r:
																									IconatinerBgColor.r,
																								g:
																									IconatinerBgColor.g,
																								b:
																									IconatinerBgColor.b,
																								a: 0.8,
																								realColor:
																									IconatinerBgColor.realColor
																							};
																							setAttributes(
																								{
																									IconatinerBgColor: newAval
																								}
																							);
																						} else {
																							const newAval = {
																								r:
																									IconatinerBgColor.r,
																								g:
																									IconatinerBgColor.g,
																								b:
																									IconatinerBgColor.b,
																								a: aChange,
																								realColor:
																									IconatinerBgColor.realColor
																							};
																							setAttributes(
																								{
																									IconatinerBgColor: newAval
																								}
																							);
																						}
																					}}
																					allowReset
																					min={
																						0.1
																					}
																					max={
																						1
																					}
																					step={
																						0.01
																					}
																				/>
																				<PanelColorSettings
																					title={__(
																						"Color Settings",
																						"guteblock"
																					)}
																					initialOpen={
																						false
																					}
																					colorSettings={[
																						{
																							value:
																								IconatinerBgColor.realColor,
																							onChange: this
																								.onChangeInnerConatinerBackgroundColor,
																							label: __(
																								"Background Color",
																								"guteblock"
																							)
																						}
																					]}
																				/>
																			</PanelBody>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			{/* //PADDING */}
																			<PanelBody
																				title="Padding Settings"
																				initialOpen={
																					false
																				}
																			>
																				<PanelRow>
																					<h4
																						style={{
																							textAlign:
																								"center",
																							color:
																								"brown",
																							width:
																								"100%"
																						}}
																					>
																						This
																						is
																						for
																						controlling
																						Padding
																					</h4>
																				</PanelRow>
																				<Toolbar>
																					<TextControl
																						label="Top"
																						value={
																							IcontainerPadding.top
																						}
																						type="number"
																						onChange={paddingVal => {
																							let newVal = null;
																							if (
																								IcontainerPadding.isEqualPadding
																							) {
																								newVal = {
																									top: paddingVal,
																									bottom: paddingVal,
																									left: paddingVal,
																									right: paddingVal,
																									isEqualPadding:
																										IcontainerPadding.isEqualPadding
																								};
																							} else {
																								newVal = {
																									top: paddingVal,
																									bottom:
																										IcontainerPadding.bottom,
																									left:
																										IcontainerPadding.left,
																									right:
																										IcontainerPadding.right,
																									isEqualPadding:
																										IcontainerPadding.isEqualPadding
																								};
																							}

																							setAttributes(
																								{
																									IcontainerPadding: newVal
																								}
																							);
																						}}
																					/>
																					<TextControl
																						label="Bottom"
																						value={
																							IcontainerPadding.bottom
																						}
																						type="number"
																						onChange={paddingVal => {
																							const newVal = {
																								top:
																									IcontainerPadding.top,
																								bottom: paddingVal,
																								left:
																									IcontainerPadding.left,
																								right:
																									IcontainerPadding.right,
																								isEqualPadding:
																									IcontainerPadding.isEqualPadding
																							};
																							this.props.setAttributes(
																								{
																									IcontainerPadding: newVal
																								}
																							);
																						}}
																					/>
																					<TextControl
																						label="Left"
																						value={
																							IcontainerPadding.left
																						}
																						type="number"
																						onChange={paddingVal => {
																							const newVal = {
																								top:
																									IcontainerPadding.top,
																								bottom:
																									IcontainerPadding.bottom,
																								left: paddingVal,
																								right:
																									IcontainerPadding.right,
																								isEqualPadding:
																									IcontainerPadding.isEqualPadding
																							};
																							this.props.setAttributes(
																								{
																									IcontainerPadding: newVal
																								}
																							);
																						}}
																					/>
																					<TextControl
																						label="Right"
																						value={
																							IcontainerPadding.right
																						}
																						type="number"
																						onChange={paddingVal => {
																							const newVal = {
																								top:
																									IcontainerPadding.top,
																								bottom:
																									IcontainerPadding.bottom,
																								left:
																									IcontainerPadding.left,
																								right: paddingVal,
																								isEqualPadding:
																									IcontainerPadding.isEqualPadding
																							};
																							this.props.setAttributes(
																								{
																									IcontainerPadding: newVal
																								}
																							);
																						}}
																					/>
																				</Toolbar>
																				<Tooltip text="Use Padding Top To Adjust Value">
																					<ToggleControl
																						label={__(
																							"Enable Equal Padding for All Side",
																							"guteblock"
																						)}
																						onChange={
																							this
																								.toggleIConatinerPaddingEqualler
																						}
																						checked={
																							IcontainerPadding.isEqualPadding
																						}
																					/>
																				</Tooltip>
																			</PanelBody>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			{/* MARGIN */}
																			<PanelBody
																				title="Margin Settings"
																				initialOpen={
																					false
																				}
																			>
																				<PanelRow>
																					<h4
																						style={{
																							textAlign:
																								"center",
																							color:
																								"brown",
																							width:
																								"100%"
																						}}
																					>
																						This
																						is
																						for
																						controlling
																						Margin
																					</h4>
																				</PanelRow>
																				<Toolbar>
																					<TextControl
																						label="Margin Bottom"
																						value={
																							IcontainerMargin.bottom
																						}
																						type="number"
																						onChange={marginVal => {
																							const newVal = {
																								top:
																									IcontainerMargin.top,
																								bottom: marginVal,
																								isSameNeeded:
																									IcontainerMargin.isSameNeeded
																							};
																							setAttributes(
																								{
																									IcontainerMargin: newVal
																								}
																							);
																						}}
																					/>
																					<TextControl
																						label="Margin Top"
																						value={
																							IcontainerMargin.top
																						}
																						type="number"
																						onChange={marginVal => {
																							const newVal = {
																								top: marginVal,
																								bottom:
																									IcontainerMargin.bottom,
																								isSameNeeded:
																									IcontainerMargin.isSameNeeded
																							};
																							setAttributes(
																								{
																									IcontainerMargin: newVal
																								}
																							);
																						}}
																					/>
																				</Toolbar>
																				<ToggleControl
																					label={__(
																						"Enable Equal Margin for Bottom & Top",
																						"guteblock"
																					)}
																					onChange={
																						this
																							.toggleIConatinerMarginEqualler
																					}
																					checked={
																						IcontainerMargin.isSameNeeded
																					}
																				/>
																			</PanelBody>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			{/* Border Radius*/}
																			<RangeControl
																				label={__(
																					"Border Radius (Px)",
																					"guteblock"
																				)}
																				value={
																					IcontainerBorderRadius
																				}
																				onChange={aChange => {
																					if (
																						aChange ===
																						undefined
																					) {
																						setAttributes(
																							{
																								IcontainerBorderRadius: 0
																							}
																						);
																					} else {
																						setAttributes(
																							{
																								IcontainerBorderRadius: aChange
																							}
																						);
																					}
																				}}
																				allowReset
																				min={
																					0
																				}
																				max={
																					IConatinerWidth /
																						2 +
																					30
																				}
																				step={
																					0.5
																				}
																			/>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			{/*box shadow*/}
																			<PanelBody
																				title="Box Shadow Settings"
																				initialOpen={
																					false
																				}
																			>
																				<PanelRow>
																					<h4
																						style={{
																							textAlign:
																								"center",
																							color:
																								"brown",
																							width:
																								"100%"
																						}}
																					>
																						This
																						is
																						for
																						controlling
																						Box
																						Shadow
																					</h4>
																				</PanelRow>
																				<ToggleControl
																					label={__(
																						"Enable Box Shadow",
																						"guteblock"
																					)}
																					onChange={
																						this
																							.toggleBoxShadowIContainer
																					}
																					checked={
																						IConatinerBoxShadow.isNeeded
																					}
																				></ToggleControl>
																				{IConatinerBoxShadow.isNeeded ? (
																					<>
																						<RangeControl
																							label={__(
																								"X-Offset For Box Shadow (px)",
																								"guteblock"
																							)}
																							value={
																								IConatinerBoxShadow.xoffset
																							}
																							onChange={valChange => {
																								const newVal = {
																									xoffset: valChange,
																									yOffset:
																										IConatinerBoxShadow.yOffset,
																									Blur:
																										IConatinerBoxShadow.Blur,
																									spreadShadow:
																										IConatinerBoxShadow.spreadShadow,
																									colorShadow:
																										IConatinerBoxShadow.colorShadow,
																									isNeeded:
																										IConatinerBoxShadow.isNeeded
																								};
																								this.props.setAttributes(
																									{
																										IConatinerBoxShadow: newVal
																									}
																								);
																							}}
																							min={
																								-15
																							}
																							max={
																								15
																							}
																							step={
																								0.5
																							}
																						/>
																						<RangeControl
																							label={__(
																								"Y-Offset For Box Shadow (px)",
																								"guteblock"
																							)}
																							value={
																								IConatinerBoxShadow.yOffset
																							}
																							onChange={valChange => {
																								const newVal = {
																									xoffset:
																										IConatinerBoxShadow.xoffset,
																									yOffset: valChange,
																									Blur:
																										IConatinerBoxShadow.Blur,
																									spreadShadow:
																										IConatinerBoxShadow.spreadShadow,
																									colorShadow:
																										IConatinerBoxShadow.colorShadow,
																									isNeeded:
																										IConatinerBoxShadow.isNeeded
																								};
																								this.props.setAttributes(
																									{
																										IConatinerBoxShadow: newVal
																									}
																								);
																							}}
																							min={
																								-15
																							}
																							max={
																								15
																							}
																							step={
																								0.5
																							}
																						/>
																						<RangeControl
																							label={__(
																								"Blur For Box Shadow (px)",
																								"guteblock"
																							)}
																							value={
																								IConatinerBoxShadow.Blur
																							}
																							onChange={valChange => {
																								const newVal = {
																									xoffset:
																										IConatinerBoxShadow.xoffset,
																									yOffset:
																										IConatinerBoxShadow.yOffset,
																									Blur: valChange,
																									spreadShadow:
																										IConatinerBoxShadow.spreadShadow,
																									colorShadow:
																										IConatinerBoxShadow.colorShadow,
																									isNeeded:
																										IConatinerBoxShadow.isNeeded
																								};
																								this.props.setAttributes(
																									{
																										IConatinerBoxShadow: newVal
																									}
																								);
																							}}
																							min={
																								-15
																							}
																							max={
																								15
																							}
																							step={
																								0.5
																							}
																						/>
																						<RangeControl
																							label={__(
																								"Spread Shadow For Box Shadow (px)",
																								"guteblock"
																							)}
																							value={
																								IConatinerBoxShadow.spreadShadow
																							}
																							onChange={valChange => {
																								const newVal = {
																									xoffset:
																										IConatinerBoxShadow.xoffset,
																									yOffset:
																										IConatinerBoxShadow.yOffset,
																									Blur:
																										IConatinerBoxShadow.Blur,
																									spreadShadow: valChange,
																									colorShadow:
																										IConatinerBoxShadow.colorShadow,
																									isNeeded:
																										IConatinerBoxShadow.isNeeded
																								};
																								this.props.setAttributes(
																									{
																										IConatinerBoxShadow: newVal
																									}
																								);
																							}}
																							min={
																								-15
																							}
																							max={
																								15
																							}
																							step={
																								0.5
																							}
																						/>
																						<PanelColorSettings
																							title={__(
																								"Color Settings",
																								"guteblock"
																							)}
																							colorSettings={[
																								{
																									value:
																										IConatinerBoxShadow.colorShadow,
																									onChange: this
																										.onChangeIConatinerBoxShadowColor,
																									label: __(
																										"Content Color",
																										"guteblock"
																									)
																								}
																							]}
																						/>
																					</>
																				) : null}
																			</PanelBody>
																			<div className="wp-block-guteblock-accordion__seprator" />
																		</>
																	);
																case "Accordion":
																	return (
																		<>
																			{/* //PADDING */}
																			<PanelBody
																				title="Padding Settings"
																				initialOpen={
																					false
																				}
																			>
																				<PanelRow>
																					<h4
																						style={{
																							textAlign:
																								"center",
																							color:
																								"brown",
																							width:
																								"100%"
																						}}
																					>
																						This
																						is
																						for
																						controlling
																						Padding
																					</h4>
																				</PanelRow>
																				<Toolbar>
																					<TextControl
																						label="Top"
																						value={
																							AcontainerPadding.top
																						}
																						type="number"
																						onChange={paddingVal => {
																							let newVal;
																							if (
																								AcontainerPadding.isEqualPadding
																							) {
																								newVal = {
																									top: paddingVal,
																									bottom: paddingVal,
																									left: paddingVal,
																									right: paddingVal,
																									isEqualPadding:
																										AcontainerPadding.isEqualPadding
																								};
																							} else {
																								newVal = {
																									top: paddingVal,
																									bottom:
																										AcontainerPadding.bottom,
																									left:
																										AcontainerPadding.left,
																									right:
																										AcontainerPadding.right,
																									isEqualPadding:
																										AcontainerPadding.isEqualPadding
																								};
																							}

																							setAttributes(
																								{
																									AcontainerPadding: newVal
																								}
																							);
																						}}
																					/>
																					<TextControl
																						label="Bottom"
																						value={
																							AcontainerPadding.bottom
																						}
																						type="number"
																						onChange={paddingVal => {
																							const newVal = {
																								top:
																									AcontainerPadding.top,
																								bottom: paddingVal,
																								left:
																									AcontainerPadding.left,
																								right:
																									AcontainerPadding.right,
																								isEqualPadding:
																									AcontainerPadding.isEqualPadding
																							};
																							this.props.setAttributes(
																								{
																									AcontainerPadding: newVal
																								}
																							);
																						}}
																					/>
																					<TextControl
																						label="Left"
																						value={
																							AcontainerPadding.left
																						}
																						type="number"
																						onChange={paddingVal => {
																							const newVal = {
																								top:
																									AcontainerPadding.top,
																								bottom:
																									AcontainerPadding.bottom,
																								left: paddingVal,
																								right:
																									AcontainerPadding.right,
																								isEqualPadding:
																									AcontainerPadding.isEqualPadding
																							};
																							this.props.setAttributes(
																								{
																									AcontainerPadding: newVal
																								}
																							);
																						}}
																					/>
																					<TextControl
																						label="Right"
																						value={
																							AcontainerPadding.right
																						}
																						type="number"
																						onChange={paddingVal => {
																							const newVal = {
																								top:
																									AcontainerPadding.top,
																								bottom:
																									AcontainerPadding.bottom,
																								left:
																									AcontainerPadding.left,
																								right: paddingVal,
																								isEqualPadding:
																									AcontainerPadding.isEqualPadding
																							};
																							this.props.setAttributes(
																								{
																									AcontainerPadding: newVal
																								}
																							);
																						}}
																					/>
																				</Toolbar>
																				<Tooltip text="Use Padding Top To Adjust Value">
																					<ToggleControl
																						label={__(
																							"Enable Equal Padding for all Side",
																							"guteblock"
																						)}
																						onChange={
																							this
																								.toggleAConatinerPaddingEqualler
																						}
																						checked={
																							AcontainerPadding.isEqualPadding
																						}
																					/>
																				</Tooltip>
																			</PanelBody>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			{/* MARGIN */}
																			<PanelBody
																				title="Margin Settings"
																				initialOpen={
																					false
																				}
																			>
																				<PanelRow>
																					<h4
																						style={{
																							textAlign:
																								"center",
																							color:
																								"brown",
																							width:
																								"100%"
																						}}
																					>
																						This
																						is
																						for
																						controlling
																						Margin
																					</h4>
																				</PanelRow>
																				<Toolbar>
																					<TextControl
																						label="Margin Top"
																						value={
																							AcontainerMargin.top
																						}
																						type="number"
																						onChange={marginVal => {
																							let newVal;
																							if (
																								AcontainerMargin.isSameNeeded
																							) {
																								newVal = {
																									top: marginVal,
																									bottom: marginVal,
																									isSameNeeded:
																										AcontainerMargin.isSameNeeded
																								};
																							} else {
																								newVal = {
																									top: marginVal,
																									bottom:
																										AcontainerMargin.bottom,
																									isSameNeeded:
																										AcontainerMargin.isSameNeeded
																								};
																							}

																							setAttributes(
																								{
																									AcontainerMargin: newVal
																								}
																							);
																						}}
																					/>
																					<TextControl
																						label="Margin Bottom"
																						value={
																							AcontainerMargin.bottom
																						}
																						type="number"
																						onChange={marginVal => {
																							const newVal = {
																								top:
																									AcontainerMargin.top,
																								bottom: marginVal,
																								isSameNeeded:
																									AcontainerMargin.isSameNeeded
																							};
																							setAttributes(
																								{
																									AcontainerMargin: newVal
																								}
																							);
																						}}
																					/>
																				</Toolbar>
																				<ToggleControl
																					label={__(
																						"Enable Equal Margin for Bottom & Top",
																						"guteblock"
																					)}
																					onChange={
																						this
																							.toggleAConatinerMarginEqualler
																					}
																					checked={
																						AcontainerMargin.isSameNeeded
																					}
																				/>
																			</PanelBody>
																			{/* COLOR SETTING */}
																			<PanelBody
																				title="Color Settings"
																				initialOpen={
																					false
																				}
																			>
																				<RangeControl
																					label={__(
																						"Background Brightness",
																						"guteblock"
																					)}
																					value={
																						AconatinerBgColor.a
																					}
																					onChange={aChange => {
																						const newAval = {
																							r:
																								AconatinerBgColor.r,
																							g:
																								AconatinerBgColor.g,
																							b:
																								AconatinerBgColor.b,
																							a: aChange,
																							realColor:
																								AconatinerBgColor.realColor
																						};
																						setAttributes(
																							{
																								AconatinerBgColor: newAval
																							}
																						);
																					}}
																					min={
																						0.1
																					}
																					max={
																						1
																					}
																					step={
																						0.01
																					}
																				/>
																				<PanelColorSettings
																					title={__(
																						"Color Settings",
																						"guteblock"
																					)}
																					colorSettings={[
																						{
																							value:
																								AconatinerBgColor.realColor,
																							onChange: this
																								.onChangeAConatinerBackgroundColor,
																							label: __(
																								"Background Color",
																								"guteblock"
																							)
																						}
																					]}
																				/>
																			</PanelBody>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			{/* Border Radius*/}
																			<RangeControl
																				label={__(
																					"Border Radius (Px)",
																					"guteblock"
																				)}
																				value={
																					AcontainerBorderRadius
																				}
																				onChange={aChange => {
																					if (
																						aChange ===
																						undefined
																					) {
																						setAttributes(
																							{
																								AcontainerBorderRadius: 0
																							}
																						);
																					} else {
																						setAttributes(
																							{
																								AcontainerBorderRadius: aChange
																							}
																						);
																					}
																				}}
																				allowReset
																				min={
																					0
																				}
																				max={
																					IConatinerWidth /
																						2 +
																					30
																				}
																				step={
																					0.5
																				}
																			/>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			{/*box shadow*/}
																			<PanelBody
																				title="Box Shadow Settings"
																				initialOpen={
																					false
																				}
																			>
																				<PanelRow>
																					<h4
																						style={{
																							textAlign:
																								"center",
																							color:
																								"brown",
																							width:
																								"100%"
																						}}
																					>
																						This
																						is
																						for
																						controlling
																						Box
																						Shadow
																					</h4>
																				</PanelRow>
																				<ToggleControl
																					label={__(
																						"Enable Box Shadow",
																						"guteblock"
																					)}
																					onChange={
																						this
																							.toggleBoxShadowAContainer
																					}
																					checked={
																						AConatinerBoxShadow.isNeeded
																					}
																				></ToggleControl>
																				{AConatinerBoxShadow.isNeeded ? (
																					<>
																						<RangeControl
																							label={__(
																								"X-Offset For Box Shadow (px)",
																								"guteblock"
																							)}
																							value={
																								AConatinerBoxShadow.xoffset
																							}
																							onChange={valChange => {
																								const newVal = {
																									xoffset: valChange,
																									yOffset:
																										AConatinerBoxShadow.yOffset,
																									Blur:
																										AConatinerBoxShadow.Blur,
																									spreadShadow:
																										AConatinerBoxShadow.spreadShadow,
																									colorShadow:
																										AConatinerBoxShadow.colorShadow,
																									isNeeded:
																										AConatinerBoxShadow.isNeeded
																								};
																								this.props.setAttributes(
																									{
																										AConatinerBoxShadow: newVal
																									}
																								);
																							}}
																							min={
																								-15
																							}
																							max={
																								15
																							}
																							step={
																								0.5
																							}
																						/>
																						<RangeControl
																							label={__(
																								"Y-Offset For Box Shadow (px)",
																								"guteblock"
																							)}
																							value={
																								AConatinerBoxShadow.yOffset
																							}
																							onChange={valChange => {
																								const newVal = {
																									xoffset:
																										AConatinerBoxShadow.xoffset,
																									yOffset: valChange,
																									Blur:
																										AConatinerBoxShadow.Blur,
																									spreadShadow:
																										AConatinerBoxShadow.spreadShadow,
																									colorShadow:
																										AConatinerBoxShadow.colorShadow,
																									isNeeded:
																										AConatinerBoxShadow.isNeeded
																								};
																								this.props.setAttributes(
																									{
																										AConatinerBoxShadow: newVal
																									}
																								);
																							}}
																							min={
																								-15
																							}
																							max={
																								15
																							}
																							step={
																								0.5
																							}
																						/>
																						<RangeControl
																							label={__(
																								"Blur For Box Shadow (px)",
																								"guteblock"
																							)}
																							value={
																								AConatinerBoxShadow.Blur
																							}
																							onChange={valChange => {
																								const newVal = {
																									xoffset:
																										AConatinerBoxShadow.xoffset,
																									yOffset:
																										AConatinerBoxShadow.yOffset,
																									Blur: valChange,
																									spreadShadow:
																										AConatinerBoxShadow.spreadShadow,
																									colorShadow:
																										AConatinerBoxShadow.colorShadow,
																									isNeeded:
																										AConatinerBoxShadow.isNeeded
																								};
																								this.props.setAttributes(
																									{
																										AConatinerBoxShadow: newVal
																									}
																								);
																							}}
																							min={
																								-15
																							}
																							max={
																								15
																							}
																							step={
																								0.5
																							}
																						/>
																						<RangeControl
																							label={__(
																								"Spread Shadow For Box Shadow (px)",
																								"guteblock"
																							)}
																							value={
																								AConatinerBoxShadow.spreadShadow
																							}
																							onChange={valChange => {
																								const newVal = {
																									xoffset:
																										AConatinerBoxShadow.xoffset,
																									yOffset:
																										AConatinerBoxShadow.yOffset,
																									Blur:
																										AConatinerBoxShadow.Blur,
																									spreadShadow: valChange,
																									colorShadow:
																										AConatinerBoxShadow.colorShadow,
																									isNeeded:
																										AConatinerBoxShadow.isNeeded
																								};
																								this.props.setAttributes(
																									{
																										AConatinerBoxShadow: newVal
																									}
																								);
																							}}
																							min={
																								-15
																							}
																							max={
																								15
																							}
																							step={
																								0.5
																							}
																						/>
																						<PanelColorSettings
																							title={__(
																								"Color Settings",
																								"guteblock"
																							)}
																							colorSettings={[
																								{
																									value:
																										AConatinerBoxShadow.colorShadow,
																									onChange: this
																										.onChangeAConatinerBoxShadowColor,
																									label: __(
																										"Content Color",
																										"guteblock"
																									)
																								}
																							]}
																						/>
																					</>
																				) : null}
																			</PanelBody>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			<ToggleControl
																				label={__(
																					EnableWidth,
																					"guteblock"
																				)}
																				onChange={() => {
																					setAttributes(
																						{
																							AconatinerSeparatorIsNeeded: !this
																								.props
																								.attributes
																								.AconatinerSeparatorIsNeeded
																						}
																					);
																				}}
																				checked={
																					AconatinerSeparatorIsNeeded
																				}
																			/>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			{AconatinerSeparatorIsNeeded ? (
																				<Dropdown
																					className="wp-block-guteblock-accordion__colorDropDown"
																					contentClassName="inner-popover-content-Width"
																					position="top left"
																					renderToggle={({
																						isOpen,
																						onToggle
																					}) => (
																						<div className="wp-block-guteblock-accordion__widthAligner">
																							<Button
																								onClick={
																									onToggle
																								}
																								aria-expanded={
																									isOpen
																								}
																								className="wp-block-guteblock-accordion__widthAligner ButtonOnMainColor"
																							>
																								Separator
																								Settings
																							</Button>
																						</div>
																					)}
																					renderContent={() => {
																						return (
																							<>
																								<div className="inner-popover-content-Width">
																									{}
																									<RangeControl
																										label={__(
																											"Separator Width (%)",
																											"guteblock"
																										)}
																										value={
																											AcontainerSepartorWidth
																										}
																										onChange={aChange => {
																											if (
																												aChange ===
																												undefined
																											) {
																												setAttributes(
																													{
																														AcontainerSepartorWidth: 0
																													}
																												);
																											} else {
																												setAttributes(
																													{
																														AcontainerSepartorWidth: aChange
																													}
																												);
																											}
																										}}
																										allowReset
																										min={
																											10
																										}
																										max={
																											100
																										}
																										step={
																											0.5
																										}
																									/>
																									<RangeControl
																										label={__(
																											"Separator Height (px)",
																											"guteblock"
																										)}
																										value={
																											AconatinerSeparatorheight
																										}
																										onChange={aChange => {
																											if (
																												aChange ===
																												undefined
																											) {
																												setAttributes(
																													{
																														AconatinerSeparatorheight: 0
																													}
																												);
																											} else {
																												setAttributes(
																													{
																														AconatinerSeparatorheight: aChange
																													}
																												);
																											}
																										}}
																										allowReset
																										min={
																											1
																										}
																										max={
																											15
																										}
																										step={
																											0.5
																										}
																									/>
																									<div className="wp-block-guteblock-accordion__seprator" />
																									<PanelColorSettings
																										title={__(
																											"Color Settings",
																											"guteblock"
																										)}
																										colorSettings={[
																											{
																												value: AcontainerSeparatorBgColor,
																												onChange: this
																													.onChangeAConatinerSeparatorColor,
																												label: __(
																													"Background Color",
																													"guteblock"
																												)
																											}
																										]}
																									/>
																									<div className="wp-block-guteblock-accordion__seprator" />
																									<RangeControl
																										label={__(
																											"Opacity",
																											"guteblock"
																										)}
																										value={
																											AcontainerSeparatorBgOpacity
																										}
																										onChange={aChange => {
																											if (
																												aChange ===
																												undefined
																											) {
																												setAttributes(
																													{
																														AcontainerSeparatorBgOpacity: 0.8
																													}
																												);
																											} else {
																												setAttributes(
																													{
																														AcontainerSeparatorBgOpacity: aChange
																													}
																												);
																											}
																										}}
																										allowReset
																										min={
																											0.1
																										}
																										max={
																											1
																										}
																										step={
																											0.01
																										}
																									/>
																								</div>
																							</>
																						);
																					}}
																				/>
																			) : null}
																			<div className="wp-block-guteblock-accordion__seprator" />
																		</>
																	);
																case "Content":
																	return (
																		<>
																			{/* //PADDING */}
																			<PanelBody
																				title="Padding Settings"
																				initialOpen={
																					false
																				}
																			>
																				<PanelRow>
																					<h4
																						style={{
																							textAlign:
																								"center",
																							color:
																								"brown",
																							width:
																								"100%"
																						}}
																					>
																						This
																						is
																						for
																						controlling
																						Padding
																					</h4>
																				</PanelRow>
																				<Toolbar>
																					<TextControl
																						label="Top"
																						value={
																							CcontainerPadding.top
																						}
																						type="number"
																						onChange={paddingVal => {
																							let newVal = null;
																							if (
																								CcontainerPadding.isEqualPadding
																							) {
																								newVal = {
																									top: paddingVal,
																									bottom: paddingVal,
																									left: paddingVal,
																									right: paddingVal,
																									isEqualPadding:
																										CcontainerPadding.isEqualPadding
																								};
																							} else {
																								newVal = {
																									top: paddingVal,
																									bottom:
																										CcontainerPadding.bottom,
																									left:
																										CcontainerPadding.left,
																									right:
																										CcontainerPadding.right,
																									isEqualPadding:
																										CcontainerPadding.isEqualPadding
																								};
																							}

																							setAttributes(
																								{
																									CcontainerPadding: newVal
																								}
																							);
																						}}
																					/>
																					<TextControl
																						label="Left"
																						value={
																							CcontainerPadding.left
																						}
																						type="number"
																						onChange={paddingVal => {
																							const newVal = {
																								top:
																									CcontainerPadding.top,
																								bottom:
																									CcontainerPadding.bottom,
																								left: paddingVal,
																								right:
																									CcontainerPadding.right,
																								isEqualPadding:
																									CcontainerPadding.isEqualPadding
																							};
																							this.props.setAttributes(
																								{
																									CcontainerPadding: newVal
																								}
																							);
																						}}
																					/>
																					<TextControl
																						label="Right"
																						value={
																							CcontainerPadding.right
																						}
																						type="number"
																						onChange={paddingVal => {
																							const newVal = {
																								top:
																									CcontainerPadding.top,
																								bottom:
																									CcontainerPadding.bottom,
																								left:
																									CcontainerPadding.left,
																								right: paddingVal,
																								isEqualPadding:
																									CcontainerPadding.isEqualPadding
																							};
																							this.props.setAttributes(
																								{
																									CcontainerPadding: newVal
																								}
																							);
																						}}
																					/>
																				</Toolbar>
																				<Tooltip text="Use Padding Top To Adjust Value">
																					<ToggleControl
																						label={__(
																							"Enable Equal Padding for All Side",
																							"guteblock"
																						)}
																						onChange={
																							this
																								.toggleCcontainerPaddingEqualler
																						}
																						checked={
																							CcontainerPadding.isEqualPadding
																						}
																					/>
																				</Tooltip>
																			</PanelBody>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			{/* MARGIN */}
																			<PanelBody
																				title="Margin Settings"
																				initialOpen={
																					false
																				}
																			>
																				<PanelRow>
																					<h4
																						style={{
																							textAlign:
																								"center",
																							color:
																								"brown",
																							width:
																								"100%"
																						}}
																					>
																						This
																						is
																						for
																						controlling
																						Margin
																					</h4>
																				</PanelRow>
																				<Toolbar>
																					<TextControl
																						label="Margin Bottom"
																						value={
																							CcontainerMargin.bottom
																						}
																						type="number"
																						onChange={marginVal => {
																							const newVal = {
																								top:
																									CcontainerMargin.top,
																								bottom: marginVal,
																								isSameNeeded:
																									CcontainerMargin.isSameNeeded
																							};
																							setAttributes(
																								{
																									CcontainerMargin: newVal
																								}
																							);
																						}}
																					/>
																					<TextControl
																						label="Margin Top"
																						value={
																							CcontainerMargin.top
																						}
																						type="number"
																						onChange={marginVal => {
																							const newVal = {
																								top: marginVal,
																								bottom:
																									CcontainerMargin.bottom,
																								isSameNeeded:
																									CcontainerMargin.isSameNeeded
																							};
																							setAttributes(
																								{
																									CcontainerMargin: newVal
																								}
																							);
																						}}
																					/>
																				</Toolbar>
																				<ToggleControl
																					label={__(
																						"Enable Equal Margin for Bottom & Top",
																						"guteblock"
																					)}
																					onChange={
																						this
																							.toggleCcontainerMarginEqualler
																					}
																					checked={
																						CcontainerMargin.isSameNeeded
																					}
																				/>
																			</PanelBody>
																			<div className="wp-block-guteblock-accordion__seprator" />
																		</>
																	);
																default:
																	break;
															}
														}}
													</TabPanel>
												</>
											);
										case "Contents":
											return (
												<>
													<div className="wp-block-guteblock-accordion__seprator" />
													{styleName ===
													"2" ? (
														<>
															<PanelBody
																title="General Settings"
																initialOpen={
																	false
																}
															>
																<ToggleControl
																	label={__(
																		"Enable Content Splitting",
																		"guteblock"
																	)}
																	onChange={
																		this
																			.toggleCcontainerContentSplitter
																	}
																	checked={
																		CcontainerSplitIsNeeded
																	}
																/>
															</PanelBody>
														</>
													) : null}
													<div className="wp-block-guteblock-accordion__seprator" />
													<div className="wp-block-guteblock-accordion__controll-outer">
														<TabPanel
															className="wp-block-guteblock-accordion innerTabOnMainconatiner"
															activeClass="wp-block-guteblock-accordion innerTabOnMainconatiner active-class2"
															tabs={[
																{
																	name:
																		"Title",
																	title: `Title Settings`,
																	className:
																		"wp-block-guteblock-accordion tabOne"
																},
																{
																	name:
																		"Content",
																	title:
																		"Content Settings",
																	className:
																		"wp-block-guteblock-accordion tabOne"
																}
															]}
														>
															{tab => {
																if (
																	tab.name ===
																	"Title"
																) {
																	return (
																		<>
																			{/* //PADDING */}
																			<PanelBody
																				title="Padding Settings"
																				initialOpen={
																					false
																				}
																			>
																				<PanelRow>
																					<h4
																						style={{
																							textAlign:
																								"center",
																							color:
																								"brown",
																							width:
																								"100%"
																						}}
																					>
																						This
																						is
																						for
																						controlling
																						Padding
																					</h4>
																				</PanelRow>
																				<Toolbar>
																					<TextControl
																						label="Top"
																						value={
																							ATitlePadding.top
																						}
																						type="number"
																						onChange={paddingVal => {
																							const newVal = {
																								top: paddingVal,
																								bottom:
																									ATitlePadding.bottom,
																								left:
																									ATitlePadding.left,
																								right:
																									ATitlePadding.right,
																								isEqualPadding:
																									ATitlePadding.isEqualPadding
																							};
																							setAttributes(
																								{
																									ATitlePadding: newVal
																								}
																							);
																						}}
																					/>
																					<TextControl
																						label="Bottom"
																						value={
																							ATitlePadding.bottom
																						}
																						type="number"
																						onChange={paddingVal => {
																							const newVal = {
																								top:
																									ATitlePadding.top,
																								bottom: paddingVal,
																								left:
																									ATitlePadding.left,
																								right:
																									ATitlePadding.right,
																								isEqualPadding:
																									ATitlePadding.isEqualPadding
																							};
																							this.props.setAttributes(
																								{
																									ATitlePadding: newVal
																								}
																							);
																						}}
																					/>
																					<TextControl
																						label="Left"
																						value={
																							ATitlePadding.left
																						}
																						type="number"
																						onChange={paddingVal => {
																							const newVal = {
																								top:
																									ATitlePadding.top,
																								bottom:
																									ATitlePadding.bottom,
																								left: paddingVal,
																								right:
																									ATitlePadding.right,
																								isEqualPadding:
																									ATitlePadding.isEqualPadding
																							};
																							this.props.setAttributes(
																								{
																									ATitlePadding: newVal
																								}
																							);
																						}}
																					/>
																					<TextControl
																						label="Right"
																						value={
																							ATitlePadding.right
																						}
																						type="number"
																						onChange={paddingVal => {
																							const newVal = {
																								top:
																									ATitlePadding.top,
																								bottom:
																									ATitlePadding.bottom,
																								left:
																									ATitlePadding.left,
																								right: paddingVal,
																								isEqualPadding:
																									ATitlePadding.isEqualPadding
																							};
																							this.props.setAttributes(
																								{
																									ATitlePadding: newVal
																								}
																							);
																						}}
																					/>
																				</Toolbar>
																				<Tooltip text="Use Padding Top To Adjust Value">
																					<ToggleControl
																						label={__(
																							"Enable Equal Padding for all Side",
																							"guteblock"
																						)}
																						onChange={
																							this
																								.toggleATitlePaddingEqualler
																						}
																						checked={
																							ATitlePadding.isEqualPadding
																						}
																					/>
																				</Tooltip>
																			</PanelBody>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			{/* MARGIN */}
																			<PanelBody
																				title="Margin Settings"
																				initialOpen={
																					false
																				}
																			>
																				<PanelRow>
																					<h4
																						style={{
																							textAlign:
																								"center",
																							color:
																								"brown",
																							width:
																								"100%"
																						}}
																					>
																						This
																						is
																						for
																						controlling
																						Margin
																					</h4>
																				</PanelRow>
																				<Toolbar>
																					<TextControl
																						label="Margin Bottom"
																						value={
																							ATitleMargin.bottom
																						}
																						type="number"
																						onChange={marginVal => {
																							const newVal = {
																								top:
																									ATitleMargin.top,
																								bottom: marginVal,
																								isSameNeeded:
																									ATitleMargin.isSameNeeded
																							};
																							setAttributes(
																								{
																									ATitleMargin: newVal
																								}
																							);
																						}}
																					/>
																					<TextControl
																						label="Margin Top"
																						value={
																							ATitleMargin.top
																						}
																						type="number"
																						onChange={marginVal => {
																							const newVal = {
																								top: marginVal,
																								bottom:
																									ATitleMargin.bottom,
																								isSameNeeded:
																									ATitleMargin.isSameNeeded
																							};
																							setAttributes(
																								{
																									ATitleMargin: newVal
																								}
																							);
																						}}
																					/>
																				</Toolbar>
																				<ToggleControl
																					label={__(
																						"Enable Equal Margin for Bottom & Top",
																						"guteblock"
																					)}
																					onChange={
																						this
																							.toggleATitleMarginEqualler
																					}
																					checked={
																						ATitleMargin.isSameNeeded
																					}
																				/>
																			</PanelBody>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			<RangeControl
																				label={__(
																					"Font Size",
																					"guteblock"
																				)}
																				value={
																					ATitleFontSetup.size
																				}
																				onChange={aChange => {
																					const newAval = {
																						size: aChange,
																						weight:
																							ATitleFontSetup.weight,
																						color:
																							ATitleFontSetup.color,
																						style:
																							ATitleFontSetup.style,
																						align:
																							ATitleFontSetup.align,
																						lSpace:
																							ATitleFontSetup.lSpace
																					};
																					setAttributes(
																						{
																							ATitleFontSetup: newAval
																						}
																					);
																				}}
																				min={
																					12
																				}
																				max={
																					30
																				}
																				step={
																					1
																				}
																			/>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			<PanelColorSettings
																				title={__(
																					"Color Settings",
																					"guteblock"
																				)}
																				colorSettings={[
																					{
																						value:
																							ATitleFontSetup.color,
																						onChange: this
																							.onChangeATitleFontSetupColor,
																						label: __(
																							"Text Color",
																							"guteblock"
																						)
																					}
																				]}
																			/>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			<div className="wp-block-guteblock-accordion alignTofull">
																				<AlignmentToolbar
																					onChange={changeAlign => {
																						const newVal = {
																							size:
																								ATitleFontSetup.size,
																							weight:
																								ATitleFontSetup.weight,
																							color:
																								ATitleFontSetup.color,
																							style:
																								ATitleFontSetup.style,
																							align: changeAlign,
																							lSpace:
																								ATitleFontSetup.lSpace
																						};
																						setAttributes(
																							{
																								ATitleFontSetup: newVal
																							}
																						);
																					}}
																					value={
																						ATitleFontSetup.align
																					}
																					isCollapsed={
																						false
																					}
																				/>
																			</div>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			<SelectControl
																				label="Font Weight"
																				value={
																					ATitleFontSetup.weight
																				}
																				options={[
																					{
																						label:
																							"Bold",
																						value:
																							"700"
																					},
																					{
																						label:
																							"Bolder",
																						value:
																							"900"
																					},
																					{
																						label:
																							"Normal",
																						value:
																							"300"
																					},
																					{
																						label:
																							"500",
																						value:
																							"500"
																					},
																					{
																						label:
																							"Lighter",
																						value:
																							"100"
																					}
																				]}
																				onChange={headerFontWeight => {
																					const newVal = {
																						size:
																							ATitleFontSetup.size,
																						weight: headerFontWeight,
																						color:
																							ATitleFontSetup.color,
																						style:
																							ATitleFontSetup.style,
																						align:
																							ATitleFontSetup.align,
																						lSpace:
																							ATitleFontSetup.lSpace
																					};
																					setAttributes(
																						{
																							ATitleFontSetup: newVal
																						}
																					);
																				}}
																			/>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			<SelectControl
																				label="Font Style"
																				value={
																					ATitleFontSetup.style
																				}
																				options={[
																					{
																						label:
																							"Normal",
																						value:
																							"Normal"
																					},
																					{
																						label:
																							"Italic",
																						value:
																							"Italic"
																					},
																					{
																						label:
																							"Oblique",
																						value:
																							"Oblique"
																					}
																				]}
																				onChange={headerFontStyle => {
																					const newVal = {
																						size:
																							ATitleFontSetup.size,
																						weight:
																							ATitleFontSetup.weight,
																						color:
																							ATitleFontSetup.color,
																						style: headerFontStyle,
																						align:
																							ATitleFontSetup.align,
																						lSpace:
																							ATitleFontSetup.lSpace
																					};
																					setAttributes(
																						{
																							ATitleFontSetup: newVal
																						}
																					);
																				}}
																			/>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			<RangeControl
																				label={__(
																					"Letter Spacing",
																					"guteblock"
																				)}
																				value={
																					ATitleFontSetup.lSpace
																				}
																				onChange={aChange => {
																					const newAval = {
																						size:
																							ATitleFontSetup.size,
																						weight:
																							ATitleFontSetup.weight,
																						color:
																							ATitleFontSetup.color,
																						style:
																							ATitleFontSetup.style,
																						align:
																							ATitleFontSetup.align,
																						lSpace: aChange
																					};
																					setAttributes(
																						{
																							ATitleFontSetup: newAval
																						}
																					);
																				}}
																				min={
																					1
																				}
																				max={
																					10
																				}
																				step={
																					1
																				}
																			/>
																			<div className="wp-block-guteblock-accordion__seprator" />

																			<div className="wp-block-guteblock-accordion__seprator" />
																			{styleName ===
																			"2" ? (
																				<>
																					<ToggleControl
																						label={__(
																							"Enable Center Title",
																							"guteblock"
																						)}
																						onChange={() => {
																							this.props.setAttributes(
																								{
																									ACTitleIsShown: !this
																										.props
																										.attributes
																										.ACTitleIsShown
																								}
																							);
																						}}
																						checked={
																							ACTitleIsShown
																						}
																					/>
																				</>
																			) : null}
																			{ACTitleIsShown ? (
																				<>
																					<Dropdown
																						className="wp-block-guteblock-accordion__colorDropDown"
																						contentClassName="inner-popover-content-Width"
																						position="top left"
																						renderToggle={({
																							isOpen,
																							onToggle
																						}) => (
																							<div className="wp-block-guteblock-accordion__widthAligner">
																								<Button
																									onClick={
																										onToggle
																									}
																									aria-expanded={
																										isOpen
																									}
																									className="wp-block-guteblock-accordion__widthAligner ButtonOnMainColor"
																								>
																									Center
																									Title
																									Settings
																								</Button>
																							</div>
																						)}
																						renderContent={() => (
																							<div className="inner-popover-content-Width">
																								<div className="wp-block-guteblock-accordion__seprator" />
																								{/* //PADDING */}
																								<PanelBody
																									title="Padding Settings"
																									initialOpen={
																										false
																									}
																								>
																									<PanelRow>
																										<h4
																											style={{
																												textAlign:
																													"center",
																												color:
																													"brown",
																												width:
																													"100%"
																											}}
																										>
																											This
																											is
																											for
																											controlling
																											Padding
																										</h4>
																									</PanelRow>
																									<Toolbar>
																										<TextControl
																											label="Top"
																											value={
																												ACTitleFontSetup.ptop
																											}
																											type="number"
																											onChange={paddingVal => {
																												this.updateACTitleFontSetup(
																													"ptop",
																													paddingVal
																												);
																											}}
																										/>
																										<TextControl
																											label="Bottom"
																											value={
																												ACTitleFontSetup.pbottom
																											}
																											type="number"
																											onChange={paddingVal => {
																												this.updateACTitleFontSetup(
																													"pbottom",
																													paddingVal
																												);
																											}}
																										/>
																										<TextControl
																											label="Left"
																											value={
																												ACTitleFontSetup.pleft
																											}
																											type="number"
																											onChange={paddingVal => {
																												this.updateACTitleFontSetup(
																													"pleft",
																													paddingVal
																												);
																											}}
																										/>
																										<TextControl
																											label="Right"
																											value={
																												ACTitleFontSetup.pright
																											}
																											type="number"
																											onChange={paddingVal => {
																												this.updateACTitleFontSetup(
																													"pright",
																													paddingVal
																												);
																											}}
																										/>
																									</Toolbar>
																								</PanelBody>
																								<div className="wp-block-guteblock-accordion__seprator" />
																								{/* MARGIN */}
																								<PanelBody
																									title="Margin Settings"
																									initialOpen={
																										false
																									}
																								>
																									<PanelRow>
																										<h4
																											style={{
																												textAlign:
																													"center",
																												color:
																													"brown",
																												width:
																													"100%"
																											}}
																										>
																											This
																											is
																											for
																											controlling
																											Margin
																										</h4>
																									</PanelRow>
																									<Toolbar>
																										<TextControl
																											label="Margin Bottom"
																											value={
																												ACTitleFontSetup.mbottom
																											}
																											type="number"
																											onChange={marginVal => {
																												this.updateACTitleFontSetup(
																													"mbottom",
																													marginVal
																												);
																											}}
																										/>
																										<TextControl
																											label="Margin Top"
																											value={
																												ACTitleFontSetup.mtop
																											}
																											type="number"
																											onChange={marginVal => {
																												this.updateACTitleFontSetup(
																													"mtop",
																													marginVal
																												);
																											}}
																										/>
																									</Toolbar>
																								</PanelBody>
																								<div className="wp-block-guteblock-accordion__seprator" />
																								<RangeControl
																									label={__(
																										"Font Size",
																										"guteblock"
																									)}
																									value={
																										ACTitleFontSetup.size
																									}
																									onChange={aChange => {
																										this.updateACTitleFontSetup(
																											"size",
																											aChange
																										);
																									}}
																									min={
																										12
																									}
																									max={
																										30
																									}
																									step={
																										1
																									}
																								/>
																								<div className="wp-block-guteblock-accordion__seprator" />
																								<PanelColorSettings
																									title={__(
																										"Color Settings",
																										"guteblock"
																									)}
																									colorSettings={[
																										{
																											value:
																												ACTitleFontSetup.color,
																											onChange: changedColor => {
																												this.updateACTitleFontSetup(
																													"color",
																													changedColor
																												);
																											},
																											label: __(
																												"Text Color",
																												"guteblock"
																											)
																										}
																									]}
																								/>
																								<div className="wp-block-guteblock-accordion__seprator" />
																								<div className="wp-block-guteblock-accordion__seprator" />
																								<div className="wp-block-guteblock-accordion alignTofull">
																									<AlignmentToolbar
																										onChange={changeAlign => {
																											this.updateACTitleFontSetup(
																												"align",
																												changeAlign
																											);
																										}}
																										value={
																											ACTitleFontSetup.align
																										}
																										isCollapsed={
																											false
																										}
																									/>
																								</div>
																								<div className="wp-block-guteblock-accordion__seprator" />
																								<SelectControl
																									label="Font Weight"
																									value={
																										ACTitleFontSetup.weight
																									}
																									options={[
																										{
																											label:
																												"Bold",
																											value:
																												"700"
																										},
																										{
																											label:
																												"Bolder",
																											value:
																												"900"
																										},
																										{
																											label:
																												"Normal",
																											value:
																												"300"
																										},
																										{
																											label:
																												"500",
																											value:
																												"500"
																										},
																										{
																											label:
																												"Lighter",
																											value:
																												"100"
																										}
																									]}
																									onChange={headerFontWeight => {
																										this.updateACTitleFontSetup(
																											"weight",
																											headerFontWeight
																										);
																									}}
																								/>
																								<div className="wp-block-guteblock-accordion__seprator" />
																								<SelectControl
																									label="Font Style"
																									value={
																										ACTitleFontSetup.style
																									}
																									options={[
																										{
																											label:
																												"Normal",
																											value:
																												"Normal"
																										},
																										{
																											label:
																												"Italic",
																											value:
																												"Italic"
																										},
																										{
																											label:
																												"Oblique",
																											value:
																												"Oblique"
																										}
																									]}
																									onChange={headerFontStyle => {
																										this.updateACTitleFontSetup(
																											"style",
																											headerFontStyle
																										);
																									}}
																								/>
																								<div className="wp-block-guteblock-accordion__seprator" />
																								<RangeControl
																									label={__(
																										"Letter Spacing",
																										"guteblock"
																									)}
																									value={
																										ACTitleFontSetup.lSpace
																									}
																									onChange={headerFontSpace => {
																										this.updateACTitleFontSetup(
																											"lSpace",
																											headerFontSpace
																										);
																									}}
																									min={
																										1
																									}
																									max={
																										10
																									}
																									step={
																										1
																									}
																								/>
																								<div className="wp-block-guteblock-accordion__seprator" />
																							</div>
																						)}
																					/>
																				</>
																			) : null}
																		</>
																	);
																} else {
																	return (
																		<>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			<RangeControl
																				label={__(
																					"Font Size",
																					"guteblock"
																				)}
																				value={
																					ContentFontSetup.size
																				}
																				onChange={aChange => {
																					this.updateContentFontSetup(
																						"size",
																						aChange
																					);
																				}}
																				min={
																					12
																				}
																				max={
																					30
																				}
																				step={
																					1
																				}
																			/>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			<PanelColorSettings
																				title={__(
																					"Color Settings",
																					"guteblock"
																				)}
																				colorSettings={[
																					{
																						value:
																							ContentFontSetup.color,
																						onChange: changedColor => {
																							this.updateContentFontSetup(
																								"color",
																								changedColor
																							);
																						},
																						label: __(
																							"Text Color",
																							"guteblock"
																						)
																					}
																				]}
																			/>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			<div className="wp-block-guteblock-accordion__seprator" />
																			<div className="wp-block-guteblock-accordion alignTofull">
																				<AlignmentToolbar
																					onChange={changeAlign => {
																						this.updateContentFontSetup(
																							"align",
																							changeAlign
																						);
																					}}
																					value={
																						ContentFontSetup.align
																					}
																					isCollapsed={
																						false
																					}
																				/>
																			</div>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			<SelectControl
																				label="Font Weight"
																				value={
																					ContentFontSetup.weight
																				}
																				options={[
																					{
																						label:
																							"Bold",
																						value:
																							"700"
																					},
																					{
																						label:
																							"Bolder",
																						value:
																							"900"
																					},
																					{
																						label:
																							"Normal",
																						value:
																							"300"
																					},
																					{
																						label:
																							"500",
																						value:
																							"500"
																					},
																					{
																						label:
																							"Lighter",
																						value:
																							"100"
																					}
																				]}
																				onChange={headerFontWeight => {
																					this.updateContentFontSetup(
																						"weight",
																						headerFontWeight
																					);
																				}}
																			/>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			<SelectControl
																				label="Font Style"
																				value={
																					ContentFontSetup.style
																				}
																				options={[
																					{
																						label:
																							"Normal",
																						value:
																							"Normal"
																					},
																					{
																						label:
																							"Italic",
																						value:
																							"Italic"
																					},
																					{
																						label:
																							"Oblique",
																						value:
																							"Oblique"
																					}
																				]}
																				onChange={headerFontStyle => {
																					this.updateContentFontSetup(
																						"style",
																						headerFontStyle
																					);
																				}}
																			/>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			<RangeControl
																				label={__(
																					"Letter Spacing",
																					"guteblock"
																				)}
																				value={
																					ContentFontSetup.lSpace
																				}
																				onChange={headerFontSpace => {
																					this.updateContentFontSetup(
																						"lSpace",
																						headerFontSpace
																					);
																				}}
																				min={
																					1
																				}
																				max={
																					10
																				}
																				step={
																					1
																				}
																			/>
																			{/* //PADDING */}
																			<PanelBody
																				title="Padding Settings"
																				initialOpen={
																					false
																				}
																			>
																				<PanelRow>
																					<h4
																						style={{
																							textAlign:
																								"center",
																							color:
																								"brown",
																							width:
																								"100%"
																						}}
																					>
																						This
																						is
																						for
																						controlling
																						Padding
																					</h4>
																				</PanelRow>
																				<Toolbar>
																					<TextControl
																						label="Top"
																						value={
																							ContentFontSetup.ptop
																						}
																						type="number"
																						onChange={paddingVal => {
																							this.updateContentFontSetup(
																								"ptop",
																								paddingVal
																							);
																						}}
																					/>
																					<TextControl
																						label="Bottom"
																						value={
																							ContentFontSetup.pbottom
																						}
																						type="number"
																						onChange={paddingVal => {
																							this.updateContentFontSetup(
																								"pbottom",
																								paddingVal
																							);
																						}}
																					/>
																					<TextControl
																						label="Left"
																						value={
																							ContentFontSetup.pleft
																						}
																						type="number"
																						onChange={paddingVal => {
																							this.updateContentFontSetup(
																								"pleft",
																								paddingVal
																							);
																						}}
																					/>
																					<TextControl
																						label="Right"
																						value={
																							ContentFontSetup.pright
																						}
																						type="number"
																						onChange={paddingVal => {
																							this.updateContentFontSetup(
																								"pright",
																								paddingVal
																							);
																						}}
																					/>
																				</Toolbar>
																			</PanelBody>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			{/* MARGIN */}
																			<PanelBody
																				title="Margin Settings"
																				initialOpen={
																					false
																				}
																			>
																				<PanelRow>
																					<h4
																						style={{
																							textAlign:
																								"center",
																							color:
																								"brown",
																							width:
																								"100%"
																						}}
																					>
																						This
																						is
																						for
																						controlling
																						Margin
																					</h4>
																				</PanelRow>
																				<Toolbar>
																					<TextControl
																						label="Margin Bottom"
																						value={
																							ContentFontSetup.mbottom
																						}
																						type="number"
																						onChange={marginVal => {
																							this.updateContentFontSetup(
																								"mbottom",
																								marginVal
																							);
																						}}
																					/>
																					<TextControl
																						label="Margin Top"
																						value={
																							ContentFontSetup.mtop
																						}
																						type="number"
																						onChange={marginVal => {
																							this.updateContentFontSetup(
																								"mtop",
																								marginVal
																							);
																						}}
																					/>
																				</Toolbar>
																			</PanelBody>
																			<div className="wp-block-guteblock-accordion__seprator" />
																			<RangeControl
																				label={__(
																					"Line Height",
																					"guteblock"
																				)}
																				value={
																					ContentFontSetup.lineHeight
																				}
																				onChange={headerFontSpace => {
																					this.updateContentFontSetup(
																						"lineHeight",
																						headerFontSpace
																					);
																				}}
																				min={
																					10
																				}
																				max={
																					40
																				}
																				step={
																					1
																				}
																			/>
																			{CcontainerSplitIsNeeded ? (
																				<>
																					<Dropdown
																						className="wp-block-guteblock-accordion__colorDropDown"
																						contentClassName="inner-popover-content-Width"
																						position="top left"
																						renderToggle={({
																							isOpen,
																							onToggle
																						}) => (
																							<div className="wp-block-guteblock-accordion__widthAligner">
																								<Button
																									onClick={
																										onToggle
																									}
																									aria-expanded={
																										isOpen
																									}
																									className="wp-block-guteblock-accordion__widthAligner ButtonOnMainColor"
																								>
																									Lengthy
																									Content
																									Settings
																								</Button>
																							</div>
																						)}
																						renderContent={() => (
																							<div className="inner-popover-content-Width">
																								<RangeControl
																									label={__(
																										"Font Size",
																										"guteblock"
																									)}
																									value={
																										lengthyContentFontSetup.size
																									}
																									onChange={aChange => {
																										this.updatelengthyContentFontSetup(
																											"size",
																											aChange
																										);
																									}}
																									min={
																										12
																									}
																									max={
																										30
																									}
																									step={
																										1
																									}
																								/>
																								<div className="wp-block-guteblock-accordion__seprator" />
																								<PanelColorSettings
																									title={__(
																										"Color Settings",
																										"guteblock"
																									)}
																									colorSettings={[
																										{
																											value:
																												lengthyContentFontSetup.color,
																											onChange: changedColor => {
																												this.updatelengthyContentFontSetup(
																													"color",
																													changedColor
																												);
																											},
																											label: __(
																												"Text Color",
																												"guteblock"
																											)
																										}
																									]}
																								/>
																								<div className="wp-block-guteblock-accordion__seprator" />
																								<div className="wp-block-guteblock-accordion__seprator" />
																								<div className="wp-block-guteblock-accordion alignTofull">
																									<AlignmentToolbar
																										onChange={changeAlign => {
																											this.updatelengthyContentFontSetup(
																												"align",
																												changeAlign
																											);
																										}}
																										value={
																											lengthyContentFontSetup.align
																										}
																										isCollapsed={
																											false
																										}
																									/>
																								</div>
																								<div className="wp-block-guteblock-accordion__seprator" />
																								<SelectControl
																									label="Font Weight"
																									value={
																										lengthyContentFontSetup.weight
																									}
																									options={[
																										{
																											label:
																												"Bold",
																											value:
																												"700"
																										},
																										{
																											label:
																												"Bolder",
																											value:
																												"900"
																										},
																										{
																											label:
																												"Normal",
																											value:
																												"300"
																										},
																										{
																											label:
																												"500",
																											value:
																												"500"
																										},
																										{
																											label:
																												"Lighter",
																											value:
																												"100"
																										}
																									]}
																									onChange={headerFontWeight => {
																										this.updatelengthyContentFontSetup(
																											"weight",
																											headerFontWeight
																										);
																									}}
																								/>
																								<div className="wp-block-guteblock-accordion__seprator" />
																								<SelectControl
																									label="Font Style"
																									value={
																										lengthyContentFontSetup.style
																									}
																									options={[
																										{
																											label:
																												"Normal",
																											value:
																												"Normal"
																										},
																										{
																											label:
																												"Italic",
																											value:
																												"Italic"
																										},
																										{
																											label:
																												"Oblique",
																											value:
																												"Oblique"
																										}
																									]}
																									onChange={headerFontStyle => {
																										this.updatelengthyContentFontSetup(
																											"style",
																											headerFontStyle
																										);
																									}}
																								/>
																								<div className="wp-block-guteblock-accordion__seprator" />
																								<RangeControl
																									label={__(
																										"Letter Spacing",
																										"guteblock"
																									)}
																									value={
																										lengthyContentFontSetup.lSpace
																									}
																									onChange={headerFontSpace => {
																										this.updatelengthyContentFontSetup(
																											"lSpace",
																											headerFontSpace
																										);
																									}}
																									min={
																										1
																									}
																									max={
																										10
																									}
																									step={
																										1
																									}
																								/>
																								{/* //PADDING */}
																								<PanelBody
																									title="Padding Settings"
																									initialOpen={
																										false
																									}
																								>
																									<PanelRow>
																										<h4
																											style={{
																												textAlign:
																													"center",
																												color:
																													"brown",
																												width:
																													"100%"
																											}}
																										>
																											This
																											is
																											for
																											controlling
																											Padding
																										</h4>
																									</PanelRow>
																									<Toolbar>
																										<TextControl
																											label="Top"
																											value={
																												lengthyContentFontSetup.ptop
																											}
																											type="number"
																											onChange={paddingVal => {
																												this.updatelengthyContentFontSetup(
																													"ptop",
																													paddingVal
																												);
																											}}
																										/>
																										<TextControl
																											label="Bottom"
																											value={
																												lengthyContentFontSetup.pbottom
																											}
																											type="number"
																											onChange={paddingVal => {
																												this.updatelengthyContentFontSetup(
																													"pbottom",
																													paddingVal
																												);
																											}}
																										/>
																										<TextControl
																											label="Left"
																											value={
																												lengthyContentFontSetup.pleft
																											}
																											type="number"
																											onChange={paddingVal => {
																												this.updatelengthyContentFontSetup(
																													"pleft",
																													paddingVal
																												);
																											}}
																										/>
																										<TextControl
																											label="Right"
																											value={
																												lengthyContentFontSetup.pright
																											}
																											type="number"
																											onChange={paddingVal => {
																												this.updatelengthyContentFontSetup(
																													"pright",
																													paddingVal
																												);
																											}}
																										/>
																									</Toolbar>
																								</PanelBody>
																								<div className="wp-block-guteblock-accordion__seprator" />
																								{/* MARGIN */}
																								<PanelBody
																									title="Margin Settings"
																									initialOpen={
																										false
																									}
																								>
																									<PanelRow>
																										<h4
																											style={{
																												textAlign:
																													"center",
																												color:
																													"brown",
																												width:
																													"100%"
																											}}
																										>
																											This
																											is
																											for
																											controlling
																											Margin
																										</h4>
																									</PanelRow>
																									<Toolbar>
																										<TextControl
																											label="Margin Bottom"
																											value={
																												lengthyContentFontSetup.mbottom
																											}
																											type="number"
																											onChange={marginVal => {
																												this.updatelengthyContentFontSetup(
																													"mbottom",
																													marginVal
																												);
																											}}
																										/>
																										<TextControl
																											label="Margin Top"
																											value={
																												lengthyContentFontSetup.mtop
																											}
																											type="number"
																											onChange={marginVal => {
																												this.updatelengthyContentFontSetup(
																													"mtop",
																													marginVal
																												);
																											}}
																										/>
																									</Toolbar>
																								</PanelBody>
																								<div className="wp-block-guteblock-accordion__seprator" />
																								<RangeControl
																									label={__(
																										"Line Height",
																										"guteblock"
																									)}
																									value={
																										lengthyContentFontSetup.lineHeight
																									}
																									onChange={headerFontSpace => {
																										this.updatelengthyContentFontSetup(
																											"lineHeight",
																											headerFontSpace
																										);
																									}}
																									min={
																										10
																									}
																									max={
																										40
																									}
																									step={
																										1
																									}
																								/>
																							</div>
																						)}
																					/>
																				</>
																			) : null}
																			<div className="wp-block-guteblock-accordion__seprator" />
																			{CcontainerSplitIsNeeded ? (
																				<>
																					<Dropdown
																						className="wp-block-guteblock-accordion__colorDropDown"
																						contentClassName="inner-popover-content-Width"
																						position="top left"
																						renderToggle={({
																							isOpen,
																							onToggle
																						}) => (
																							<div className="wp-block-guteblock-accordion__widthAligner">
																								<Button
																									onClick={
																										onToggle
																									}
																									aria-expanded={
																										isOpen
																									}
																									className="wp-block-guteblock-accordion__widthAligner ButtonOnMainColor"
																								>
																									Sub
																									Title
																									Settings
																								</Button>
																							</div>
																						)}
																						renderContent={() => (
																							<div className="inner-popover-content-Width">
																								<RangeControl
																									label={__(
																										"Font Size",
																										"guteblock"
																									)}
																									value={
																										AdditionalContentFontSetup.size
																									}
																									onChange={aChange => {
																										this.updateAdditionalContentFontSetup(
																											"size",
																											aChange
																										);
																									}}
																									min={
																										12
																									}
																									max={
																										30
																									}
																									step={
																										1
																									}
																								/>
																								<div className="wp-block-guteblock-accordion__seprator" />
																								<PanelColorSettings
																									title={__(
																										"Color Settings",
																										"guteblock"
																									)}
																									colorSettings={[
																										{
																											value:
																												AdditionalContentFontSetup.color,
																											onChange: changedColor => {
																												this.updateAdditionalContentFontSetup(
																													"color",
																													changedColor
																												);
																											},
																											label: __(
																												"Text Color",
																												"guteblock"
																											)
																										}
																									]}
																								/>
																								<div className="wp-block-guteblock-accordion__seprator" />
																								<div className="wp-block-guteblock-accordion__seprator" />
																								<div className="wp-block-guteblock-accordion alignTofull">
																									<AlignmentToolbar
																										onChange={changeAlign => {
																											this.updateAdditionalContentFontSetup(
																												"align",
																												changeAlign
																											);
																										}}
																										value={
																											AdditionalContentFontSetup.align
																										}
																										isCollapsed={
																											false
																										}
																									/>
																								</div>
																								<div className="wp-block-guteblock-accordion__seprator" />
																								<SelectControl
																									label="Font Weight"
																									value={
																										AdditionalContentFontSetup.weight
																									}
																									options={[
																										{
																											label:
																												"Bold",
																											value:
																												"700"
																										},
																										{
																											label:
																												"Bolder",
																											value:
																												"900"
																										},
																										{
																											label:
																												"Normal",
																											value:
																												"300"
																										},
																										{
																											label:
																												"500",
																											value:
																												"500"
																										},
																										{
																											label:
																												"Lighter",
																											value:
																												"100"
																										}
																									]}
																									onChange={headerFontWeight => {
																										this.updateAdditionalContentFontSetup(
																											"weight",
																											headerFontWeight
																										);
																									}}
																								/>
																								<div className="wp-block-guteblock-accordion__seprator" />
																								<SelectControl
																									label="Font Style"
																									value={
																										AdditionalContentFontSetup.style
																									}
																									options={[
																										{
																											label:
																												"Normal",
																											value:
																												"Normal"
																										},
																										{
																											label:
																												"Italic",
																											value:
																												"Italic"
																										},
																										{
																											label:
																												"Oblique",
																											value:
																												"Oblique"
																										}
																									]}
																									onChange={headerFontStyle => {
																										this.updateAdditionalContentFontSetup(
																											"style",
																											headerFontStyle
																										);
																									}}
																								/>
																								<div className="wp-block-guteblock-accordion__seprator" />
																								<RangeControl
																									label={__(
																										"Letter Spacing",
																										"guteblock"
																									)}
																									value={
																										AdditionalContentFontSetup.lSpace
																									}
																									onChange={headerFontSpace => {
																										this.updateAdditionalContentFontSetup(
																											"lSpace",
																											headerFontSpace
																										);
																									}}
																									min={
																										1
																									}
																									max={
																										10
																									}
																									step={
																										1
																									}
																								/>
																								{/* //PADDING */}
																								<PanelBody
																									title="Padding Settings"
																									initialOpen={
																										false
																									}
																								>
																									<PanelRow>
																										<h4
																											style={{
																												textAlign:
																													"center",
																												color:
																													"brown",
																												width:
																													"100%"
																											}}
																										>
																											This
																											is
																											for
																											controlling
																											Padding
																										</h4>
																									</PanelRow>
																									<Toolbar>
																										<TextControl
																											label="Top"
																											value={
																												AdditionalContentFontSetup.ptop
																											}
																											type="number"
																											onChange={paddingVal => {
																												this.updateAdditionalContentFontSetup(
																													"ptop",
																													paddingVal
																												);
																											}}
																										/>
																										<TextControl
																											label="Bottom"
																											value={
																												AdditionalContentFontSetup.pbottom
																											}
																											type="number"
																											onChange={paddingVal => {
																												this.updateAdditionalContentFontSetup(
																													"pbottom",
																													paddingVal
																												);
																											}}
																										/>
																										<TextControl
																											label="Left"
																											value={
																												AdditionalContentFontSetup.pleft
																											}
																											type="number"
																											onChange={paddingVal => {
																												this.updateAdditionalContentFontSetup(
																													"pleft",
																													paddingVal
																												);
																											}}
																										/>
																										<TextControl
																											label="Right"
																											value={
																												AdditionalContentFontSetup.pright
																											}
																											type="number"
																											onChange={paddingVal => {
																												this.updateAdditionalContentFontSetup(
																													"pright",
																													paddingVal
																												);
																											}}
																										/>
																									</Toolbar>
																								</PanelBody>
																								<div className="wp-block-guteblock-accordion__seprator" />
																								{/* MARGIN */}
																								<PanelBody
																									title="Margin Settings"
																									initialOpen={
																										false
																									}
																								>
																									<PanelRow>
																										<h4
																											style={{
																												textAlign:
																													"center",
																												color:
																													"brown",
																												width:
																													"100%"
																											}}
																										>
																											This
																											is
																											for
																											controlling
																											Margin
																										</h4>
																									</PanelRow>
																									<Toolbar>
																										<TextControl
																											label="Margin Bottom"
																											value={
																												AdditionalContentFontSetup.mbottom
																											}
																											type="number"
																											onChange={marginVal => {
																												this.updateAdditionalContentFontSetup(
																													"mbottom",
																													marginVal
																												);
																											}}
																										/>
																										<TextControl
																											label="Margin Top"
																											value={
																												AdditionalContentFontSetup.mtop
																											}
																											type="number"
																											onChange={marginVal => {
																												this.updateAdditionalContentFontSetup(
																													"mtop",
																													marginVal
																												);
																											}}
																										/>
																									</Toolbar>
																								</PanelBody>
																							</div>
																						)}
																					/>
																				</>
																			) : null}
																			<div className="wp-block-guteblock-accordion__seprator" />
																			<ToggleControl
																				label={__(
																					"Enable Content Seprator",
																					"guteblock"
																				)}
																				onChange={() => {
																					this.updatetitleSepratorSettings(
																						"isNeeded",
																						!titleSepratorSettings.isNeeded
																					);
																				}}
																				checked={
																					titleSepratorSettings.isNeeded
																				}
																			/>
																			{titleSepratorSettings.isNeeded ? (
																				<Dropdown
																					className="wp-block-guteblock-accordion__colorDropDown"
																					contentClassName="inner-popover-content-Width"
																					position="top left"
																					renderToggle={({
																						isOpen,
																						onToggle
																					}) => (
																						<div className="wp-block-guteblock-accordion__widthAligner">
																							<Button
																								onClick={
																									onToggle
																								}
																								aria-expanded={
																									isOpen
																								}
																								className="wp-block-guteblock-accordion__widthAligner ButtonOnMainColor"
																							>
																								Content
																								Separator
																								Settings
																							</Button>
																						</div>
																					)}
																					renderContent={() => {
																						return (
																							<>
																								<div className="inner-popover-content-Width">
																									{}
																									<RangeControl
																										label={__(
																											"Separator Width (%)",
																											"guteblock"
																										)}
																										value={
																											titleSepratorSettings.width
																										}
																										onChange={aChange => {
																											if (
																												aChange ===
																												undefined
																											) {
																												this.updatetitleSepratorSettings(
																													"width",
																													60
																												);
																											} else {
																												this.updatetitleSepratorSettings(
																													"width",
																													aChange
																												);
																											}
																										}}
																										allowReset
																										min={
																											10
																										}
																										max={
																											95
																										}
																										step={
																											0.5
																										}
																									/>
																									<RangeControl
																										label={__(
																											"Separator Height (px)",
																											"guteblock"
																										)}
																										value={
																											titleSepratorSettings.height
																										}
																										onChange={aChange => {
																											if (
																												aChange ===
																												undefined
																											) {
																												this.updatetitleSepratorSettings(
																													"height",
																													3
																												);
																											} else {
																												this.updatetitleSepratorSettings(
																													"height",
																													aChange
																												);
																											}
																										}}
																										allowReset
																										min={
																											1
																										}
																										max={
																											10
																										}
																										step={
																											0.5
																										}
																									/>
																									<div className="wp-block-guteblock-accordion__seprator" />
																									<PanelColorSettings
																										title={__(
																											"Color Settings",
																											"guteblock"
																										)}
																										colorSettings={[
																											{
																												value:
																													titleSepratorSettings.color,
																												onChange: changedColor => {
																													this.updatetitleSepratorSettings(
																														"color",
																														changedColor
																													);
																												},
																												label: __(
																													"Seprator Color",
																													"guteblock"
																												)
																											}
																										]}
																									/>
																									<div className="wp-block-guteblock-accordion__seprator" />
																									<RangeControl
																										label={__(
																											"Opacity",
																											"guteblock"
																										)}
																										value={
																											titleSepratorSettings.opacity
																										}
																										onChange={aChange => {
																											if (
																												aChange ===
																												undefined
																											) {
																												this.updatetitleSepratorSettings(
																													"opacity",
																													0.8
																												);
																											} else {
																												this.updatetitleSepratorSettings(
																													"opacity",
																													aChange
																												);
																											}
																										}}
																										allowReset
																										min={
																											0.1
																										}
																										max={
																											1
																										}
																										step={
																											0.01
																										}
																									/>
																								</div>
																							</>
																						);
																					}}
																				/>
																			) : null}
																		</>
																	);
																}
															}}
														</TabPanel>
													</div>
													<div className="wp-block-guteblock-accordion__seprator Identifier" />
													<div className="wp-block-guteblock-accordion__seprator" />
													<ToggleControl
														label={__(
															"Enable Accordion Title",
															"guteblock"
														)}
														onChange={() => {
															this.props.setAttributes(
																{
																	isIHeadShown: !this
																		.props
																		.attributes
																		.isIHeadShown
																}
															);
														}}
														checked={
															isIHeadShown
														}
													/>
													{isIHeadShown ? (
														<Dropdown
															className="wp-block-guteblock-accordion__colorDropDown"
															contentClassName="inner-popover-content-Width"
															position="top left"
															renderToggle={({
																isOpen,
																onToggle
															}) => (
																<div className="wp-block-guteblock-accordion__widthAligner">
																	<Button
																		onClick={
																			onToggle
																		}
																		aria-expanded={
																			isOpen
																		}
																		className="wp-block-guteblock-accordion__widthAligner ButtonOnMainColor"
																	>
																		Heading
																		Settings
																	</Button>
																</div>
															)}
															renderContent={() => (
																<div className="inner-popover-content-Width">
																	{/* //PADDING */}
																	<PanelBody
																		title="Padding Settings"
																		initialOpen={
																			false
																		}
																	>
																		<PanelRow>
																			<h4
																				style={{
																					textAlign:
																						"center",
																					color:
																						"brown",
																					width:
																						"100%"
																				}}
																			>
																				This
																				is
																				for
																				controlling
																				Padding
																			</h4>
																		</PanelRow>
																		<Toolbar>
																			<TextControl
																				label="Top"
																				value={
																					IHeadingPadding.top
																				}
																				type="number"
																				onChange={paddingVal => {
																					const newVal = {
																						top: paddingVal,
																						bottom:
																							IHeadingPadding.bottom,
																						left:
																							IHeadingPadding.left,
																						right:
																							IHeadingPadding.right,
																						isEqualPadding:
																							IHeadingPadding.isEqualPadding
																					};
																					setAttributes(
																						{
																							IHeadingPadding: newVal
																						}
																					);
																				}}
																			/>
																			<TextControl
																				label="Bottom"
																				value={
																					IHeadingPadding.bottom
																				}
																				type="number"
																				onChange={paddingVal => {
																					const newVal = {
																						top:
																							IHeadingPadding.top,
																						bottom: paddingVal,
																						left:
																							IHeadingPadding.left,
																						right:
																							IHeadingPadding.right,
																						isEqualPadding:
																							IHeadingPadding.isEqualPadding
																					};
																					this.props.setAttributes(
																						{
																							IHeadingPadding: newVal
																						}
																					);
																				}}
																			/>
																			<TextControl
																				label="Left"
																				value={
																					IHeadingPadding.left
																				}
																				type="number"
																				onChange={paddingVal => {
																					const newVal = {
																						top:
																							IHeadingPadding.top,
																						bottom:
																							IHeadingPadding.bottom,
																						left: paddingVal,
																						right:
																							IHeadingPadding.right,
																						isEqualPadding:
																							IHeadingPadding.isEqualPadding
																					};
																					this.props.setAttributes(
																						{
																							IHeadingPadding: newVal
																						}
																					);
																				}}
																			/>
																			<TextControl
																				label="Right"
																				value={
																					IHeadingPadding.right
																				}
																				type="number"
																				onChange={paddingVal => {
																					const newVal = {
																						top:
																							IHeadingPadding.top,
																						bottom:
																							IHeadingPadding.bottom,
																						left:
																							IHeadingPadding.left,
																						right: paddingVal,
																						isEqualPadding:
																							IHeadingPadding.isEqualPadding
																					};
																					this.props.setAttributes(
																						{
																							IHeadingPadding: newVal
																						}
																					);
																				}}
																			/>
																		</Toolbar>
																		<Tooltip text="Use Padding Top To Adjust Value">
																			<ToggleControl
																				label={__(
																					"Enable Equal Padding for all Side",
																					"guteblock"
																				)}
																				onChange={
																					this
																						.toggleIHeadingPaddingEqualler
																				}
																				checked={
																					IHeadingPadding.isEqualPadding
																				}
																			/>
																		</Tooltip>
																	</PanelBody>
																	<div className="wp-block-guteblock-accordion__seprator" />
																	{/* MARGIN */}
																	<PanelBody
																		title="Margin Settings"
																		initialOpen={
																			false
																		}
																	>
																		<PanelRow>
																			<h4
																				style={{
																					textAlign:
																						"center",
																					color:
																						"brown",
																					width:
																						"100%"
																				}}
																			>
																				This
																				is
																				for
																				controlling
																				Margin
																			</h4>
																		</PanelRow>
																		<Toolbar>
																			<TextControl
																				label="Margin Bottom"
																				value={
																					IHeadingMargin.bottom
																				}
																				type="number"
																				onChange={marginVal => {
																					const newVal = {
																						top:
																							IHeadingMargin.top,
																						bottom: marginVal,
																						isSameNeeded:
																							IHeadingMargin.isSameNeeded
																					};
																					setAttributes(
																						{
																							IHeadingMargin: newVal
																						}
																					);
																				}}
																			/>
																			<TextControl
																				label="Margin Top"
																				value={
																					IHeadingMargin.top
																				}
																				type="number"
																				onChange={marginVal => {
																					const newVal = {
																						top: marginVal,
																						bottom:
																							IHeadingMargin.bottom,
																						isSameNeeded:
																							IHeadingMargin.isSameNeeded
																					};
																					setAttributes(
																						{
																							IHeadingMargin: newVal
																						}
																					);
																				}}
																			/>
																		</Toolbar>
																		<ToggleControl
																			label={__(
																				"Enable Equal Margin for Bottom & Top",
																				"guteblock"
																			)}
																			onChange={
																				this
																					.toggleIHeadingMarginEqualler
																			}
																			checked={
																				IHeadingMargin.isSameNeeded
																			}
																		/>
																	</PanelBody>
																	<div className="wp-block-guteblock-accordion__seprator" />
																	<RangeControl
																		label={__(
																			"Font Size",
																			"guteblock"
																		)}
																		value={
																			IHeadingFontSetup.size
																		}
																		onChange={aChange => {
																			const newAval = {
																				size: aChange,
																				weight:
																					IHeadingFontSetup.weight,
																				color:
																					IHeadingFontSetup.color,
																				style:
																					IHeadingFontSetup.style,
																				align:
																					IHeadingFontSetup.align,
																				lSpace:
																					IHeadingFontSetup.lSpace
																			};
																			setAttributes(
																				{
																					IHeadingFontSetup: newAval
																				}
																			);
																		}}
																		min={
																			12
																		}
																		max={
																			48
																		}
																		step={
																			1
																		}
																	/>
																	<div className="wp-block-guteblock-accordion__seprator" />
																	<PanelColorSettings
																		title={__(
																			"Color Settings",
																			"guteblock"
																		)}
																		colorSettings={[
																			{
																				value:
																					IHeadingFontSetup.color,
																				onChange: this
																					.onChangeIHeadingFontSetupColor,
																				label: __(
																					"Text Color",
																					"guteblock"
																				)
																			}
																		]}
																	/>
																	<div className="wp-block-guteblock-accordion__seprator" />
																	<div className="wp-block-guteblock-accordion alignTofull">
																		<AlignmentToolbar
																			onChange={changeAlign => {
																				const newVal = {
																					size:
																						IHeadingFontSetup.size,
																					weight:
																						IHeadingFontSetup.weight,
																					color:
																						IHeadingFontSetup.color,
																					style:
																						IHeadingFontSetup.style,
																					align: changeAlign,
																					lSpace:
																						IHeadingFontSetup.lSpace
																				};
																				setAttributes(
																					{
																						IHeadingFontSetup: newVal
																					}
																				);
																			}}
																			value={
																				IHeadingFontSetup.align
																			}
																			isCollapsed={
																				false
																			}
																		/>
																	</div>
																	<div className="wp-block-guteblock-accordion__seprator" />
																	<SelectControl
																		label="Font Weight"
																		value={
																			IHeadingFontSetup.weight
																		}
																		options={[
																			{
																				label:
																					"Bold",
																				value:
																					"700"
																			},
																			{
																				label:
																					"Bolder",
																				value:
																					"900"
																			},
																			{
																				label:
																					"Normal",
																				value:
																					"300"
																			},
																			{
																				label:
																					"500",
																				value:
																					"500"
																			},
																			{
																				label:
																					"Lighter",
																				value:
																					"100"
																			}
																		]}
																		onChange={headerFontWeight => {
																			const newVal = {
																				size:
																					IHeadingFontSetup.size,
																				weight: headerFontWeight,
																				color:
																					IHeadingFontSetup.color,
																				style:
																					IHeadingFontSetup.style,
																				align:
																					IHeadingFontSetup.align,
																				lSpace:
																					IHeadingFontSetup.lSpace
																			};
																			setAttributes(
																				{
																					IHeadingFontSetup: newVal
																				}
																			);
																		}}
																	/>
																	<div className="wp-block-guteblock-accordion__seprator" />
																	<SelectControl
																		label="Font Style"
																		value={
																			IHeadingFontSetup.style
																		}
																		options={[
																			{
																				label:
																					"Normal",
																				value:
																					"Normal"
																			},
																			{
																				label:
																					"Italic",
																				value:
																					"Italic"
																			},
																			{
																				label:
																					"Oblique",
																				value:
																					"Oblique"
																			}
																		]}
																		onChange={headerFontStyle => {
																			const newVal = {
																				size:
																					IHeadingFontSetup.size,
																				weight:
																					IHeadingFontSetup.weight,
																				color:
																					IHeadingFontSetup.color,
																				style: headerFontStyle,
																				align:
																					IHeadingFontSetup.align,
																				lSpace:
																					IHeadingFontSetup.lSpace
																			};
																			setAttributes(
																				{
																					IHeadingFontSetup: newVal
																				}
																			);
																		}}
																	/>
																	<div className="wp-block-guteblock-accordion__seprator" />
																	<RangeControl
																		label={__(
																			"Letter Spacing",
																			"guteblock"
																		)}
																		value={
																			IHeadingFontSetup.lSpace
																		}
																		onChange={aChange => {
																			const newAval = {
																				size:
																					IHeadingFontSetup.size,
																				weight:
																					IHeadingFontSetup.weight,
																				color:
																					IHeadingFontSetup.color,
																				style:
																					IHeadingFontSetup.style,
																				align:
																					IHeadingFontSetup.align,
																				lSpace: aChange
																			};
																			setAttributes(
																				{
																					IHeadingFontSetup: newAval
																				}
																			);
																		}}
																		min={
																			1
																		}
																		max={
																			10
																		}
																		step={
																			1
																		}
																	/>
																</div>
															)}
														/>
													) : null}
													<div className="wp-block-guteblock-accordion__seprator" />
												</>
											);
										case "Icon":
											return (
												<>
													{!activateIconPosToBelow ? (
														<>
															<div className="wp-block-guteblock-accordion__seprator" />
															<RangeControl
																label={__(
																	"Size of Icon",
																	"guteblock"
																)}
																value={
																	iconNormalSetup.size
																}
																onChange={aChange => {
																	if (
																		aChange ===
																		undefined
																	) {
																		this.updateiconNormalSetup(
																			"size",
																			5
																		);
																	} else {
																		this.updateiconNormalSetup(
																			"size",
																			aChange
																		);
																	}
																}}
																allowReset
																min={
																	6
																}
																max={
																	10
																}
																step={
																	0.5
																}
															/>
															<div className="wp-block-guteblock-accordion__seprator" />
															<PanelColorSettings
																title={__(
																	"Color Settings",
																	"guteblock"
																)}
																initialOpen={
																	false
																}
																colorSettings={[
																	{
																		value:
																			iconNormalSetup.color,
																		onChange: achnageColor =>
																			this.updateiconNormalSetup(
																				"color",
																				achnageColor
																			),
																		label: __(
																			"Background Color",
																			"guteblock"
																		)
																	}
																]}
															/>
															<div className="wp-block-guteblock-accordion__seprator" />
															<RangeControl
																label={__(
																	"Vertical Position",
																	"guteblock"
																)}
																value={
																	iconNormalSetup.horizontal
																}
																onChange={aChange => {
																	if (
																		aChange ===
																		undefined
																	) {
																		this.updateiconNormalSetup(
																			"horizontal",
																			50
																		);
																	} else {
																		this.updateiconNormalSetup(
																			"horizontal",
																			aChange
																		);
																	}
																}}
																allowReset
																min={
																	30
																}
																max={
																	90
																}
																step={
																	1
																}
															/>
															<div className="wp-block-guteblock-accordion__seprator" />
															<RangeControl
																label={__(
																	"Horizontal Position",
																	"guteblock"
																)}
																value={
																	iconNormalSetup.vertical
																}
																onChange={aChange => {
																	if (
																		aChange ===
																		undefined
																	) {
																		this.updateiconNormalSetup(
																			"vertical",
																			5
																		);
																	} else {
																		this.updateiconNormalSetup(
																			"vertical",
																			aChange
																		);
																	}
																}}
																allowReset
																min={
																	1
																}
																max={
																	40
																}
																step={
																	0.5
																}
															/>
														</>
													) : null}
													<div className="wp-block-guteblock-accordion__seprator" />
													{styleName ===
													"2" ? (
														<>
															<Tooltip text="Icon position will change to Bottom of Accordion">
																<ToggleControl
																	label={__(
																		"Activate Bottom Icon ",
																		"guteblock"
																	)}
																	onChange={() => {
																		this.props.setAttributes(
																			{
																				activateIconPosToBelow: !this
																					.props
																					.attributes
																					.activateIconPosToBelow
																			}
																		);
																	}}
																	checked={
																		activateIconPosToBelow
																	}
																/>
															</Tooltip>
														</>
													) : null}
													<div className="wp-block-guteblock-accordion__seprator" />
													{styleName ===
													"2" ? (
														<>
															{activateIconPosToBelow ? (
																<>
																	<PanelBody
																		title="Icon Settings"
																		initialOpen={
																			false
																		}
																	>
																		<RangeControl
																			label={__(
																				"Size of Icon",
																				"guteblock"
																			)}
																			value={
																				iconBelowSetup.size
																			}
																			onChange={aChange => {
																				if (
																					aChange ===
																					undefined
																				) {
																					this.updateiconBelowSetup(
																						"size",
																						24
																					);
																				} else {
																					this.updateiconBelowSetup(
																						"size",
																						aChange
																					);
																				}
																			}}
																			allowReset
																			min={
																				24
																			}
																			max={
																				30
																			}
																			step={
																				0.5
																			}
																		/>
																		<div className="wp-block-guteblock-accordion__seprator" />
																		<PanelColorSettings
																			title={__(
																				"Color Settings",
																				"guteblock"
																			)}
																			initialOpen={
																				false
																			}
																			colorSettings={[
																				{
																					value:
																						iconBelowSetup.color,
																					onChange: achnageColor =>
																						this.updateiconBelowSetup(
																							"color",
																							achnageColor
																						),
																					label: __(
																						"Icon Color",
																						"guteblock"
																					)
																				},
																				{
																					value:
																						iconBelowSetup.bgcolor,
																					onChange: achnageColor =>
																						this.updateiconBelowSetup(
																							"bgcolor",
																							achnageColor
																						),
																					label: __(
																						"Background Color",
																						"guteblock"
																					)
																				}
																			]}
																		/>
																		<div className="wp-block-guteblock-accordion__seprator" />

																		<div className="wp-block-guteblock-accordion__seprator" />
																		<RangeControl
																			label={__(
																				"Horizontal Position",
																				"guteblock"
																			)}
																			value={
																				iconBelowSetup.horizontal
																			}
																			onChange={aChange => {
																				if (
																					aChange ===
																					undefined
																				) {
																					this.updateiconBelowSetup(
																						"horizontal",
																						5
																					);
																				} else {
																					this.updateiconBelowSetup(
																						"horizontal",
																						aChange
																					);
																				}
																			}}
																			allowReset
																			min={
																				1
																			}
																			max={
																				95
																			}
																			step={
																				0.5
																			}
																		/>
																		<div className="wp-block-guteblock-accordion__seprator" />
																		<RangeControl
																			label={__(
																				"Border Radius",
																				"guteblock"
																			)}
																			value={
																				iconBelowSetup.bRadius
																			}
																			onChange={aChange => {
																				if (
																					aChange ===
																					undefined
																				) {
																					this.updateiconBelowSetup(
																						"bRadius",
																						0
																					);
																				} else {
																					this.updateiconBelowSetup(
																						"bRadius",
																						aChange
																					);
																				}
																			}}
																			allowReset
																			min={
																				1
																			}
																			max={
																				iconBelowSetup.size *
																				2
																			}
																			step={
																				1
																			}
																		/>
																		<div className="wp-block-guteblock-accordion__seprator" />
																	</PanelBody>
																</>
															) : null}
														</>
													) : null}

													<div className="wp-block-guteblock-accordion__seprator" />
													{styleName ===
													"2" ? (
														<>
															<PanelBody
																title="Advanced Settings"
																initialOpen={
																	false
																}
															>
																<ToggleControl
																	label={__(
																		"Enable Title Image",
																		"guteblock"
																	)}
																	onChange={
																		this
																			.toggleisTitleImageIsneeded
																	}
																	checked={
																		isTitleImageIsneeded
																	}
																/>
																{isTitleImageIsneeded ? (
																	<>
																		<div className="wp-block-guteblock-accordion__seprator" />
																		<RangeControl
																			label={__(
																				"width",
																				"guteblock"
																			)}
																			value={
																				iconImageSetup.width
																			}
																			onChange={aChange => {
																				if (
																					aChange ===
																					undefined
																				) {
																					this.updateiconImageSetup(
																						"width",
																						5
																					);
																				} else {
																					this.updateiconImageSetup(
																						"width",
																						aChange
																					);
																				}
																			}}
																			allowReset
																			min={
																				6
																			}
																			max={
																				10
																			}
																			step={
																				0.5
																			}
																		/>
																		<div className="wp-block-guteblock-accordion__seprator" />
																		<RangeControl
																			label={__(
																				"Background Brightness",
																				"guteblock"
																			)}
																			value={
																				iconImageBgSetup.a
																			}
																			onChange={aChange => {
																				if (
																					aChange ===
																					undefined
																				) {
																					const newAval = {
																						r:
																							iconImageBgSetup.r,
																						g:
																							iconImageBgSetup.g,
																						b:
																							iconImageBgSetup.b,
																						a: 0.8,
																						realColor:
																							iconImageBgSetup.realColor
																					};
																					setAttributes(
																						{
																							iconImageBgSetup: newAval
																						}
																					);
																				} else {
																					const newAval = {
																						r:
																							iconImageBgSetup.r,
																						g:
																							iconImageBgSetup.g,
																						b:
																							iconImageBgSetup.b,
																						a: aChange,
																						realColor:
																							iconImageBgSetup.realColor
																					};
																					setAttributes(
																						{
																							iconImageBgSetup: newAval
																						}
																					);
																				}
																			}}
																			allowReset
																			min={
																				0.1
																			}
																			max={
																				1
																			}
																			step={
																				0.01
																			}
																		/>
																		<div className="wp-block-guteblock-accordion__seprator" />
																		<PanelColorSettings
																			title={__(
																				"Color Settings",
																				"guteblock"
																			)}
																			initialOpen={
																				false
																			}
																			colorSettings={[
																				{
																					value:
																						iconImageBgSetup.realColor,
																					onChange: this
																						.onChangeiconImageBgSetupd,
																					label: __(
																						"Background Color",
																						"guteblock"
																					)
																				}
																			]}
																		/>
																		<div className="wp-block-guteblock-accordion__seprator" />
																		<RangeControl
																			label={__(
																				"Padding",
																				"guteblock"
																			)}
																			value={
																				iconImageSetup.padding
																			}
																			onChange={aChange => {
																				if (
																					aChange ===
																					undefined
																				) {
																					this.updateiconImageSetup(
																						"padding",
																						5
																					);
																				} else {
																					this.updateiconImageSetup(
																						"padding",
																						aChange
																					);
																				}
																			}}
																			allowReset
																			min={
																				0
																			}
																			max={
																				15
																			}
																			step={
																				0.4
																			}
																		/>
																		<div className="wp-block-guteblock-accordion__seprator" />
																		<RangeControl
																			label={__(
																				"Horizontal Margin",
																				"guteblock"
																			)}
																			value={
																				iconImageSetup.OuterMleft
																			}
																			onChange={aChange => {
																				if (
																					aChange ===
																					undefined
																				) {
																					this.updateiconImageSetup(
																						"OuterMleft",
																						5
																					);
																				} else {
																					this.updateiconImageSetup(
																						"OuterMleft",
																						aChange
																					);
																				}
																			}}
																			allowReset
																			min={
																				0
																			}
																			max={
																				10
																			}
																			step={
																				0.5
																			}
																		/>
																		<div className="wp-block-guteblock-accordion__seprator" />
																		<RangeControl
																			label={__(
																				"Vertical Margin",
																				"guteblock"
																			)}
																			value={
																				iconImageSetup.OuterMtop
																			}
																			onChange={aChange => {
																				if (
																					aChange ===
																					undefined
																				) {
																					this.updateiconImageSetup(
																						"OuterMtop",
																						5
																					);
																				} else {
																					this.updateiconImageSetup(
																						"OuterMtop",
																						aChange
																					);
																				}
																			}}
																			allowReset
																			min={
																				0
																			}
																			max={
																				10
																			}
																			step={
																				0.5
																			}
																		/>
																		<div className="wp-block-guteblock-accordion__seprator" />
																		<RangeControl
																			label={__(
																				"Border Radius",
																				"guteblock"
																			)}
																			value={
																				iconImageSetup.borderRadius
																			}
																			onChange={aChange => {
																				if (
																					aChange ===
																					undefined
																				) {
																					this.updateiconImageSetup(
																						"borderRadius",
																						0
																					);
																				} else {
																					this.updateiconImageSetup(
																						"borderRadius",
																						aChange
																					);
																				}
																			}}
																			allowReset
																			min={
																				0
																			}
																			max={
																				50
																			}
																			step={
																				0.5
																			}
																		/>
																	</>
																) : null}
															</PanelBody>
														</>
													) : null}
												</>
											);
										default:
											break;
									}
								}}
							</TabPanel>
						</InspectorControls>

						<div
							className={classes}
							style={{
								backgroundColor: `rgba(${conatinerBgColor.r},${conatinerBgColor.g},${conatinerBgColor.b},${conatinerBgColor.a})`,
								paddingTop: !containerPadding.isEqualPadding
									? `${containerPadding.top}px`
									: `${containerPadding.top}px`,
								paddingBottom: !containerPadding.isEqualPadding
									? `${containerPadding.bottom}px`
									: `${containerPadding.top}px`,
								paddingRight: !containerPadding.isEqualPadding
									? `${containerPadding.right}px`
									: `${containerPadding.top}px`,
								paddingLeft: !containerPadding.isEqualPadding
									? `${containerPadding.left}px`
									: `${containerPadding.top}px`,
								marginTop: !containerMargin.isSameNeeded
									? `${containerMargin.top}px`
									: `${containerMargin.top}px`,
								marginBottom: !containerMargin.isSameNeeded
									? `${containerMargin.bottom}px`
									: `${containerMargin.top}px`
							}}
						>
							<div
								className="wp-block-guteblock-accordion__Inner-Container"
								style={{
									width: `${IConatinerWidth}%`,
									backgroundColor: `rgba(${IconatinerBgColor.r},${IconatinerBgColor.g},${IconatinerBgColor.b},${IconatinerBgColor.a})`,
									paddingTop: !IcontainerPadding.isEqualPadding
										? `${IcontainerPadding.top}px`
										: `${IcontainerPadding.top}px`,
									paddingBottom: !IcontainerPadding.isEqualPadding
										? `${IcontainerPadding.bottom}px`
										: `${IcontainerPadding.top}px`,
									paddingRight: !IcontainerPadding.isEqualPadding
										? `${IcontainerPadding.right}px`
										: `${IcontainerPadding.top}px`,
									paddingLeft: !IcontainerPadding.isEqualPadding
										? `${IcontainerPadding.left}px`
										: `${IcontainerPadding.top}px`,
									marginTop: !IcontainerMargin.isSameNeeded
										? `${IcontainerMargin.top}px`
										: `${IcontainerMargin.top}px`,
									marginBottom: !IcontainerMargin.isSameNeeded
										? `${IcontainerMargin.bottom}px`
										: `${IcontainerMargin.top}px`,
									borderRadius: `${IcontainerBorderRadius}px`,
									boxShadow: IConatinerBoxShadow.isNeeded
										? `${IConatinerBoxShadow.xoffset}px  ${IConatinerBoxShadow.yOffset}px ${IConatinerBoxShadow.Blur}px ${IConatinerBoxShadow.spreadShadow}px ${IConatinerBoxShadow.colorShadow}`
										: "none"
								}}
							>
								{isIHeadShown ? (
									<div
										className="wp-block-guteblock-accordion__ihead"
										style={{
											paddingTop: !IHeadingPadding.isEqualPadding
												? `${IHeadingPadding.top}px`
												: `${IHeadingPadding.top}px`,
											paddingBottom: !IHeadingPadding.isEqualPadding
												? `${IHeadingPadding.bottom}px`
												: `${IHeadingPadding.top}px`,
											paddingRight: !IHeadingPadding.isEqualPadding
												? `${IHeadingPadding.right}px`
												: `${IHeadingPadding.top}px`,
											paddingLeft: !IHeadingPadding.isEqualPadding
												? `${IHeadingPadding.left}px`
												: `${IHeadingPadding.top}px`,
											marginTop: !IHeadingMargin.isSameNeeded
												? `${IHeadingMargin.top}px`
												: `${IHeadingMargin.top}px`,
											marginBottom: !IHeadingMargin.isSameNeeded
												? `${IHeadingMargin.bottom}px`
												: `${IHeadingMargin.top}px`
										}}
									>
										<RichText
											className={
												"wp-block-guteblock-accordion__title"
											}
											style={{
												fontSize: `${IHeadingFontSetup.size}px`,
												color:
													IHeadingFontSetup.color,
												fontStyle:
													IHeadingFontSetup.style,
												fontWeight:
													IHeadingFontSetup.weight,
												textAlign:
													IHeadingFontSetup.align,
												letterSpacing: `${IHeadingFontSetup.lSpace}px`
											}}
											tagName="p"
											onChange={changedTitle => {
												this.props.setAttributes(
													{
														IHeading: changedTitle
													}
												);
											}}
											value={IHeading}
											placeholder={__(
												"Accordion Heading",
												"guteblock"
											)}
										/>
									</div>
								) : null}

								{accordions.map((accordion, index) => {
									return (
										<>
											<div
												className="wp-block-guteblock-accordion-main-holder"
												key={index}
												onClick={() => {
													this.setState({
														selectedAccordion: index
													});
												}}
												style={{
													backgroundColor: `rgba(${AconatinerBgColor.r},${AconatinerBgColor.g},${AconatinerBgColor.b},${AconatinerBgColor.a})`,
													paddingTop: !AcontainerPadding.isEqualPadding
														? `${AcontainerPadding.top}px`
														: `${AcontainerPadding.top}px`,
													paddingBottom: !AcontainerPadding.isEqualPadding
														? `${AcontainerPadding.bottom}px`
														: `${AcontainerPadding.top}px`,
													paddingRight: !AcontainerPadding.isEqualPadding
														? `${AcontainerPadding.right}px`
														: `${AcontainerPadding.top}px`,
													paddingLeft: !AcontainerPadding.isEqualPadding
														? `${AcontainerPadding.left}px`
														: `${AcontainerPadding.top}px`,
													marginTop: !AcontainerMargin.isSameNeeded
														? `${AcontainerMargin.top}px`
														: `${AcontainerMargin.top}px`,
													marginBottom: !AcontainerMargin.isSameNeeded
														? `${AcontainerMargin.bottom}px`
														: `${AcontainerMargin.top}px`,
													borderRadius: `${AcontainerBorderRadius}px`,
													boxShadow: AConatinerBoxShadow.isNeeded
														? `${AConatinerBoxShadow.xoffset}px  ${AConatinerBoxShadow.yOffset}px ${AConatinerBoxShadow.Blur}px ${AConatinerBoxShadow.spreadShadow}px ${AConatinerBoxShadow.colorShadow}`
														: "none"
												}}
											>
												<div className="accordion-remove-btn">
													<Dashicon
														icon={
															"trash"
														}
														size={30}
														color="#ed6558"
														onClick={e => {
															this.removeAccordion(
																e,
																index
															);
														}}
													/>
												</div>
												{styleName ===
												"2" ? (
													<>
														{CcontainerSplitIsNeeded ? (
															<>
																{accordion.isInnerTitleShown ? (
																	<div className="accordion-split-btn">
																		<Tooltip text="Remove Splitted Content">
																			<p
																				onClick={() => {
																					this.updateAccordion(
																						"isInnerTitleShown",
																						!accordion.isInnerTitleShown,
																						index
																					);
																				}}
																			>
																				<svg
																					id="prefix__Layer_1"
																					x={
																						0
																					}
																					y={
																						0
																					}
																					viewBox="0 0 24 24"
																					xmlSpace="preserve"
																					height="25"
																					width="25"
																				>
																					<style />
																					<linearGradient
																						id="prefix__SVGID_1_"
																						gradientUnits="userSpaceOnUse"
																						x1={
																							23.655
																						}
																						y1={
																							7.634
																						}
																						x2={
																							12.835
																						}
																						y2={
																							21.031
																						}
																					>
																						<stop
																							offset={
																								0
																							}
																							stopColor="#eb7d31"
																						/>
																						<stop
																							offset={
																								1
																							}
																							stopColor="#ee576f"
																						/>
																					</linearGradient>
																					<path
																						d="M20.64 13.97h-5.83c-.55 0-1 .45-1 1s.45 1 1 1h5.83c.55 0 1-.45 1-1s-.45-1-1-1z"
																						fill="url(#prefix__SVGID_1_)"
																					/>
																					<linearGradient
																						id="prefix__SVGID_2_"
																						gradientUnits="userSpaceOnUse"
																						x1={
																							21.836
																						}
																						y1={
																							6.164
																						}
																						x2={
																							11.015
																						}
																						y2={
																							19.561
																						}
																					>
																						<stop
																							offset={
																								0
																							}
																							stopColor="#eb7d31"
																						/>
																						<stop
																							offset={
																								1
																							}
																							stopColor="#ee576f"
																						/>
																					</linearGradient>
																					<path
																						d="M13.82 11.25c0 .55.45 1 1 1h5.83c.55 0 1-.45 1-1s-.45-1-1-1h-5.83c-.56 0-1 .45-1 1z"
																						fill="url(#prefix__SVGID_2_)"
																					/>
																					<linearGradient
																						id="prefix__SVGID_3_"
																						gradientUnits="userSpaceOnUse"
																						x1={
																							12.242
																						}
																						y1={
																							-1.584
																						}
																						x2={
																							1.422
																						}
																						y2={
																							11.813
																						}
																					>
																						<stop
																							offset={
																								0
																							}
																							stopColor="#eb7d31"
																						/>
																						<stop
																							offset={
																								1
																							}
																							stopColor="#ee576f"
																						/>
																					</linearGradient>
																					<path
																						d="M10.18 5.81c0-.55-.45-1-1-1H3.36c-.55 0-1 .45-1 1s.45 1 1 1h5.82c.56 0 1-.45 1-1z"
																						fill="url(#prefix__SVGID_3_)"
																					/>
																					<linearGradient
																						id="prefix__SVGID_4_"
																						gradientUnits="userSpaceOnUse"
																						x1={
																							25.475
																						}
																						y1={
																							9.104
																						}
																						x2={
																							14.655
																						}
																						y2={
																							22.501
																						}
																					>
																						<stop
																							offset={
																								0
																							}
																							stopColor="#eb7d31"
																						/>
																						<stop
																							offset={
																								1
																							}
																							stopColor="#ee576f"
																						/>
																					</linearGradient>
																					<path
																						d="M20.64 17.7h-5.83c-.55 0-1 .45-1 1s.45 1 1 1h5.83c.55 0 1-.45 1-1s-.45-1-1-1z"
																						fill="url(#prefix__SVGID_4_)"
																					/>
																					<linearGradient
																						id="prefix__SVGID_5_"
																						gradientUnits="userSpaceOnUse"
																						x1={
																							17.617
																						}
																						y1={
																							2.757
																						}
																						x2={
																							6.797
																						}
																						y2={
																							16.154
																						}
																					>
																						<stop
																							offset={
																								0
																							}
																							stopColor="#eb7d31"
																						/>
																						<stop
																							offset={
																								1
																							}
																							stopColor="#ee576f"
																						/>
																					</linearGradient>
																					<path
																						d="M14.53 4.44c-.48-.28-1.09-.11-1.37.36L5.41 18.19c-.28.48-.11 1.09.36 1.37.16.09.33.13.5.13.35 0 .68-.18.87-.5L14.9 5.8c.27-.47.11-1.08-.37-1.36z"
																						fill="url(#prefix__SVGID_5_)"
																					/>
																				</svg>
																			</p>
																		</Tooltip>
																	</div>
																) : (
																	<div className="accordion-split-btn">
																		<Tooltip text="Add a Splitted Content">
																			<p
																				onClick={() => {
																					this.updateAccordion(
																						"isInnerTitleShown",
																						!accordion.isInnerTitleShown,
																						index
																					);
																				}}
																			>
																				<svg
																					id="prefix__Layer_1"
																					x={
																						0
																					}
																					y={
																						0
																					}
																					viewBox="0 0 24 24"
																					xmlSpace="preserve"
																					height="25"
																					width="25"
																				>
																					<style />
																					<linearGradient
																						id="prefix__SVGID_1_"
																						gradientUnits="userSpaceOnUse"
																						x1={
																							23.655
																						}
																						y1={
																							7.634
																						}
																						x2={
																							12.835
																						}
																						y2={
																							21.031
																						}
																					>
																						<stop
																							offset={
																								0
																							}
																							stopColor="#eb7d31"
																						/>
																						<stop
																							offset={
																								1
																							}
																							stopColor="#ee576f"
																						/>
																					</linearGradient>
																					<path
																						d="M20.64 13.97h-5.83c-.55 0-1 .45-1 1s.45 1 1 1h5.83c.55 0 1-.45 1-1s-.45-1-1-1z"
																						fill="url(#prefix__SVGID_1_)"
																					/>
																					<linearGradient
																						id="prefix__SVGID_2_"
																						gradientUnits="userSpaceOnUse"
																						x1={
																							21.836
																						}
																						y1={
																							6.164
																						}
																						x2={
																							11.015
																						}
																						y2={
																							19.561
																						}
																					>
																						<stop
																							offset={
																								0
																							}
																							stopColor="#eb7d31"
																						/>
																						<stop
																							offset={
																								1
																							}
																							stopColor="#ee576f"
																						/>
																					</linearGradient>
																					<path
																						d="M13.82 11.25c0 .55.45 1 1 1h5.83c.55 0 1-.45 1-1s-.45-1-1-1h-5.83c-.56 0-1 .45-1 1z"
																						fill="url(#prefix__SVGID_2_)"
																					/>
																					<linearGradient
																						id="prefix__SVGID_3_"
																						gradientUnits="userSpaceOnUse"
																						x1={
																							12.242
																						}
																						y1={
																							-1.584
																						}
																						x2={
																							1.422
																						}
																						y2={
																							11.813
																						}
																					>
																						<stop
																							offset={
																								0
																							}
																							stopColor="#eb7d31"
																						/>
																						<stop
																							offset={
																								1
																							}
																							stopColor="#ee576f"
																						/>
																					</linearGradient>
																					<path
																						d="M10.18 5.81c0-.55-.45-1-1-1H3.36c-.55 0-1 .45-1 1s.45 1 1 1h5.82c.56 0 1-.45 1-1z"
																						fill="url(#prefix__SVGID_3_)"
																					/>
																					<linearGradient
																						id="prefix__SVGID_4_"
																						gradientUnits="userSpaceOnUse"
																						x1={
																							25.475
																						}
																						y1={
																							9.104
																						}
																						x2={
																							14.655
																						}
																						y2={
																							22.501
																						}
																					>
																						<stop
																							offset={
																								0
																							}
																							stopColor="#eb7d31"
																						/>
																						<stop
																							offset={
																								1
																							}
																							stopColor="#ee576f"
																						/>
																					</linearGradient>
																					<path
																						d="M20.64 17.7h-5.83c-.55 0-1 .45-1 1s.45 1 1 1h5.83c.55 0 1-.45 1-1s-.45-1-1-1z"
																						fill="url(#prefix__SVGID_4_)"
																					/>
																					<linearGradient
																						id="prefix__SVGID_5_"
																						gradientUnits="userSpaceOnUse"
																						x1={
																							17.617
																						}
																						y1={
																							2.757
																						}
																						x2={
																							6.797
																						}
																						y2={
																							16.154
																						}
																					>
																						<stop
																							offset={
																								0
																							}
																							stopColor="#eb7d31"
																						/>
																						<stop
																							offset={
																								1
																							}
																							stopColor="#ee576f"
																						/>
																					</linearGradient>
																					<path
																						d="M14.53 4.44c-.48-.28-1.09-.11-1.37.36L5.41 18.19c-.28.48-.11 1.09.36 1.37.16.09.33.13.5.13.35 0 .68-.18.87-.5L14.9 5.8c.27-.47.11-1.08-.37-1.36z"
																						fill="url(#prefix__SVGID_5_)"
																					/>
																				</svg>
																			</p>
																		</Tooltip>
																	</div>
																)}
																{accordion.isInnerTitleShown ? (
																	<>
																		{accordion.islongContentWithSplit ? (
																			<div className="accordion-split-btn-exc">
																				<Tooltip text="Remove Lengthy Content">
																					<p
																						onClick={() => {
																							this.updateAccordion(
																								"islongContentWithSplit",
																								!accordion.islongContentWithSplit,
																								index
																							);
																						}}
																					>
																						<svg
																							id="prefix__Layer_1"
																							x={
																								0
																							}
																							y={
																								0
																							}
																							viewBox="0 0 24 24"
																							xmlSpace="preserve"
																							height="25"
																							width="25"
																						>
																							<style />
																							<linearGradient
																								id="prefix__SVGID_1_"
																								gradientUnits="userSpaceOnUse"
																								x1={
																									25.692
																								}
																								y1={
																									5.727
																								}
																								x2={
																									10.454
																								}
																								y2={
																									24.382
																								}
																							>
																								<stop
																									offset={
																										0
																									}
																									stopColor="#eb7d31"
																								/>
																								<stop
																									offset={
																										1
																									}
																									stopColor="#ee576f"
																								/>
																							</linearGradient>
																							<path
																								d="M20.46 17.46h-7.07c-.55 0-1-.45-1-1s.45-1 1-1h7.07c.55 0 1 .45 1 1s-.45 1-1 1z"
																								fill="url(#prefix__SVGID_1_)"
																							/>
																							<linearGradient
																								id="prefix__SVGID_2_"
																								gradientUnits="userSpaceOnUse"
																								x1={
																									23.907
																								}
																								y1={
																									4.269
																								}
																								x2={
																									8.668
																								}
																								y2={
																									22.923
																								}
																							>
																								<stop
																									offset={
																										0
																									}
																									stopColor="#eb7d31"
																								/>
																								<stop
																									offset={
																										1
																									}
																									stopColor="#ee576f"
																								/>
																							</linearGradient>
																							<path
																								d="M20.46 13.82h-7.07c-.55 0-1-.45-1-1s.45-1 1-1h7.07c.55 0 1 .45 1 1s-.45 1-1 1z"
																								fill="url(#prefix__SVGID_2_)"
																							/>
																							<linearGradient
																								id="prefix__SVGID_3_"
																								gradientUnits="userSpaceOnUse"
																								x1={
																									17.514
																								}
																								y1={
																									-0.954
																								}
																								x2={
																									2.276
																								}
																								y2={
																									17.701
																								}
																							>
																								<stop
																									offset={
																										0
																									}
																									stopColor="#eb7d31"
																								/>
																								<stop
																									offset={
																										1
																									}
																									stopColor="#ee576f"
																								/>
																							</linearGradient>
																							<path
																								d="M8.98 13.82H3.54c-.55 0-1-.45-1-1s.45-1 1-1h5.44c.55 0 1 .45 1 1s-.44 1-1 1z"
																								fill="url(#prefix__SVGID_3_)"
																							/>
																							<g>
																								<linearGradient
																									id="prefix__SVGID_4_"
																									gradientUnits="userSpaceOnUse"
																									x1={
																										16.906
																									}
																									y1={
																										-1.45
																									}
																									x2={
																										1.667
																									}
																									y2={
																										17.204
																									}
																								>
																									<stop
																										offset={
																											0
																										}
																										stopColor="#eb7d31"
																									/>
																									<stop
																										offset={
																											1
																										}
																										stopColor="#ee576f"
																									/>
																								</linearGradient>
																								<path
																									d="M20.46 5.56H3.54c-.55 0-1-.45-1-1s.45-1 1-1h16.91c.55 0 1 .45 1 1s-.44 1-.99 1z"
																									fill="url(#prefix__SVGID_4_)"
																								/>
																							</g>
																							<g>
																								<linearGradient
																									id="prefix__SVGID_5_"
																									gradientUnits="userSpaceOnUse"
																									x1={
																										18.806
																									}
																									y1={
																										0.102
																									}
																									x2={
																										3.567
																									}
																									y2={
																										18.756
																									}
																								>
																									<stop
																										offset={
																											0
																										}
																										stopColor="#eb7d31"
																									/>
																									<stop
																										offset={
																											1
																										}
																										stopColor="#ee576f"
																									/>
																								</linearGradient>
																								<path
																									d="M20.46 9.43H3.54c-.55 0-1-.45-1-1s.45-1 1-1h16.91c.55 0 1 .45 1 1s-.44 1-.99 1z"
																									fill="url(#prefix__SVGID_5_)"
																								/>
																							</g>
																							<g>
																								<linearGradient
																									id="prefix__SVGID_6_"
																									gradientUnits="userSpaceOnUse"
																									x1={
																										27.478
																									}
																									y1={
																										7.186
																									}
																									x2={
																										12.239
																									}
																									y2={
																										25.84
																									}
																								>
																									<stop
																										offset={
																											0
																										}
																										stopColor="#eb7d31"
																									/>
																									<stop
																										offset={
																											1
																										}
																										stopColor="#ee576f"
																									/>
																								</linearGradient>
																								<path
																									d="M20.46 21.11h-7.07c-.55 0-1-.45-1-1s.45-1 1-1h7.07c.55 0 1 .45 1 1s-.45 1-1 1z"
																									fill="url(#prefix__SVGID_6_)"
																								/>
																							</g>
																						</svg>
																					</p>
																				</Tooltip>
																			</div>
																		) : (
																			<div className="accordion-split-btn-exc">
																				<Tooltip text="Add Lengthy Content">
																					<p
																						onClick={() => {
																							this.updateAccordion(
																								"islongContentWithSplit",
																								!accordion.islongContentWithSplit,
																								index
																							);
																						}}
																					>
																						<svg
																							id="prefix__Layer_1"
																							x={
																								0
																							}
																							y={
																								0
																							}
																							viewBox="0 0 24 24"
																							xmlSpace="preserve"
																							height="25"
																							width="25"
																						>
																							<style />
																							<linearGradient
																								id="prefix__SVGID_1_"
																								gradientUnits="userSpaceOnUse"
																								x1={
																									25.692
																								}
																								y1={
																									5.727
																								}
																								x2={
																									10.454
																								}
																								y2={
																									24.382
																								}
																							>
																								<stop
																									offset={
																										0
																									}
																									stopColor="#eb7d31"
																								/>
																								<stop
																									offset={
																										1
																									}
																									stopColor="#ee576f"
																								/>
																							</linearGradient>
																							<path
																								d="M20.46 17.46h-7.07c-.55 0-1-.45-1-1s.45-1 1-1h7.07c.55 0 1 .45 1 1s-.45 1-1 1z"
																								fill="url(#prefix__SVGID_1_)"
																							/>
																							<linearGradient
																								id="prefix__SVGID_2_"
																								gradientUnits="userSpaceOnUse"
																								x1={
																									23.907
																								}
																								y1={
																									4.269
																								}
																								x2={
																									8.668
																								}
																								y2={
																									22.923
																								}
																							>
																								<stop
																									offset={
																										0
																									}
																									stopColor="#eb7d31"
																								/>
																								<stop
																									offset={
																										1
																									}
																									stopColor="#ee576f"
																								/>
																							</linearGradient>
																							<path
																								d="M20.46 13.82h-7.07c-.55 0-1-.45-1-1s.45-1 1-1h7.07c.55 0 1 .45 1 1s-.45 1-1 1z"
																								fill="url(#prefix__SVGID_2_)"
																							/>
																							<linearGradient
																								id="prefix__SVGID_3_"
																								gradientUnits="userSpaceOnUse"
																								x1={
																									17.514
																								}
																								y1={
																									-0.954
																								}
																								x2={
																									2.276
																								}
																								y2={
																									17.701
																								}
																							>
																								<stop
																									offset={
																										0
																									}
																									stopColor="#eb7d31"
																								/>
																								<stop
																									offset={
																										1
																									}
																									stopColor="#ee576f"
																								/>
																							</linearGradient>
																							<path
																								d="M8.98 13.82H3.54c-.55 0-1-.45-1-1s.45-1 1-1h5.44c.55 0 1 .45 1 1s-.44 1-1 1z"
																								fill="url(#prefix__SVGID_3_)"
																							/>
																							<g>
																								<linearGradient
																									id="prefix__SVGID_4_"
																									gradientUnits="userSpaceOnUse"
																									x1={
																										16.906
																									}
																									y1={
																										-1.45
																									}
																									x2={
																										1.667
																									}
																									y2={
																										17.204
																									}
																								>
																									<stop
																										offset={
																											0
																										}
																										stopColor="#eb7d31"
																									/>
																									<stop
																										offset={
																											1
																										}
																										stopColor="#ee576f"
																									/>
																								</linearGradient>
																								<path
																									d="M20.46 5.56H3.54c-.55 0-1-.45-1-1s.45-1 1-1h16.91c.55 0 1 .45 1 1s-.44 1-.99 1z"
																									fill="url(#prefix__SVGID_4_)"
																								/>
																							</g>
																							<g>
																								<linearGradient
																									id="prefix__SVGID_5_"
																									gradientUnits="userSpaceOnUse"
																									x1={
																										18.806
																									}
																									y1={
																										0.102
																									}
																									x2={
																										3.567
																									}
																									y2={
																										18.756
																									}
																								>
																									<stop
																										offset={
																											0
																										}
																										stopColor="#eb7d31"
																									/>
																									<stop
																										offset={
																											1
																										}
																										stopColor="#ee576f"
																									/>
																								</linearGradient>
																								<path
																									d="M20.46 9.43H3.54c-.55 0-1-.45-1-1s.45-1 1-1h16.91c.55 0 1 .45 1 1s-.44 1-.99 1z"
																									fill="url(#prefix__SVGID_5_)"
																								/>
																							</g>
																							<g>
																								<linearGradient
																									id="prefix__SVGID_6_"
																									gradientUnits="userSpaceOnUse"
																									x1={
																										27.478
																									}
																									y1={
																										7.186
																									}
																									x2={
																										12.239
																									}
																									y2={
																										25.84
																									}
																								>
																									<stop
																										offset={
																											0
																										}
																										stopColor="#eb7d31"
																									/>
																									<stop
																										offset={
																											1
																										}
																										stopColor="#ee576f"
																									/>
																								</linearGradient>
																								<path
																									d="M20.46 21.11h-7.07c-.55 0-1-.45-1-1s.45-1 1-1h7.07c.55 0 1 .45 1 1s-.45 1-1 1z"
																									fill="url(#prefix__SVGID_6_)"
																								/>
																							</g>
																						</svg>
																					</p>
																				</Tooltip>
																			</div>
																		)}
																	</>
																) : null}
															</>
														) : null}
													</>
												) : null}
												<div className="wp-block-guteblock-accordion__title-outer">
													{styleName ===
													"2" ? (
														<>
															{isTitleImageIsneeded ? (
																<>
																	{!accordion.isIconImage ? (
																		<div className="wp-block-guteblock-accordion__title-outer_imageActiver">
																			<IconButton
																				className="components-icon-button-components-toolbar__control-open"
																				label={__(
																					"Add Image Option",
																					"guteblock"
																				)}
																				onClick={() => {
																					this.updateAccordion(
																						"isIconImage",
																						!accordion.isIconImage,
																						index
																					);
																				}}
																				icon={
																					"format-image"
																				}
																			/>
																		</div>
																	) : (
																		<div className="wp-block-guteblock-accordion__title-outer_imageActiver">
																			<IconButton
																				className="components-icon-button-components-toolbar__control-open"
																				label={__(
																					"Delete Image Option",
																					"guteblock"
																				)}
																				onClick={() => {
																					this.updateAccordion(
																						"isIconImage",
																						!accordion.isIconImage,
																						index
																					);
																				}}
																				icon={
																					"trash"
																				}
																			/>
																		</div>
																	)}
																</>
															) : null}
														</>
													) : null}
													{styleName ===
													"2" ? (
														<>
															{isTitleImageIsneeded ? (
																<>
																	{accordion.isIconImage ? (
																		<>
																			<div
																				className="wp-block-guteblock-accordion__title-outer__ImageOuter"
																				style={{
																					width: `${iconImageSetup.width}%`
																				}}
																			>
																				<Toolbar>
																					<MediaUploadCheck>
																						<MediaUpload
																							onSelect={change => {
																								this.updateAccordion(
																									"iconImage",
																									change.url,
																									index
																								);
																							}}
																							allowedTypes={[
																								"image"
																							]}
																							value={
																								accordion.iconImage
																							} // To highlight the selected image in the Media Library
																							render={({
																								open
																							}) => {
																								return accordion.iconImage ===
																									"" ? (
																									<IconButton
																										className="components-icon-button-components-toolbar__control-open"
																										label={__(
																											"Add Image",
																											"guteblock"
																										)}
																										onClick={
																											open
																										}
																										icon={
																											"edit"
																										}
																									/>
																								) : (
																									<IconButton
																										className="components-icon-button-components-toolbar__control-open"
																										label={__(
																											"Delete Image",
																											"guteblock"
																										)}
																										onClick={() => {
																											this.updateAccordion(
																												"iconImage",
																												"",
																												index
																											);
																										}}
																										icon={
																											"dismiss"
																										}
																									/>
																								);
																							}}
																						/>
																					</MediaUploadCheck>
																				</Toolbar>
																				<img
																					src={
																						accordion.iconImage
																					}
																					style={{
																						backgroundColor: `rgba(${iconImageBgSetup.r},${iconImageBgSetup.g},${iconImageBgSetup.b},${iconImageBgSetup.a})`,
																						padding: `${iconImageSetup.padding}px`,
																						borderRadius: `${iconImageSetup.borderRadius}px`,
																						marginLeft: `${iconImageSetup.OuterMleft}px`,
																						marginTop: `${iconImageSetup.OuterMtop}px`
																					}}
																				/>
																			</div>
																		</>
																	) : null}
																</>
															) : null}
														</>
													) : null}

													<div
														className="wp-block-guteblock-accordion__title__title"
														style={{
															paddingTop: !ATitlePadding.isEqualPadding
																? `${ATitlePadding.top}px`
																: `${ATitlePadding.top}px`,
															paddingBottom: !ATitlePadding.isEqualPadding
																? `${ATitlePadding.bottom}px`
																: `${ATitlePadding.top}px`,
															paddingRight: !ATitlePadding.isEqualPadding
																? `${ATitlePadding.right}px`
																: `${ATitlePadding.top}px`,
															paddingLeft: !ATitlePadding.isEqualPadding
																? `${ATitlePadding.left}px`
																: `${ATitlePadding.top}px`,
															marginTop: !ATitleMargin.isSameNeeded
																? `${ATitleMargin.top}px`
																: `${ATitleMargin.top}px`,
															marginBottom: !ATitleMargin.isSameNeeded
																? `${ATitleMargin.bottom}px`
																: `${ATitleMargin.top}px`,
															width:
																styleName ===
																"1"
																	? "90%"
																	: "40%"
														}}
													>
														<RichText
															className={
																"wp-block-guteblock-accordion__title"
															}
															style={{
																fontSize: `${ATitleFontSetup.size}px`,
																color:
																	ATitleFontSetup.color,
																fontStyle:
																	ATitleFontSetup.style,
																fontWeight:
																	ATitleFontSetup.weight,
																textAlign:
																	ATitleFontSetup.align,
																letterSpacing: `${ATitleFontSetup.lSpace}px`
															}}
															tagName="p"
															onClick={() => {
																this.setState(
																	{
																		selectedAccordion: index
																	}
																);
															}}
															onChange={changedTitle => {
																this.setState(
																	{
																		selectedAccordion: index
																	}
																);
																this.updateAccordion(
																	"title",
																	changedTitle,
																	index
																);
															}}
															value={
																accordion.title
															}
															placeholder={__(
																"Accordion Title",
																"guteblock"
															)}
														/>
													</div>
													{styleName ===
													"2" ? (
														<>
															{ACTitleIsShown ? (
																<>
																	{accordion.isCenterTitleContent ? (
																		<div className="accordion-add-center-btn">
																			<Tooltip text="Remove Center Title">
																				<p
																					onClick={() => {
																						this.updateAccordion(
																							"isCenterTitleContent",
																							!accordion.isCenterTitleContent,
																							index
																						);
																					}}
																				>
																					<svg
																						id="prefix__Layer_1"
																						x={
																							0
																						}
																						y={
																							0
																						}
																						viewBox="0 0 24 24"
																						xmlSpace="preserve"
																						height="25"
																						width="25"
																					>
																						<style />
																						<linearGradient
																							id="prefix__SVGID_1_"
																							gradientUnits="userSpaceOnUse"
																							x1={
																								21.099
																							}
																							y1={
																								3.607
																							}
																							x2={
																								4.823
																							}
																							y2={
																								18.62
																							}
																						>
																							<stop
																								offset={
																									0
																								}
																								stopColor="#eb7d31"
																							/>
																							<stop
																								offset={
																									1
																								}
																								stopColor="#ee576f"
																							/>
																						</linearGradient>
																						<path
																							d="M20.28 20.11H3.72c-.55 0-1-.45-1-1V4.89c0-.55.45-1 1-1h16.56c.55 0 1 .45 1 1V19.1c0 .56-.45 1.01-1 1.01zm-15.56-2h14.56V5.89H4.72v12.22z"
																							fill="url(#prefix__SVGID_1_)"
																						/>
																						<g>
																							<linearGradient
																								id="prefix__SVGID_2_"
																								gradientUnits="userSpaceOnUse"
																								x1={
																									21.099
																								}
																								y1={
																									3.607
																								}
																								x2={
																									4.823
																								}
																								y2={
																									18.62
																								}
																							>
																								<stop
																									offset={
																										0
																									}
																									stopColor="#eb7d31"
																								/>
																								<stop
																									offset={
																										1
																									}
																									stopColor="#ee576f"
																								/>
																							</linearGradient>
																							<path
																								d="M16.14 13H7.86c-.55 0-1-.45-1-1s.45-1 1-1h8.28c.55 0 1 .45 1 1s-.45 1-1 1z"
																								fill="url(#prefix__SVGID_2_)"
																							/>
																							<linearGradient
																								id="prefix__SVGID_3_"
																								gradientUnits="userSpaceOnUse"
																								x1={
																									19.521
																								}
																								y1={
																									1.895
																								}
																								x2={
																									3.245
																								}
																								y2={
																									16.909
																								}
																							>
																								<stop
																									offset={
																										0
																									}
																									stopColor="#eb7d31"
																								/>
																								<stop
																									offset={
																										1
																									}
																									stopColor="#ee576f"
																								/>
																							</linearGradient>
																							<path
																								d="M16.14 9.83H7.86c-.55 0-1-.45-1-1s.45-1 1-1h8.28c.55 0 1 .45 1 1s-.45 1-1 1z"
																								fill="url(#prefix__SVGID_3_)"
																							/>
																							<g>
																								<linearGradient
																									id="prefix__SVGID_4_"
																									gradientUnits="userSpaceOnUse"
																									x1={
																										22.678
																									}
																									y1={
																										5.318
																									}
																									x2={
																										6.402
																									}
																									y2={
																										20.331
																									}
																								>
																									<stop
																										offset={
																											0
																										}
																										stopColor="#eb7d31"
																									/>
																									<stop
																										offset={
																											1
																										}
																										stopColor="#ee576f"
																									/>
																								</linearGradient>
																								<path
																									d="M16.14 16.17H7.86c-.55 0-1-.45-1-1s.45-1 1-1h8.28c.55 0 1 .45 1 1s-.45 1-1 1z"
																									fill="url(#prefix__SVGID_4_)"
																								/>
																							</g>
																						</g>
																					</svg>
																				</p>
																			</Tooltip>
																		</div>
																	) : (
																		<div className="accordion-add-center-btn">
																			<Tooltip text="Add Center Title">
																				<p
																					onClick={() => {
																						this.updateAccordion(
																							"isCenterTitleContent",
																							!accordion.isCenterTitleContent,
																							index
																						);
																					}}
																				>
																					<svg
																						id="prefix__Layer_1"
																						x={
																							0
																						}
																						y={
																							0
																						}
																						viewBox="0 0 24 24"
																						xmlSpace="preserve"
																						height="25"
																						width="25"
																					>
																						<style />
																						<linearGradient
																							id="prefix__SVGID_1_"
																							gradientUnits="userSpaceOnUse"
																							x1={
																								21.099
																							}
																							y1={
																								3.607
																							}
																							x2={
																								4.823
																							}
																							y2={
																								18.62
																							}
																						>
																							<stop
																								offset={
																									0
																								}
																								stopColor="#eb7d31"
																							/>
																							<stop
																								offset={
																									1
																								}
																								stopColor="#ee576f"
																							/>
																						</linearGradient>
																						<path
																							d="M20.28 20.11H3.72c-.55 0-1-.45-1-1V4.89c0-.55.45-1 1-1h16.56c.55 0 1 .45 1 1V19.1c0 .56-.45 1.01-1 1.01zm-15.56-2h14.56V5.89H4.72v12.22z"
																							fill="url(#prefix__SVGID_1_)"
																						/>
																						<g>
																							<linearGradient
																								id="prefix__SVGID_2_"
																								gradientUnits="userSpaceOnUse"
																								x1={
																									21.099
																								}
																								y1={
																									3.607
																								}
																								x2={
																									4.823
																								}
																								y2={
																									18.62
																								}
																							>
																								<stop
																									offset={
																										0
																									}
																									stopColor="#eb7d31"
																								/>
																								<stop
																									offset={
																										1
																									}
																									stopColor="#ee576f"
																								/>
																							</linearGradient>
																							<path
																								d="M16.14 13H7.86c-.55 0-1-.45-1-1s.45-1 1-1h8.28c.55 0 1 .45 1 1s-.45 1-1 1z"
																								fill="url(#prefix__SVGID_2_)"
																							/>
																							<linearGradient
																								id="prefix__SVGID_3_"
																								gradientUnits="userSpaceOnUse"
																								x1={
																									19.521
																								}
																								y1={
																									1.895
																								}
																								x2={
																									3.245
																								}
																								y2={
																									16.909
																								}
																							>
																								<stop
																									offset={
																										0
																									}
																									stopColor="#eb7d31"
																								/>
																								<stop
																									offset={
																										1
																									}
																									stopColor="#ee576f"
																								/>
																							</linearGradient>
																							<path
																								d="M16.14 9.83H7.86c-.55 0-1-.45-1-1s.45-1 1-1h8.28c.55 0 1 .45 1 1s-.45 1-1 1z"
																								fill="url(#prefix__SVGID_3_)"
																							/>
																							<g>
																								<linearGradient
																									id="prefix__SVGID_4_"
																									gradientUnits="userSpaceOnUse"
																									x1={
																										22.678
																									}
																									y1={
																										5.318
																									}
																									x2={
																										6.402
																									}
																									y2={
																										20.331
																									}
																								>
																									<stop
																										offset={
																											0
																										}
																										stopColor="#eb7d31"
																									/>
																									<stop
																										offset={
																											1
																										}
																										stopColor="#ee576f"
																									/>
																								</linearGradient>
																								<path
																									d="M16.14 16.17H7.86c-.55 0-1-.45-1-1s.45-1 1-1h8.28c.55 0 1 .45 1 1s-.45 1-1 1z"
																									fill="url(#prefix__SVGID_4_)"
																								/>
																							</g>
																						</g>
																					</svg>
																				</p>
																			</Tooltip>
																		</div>
																	)}
																	{accordion.isCenterTitleContent ? (
																		<div
																			className="wp-block-guteblock-accordion__centerContent"
																			style={{
																				paddingTop: !ACTitleFontSetup.pisEqualPadding
																					? `${ACTitleFontSetup.ptop}px`
																					: `${ACTitleFontSetup.ptop}px`,
																				paddingBottom: !ACTitleFontSetup.pisEqualPadding
																					? `${ACTitleFontSetup.pbottom}px`
																					: `${ACTitleFontSetup.ptop}px`,
																				paddingRight: !ACTitleFontSetup.pisEqualPadding
																					? `${ACTitleFontSetup.pright}px`
																					: `${ACTitleFontSetup.ptop}px`,
																				paddingLeft: !ACTitleFontSetup.pisEqualPadding
																					? `${ACTitleFontSetup.pleft}px`
																					: `${ACTitleFontSetup.ptop}px`,
																				marginTop: !ACTitleFontSetup.misSameNeeded
																					? `${ACTitleFontSetup.mtop}px`
																					: `${ACTitleFontSetup.mtop}px`,
																				marginBottom: !ACTitleFontSetup.misSameNeeded
																					? `${ACTitleFontSetup.mbottom}px`
																					: `${ACTitleFontSetup.mtop}px`
																			}}
																		>
																			<RichText
																				className={
																					"wp-block-guteblock-accordion__title"
																				}
																				tagName="p"
																				style={{
																					fontSize: `${ACTitleFontSetup.size}px`,
																					color:
																						ACTitleFontSetup.color,
																					fontStyle:
																						ACTitleFontSetup.style,
																					fontWeight:
																						ACTitleFontSetup.weight,
																					textAlign:
																						ACTitleFontSetup.align,
																					letterSpacing: `${ACTitleFontSetup.lSpace}px`
																				}}
																				onClick={() => {
																					this.setState(
																						{
																							selectedAccordion: index
																						}
																					);
																				}}
																				onChange={changedTitle => {
																					this.setState(
																						{
																							selectedAccordion: index
																						}
																					);
																					this.updateAccordion(
																						"centerTitleContent",
																						changedTitle,
																						index
																					);
																				}}
																				value={
																					accordion.centerTitleContent
																				}
																				placeholder={__(
																					"Accordion Center Title",
																					"guteblock"
																				)}
																			/>
																		</div>
																	) : null}
																</>
															) : null}
														</>
													) : null}
													{!activateIconPosToBelow ? (
														<>
															<div className="wp-block-guteblock-accordion__controlIcon">
																<i
																	onClick={() => {
																		this.updateAccordion(
																			"status",
																			!accordion.status,
																			index
																		);
																	}}
																	className={
																		!accordion.status
																			? "accordion-arrow"
																			: "accordion-arrow icontoggle"
																	}
																	style={{
																		border: `solid ${iconNormalSetup.color}`,
																		padding: `${iconNormalSetup.size}px`,
																		top: `${iconNormalSetup.horizontal}%`,
																		right: `${iconNormalSetup.vertical}%`
																	}}
																></i>
															</div>
														</>
													) : (
														<>
															{styleName ===
															"1" ? (
																<>
																	<div className="wp-block-guteblock-accordion__controlIcon">
																		<i
																			onClick={() => {
																				this.updateAccordion(
																					"status",
																					!accordion.status,
																					index
																				);
																			}}
																			className={
																				!accordion.status
																					? "accordion-arrow"
																					: "accordion-arrow icontoggle"
																			}
																			style={{
																				border: `solid ${iconNormalSetup.color}`,
																				padding: `${iconNormalSetup.size}px`,
																				top: `${iconNormalSetup.horizontal}%`,
																				right: `${iconNormalSetup.vertical}%`
																			}}
																		></i>
																	</div>
																</>
															) : null}
														</>
													)}
												</div>
												{styleName ===
												"2" ? (
													<>
														{CcontainerSplitIsNeeded ? (
															<>
																{!accordion.isInnerTitleShown ? (
																	<>
																		<div
																			className={
																				!accordion.status
																					? "wp-block-guteblock-accordion__content-outer"
																					: "wp-block-guteblock-accordion__content-outer gb-accordion-open"
																			}
																			style={{
																				paddingTop: !CcontainerPadding.isEqualPadding
																					? `${CcontainerPadding.top}px`
																					: `${CcontainerPadding.top}px`,
																				// paddingBottom: !CcontainerPadding.isEqualPadding
																				// 	? `${CcontainerPadding.bottom}px`
																				// 	: `${CcontainerPadding.top}px`,
																				paddingRight: !CcontainerPadding.isEqualPadding
																					? `${CcontainerPadding.right}px`
																					: `${CcontainerPadding.top}px`,
																				paddingLeft: !CcontainerPadding.isEqualPadding
																					? `${CcontainerPadding.left}px`
																					: `${CcontainerPadding.top}px`,
																				marginTop: !CcontainerMargin.isSameNeeded
																					? `${CcontainerMargin.top}px`
																					: `${CcontainerMargin.top}px`,
																				marginBottom: !CcontainerMargin.isSameNeeded
																					? `${CcontainerMargin.bottom}px`
																					: `${CcontainerMargin.top}px`
																			}}
																		>
																			{titleSepratorSettings.isNeeded ? (
																				<div
																					className="wp-block-guteblock-accordion each-accordion-title-seprator"
																					style={{
																						width: `${titleSepratorSettings.width}%`,
																						backgroundColor:
																							titleSepratorSettings.color,
																						opacity:
																							titleSepratorSettings.opacity,
																						height: `${titleSepratorSettings.height}px`
																					}}
																				></div>
																			) : null}
																			<RichText
																				className={
																					"wp-block-guteblock-accordion__content"
																				}
																				tagName="p"
																				onClick={() => {
																					this.setState(
																						{
																							selectedAccordion: index
																						}
																					);
																				}}
																				onChange={changedContent => {
																					this.setState(
																						{
																							selectedAccordion: index
																						}
																					);
																					this.updateAccordion(
																						"content",
																						changedContent,
																						index
																					);
																				}}
																				value={
																					accordion.content
																				}
																				placeholder={__(
																					"Accordion Content",
																					"guteblock"
																				)}
																				style={{
																					fontSize: `${ContentFontSetup.size}px`,
																					color:
																						ContentFontSetup.color,
																					fontStyle:
																						ContentFontSetup.style,
																					fontWeight:
																						ContentFontSetup.weight,
																					textAlign:
																						ContentFontSetup.align,
																					letterSpacing: `${ContentFontSetup.lSpace}px`,
																					paddingBottom: `${ContentFontSetup.pbottom}px`,
																					paddingTop: `${ContentFontSetup.ptop}px`,
																					paddingRight: `${ContentFontSetup.pright}px`,
																					paddingLeft: `${ContentFontSetup.pleft}px`,
																					marginBottom: `${ContentFontSetup.mbottom}px`,
																					marginTop: `${ContentFontSetup.mtop}px`,
																					lineHeight: `${ContentFontSetup.lineHeight}px`
																				}}
																			/>
																		</div>
																	</>
																) : (
																	<>
																		<div
																			className={
																				!accordion.status
																					? "wp-block-guteblock-accordion__content-outer"
																					: "wp-block-guteblock-accordion__content-outer gb-accordion-open"
																			}
																			style={{
																				paddingTop: !CcontainerPadding.isEqualPadding
																					? `${CcontainerPadding.top}px`
																					: `${CcontainerPadding.top}px`,
																				// paddingBottom: !CcontainerPadding.isEqualPadding
																				// 	? `${CcontainerPadding.bottom}px`
																				// 	: `${CcontainerPadding.top}px`,
																				paddingRight: !CcontainerPadding.isEqualPadding
																					? `${CcontainerPadding.right}px`
																					: `${CcontainerPadding.top}px`,
																				paddingLeft: !CcontainerPadding.isEqualPadding
																					? `${CcontainerPadding.left}px`
																					: `${CcontainerPadding.top}px`,
																				marginTop: !CcontainerMargin.isSameNeeded
																					? `${CcontainerMargin.top}px`
																					: `${CcontainerMargin.top}px`,
																				marginBottom: !CcontainerMargin.isSameNeeded
																					? `${CcontainerMargin.bottom}px`
																					: `${CcontainerMargin.top}px`
																			}}
																		>
																			{titleSepratorSettings.isNeeded ? (
																				<div
																					className="wp-block-guteblock-accordion each-accordion-title-seprator"
																					style={{
																						width: `${titleSepratorSettings.width}%`,
																						backgroundColor:
																							titleSepratorSettings.color,
																						opacity:
																							titleSepratorSettings.opacity,
																						height: `${titleSepratorSettings.height}px`
																					}}
																				></div>
																			) : null}
																			{accordion.islongContentWithSplit ? (
																				<div className="wp-block-guteblock-accordion__content-lengthy">
																					<RichText
																						className={
																							"wp-block-guteblock-accordion__content-two-peace"
																						}
																						tagName="p"
																						onClick={() => {
																							this.setState(
																								{
																									selectedAccordion: index
																								}
																							);
																						}}
																						onChange={changedContent => {
																							this.setState(
																								{
																									selectedAccordion: index
																								}
																							);
																							this.updateAccordion(
																								"longContentWithSplit",
																								changedContent,
																								index
																							);
																						}}
																						value={
																							accordion.longContentWithSplit
																						}
																						placeholder={__(
																							"Accordion Additional Content",
																							"guteblock"
																						)}
																						style={{
																							fontSize: `${lengthyContentFontSetup.size}px`,
																							color:
																								lengthyContentFontSetup.color,
																							fontStyle:
																								lengthyContentFontSetup.style,
																							fontWeight:
																								lengthyContentFontSetup.weight,
																							textAlign:
																								lengthyContentFontSetup.align,
																							letterSpacing: `${lengthyContentFontSetup.lSpace}px`,
																							paddingBottom: `${lengthyContentFontSetup.pbottom}px`,
																							paddingTop: `${lengthyContentFontSetup.ptop}px`,
																							paddingRight: `${lengthyContentFontSetup.pright}px`,
																							paddingLeft: `${lengthyContentFontSetup.pleft}px`,
																							marginBottom: `${lengthyContentFontSetup.mbottom}px`,
																							marginTop: `${lengthyContentFontSetup.mtop}px`,
																							lineHeight: `${lengthyContentFontSetup.lineHeight}px`
																						}}
																					/>
																				</div>
																			) : null}
																			<div className="wp-block-guteblock-accordion__content-two">
																				<RichText
																					className={
																						"wp-block-guteblock-accordion__content-two-peace"
																					}
																					tagName="h5"
																					onClick={() => {
																						this.setState(
																							{
																								selectedAccordion: index
																							}
																						);
																					}}
																					onChange={changedContent => {
																						this.setState(
																							{
																								selectedAccordion: index
																							}
																						);
																						this.updateAccordion(
																							"innerTitle",
																							changedContent,
																							index
																						);
																					}}
																					value={
																						accordion.innerTitle
																					}
																					placeholder={__(
																						"Sub Title",
																						"guteblock"
																					)}
																					style={{
																						fontSize: `${AdditionalContentFontSetup.size}px`,
																						color:
																							AdditionalContentFontSetup.color,
																						fontStyle:
																							AdditionalContentFontSetup.style,
																						fontWeight:
																							AdditionalContentFontSetup.weight,
																						textAlign:
																							AdditionalContentFontSetup.align,
																						letterSpacing: `${AdditionalContentFontSetup.lSpace}px`,
																						paddingBottom: `${AdditionalContentFontSetup.pbottom}px`,
																						paddingTop: `${AdditionalContentFontSetup.ptop}px`,
																						paddingRight: `${AdditionalContentFontSetup.pright}px`,
																						paddingLeft: `${AdditionalContentFontSetup.pleft}px`,
																						marginBottom: `${AdditionalContentFontSetup.mbottom}px`,
																						marginTop: `${AdditionalContentFontSetup.mtop}px`,
																						lineHeight: `${AdditionalContentFontSetup.lineHeight}px`
																					}}
																				/>
																			</div>
																			<div
																				className={
																					"wp-block-guteblock-accordion__content-one"
																				}
																			>
																				<RichText
																					className={
																						"wp-block-guteblock-accordion__content-one-peace"
																					}
																					tagName="p"
																					onClick={() => {
																						this.setState(
																							{
																								selectedAccordion: index
																							}
																						);
																					}}
																					onChange={changedContent => {
																						this.setState(
																							{
																								selectedAccordion: index
																							}
																						);
																						this.updateAccordion(
																							"content",
																							changedContent,
																							index
																						);
																					}}
																					value={
																						accordion.content
																					}
																					placeholder={__(
																						"Accordion Content",
																						"guteblock"
																					)}
																					style={{
																						fontSize: `${ContentFontSetup.size}px`,
																						color:
																							ContentFontSetup.color,
																						fontStyle:
																							ContentFontSetup.style,
																						fontWeight:
																							ContentFontSetup.weight,
																						textAlign:
																							ContentFontSetup.align,
																						letterSpacing: `${ContentFontSetup.lSpace}px`,
																						paddingBottom: `${ContentFontSetup.pbottom}px`,
																						paddingTop: `${ContentFontSetup.ptop}px`,
																						paddingRight: `${ContentFontSetup.pright}px`,
																						paddingLeft: `${ContentFontSetup.pleft}px`,
																						marginBottom: `${ContentFontSetup.mbottom}px`,
																						marginTop: `${ContentFontSetup.mtop}px`,
																						lineHeight: `${ContentFontSetup.lineHeight}px`
																					}}
																				/>
																			</div>
																		</div>
																	</>
																)}
															</>
														) : (
															<>
																<div
																	className={
																		!accordion.status
																			? "wp-block-guteblock-accordion__content-outer"
																			: "wp-block-guteblock-accordion__content-outer gb-accordion-open"
																	}
																	style={{
																		paddingTop: !CcontainerPadding.isEqualPadding
																			? `${CcontainerPadding.top}px`
																			: `${CcontainerPadding.top}px`,
																		// paddingBottom: !CcontainerPadding.isEqualPadding
																		// 	? `${CcontainerPadding.bottom}px`
																		// 	: `${CcontainerPadding.top}px`,
																		paddingRight: !CcontainerPadding.isEqualPadding
																			? `${CcontainerPadding.right}px`
																			: `${CcontainerPadding.top}px`,
																		paddingLeft: !CcontainerPadding.isEqualPadding
																			? `${CcontainerPadding.left}px`
																			: `${CcontainerPadding.top}px`,
																		marginTop: !CcontainerMargin.isSameNeeded
																			? `${CcontainerMargin.top}px`
																			: `${CcontainerMargin.top}px`,
																		marginBottom: !CcontainerMargin.isSameNeeded
																			? `${CcontainerMargin.bottom}px`
																			: `${CcontainerMargin.top}px`
																	}}
																>
																	{titleSepratorSettings.isNeeded ? (
																		<div
																			className="wp-block-guteblock-accordion each-accordion-title-seprator"
																			style={{
																				width: `${titleSepratorSettings.width}%`,
																				backgroundColor:
																					titleSepratorSettings.color,
																				opacity:
																					titleSepratorSettings.opacity,
																				height: `${titleSepratorSettings.height}px`
																			}}
																		></div>
																	) : null}
																	<RichText
																		className={
																			"wp-block-guteblock-accordion__content"
																		}
																		tagName="p"
																		onClick={() => {
																			this.setState(
																				{
																					selectedAccordion: index
																				}
																			);
																		}}
																		onChange={changedContent => {
																			this.setState(
																				{
																					selectedAccordion: index
																				}
																			);
																			this.updateAccordion(
																				"content",
																				changedContent,
																				index
																			);
																		}}
																		value={
																			accordion.content
																		}
																		placeholder={__(
																			"Accordion Content",
																			"guteblock"
																		)}
																		style={{
																			fontSize: `${ContentFontSetup.size}px`,
																			color:
																				ContentFontSetup.color,
																			fontStyle:
																				ContentFontSetup.style,
																			fontWeight:
																				ContentFontSetup.weight,
																			textAlign:
																				ContentFontSetup.align,
																			letterSpacing: `${ContentFontSetup.lSpace}px`,
																			paddingBottom: `${ContentFontSetup.pbottom}px`,
																			paddingTop: `${ContentFontSetup.ptop}px`,
																			paddingRight: `${ContentFontSetup.pright}px`,
																			paddingLeft: `${ContentFontSetup.pleft}px`,
																			marginBottom: `${ContentFontSetup.mbottom}px`,
																			marginTop: `${ContentFontSetup.mtop}px`,
																			lineHeight: `${ContentFontSetup.lineHeight}px`
																		}}
																	/>
																</div>
															</>
														)}
													</>
												) : (
													<>
														<div
															className={
																!accordion.status
																	? "wp-block-guteblock-accordion__content-outer"
																	: "wp-block-guteblock-accordion__content-outer gb-accordion-open"
															}
															style={{
																paddingTop: !CcontainerPadding.isEqualPadding
																	? `${CcontainerPadding.top}px`
																	: `${CcontainerPadding.top}px`,
																// paddingBottom: !CcontainerPadding.isEqualPadding
																// 	? `${CcontainerPadding.bottom}px`
																// 	: `${CcontainerPadding.top}px`,
																paddingRight: !CcontainerPadding.isEqualPadding
																	? `${CcontainerPadding.right}px`
																	: `${CcontainerPadding.top}px`,
																paddingLeft: !CcontainerPadding.isEqualPadding
																	? `${CcontainerPadding.left}px`
																	: `${CcontainerPadding.top}px`,
																marginTop: !CcontainerMargin.isSameNeeded
																	? `${CcontainerMargin.top}px`
																	: `${CcontainerMargin.top}px`,
																marginBottom: !CcontainerMargin.isSameNeeded
																	? `${CcontainerMargin.bottom}px`
																	: `${CcontainerMargin.top}px`
															}}
														>
															{titleSepratorSettings.isNeeded ? (
																<div
																	className="wp-block-guteblock-accordion each-accordion-title-seprator"
																	style={{
																		width: `${titleSepratorSettings.width}%`,
																		backgroundColor:
																			titleSepratorSettings.color,
																		opacity:
																			titleSepratorSettings.opacity,
																		height: `${titleSepratorSettings.height}px`
																	}}
																></div>
															) : null}
															<RichText
																className={
																	"wp-block-guteblock-accordion__content"
																}
																tagName="p"
																onClick={() => {
																	this.setState(
																		{
																			selectedAccordion: index
																		}
																	);
																}}
																onChange={changedContent => {
																	this.setState(
																		{
																			selectedAccordion: index
																		}
																	);
																	this.updateAccordion(
																		"content",
																		changedContent,
																		index
																	);
																}}
																value={
																	accordion.content
																}
																placeholder={__(
																	"Accordion Content",
																	"guteblock"
																)}
																style={{
																	fontSize: `${ContentFontSetup.size}px`,
																	color:
																		ContentFontSetup.color,
																	fontStyle:
																		ContentFontSetup.style,
																	fontWeight:
																		ContentFontSetup.weight,
																	textAlign:
																		ContentFontSetup.align,
																	letterSpacing: `${ContentFontSetup.lSpace}px`,
																	paddingBottom: `${ContentFontSetup.pbottom}px`,
																	paddingTop: `${ContentFontSetup.ptop}px`,
																	paddingRight: `${ContentFontSetup.pright}px`,
																	paddingLeft: `${ContentFontSetup.pleft}px`,
																	marginBottom: `${ContentFontSetup.mbottom}px`,
																	marginTop: `${ContentFontSetup.mtop}px`,
																	lineHeight: `${ContentFontSetup.lineHeight}px`
																}}
															/>
														</div>
													</>
												)}

												<div className="clear"></div>

												{activateIconPosToBelow ? (
													<>
														{styleName ===
														"2" ? (
															<>
																<div className="wp-block-guteblock-accordion__controlIconOnBelow">
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		viewBox="0 0 24 24"
																		className={
																			!accordion.status
																				? "accordion-arrow1"
																				: "accordion-arrow1 icontoggle1"
																		}
																		style={{
																			fill: `${iconBelowSetup.color}`,
																			width: `${iconBelowSetup.size}px`,
																			height: `${iconBelowSetup.size}px`,
																			right: `${iconBelowSetup.horizontal}%`,
																			backgroundColor: `${iconBelowSetup.bgcolor}`,
																			borderRadius: `${iconBelowSetup.bRadius}%`
																		}}
																		onClick={() => {
																			this.updateAccordion(
																				"status",
																				!accordion.status,
																				index
																			);
																		}}
																	>
																		<path d="M6.028 0v6.425l5.549 5.575-5.549 5.575v6.425l11.944-12z" />
																	</svg>
																</div>
															</>
														) : null}
													</>
												) : null}
											</div>
											{AconatinerSeparatorIsNeeded ? (
												<div
													className="wp-block-guteblock-accordion each-accordion-seprator"
													style={{
														width: `${AcontainerSepartorWidth}%`,
														backgroundColor: AcontainerSeparatorBgColor,
														opacity: AcontainerSeparatorBgOpacity,
														height: `${AconatinerSeparatorheight}px`
													}}
												></div>
											) : null}
										</>
									);
								})}
							</div>
							<Tooltip
								text={__(
									"Add New Accordion",
									"guteblock"
								)}
							>
								<button
									className={
										"wp-block-guteblock-accordion__addAccordionBox"
									}
									onClick={this.addNewAccordion}
								>
									<Dashicon
										icon={"plus"}
										size={20}
										color="#ed6558"
									/>
								</button>
							</Tooltip>
						</div>
					</>
				);
			}
}

export default AccordionEdit;