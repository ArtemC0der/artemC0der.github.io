import { Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
	RichText,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	PanelColorSettings,
	
} from "@wordpress/editor";
import {
	PanelBody,
	TextControl,
	TabPanel,
	ToggleControl,
	RangeControl,
	PanelRow,
	Toolbar,
	SelectControl,
	Dropdown,
	Button,
} from "@wordpress/components";
import classnames from 'classnames';

//adding our own component
// import AdditionalSettings from './components/blockqouteControlls';

class BlockQoutes extends Component {
	onChangeTitle = title => {
		this.props.setAttributes({ title });
	};

	onChangeAlignment = alignment => {
		this.props.setAttributes({ alignment });
	};
	onAuthorChange = autherName => {
		this.props.setAttributes({ autherName });
	};
	toggleTitle = () => {
		this.props.setAttributes({
			isHeadTitleShow: !this.props.attributes.isHeadTitleShow
		});
	};
	onChangeAlignmentofHead = alignmentForHead => {
		this.props.setAttributes({ alignmentForHead });
	};
	onqouteContent = qouteContent => {
		this.props.setAttributes({ qouteContent });
	};
	onChangeHeadTextColor = colorForHead => {
		this.props.setAttributes({ colorForHead });
	};
	onContainerbgChange = conatinerMainBackgroundColor => {
		this.props.setAttributes({ conatinerMainBackgroundColor });
		if (this.props.attributes.conatinerMainBackgroundColor === this.props.attributes.innerContainerColor) {
			this.props.setAttributes({
				isSameAsContainerColor:true
			});
		}
	};
	onChangeContentTextColor = contentColor => {
		this.props.setAttributes({ contentColor });
	};
	onChangeInnerContainerColor = innerContainerColor => {
		this.props.setAttributes({
			isSameAsContainerColor: false
		});
		this.props.setAttributes({ innerContainerColor });
	};
	onChangeinnerConatinerBoxShadowColor = theNewVal => {
		const newVal = {
			xoffset: this.props.attributes.innerConatinerBoxShadow.xoffset,
			yOffset: this.props.attributes.innerConatinerBoxShadow.yOffset,
			Blur: this.props.attributes.innerConatinerBoxShadow.Blur,
			spreadShadow: this.props.attributes.innerConatinerBoxShadow
				.spreadShadow,
			colorShadow: theNewVal
		};
		this.props.setAttributes({
			innerConatinerBoxShadow: newVal
		});
	};

	toggleIconBelow = () => {
		const newVal = {
			horizontal: this.props.attributes.iconBelow.horizontal,
			vertical: this.props.attributes.iconBelow.vertical,
			isShown: !this.props.attributes.iconBelow.isShown
		};
		this.props.setAttributes({
			iconBelow: newVal
		});
	};

	//Icon settings
	onChangeIconColor = newVal => {
		const newUpval = {
			size: this.props.attributes.iconGeneral.size,
			opacity: this.props.attributes.iconGeneral.opacity,
			color: newVal
		};
		this.props.setAttributes({
			iconGeneral: newUpval
		});
	};

	toggleIconAbove = () => {
		const newVal = {
			horizontal: this.props.attributes.iconAbove.horizontal,
			vertical: this.props.attributes.iconAbove.vertical,
			isShown: !this.props.attributes.iconAbove.isShown
		};
		this.props.setAttributes({
			iconAbove: newVal
		});
	};
	//author settings
	toggleAuthorName = () => {
		this.props.setAttributes({
			authorIsShown: !this.props.attributes.authorIsShown
		});
	};
	toggleBoxShadowInnerContainer = () => {
		this.props.setAttributes({
			isBoxShadowISneeded: !this.props.attributes.isBoxShadowISneeded
		});
	};
	onChangeAuthorFontColor=authorFontColor=>{
		this.props.setAttributes({
			authorFontColor
		});
	};
	render() {
		const { className, attributes, setAttributes } = this.props;
		const {
			title,
			alignment,
			autherName,
			isHeadTitleShow,
			fontSizeForHead,
			qouteContent,
			alignmentForHead,
			paddingForHeadseprate,
			marginForHeadseprate,
			letterSpacingForTitle,
			colorForHead,
			HeaderTransformTo,
			headerFontWeight,
			conatinerMainBackgroundColor,
			containerPadding,
			containerMargin,
			containerBorderRadius,
			contentColor,
			contentTransformTo,
			letterSpacingContent,
			fontWeigthContent,
			lineHieghtContent,
			innerContainerWidth,
			innerContainerColor,
			innerConatinerBoxShadow,
			innerContainerPadding,
			innerConatinerBorderRadius,
			iconGeneral,
			iconAbove,
			iconBelow,
			authorIsShown,
			authorAlign,
			contentPadding,
			isBoxShadowISneeded,
			isSameAsContainerColor,
			authorFontSize,
			authorFontColor
		} = attributes;

		const classes = classnames(className, {
			[`align-${alignment}`]: alignment
		});
		  const isStyle = RegExp(/is-style-/);
			const styleName = isStyle.test(attributes.className)
				? attributes.className.replace(isStyle, "")
				: null;
		
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
						className={
							"wp-block-guteblock-blockquote tabControll"
						}
						activeClass="wp-block-guteblock-blockquote tabControll active-class"
						tabs={[
							{
								name: "Main Heading Settings",
								title: (
									<svg
										viewBox="0 0 24 24"
										x={0}
										y={0}
										height="50"
										width="50"
									>
										<switch>
											<g>
												<linearGradient
													id="prefix__a"
													gradientUnits="userSpaceOnUse"
													x1={15.042}
													y1={6.654}
													x2={6.243}
													y2={18.716}
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
													fill="url(#prefix__a)"
													d="M13.4 10.7v.7H7.7V5.8H4.3v13.9h3.5v-5.2h5.7v5.2h3.4V12c-1.4 0-2.5-.5-3.5-1.3z"
												/>
												<linearGradient
													id="prefix__b"
													gradientUnits="userSpaceOnUse"
													x1={20.398}
													y1={2.755}
													x2={8.326}
													y2={19.303}
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
													fill="url(#prefix__b)"
													d="M18.1 11.2H17c-.5 0-.8-.4-.8-.8V10v-.1h-.1l-.2.2c-.3.3-.8.3-1.2 0l-.7-.7c-.2-.2-.2-.4-.2-.6 0-.2.1-.4.2-.6l.2-.2v-.1h-.4c-.4.1-.8-.3-.8-.8V6c0-.5.4-.8.8-.8h.4v-.1l-.2-.2c-.2-.2-.2-.4-.2-.6 0-.2.1-.4.2-.6l.7-.7c.3-.3.8-.3 1.2 0l.2.2h.1v-.4c0-.5.4-.8.8-.8h1.1c.5 0 .9.4.9.8v.4h.1l.2-.2c.3-.3.9-.3 1.2 0l.8.8c.2.2.2.4.2.6 0 .2-.1.4-.2.6l-.3.1v.1h.4c.5 0 .8.4.8.8v1.1c0 .5-.4.8-.8.8h-.3-.1V8l.2.2c.2.2.2.4.2.6 0 .2-.1.4-.2.6l-.8.8c-.2.2-.4.2-.6.2-.2 0-.4-.1-.6-.2l-.1-.2H19v.4c0 .4-.4.8-.9.8zm-1.9-1.8c.1 0 .2 0 .3.1.2.1.4.3.4.6v.3c0 .1.1.2.2.2h1.1c.1 0 .2-.1.2-.2V10c0-.3.2-.5.4-.6.2-.1.5 0 .7.1l.2.2c.1.1.3.1.3 0l.8-.7s.1-.1.1-.2 0-.1-.1-.2l-.2-.2c-.2-.2-.2-.5-.1-.7.1-.2.3-.4.6-.4h.3c.1 0 .2-.1.2-.2V6c0-.1-.1-.2-.2-.2h-.3c-.3 0-.5-.2-.6-.4-.1-.2 0-.5.1-.7l.2-.2s.1-.1.1-.2 0-.1-.1-.2l-.8-.8c-.1-.1-.3-.1-.3 0l-.2.2c-.2.2-.5.2-.7.1-.2-.1-.4-.3-.4-.6v-.2c0-.1-.1-.2-.2-.2h-1.1c-.1 0-.2.1-.2.2v.3c0 .3-.2.5-.4.6-.2.1-.5 0-.7-.1l-.2-.2c-.1-.1-.3-.1-.3 0l-.8.8s-.1.1-.1.2 0 .1.1.2l.2.2c.2.2.2.5.1.7-.1.2-.3.4-.6.4h-.3c-.1 0-.2.1-.2.2v1.1c0 .1.1.2.2.2h.3c.3 0 .5.2.6.4.1.2 0 .5-.1.7l-.2.2s-.1.1-.1.2 0 .1.1.2l.8.8c.1.1.3.1.3 0l.2-.2c0-.2.2-.3.4-.3z"
												/>
												<linearGradient
													id="prefix__c"
													gradientUnits="userSpaceOnUse"
													x1={20.397}
													y1={2.755}
													x2={8.326}
													y2={19.303}
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
													fill="url(#prefix__c)"
													d="M17.6 8.8c-1.2 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1.1 2.3-2.3 2.3zm0-3.9c-.9 0-1.7.8-1.7 1.7s.8 1.7 1.7 1.7 1.7-.8 1.7-1.7-.8-1.7-1.7-1.7z"
												/>
											</g>
										</switch>
									</svg>
								),
								className:
									"wp-block-guteblock-blockquote tabControll tab-one"
							},
							{
								name: "Contents Settings",
								title: (
									<svg
										viewBox="0 0 24 24"
										x={0}
										y={0}
										height="50"
										width="50"
									>
										<switch>
											<g>
												<linearGradient
													id="prefix__a"
													gradientUnits="userSpaceOnUse"
													x1={18.635}
													y1={3.732}
													x2={6.931}
													y2={19.777}
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
													fill="url(#prefix__a)"
													d="M16.4 11.9h-1c-.4 0-.8-.4-.8-.8v-.3-.1h-.1l-.2.3c-.3.3-.8.3-1.1 0l-.7-.7c-.2-.2-.2-.4-.2-.6 0-.2.1-.4.2-.6l.2-.2v-.1h-.4c-.4 0-.8-.4-.8-.8V7c0-.4.4-.8.8-.8h.4v-.1l-.2-.2c-.2-.2-.2-.4-.2-.6 0-.2.1-.4.2-.6l.7-.7c.3-.3.8-.3 1.1 0l.2.2h.1v-.4c0-.4.4-.8.8-.8h1c.4 0 .8.4.8.8v.4h.1l.2-.2c.3-.3.8-.3 1.1 0l.7.7c.2.2.2.4.2.6 0 .2-.1.4-.2.6l-.1.1v.1h.4c.4 0 .8.4.8.8v1c0 .4-.4.8-.8.8h-.3-.1v.1l.2.2c.2.2.2.4.2.6 0 .2-.1.4-.2.6l-.7.8c-.2.2-.4.2-.6.2-.2 0-.4-.1-.6-.2l-.2-.2h-.1v.4c0 .3-.3.7-.8.7zm-1.9-1.7h.2c.2.1.4.3.4.6v.3c0 .1.1.2.2.2h1c.1 0 .2-.1.2-.2v-.3c0-.3.1-.5.4-.6.2-.1.5 0 .7.1l.2.2c.1.1.2.1.3 0l.9-.7s.1-.1.1-.2 0-.1-.1-.2l-.2-.2c-.2-.2-.2-.4-.1-.7.1-.2.3-.4.6-.4h.3c.1 0 .2-.1.2-.2v-1c0-.1-.1-.2-.2-.2h-.3c-.3 0-.5-.1-.6-.4-.1-.2 0-.5.1-.7l.2-.2s.1-.1.1-.2 0-.1-.1-.2l-.7-.7c-.1-.1-.2-.1-.3 0l-.2.2c-.2.2-.4.2-.7.1-.2-.1-.4-.3-.4-.6v-.2c0-.1-.1-.2-.2-.2h-1c-.1 0-.2.1-.2.2v.3c0 .3-.1.5-.4.6-.2.1-.5 0-.7-.1l-.2-.2c-.1-.1-.2-.1-.3 0l-.7.7s-.1.1-.1.2 0 .1.1.2v.1c.2.2.2.4.1.7-.1.2-.3.4-.6.4h-.3c-.1 0-.2.1-.2.2v1c0 .1.1.2.2.2h.3c.3 0 .5.1.6.4.1.2 0 .5-.1.7l-.2.2s-.1.1-.1.2 0 .1.1.2l.7.7c.1.1.2.1.3 0l.2-.2c.2-.1.4-.1.5-.1z"
												/>
												<linearGradient
													id="prefix__b"
													gradientUnits="userSpaceOnUse"
													x1={18.635}
													y1={3.732}
													x2={6.931}
													y2={19.777}
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
													fill="url(#prefix__b)"
													d="M15.9 9.6c-1.2 0-2.2-1-2.2-2.2s1-2.2 2.2-2.2 2.2 1 2.2 2.2-1 2.2-2.2 2.2zm0-3.8c-.9 0-1.6.7-1.6 1.6S15 9 15.9 9c.9 0 1.6-.7 1.6-1.6s-.7-1.6-1.6-1.6z"
												/>
												<linearGradient
													id="prefix__c"
													gradientUnits="userSpaceOnUse"
													x1={19.378}
													y1={3.792}
													x2={6.614}
													y2={17.359}
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
													fill="url(#prefix__c)"
													d="M13.8 15c-.6 1-1.5 1.6-2.8 1.6-1.1 0-1.9-.3-2.6-1.1-.7-.7-1-1.6-1-2.7s.3-2 1-2.7c.6-.7 1.4-1 2.5-1-.1-.4-.1-.8-.1-1.2 0-.7.1-1.3.3-1.9H11c-2 0-3.7.7-5 2-1.3 1.3-2 2.9-2 4.9 0 2 .7 3.6 2 4.9 1.3 1.3 3 1.9 4.9 1.9 1.8 0 3.2-.5 4.4-1.6.9-.8 1.6-1.8 1.9-3.1h-3.4z"
												/>
											</g>
										</switch>
									</svg>
								),
								className:
									"wp-block-guteblock-blockquote tabControll tab-one"
							},
							{
								name: "Container Settings",
								title: (
									<svg
										viewBox="0 0 24 24"
										x={0}
										y={0}
										height="50"
										width="50"
									>
										<switch>
											<g>
												<linearGradient
													id="prefix__a"
													gradientUnits="userSpaceOnUse"
													x1={20.674}
													y1={4.188}
													x2={6.269}
													y2={17.66}
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
													fill="url(#prefix__a)"
													d="M17.2 13.5h-.3v2.6H8.2V7.5h2.6v-.3c0-1 .3-2 .7-2.9H5v15.1h15.1v-6.5c-.9.4-1.9.6-2.9.6z"
												/>
												<linearGradient
													id="prefix__b"
													gradientUnits="userSpaceOnUse"
													x1={19.157}
													y1={3.893}
													x2={6.735}
													y2={20.922}
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
													fill="url(#prefix__b)"
													d="M16.8 12.6h-1.1c-.5 0-.9-.4-.9-.9v-.3-.1h-.1l-.2.2c-.3.3-.9.3-1.2 0l-.8-.8c-.2-.2-.2-.4-.2-.6 0-.2.1-.4.3-.6l.2-.2v-.1h-.4c-.5 0-.9-.4-.9-.9v-1c0-.5.4-.9.9-.9h.4v-.1l-.2-.2c-.2-.2-.2-.4-.2-.6 0-.2.1-.4.3-.6l.8-.8c.3-.3.9-.3 1.2 0l.2.2h.1V4c0-.5.4-.9.9-.9H17c.5 0 .9.4.9.9v.4h.1v-.3c.3-.3.9-.3 1.2 0l.8.8c.2.2.2.4.2.6 0 .2-.1.4-.3.6l-.2.2v.1h.4c.5 0 .9.4.9.9v1.1c0 .5-.4.9-.9.9h-.3-.1v.1l.3.2c.2.2.2.4.2.6 0 .2-.1.4-.2.6l-.8.8c-.2.2-.4.2-.6.2-.2 0-.4-.1-.6-.2l-.2-.2h-.1v.4c0 .4-.4.8-.9.8zm-2-1.9c.1 0 .2 0 .3.1.3.1.4.3.4.6v.3c0 .1.1.3.3.3h1.1c.1 0 .3-.1.3-.3v-.3c0-.3.2-.5.4-.6.3-.1.5-.1.7.1l.2.2c.1.1.3.1.4 0l.8-.8s.1-.1.1-.2 0-.1-.1-.2l-.2-.2c-.2-.2-.2-.5-.1-.7.1-.3.3-.4.6-.4h.3c.1 0 .3-.1.3-.3v-1c0-.1-.1-.3-.3-.3H20c-.3 0-.5-.2-.6-.4-.1-.3 0-.5.1-.7l.2-.2s.1-.1.1-.2 0-.1-.1-.2l-.8-.8c-.1-.1-.3-.1-.4 0l-.2.2c-.3.2-.5.3-.8.2-.3-.1-.4-.3-.4-.6V4c0-.1-.1-.3-.3-.3h-1.1c-.1 0-.3.1-.3.3v.3c0 .3-.2.5-.4.6-.3.1-.5 0-.7-.1l-.2-.2c-.1-.1-.3-.1-.4 0l-.7.7s-.1.1-.1.2 0 .1.1.2l.2.2c.2.2.2.5.1.7-.1.3-.3.4-.6.4h-.3c-.1 0-.3.1-.3.3v1.1c0 .1.1.3.3.3h.3c.3 0 .5.2.6.4.1.3 0 .5-.1.7l-.2.2s-.1.1-.1.2 0 .1.1.2l.8.8c.1.1.3.1.4 0l.2-.2c.1-.2.2-.3.4-.3z"
												/>
												<linearGradient
													id="prefix__c"
													gradientUnits="userSpaceOnUse"
													x1={19.156}
													y1={3.893}
													x2={6.735}
													y2={20.922}
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
													fill="url(#prefix__c)"
													d="M16.3 10.2c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zm0-4.1c-1 0-1.7.8-1.7 1.7s.8 1.7 1.7 1.7S18 8.8 18 7.8s-.8-1.7-1.7-1.7z"
												/>
											</g>
										</switch>
									</svg>
								),
								className:
									"wp-block-guteblock-blockquote tabControll tab-one"
							},
							{
								name: "Icon Settings",
								title: (
									<svg
										viewBox="0 0 24 24"
										x={0}
										y={0}
										height="50"
										width="50"
									>
										<switch>
											<g>
												<linearGradient
													id="prefix__a"
													gradientUnits="userSpaceOnUse"
													x1={3.508}
													y1={13.758}
													x2={10.3}
													y2={13.758}
													gradientTransform="matrix(.9997 -.02509 .02509 .9997 -.278 .282)"
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
													fill="url(#prefix__a)"
													d="M6.8 8.8l-2.2 3.8c-1 1.7-1.1 2.2-1.1 3.2C3.5 17.6 5.1 19 7 19s3.4-1.5 3.3-3.3c0-1.2-.7-2.1-2-2.7l1.9-4.2H6.8z"
												/>
												<linearGradient
													id="prefix__b"
													gradientUnits="userSpaceOnUse"
													x1={10.954}
													y1={15.789}
													x2={17.746}
													y2={15.789}
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
													fill="url(#prefix__b)"
													d="M16.2 14.7c-1.7 0-3.3-.7-4.4-1.8-.6 1.1-.9 2.1-.9 2.8 0 1.8 1.6 3.2 3.5 3.2 1.8 0 3.3-1.5 3.3-3.3 0-.3-.1-.6-.2-.9-.4-.1-.8 0-1.3 0z"
												/>
												<linearGradient
													id="prefix__c"
													gradientUnits="userSpaceOnUse"
													x1={19.23}
													y1={5.407}
													x2={7.306}
													y2={21.754}
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
													fill="url(#prefix__c)"
													d="M17 13.7h-1.1c-.5 0-.8-.4-.8-.8v-.3-.1H15l-.2.2c-.3.3-.8.3-1.2 0l-.7-.7c-.2-.2-.2-.4-.2-.6 0-.2.1-.4.2-.6l.2-.2v-.1h-.4c-.5 0-.8-.4-.8-.8v-1c0-.5.4-.8.8-.8h.4v-.1l-.2-.2c-.2-.2-.2-.4-.2-.6 0-.2.1-.4.2-.6l.8-.8c.3-.3.8-.3 1.2 0l.1.2h.1V5.5c0-.5.4-.8.8-.8H17c.5 0 .8.4.8.8v.4h.1l.2-.2c.3-.3.8-.3 1.2 0l.7.7c.2.2.2.4.2.6 0 .2-.1.4-.2.6l-.2.2v.1h.4c.5 0 .8.4.8.8v1.1c0 .5-.4.8-.8.8h-.3-.1v.1l.2.2c.2.2.2.4.2.6 0 .2-.1.4-.2.6l-.8.8c-.2.2-.4.2-.6.2-.2 0-.4-.1-.6-.2l-.2-.2h-.1v.4c.1.3-.2.6-.7.6zM15.1 12h.2c.2.1.4.3.4.6v.3c0 .1.1.2.2.2H17c.1 0 .2-.1.2-.2v-.3c0-.3.2-.5.4-.6.2-.1.5 0 .7.1l.2.2c.1.1.3.1.3 0l.8-.8s.1-.1.1-.2 0-.1-.1-.2l-.2-.2c-.2-.2-.2-.5-.1-.7.1-.2.3-.4.6-.4h.3c.1 0 .2-.1.2-.2v-.9c0-.1-.1-.2-.2-.2h-.3c-.3 0-.5-.2-.6-.4-.1-.2 0-.5.1-.7l.2-.2s.1-.1.1-.2 0-.1-.1-.2l-.7-.8c-.1-.1-.3-.1-.3 0l-.2.2c-.2.2-.5.2-.7.1-.2-.1-.4-.3-.4-.6v-.2c0-.1-.1-.2-.2-.2H16c-.1 0-.2.1-.2.2v.3c0 .3-.2.5-.4.6-.2.1-.5 0-.7-.1l-.3-.3c-.1-.1-.2-.1-.3 0l-.8.8s-.1.1-.1.2 0 .1.1.2l.2.2c.2.2.2.5.1.7-.1.2-.3.4-.6.4h-.3c-.1 0-.2.1-.2.2v1.1c0 .1.1.2.2.2h.3c.3 0 .5.2.6.4.1.2 0 .5-.1.7l-.2.2s-.1.1-.1.2 0 .1.1.2l.8.8c.1.1.2.1.3 0l.2-.2c.1-.3.3-.3.5-.3z"
												/>
												<linearGradient
													id="prefix__d"
													gradientUnits="userSpaceOnUse"
													x1={19.23}
													y1={5.407}
													x2={7.306}
													y2={21.753}
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
													fill="url(#prefix__d)"
													d="M16.5 11.4c-1.2 0-2.2-1-2.2-2.2s1-2.2 2.2-2.2 2.2 1 2.2 2.2-1 2.2-2.2 2.2zm0-3.9c-.9 0-1.7.7-1.7 1.7 0 .9.7 1.7 1.7 1.7.9 0 1.7-.7 1.7-1.7-.1-.9-.8-1.7-1.7-1.7z"
												/>
											</g>
										</switch>
									</svg>
								),
								className:
									"wp-block-guteblock-blockquote tabControll tab-one"
							}
						]}
					>
						{tab => {
							switch (tab.name) {
								case "Main Heading Settings":
									if (isHeadTitleShow) {
										return (
											<>
												<div className="wp-block-guteblock-blockquote tabControll controller-holder">
													<div className="wp-block-guteblock-blockquote sepratorController" />
													<ToggleControl
														label={__(
															"Enable Heading",
															"guteblock"
														)}
														onChange={
															this
																.toggleTitle
														}
														checked={
															isHeadTitleShow
														}
													/>
													<div className="wp-block-guteblock-blockquote sepratorController" />
													<RangeControl
														label={__(
															"Font Size For Title(px)",
															"guteblock"
														)}
														value={
															fontSizeForHead
														}
														onChange={fontSizechange =>
															this.props.setAttributes(
																{
																	fontSizeForHead: fontSizechange
																}
															)
														}
														min={14}
														max={45}
														step={0.5}
													/>
													<div className="wp-block-guteblock-blockquote sepratorController" />
													<div className="wp-block-guteblock-blockquote alignTofull">
														<AlignmentToolbar
															onChange={
																this
																	.onChangeAlignmentofHead
															}
															value={
																alignmentForHead
															}
															isCollapsed={
																false
															}
														/>
													</div>
													<div className="wp-block-guteblock-blockquote sepratorController" />
													<TextControl
														label="Letter Spacing"
														value={
															letterSpacingForTitle
														}
														type="number"
														onChange={newLH =>
															setAttributes(
																{
																	letterSpacingForTitle: newLH
																}
															)
														}
													/>
													<div className="wp-block-guteblock-blockquote sepratorController" />
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
																	paddingForHeadseprate.top
																}
																type="number"
																onChange={paddingVal => {
																	const newVal = {
																		top: paddingVal,
																		bottom:
																			paddingForHeadseprate.bottom,
																		left:
																			paddingForHeadseprate.left,
																		right:
																			paddingForHeadseprate.right
																	};
																	setAttributes(
																		{
																			paddingForHeadseprate: newVal
																		}
																	);
																}}
															/>
															<TextControl
																label="Bottom"
																value={
																	paddingForHeadseprate.bottom
																}
																type="number"
																onChange={paddingVal => {
																	const newVal = {
																		top:
																			paddingForHeadseprate.top,
																		bottom: paddingVal,
																		left:
																			paddingForHeadseprate.left,
																		right:
																			paddingForHeadseprate.right
																	};
																	this.props.setAttributes(
																		{
																			paddingForHeadseprate: newVal
																		}
																	);
																}}
															/>
															<TextControl
																label="Left"
																value={
																	paddingForHeadseprate.left
																}
																type="number"
																onChange={paddingVal => {
																	const newVal = {
																		top:
																			paddingForHeadseprate.top,
																		bottom:
																			paddingForHeadseprate.bottom,
																		left: paddingVal,
																		right:
																			paddingForHeadseprate.right
																	};
																	this.props.setAttributes(
																		{
																			paddingForHeadseprate: newVal
																		}
																	);
																}}
															/>
															<TextControl
																label="Right"
																value={
																	paddingForHeadseprate.right
																}
																type="number"
																onChange={paddingVal => {
																	const newVal = {
																		top:
																			paddingForHeadseprate.top,
																		bottom:
																			paddingForHeadseprate.bottom,
																		left:
																			paddingForHeadseprate.left,
																		right: paddingVal
																	};
																	this.props.setAttributes(
																		{
																			paddingForHeadseprate: newVal
																		}
																	);
																}}
															/>
														</Toolbar>
													</PanelBody>
													<div className="wp-block-guteblock-blockquote sepratorController" />
													{/* //margin setiing */}

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
																label="Margin Left"
																value={
																	marginForHeadseprate.left
																}
																type="number"
																onChange={marginVal => {
																	const newVal = {
																		top:
																			marginForHeadseprate.top,
																		right:
																			marginForHeadseprate.right,
																		left: marginVal,
																		bottom:
																			marginForHeadseprate.bottom
																	};
																	setAttributes(
																		{
																			marginForHeadseprate: newVal
																		}
																	);
																}}
															/>
															<TextControl
																label="Margin Right"
																value={
																	marginForHeadseprate.right
																}
																type="number"
																onChange={marginVal => {
																	const newVal = {
																		top:
																			marginForHeadseprate.top,
																		right: marginVal,
																		left:
																			marginForHeadseprate.left,
																		bottom:
																			marginForHeadseprate.bottom
																	};
																	setAttributes(
																		{
																			marginForHeadseprate: newVal
																		}
																	);
																}}
															/>
															<TextControl
																label="Margin Bottom"
																value={
																	marginForHeadseprate.bottom
																}
																type="number"
																onChange={marginVal => {
																	const newVal = {
																		top:
																			marginForHeadseprate.top,
																		right:
																			marginForHeadseprate.right,
																		left:
																			marginForHeadseprate.left,
																		bottom: marginVal
																	};
																	setAttributes(
																		{
																			marginForHeadseprate: newVal
																		}
																	);
																}}
															/>
															<TextControl
																label="Margin Top"
																value={
																	marginForHeadseprate.top
																}
																type="number"
																onChange={marginVal => {
																	const newVal = {
																		top: marginVal,
																		right:
																			marginForHeadseprate.right,
																		left:
																			marginForHeadseprate.left,
																		bottom:
																			marginForHeadseprate.bottom
																	};
																	setAttributes(
																		{
																			marginForHeadseprate: newVal
																		}
																	);
																}}
															/>
														</Toolbar>
													</PanelBody>
													<div className="wp-block-guteblock-blockquote sepratorController" />
													<PanelColorSettings
														title={__(
															"Color Settings",
															"guteblock"
														)}
														colorSettings={[
															{
																value: colorForHead,
																onChange: this
																	.onChangeHeadTextColor,
																label: __(
																	"Header Title Color",
																	"guteblock"
																)
															}
														]}
													/>
													<div className="wp-block-guteblock-blockquote sepratorController" />
													<SelectControl
														label="Transform"
														value={
															HeaderTransformTo
														}
														options={[
															{
																label:
																	"Capitalize",
																value:
																	"capitalize"
															},
															{
																label:
																	"Uppercase",
																value:
																	"uppercase"
															},
															{
																label:
																	"Lowercase",
																value:
																	"lowercase"
															},
															{
																label:
																	"None",
																value:
																	"none"
															}
														]}
														onChange={HeaderTransformTo => {
															setAttributes(
																{
																	HeaderTransformTo
																}
															);
														}}
													/>
													<div className="wp-block-guteblock-blockquote sepratorController" />
													<SelectControl
														label="Font Weight"
														value={
															headerFontWeight
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
															setAttributes(
																{
																	headerFontWeight
																}
															);
														}}
													/>
													<div className="wp-block-guteblock-blockquote sepratorController" />
												</div>
											</>
										);
									} else {
										return (
											<div className="wp-block-guteblock-blockquote tabControll controller-holder">
												<div className="wp-block-guteblock-blockquote sepratorController" />
												<ToggleControl
													label={__(
														"Header",
														"guteblock"
													)}
													onChange={
														this
															.toggleTitle
													}
													checked={
														isHeadTitleShow
													}
												/>
												<div className="wp-block-guteblock-blockquote sepratorController" />
											</div>
										);
									}
								case "Container Settings":
									return (
										<>
											<div className="wp-block-guteblock-blockquote sepratorController" />
											<PanelColorSettings
												title={__(
													" Background Color Setting",
													"guteblock"
												)}
												colorSettings={[
													{
														value: conatinerMainBackgroundColor,
														onChange: this
															.onContainerbgChange,
														label: __(
															"Container Background Color",
															"guteblock"
														)
													}
												]}
											/>
											<div className="wp-block-guteblock-blockquote sepratorController" />
											<PanelBody
												title="Padding Settings"
												initialOpen={false}
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
														This is
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
																	containerPadding.right
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
																	containerPadding.right
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
																	containerPadding.right
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
																right: paddingVal
															};
															this.props.setAttributes(
																{
																	containerPadding: newVal
																}
															);
														}}
													/>
												</Toolbar>
											</PanelBody>
											<div className="wp-block-guteblock-blockquote sepratorController" />
											<PanelBody
												title="Margin Settings"
												initialOpen={false}
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
														This is
														for
														controlling
														Margin
													</h4>
												</PanelRow>
												<Toolbar>
													<TextControl
														label="Top"
														value={
															containerMargin.top
														}
														type="number"
														onChange={paddingVal => {
															const newVal = {
																top: paddingVal,
																bottom:
																	containerMargin.bottom,
																left:
																	containerMargin.left,
																right:
																	containerMargin.right
															};
															setAttributes(
																{
																	containerMargin: newVal
																}
															);
														}}
													/>
													<TextControl
														label="Bottom"
														value={
															containerMargin.bottom
														}
														type="number"
														onChange={paddingVal => {
															const newVal = {
																top:
																	containerMargin.top,
																bottom: paddingVal,
																left:
																	containerMargin.left,
																right:
																	containerMargin.right
															};
															this.props.setAttributes(
																{
																	containerMargin: newVal
																}
															);
														}}
													/>
													{!containerMargin.isToggler ? (
														<>
															<TextControl
																label="Left"
																value={
																	containerMargin.left
																}
																type="number"
																onChange={paddingVal => {
																	const newVal = {
																		top:
																			containerMargin.top,
																		bottom:
																			containerMargin.bottom,
																		left: paddingVal,
																		right:
																			containerMargin.right
																	};
																	this.props.setAttributes(
																		{
																			containerMargin: newVal
																		}
																	);
																}}
															/>
															<TextControl
																label="Right"
																value={
																	containerMargin.right
																}
																type="number"
																onChange={paddingVal => {
																	const newVal = {
																		top:
																			containerMargin.top,
																		bottom:
																			containerMargin.bottom,
																		left:
																			containerMargin.left,
																		right: paddingVal
																	};
																	this.props.setAttributes(
																		{
																			containerMargin: newVal
																		}
																	);
																}}
															/>
														</>
													) : null}
												</Toolbar>
												<ToggleControl
													label={__(
														"Enable auto for Margin",
														"guteblock"
													)}
													onChange={onchnaging => {
														console.log(
															onchnaging
														);
														const newVal = {
															top:
																containerMargin.top,
															bottom:
																containerMargin.bottom,
															left:
																"auto",
															right:
																"auto",
															isToggler: !containerMargin.isToggler
														};
														this.props.setAttributes(
															{
																containerMargin: newVal
															}
														);
													}}
													checked={
														containerMargin.isToggler
													}
												/>
											</PanelBody>
											<div className="wp-block-guteblock-blockquote sepratorController" />
											<RangeControl
												label={__(
													"Border Radius For Container (px)",
													"guteblock"
												)}
												value={
													containerBorderRadius
												}
												onChange={fontSizechange =>
													this.props.setAttributes(
														{
															containerBorderRadius: fontSizechange
														}
													)
												}
												min={0}
												max={400}
												step={1}
											/>
											<div className="wp-block-guteblock-blockquote sepratorController" />
											<Dropdown
												className="wp-block-guteblock-blockquote switchToCenter"
												contentClassName="inner-popover-content-Width"
												position="top left"
												renderToggle={({
													isOpen,
													onToggle
												}) => (
													<Button
														className="wp-block-guteblock-blockquote switchToCenter buttonOn"
														onClick={
															onToggle
														}
														aria-expanded={
															isOpen
														}
													>
														Inner
														Container
														Settings
													</Button>
												)}
												renderContent={() => (
													<div className="inner-popover-content-Width">
														<RangeControl
															label={__(
																"Width For Inner Container (%)",
																"guteblock"
															)}
															value={
																innerContainerWidth
															}
															onChange={widthChange =>
																this.props.setAttributes(
																	{
																		innerContainerWidth: widthChange
																	}
																)
															}
															min={
																0
															}
															max={
																100
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
																	value: innerContainerColor,
																	onChange: this
																		.onChangeInnerContainerColor,
																	label: __(
																		"Content Color",
																		"guteblock"
																	)
																}
															]}
														/>
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
															<TextControl
																label="Top"
																value={
																	innerContainerPadding.top
																}
																type="number"
																onChange={paddingVal => {
																	const newVal = {
																		top: paddingVal,
																		bottom:
																			innerContainerPadding.bottom,
																		left:
																			innerContainerPadding.left,
																		right:
																			innerContainerPadding.right
																	};
																	setAttributes(
																		{
																			innerContainerPadding: newVal
																		}
																	);
																}}
															/>
															<TextControl
																label="Bottom"
																value={
																	innerContainerPadding.bottom
																}
																type="number"
																onChange={paddingVal => {
																	const newVal = {
																		top:
																			innerContainerPadding.top,
																		bottom: paddingVal,
																		left:
																			innerContainerPadding.left,
																		right:
																			innerContainerPadding.right
																	};
																	this.props.setAttributes(
																		{
																			innerContainerPadding: newVal
																		}
																	);
																}}
															/>
															<TextControl
																label="Left"
																value={
																	innerContainerPadding.left
																}
																type="number"
																onChange={paddingVal => {
																	const newVal = {
																		top:
																			innerContainerPadding.top,
																		bottom:
																			innerContainerPadding.bottom,
																		left: paddingVal,
																		right:
																			innerContainerPadding.right
																	};
																	this.props.setAttributes(
																		{
																			innerContainerPadding: newVal
																		}
																	);
																}}
															/>
															<TextControl
																label="Right"
																value={
																	innerContainerPadding.right
																}
																type="number"
																onChange={paddingVal => {
																	const newVal = {
																		top:
																			innerContainerPadding.top,
																		bottom:
																			innerContainerPadding.bottom,
																		left:
																			innerContainerPadding.left,
																		right: paddingVal
																	};
																	this.props.setAttributes(
																		{
																			innerContainerPadding: newVal
																		}
																	);
																}}
															/>
														</PanelBody>
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
																		.toggleBoxShadowInnerContainer
																}
																checked={
																	isBoxShadowISneeded
																}
															></ToggleControl>
															{isBoxShadowISneeded ? (
																<>
																	<RangeControl
																		label={__(
																			"X-Offset For Box Shadow (px)",
																			"guteblock"
																		)}
																		value={
																			innerConatinerBoxShadow.xoffset
																		}
																		onChange={valChange => {
																			const newVal = {
																				xoffset: valChange,
																				yOffset:
																					innerConatinerBoxShadow.yOffset,
																				Blur:
																					innerConatinerBoxShadow.Blur,
																				spreadShadow:
																					innerConatinerBoxShadow.spreadShadow,
																				colorShadow:
																					innerConatinerBoxShadow.colorShadow
																			};
																			this.props.setAttributes(
																				{
																					innerConatinerBoxShadow: newVal
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
																			innerConatinerBoxShadow.yOffset
																		}
																		onChange={valChange => {
																			const newVal = {
																				xoffset:
																					innerConatinerBoxShadow.xoffset,
																				yOffset: valChange,
																				Blur:
																					innerConatinerBoxShadow.Blur,
																				spreadShadow:
																					innerConatinerBoxShadow.spreadShadow,
																				colorShadow:
																					innerConatinerBoxShadow.colorShadow
																			};
																			this.props.setAttributes(
																				{
																					innerConatinerBoxShadow: newVal
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
																			innerConatinerBoxShadow.Blur
																		}
																		onChange={valChange => {
																			const newVal = {
																				xoffset:
																					innerConatinerBoxShadow.xoffset,
																				yOffset:
																					innerConatinerBoxShadow.yOffset,
																				Blur: valChange,
																				spreadShadow:
																					innerConatinerBoxShadow.spreadShadow,
																				colorShadow:
																					innerConatinerBoxShadow.colorShadow
																			};
																			this.props.setAttributes(
																				{
																					innerConatinerBoxShadow: newVal
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
																			innerConatinerBoxShadow.spreadShadow
																		}
																		onChange={valChange => {
																			const newVal = {
																				xoffset:
																					innerConatinerBoxShadow.xoffset,
																				yOffset:
																					innerConatinerBoxShadow.yOffset,
																				Blur:
																					innerConatinerBoxShadow.Blur,
																				spreadShadow: valChange,
																				colorShadow:
																					innerConatinerBoxShadow.colorShadow
																			};
																			this.props.setAttributes(
																				{
																					innerConatinerBoxShadow: newVal
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
																					innerConatinerBoxShadow.colorShadow,
																				onChange: this
																					.onChangeinnerConatinerBoxShadowColor,
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
														<RangeControl
															label={__(
																"Border Radius For Inner Container (px)",
																"guteblock"
															)}
															value={
																innerConatinerBorderRadius
															}
															onChange={valChange => {
																this.props.setAttributes(
																	{
																		innerConatinerBorderRadius: valChange
																	}
																);
															}}
															min={
																0
															}
															max={
																200
															}
															step={
																1
															}
														/>
														<ToggleControl
															label={__(
																"Same Color as Container",
																"guteblock"
															)}
															checked={
																isSameAsContainerColor
															}
															onChange={onChange => {
																this.props.setAttributes(
																	{
																		isSameAsContainerColor: !this
																			.props
																			.attributes
																			.isSameAsContainerColor
																	}
																);
																if (
																	onChange
																) {
																	this.props.setAttributes(
																		{
																			innerContainerColor: this
																				.props
																				.attributes
																				.conatinerMainBackgroundColor
																		}
																	);
																}
															}}
														/>
														<div className="wp-block-guteblock-blockquote sepratorController" />
													</div>
												)}
											/>
										</>
									);
								case "Contents Settings":
									return (
										<>
											<div className="wp-block-guteblock-blockquote sepratorController" />
											<PanelColorSettings
												title={__(
													"Color Settings",
													"guteblock"
												)}
												colorSettings={[
													{
														value: contentColor,
														onChange: this
															.onChangeContentTextColor,
														label: __(
															"Content Color",
															"guteblock"
														)
													}
												]}
											/>
											<div className="wp-block-guteblock-blockquote sepratorController" />
											<RangeControl
												label={__(
													"Line Height for content (px)",
													"guteblock"
												)}
												value={
													lineHieghtContent
												}
												onChange={lineHightChange =>
													this.props.setAttributes(
														{
															lineHieghtContent: lineHightChange
														}
													)
												}
												min={0}
												max={400}
												step={1}
											/>
											<div className="wp-block-guteblock-blockquote sepratorController" />
											<RangeControl
												label={__(
													"Letter Spacing fron content (px)",
													"guteblock"
												)}
												value={
													letterSpacingContent
												}
												onChange={letterSpaceChange =>
													this.props.setAttributes(
														{
															letterSpacingContent: letterSpaceChange
														}
													)
												}
												min={0}
												max={12}
												step={0.2}
											/>
											<div className="wp-block-guteblock-blockquote sepratorController" />
											<SelectControl
												label="Transform"
												value={
													contentTransformTo
												}
												options={[
													{
														label:
															"Capitalize",
														value:
															"capitalize"
													},
													{
														label:
															"Uppercase",
														value:
															"uppercase"
													},
													{
														label:
															"Lowercase",
														value:
															"lowercase"
													},
													{
														label:
															"None",
														value:
															"none"
													}
												]}
												onChange={contentTransformTo => {
													setAttributes({
														contentTransformTo
													});
												}}
											/>
											<div className="wp-block-guteblock-blockquote sepratorController" />
											<SelectControl
												label="Font Weight"
												value={
													fontWeigthContent
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
												onChange={fontWeigthContent => {
													setAttributes({
														fontWeigthContent
													});
												}}
											/>
											<div className="wp-block-guteblock-blockquote sepratorController" />
											<PanelBody
												title="Padding Settings"
												initialOpen={false}
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
														This is
														for
														controlling
														Padding
													</h4>
												</PanelRow>
												<Toolbar>
													<TextControl
														label="Top"
														value={
															contentPadding.top
														}
														type="number"
														onChange={paddingVal => {
															const newVal = {
																top: paddingVal,
																bottom:
																	contentPadding.bottom,
																left:
																	contentPadding.left,
																right:
																	contentPadding.right
															};
															setAttributes(
																{
																	contentPadding: newVal
																}
															);
														}}
													/>
													<TextControl
														label="Bottom"
														value={
															contentPadding.bottom
														}
														type="number"
														onChange={paddingVal => {
															const newVal = {
																top:
																	contentPadding.top,
																bottom: paddingVal,
																left:
																	contentPadding.left,
																right:
																	contentPadding.right
															};
															this.props.setAttributes(
																{
																	contentPadding: newVal
																}
															);
														}}
													/>
													<TextControl
														label="Left"
														value={
															contentPadding.left
														}
														type="number"
														onChange={paddingVal => {
															const newVal = {
																top:
																	contentPadding.top,
																bottom:
																	contentPadding.bottom,
																left: paddingVal,
																right:
																	contentPadding.right
															};
															this.props.setAttributes(
																{
																	contentPadding: newVal
																}
															);
														}}
													/>
													<TextControl
														label="Right"
														value={
															contentPadding.right
														}
														type="number"
														onChange={paddingVal => {
															const newVal = {
																top:
																	contentPadding.top,
																bottom:
																	contentPadding.bottom,
																left:
																	contentPadding.left,
																right: paddingVal
															};
															this.props.setAttributes(
																{
																	contentPadding: newVal
																}
															);
														}}
													/>
												</Toolbar>
											</PanelBody>
											<div className="wp-block-guteblock-blockquote sepratorController" />
											<Dropdown
												className="wp-block-guteblock-blockquote switchToCenter"
												contentClassName="inner-popover-content-Width"
												position="top left"
												renderToggle={({
													isOpen,
													onToggle
												}) => (
													<Button
														className="wp-block-guteblock-blockquote switchToCenter buttonOn"
														onClick={
															onToggle
														}
														aria-expanded={
															isOpen
														}
													>
														Author
														Name
														Settings
													</Button>
												)}
												renderContent={() => (
													<div className="inner-popover-content-Width">
														<div className="wp-block-guteblock-blockquote switchToCenter">
															<ToggleControl
																label={__(
																	"Enable Author Name",
																	"guteblock"
																)}
																onChange={
																	this
																		.toggleAuthorName
																}
																checked={
																	authorIsShown
																}
															/>
														</div>
														{authorIsShown ? (
															<>
																<div className="wp-block-guteblock-blockquote sepratorController-innerDropDown" />
																<div className="wp-block-guteblock-blockquote alignTofull">
																	<AlignmentToolbar
																		onChange={onChange => {
																			this.props.setAttributes(
																				{
																					authorAlign: onChange
																				}
																			);
																		}}
																		value={
																			authorAlign
																		}
																		isCollapsed={
																			false
																		}
																	/>
																</div>
																<div className="wp-block-guteblock-blockquote sepratorController-innerDropDown" />
																<RangeControl
																	label={__(
																		"Font Size (px)",
																		"guteblock"
																	)}
																	value={
																		authorFontSize
																	}
																	onChange={fontSizeChange =>
																		this.props.setAttributes(
																			{
																				authorFontSize: fontSizeChange
																			}
																		)
																	}
																	min={
																		12
																	}
																	max={
																		30
																	}
																	step={
																		0.5
																	}
																/>
																<div className="wp-block-guteblock-blockquote sepratorController-innerDropDown" />
																<PanelColorSettings
																	title={__(
																		"Color Settings",
																		"guteblock"
																	)}
																	colorSettings={[
																		{
																			value: authorFontColor,
																			onChange: this
																				.onChangeAuthorFontColor,
																			label: __(
																				"Font Color",
																				"guteblock"
																			)
																		}
																	]}
																/>
															</>
														) : null}
													</div>
												)}
											/>
											<div className="wp-block-guteblock-blockquote sepratorController" />
										</>
									);
								case "Icon Settings":
									return (
										<>
											<div className="wp-block-guteblock-blockquote sepratorController" />
											<PanelBody
												title="General Settings"
												initialOpen={false}
											>
												<RangeControl
													label={__(
														"Size Of Icon",
														"guteblock"
													)}
													value={
														iconGeneral.size
													}
													onChange={SizeChange => {
														const newval = {
															size: SizeChange,
															opacity:
																iconGeneral.opacity,
															color:
																iconGeneral.color
														};
														this.props.setAttributes(
															{
																iconGeneral: newval
															}
														);
													}}
													min={0}
													max={styleName === '2'? 130 :60}
													step={1}
												/>
												<RangeControl
													label={__(
														"Opacity Of Icon",
														"guteblock"
													)}
													value={
														iconGeneral.opacity
													}
													onChange={opacityChange => {
														const newval = {
															size:
																iconGeneral.size,
															opacity: opacityChange,
															color:
																iconGeneral.color
														};
														this.props.setAttributes(
															{
																iconGeneral: newval
															}
														);
													}}
													min={0}
													max={1}
													step={0.02}
												/>
												<PanelColorSettings
													title={__(
														"Color Settings",
														"guteblock"
													)}
													colorSettings={[
														{
															value:
																iconGeneral.color,
															onChange: this
																.onChangeIconColor,
															label: __(
																"Icon Color",
																"guteblock"
															)
														}
													]}
												/>
											</PanelBody>
											<div className="wp-block-guteblock-blockquote sepratorController" />
											<PanelBody
												title="Open Icon Settings"
												initialOpen={false}
											>
												<ToggleControl
													label={__(
														"Hide This Icon",
														"guteblock"
													)}
													onChange={
														this
															.toggleIconAbove
													}
													checked={
														iconAbove.isShown
													}
												/>
												{!iconAbove.isShown ? (
													<>
														<RangeControl
															label={__(
																"Horizontal Move",
																"guteblock"
															)}
															value={
																iconAbove.horizontal
															}
															onChange={SizeChange => {
																const newval = {
																	horizontal: SizeChange,
																	vertical:
																		iconAbove.vertical
																};
																this.props.setAttributes(
																	{
																		iconAbove: newval
																	}
																);
															}}
															min={
																0
															}
															max={
																100
															}
															step={
																0.5
															}
														/>
														{styleName ===
														"2" ? (
															<RangeControl
																label={__(
																	"Vertical Move",
																	"guteblock"
																)}
																value={
																	iconAbove.vertical
																}
																onChange={SizeChange => {
																	const newval = {
																		horizontal: iconAbove.horizontal,
																		vertical: SizeChange
																	};
																	this.props.setAttributes(
																		{
																			iconAbove: newval
																		}
																	);
																}}
																min={
																	0
																}
																max={
																	95
																}
																step={
																	0.5
																}
															/>
														) : null}
													</>
												) : null}
											</PanelBody>
											<div className="wp-block-guteblock-blockquote sepratorController" />
											<PanelBody
												title="Close Icon Settings"
												initialOpen={false}
											>
												<ToggleControl
													label={__(
														"Hide This Icon",
														"guteblock"
													)}
													onChange={
														this
															.toggleIconBelow
													}
													checked={
														iconBelow.isShown
													}
												/>
												{!iconBelow.isShown ? (
													<>
														<RangeControl
															label={__(
																"Horizontal Move",
																"guteblock"
															)}
															value={
																iconBelow.vertical
															}
															onChange={SizeChange => {
																const newval = {
																	horizontal:
																		iconBelow.horizontal,
																	vertical: SizeChange
																};
																this.props.setAttributes(
																	{
																		iconBelow: newval
																	}
																);
															}}
															min={
																0
															}
															max={
																95
															}
															step={
																0.5
															}
														/>
														{styleName ===
														"2" ? (
															<RangeControl
																label={__(
																	"Vertical Move",
																	"guteblock"
																)}
																value={
																	iconBelow.horizontal
																}
																onChange={SizeChange => {
																	const newval = {
																		horizontal: SizeChange,
																		vertical:
																			iconBelow.vertical
																	};
																	this.props.setAttributes(
																		{
																			iconBelow: newval
																		}
																	);
																}}
																min={
																	0
																}
																max={
																	95
																}
																step={
																	0.5
																}
															/>
														) : null}
													</>
												) : null}
											</PanelBody>
											<div className="wp-block-guteblock-blockquote sepratorController" />
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
						backgroundColor: conatinerMainBackgroundColor,
						paddingTop: `${containerPadding.top}px`,
						paddingBottom: `${containerPadding.bottom}px`,
						paddingRight: `${containerPadding.right}px`,
						paddingLeft: `${containerPadding.left}px`,
						marginTop: `${containerMargin.top}px`,
						marginLeft:
							containerMargin.left !== "auto"
								? `${containerMargin.left}px`
								: "auto",
						marginRight:
							containerMargin.right !== "auto"
								? `${containerMargin.right}px`
								: "auto",
						marginBottom: `${containerMargin.bottom}px`,
						borderRadius: `${containerBorderRadius}px`
					}}
				>
					<div
						className={
							"wp-block-guteblock-blockquote__Inner-container"
						}
						style={{
							width: `${innerContainerWidth}%`,
							backgroundColor: innerContainerColor,
							paddingTop: `${innerContainerPadding.top}px`,
							paddingBottom: `${innerContainerPadding.bottom}px`,
							paddingRight: `${innerContainerPadding.right}px`,
							paddingLeft: `${innerContainerPadding.left}px`,
							borderRadius: `${innerConatinerBorderRadius}px`,
							boxShadow: isBoxShadowISneeded
								? `${innerConatinerBoxShadow.xoffset}px  ${innerConatinerBoxShadow.yOffset}px ${innerConatinerBoxShadow.Blur}px ${innerConatinerBoxShadow.spreadShadow}px ${innerConatinerBoxShadow.colorShadow}`
								: "none"
						}}
					>
						{isHeadTitleShow ? (
							<div
								className={
									"wp-block-guteblock-blockquote__title-outer"
								}
							>
								<RichText
									className={classes}
									tagName="h4"
									value={title}
									onChange={this.onChangeTitle}
									placeholder={__(
										"Qoute Title",
										"guteblock"
									)}
									style={{
										fontSize: `${fontSizeForHead}px`,
										textAlign: alignmentForHead,
										paddingTop: `${paddingForHeadseprate.top}px`,
										paddingBottom: `${paddingForHeadseprate.bottom}px`,
										paddingRight: `${paddingForHeadseprate.right}px`,
										paddingLeft: `${paddingForHeadseprate.left}px`,
										marginBottom: `${marginForHeadseprate.bottom}px`,
										marginTop: `${marginForHeadseprate.top}px`,
										marginLeft: `${marginForHeadseprate.left}px`,
										marginRight: `${marginForHeadseprate.right}px`,
										letterSpacing: `${letterSpacingForTitle}px`,
										color: `${colorForHead}`,
										textTransform: HeaderTransformTo,
										fontWeight: headerFontWeight
									}}
								/>
							</div>
						) : null}
						{styleName === "1" ? (
							<>
								<div
									className={
										"wp-block-guteblock-blockquote__content-outer"
									}
								>
									{!iconAbove.isShown ? (
										<>
											<div
												className="wp-block-guteblock-blockquote__svgTracker"
												style={{
													marginBottom: `${iconGeneral.size -
														10}px`
												}}
											>
												<div
													className="wp-block-guteblock-blockquote__svgTracker svgController-up"
													style={{
														fill:
															iconGeneral.color,
														opacity:
															iconGeneral.opacity,
														top: `${iconAbove.vertical}%`,
														left: `${iconAbove.horizontal}%`
													}}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width={
															iconGeneral.size
														}
														height={
															iconGeneral.size
														}
														viewBox="0 0 24 24"
													>
														<path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
													</svg>
												</div>
											</div>
										</>
									) : null}
									<div className="wp-block-guteblock-blockquote__contentReal">
										<RichText
											className={
												"wp-block-guteblock-blockquote__content"
											}
											tagName="p"
											value={qouteContent}
											onChange={
												this.onqouteContent
											}
											placeholder={__(
												"Qoute Contents",
												"guteblock"
											)}
											style={{
												letterSpacing: `${letterSpacingContent}px`,
												color: `${contentColor}`,
												textTransform: contentTransformTo,
												fontWeight: fontWeigthContent,
												lineHeight: `${lineHieghtContent}px`,
												paddingTop: `${contentPadding.top}px`,
												paddingBottom: `${contentPadding.bottom}px`,
												paddingRight: `${contentPadding.right}px`,
												paddingLeft: `${contentPadding.left}px`
											}}
										/>
									</div>
									{!iconBelow.isShown ? (
										<>
											<div className="wp-block-guteblock-blockquote__svgTracker">
												<div
													className="wp-block-guteblock-blockquote__svgTracker svgController-down"
													style={{
														fill:
															iconGeneral.color,
														opacity:
															iconGeneral.opacity,
														right: `${iconBelow.vertical}%`
													}}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width={
															iconGeneral.size
														}
														height={
															iconGeneral.size
														}
														viewBox="0 0 24 24"
													>
														<path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
													</svg>
												</div>
											</div>
										</>
									) : null}
									{authorIsShown ? (
										<RichText
											className={
												"wp-block-guteblock-blockquote content-author"
											}
											tagName="h5"
											value={autherName}
											onChange={
												this.onAuthorChange
											}
											placeholder={__(
												"Author Name",
												"guteblock"
											)}
											style={{
												textAlign: `${authorAlign}`,
												fontSize: `${authorFontSize}px`,
												color: `${authorFontColor}`
											}}
											keepPlaceholderOnFocus
										/>
									) : null}
								</div>
							</>
						) : (
							<>
								<div
									className={
										"wp-block-guteblock-blockquote__content-outer__secondStyle"
									}
								>
									{!iconAbove.isShown ? (
										<>
											<div
												className="wp-block-guteblock-blockquote__svgTracker svgController-up"
												style={{
													fill:
														iconGeneral.color,
													opacity:
														iconGeneral.opacity,
													top: `${iconAbove.vertical}%`,
													left: `${iconAbove.horizontal}%`
												}}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={
														iconGeneral.size
													}
													height={
														iconGeneral.size
													}
													viewBox="0 0 24 24"
												>
													<path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
												</svg>
											</div>
										</>
									) : null}
									<div className="wp-block-guteblock-blockquote__contentReal">
										<RichText
											className={
												"wp-block-guteblock-blockquote__content"
											}
											tagName="p"
											value={qouteContent}
											onChange={
												this.onqouteContent
											}
											placeholder={__(
												"Qoute Contents",
												"guteblock"
											)}
											style={{
												letterSpacing: `${letterSpacingContent}px`,
												color: `${contentColor}`,
												textTransform: contentTransformTo,
												fontWeight: fontWeigthContent,
												lineHeight: `${lineHieghtContent}px`,
												paddingTop: `${contentPadding.top}px`,
												paddingBottom: `${contentPadding.bottom}px`,
												paddingRight: `${contentPadding.right}px`,
												paddingLeft: `${contentPadding.left}px`
											}}
										/>
									</div>
									{!iconBelow.isShown ? (
										<>
											<div
												className="wp-block-guteblock-blockquote__svgTracker svgController-down"
												style={{
													fill:
														iconGeneral.color,
													opacity:
														iconGeneral.opacity,
													right: `${iconBelow.vertical}%`,
													top: `${iconBelow.horizontal}%`
												}}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={
														iconGeneral.size
													}
													height={
														iconGeneral.size
													}
													viewBox="0 0 24 24"
												>
													<path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
												</svg>
											</div>
										</>
									) : null}
									{authorIsShown ? (
										<RichText
											className={
												"wp-block-guteblock-blockquote content-author"
											}
											tagName="h5"
											value={autherName}
											onChange={
												this.onAuthorChange
											}
											placeholder={__(
												"Author Name",
												"guteblock"
											)}
											style={{
												textAlign: `${authorAlign}`,
												fontSize: `${authorFontSize}px`,
												color: `${authorFontColor}`
											}}
											keepPlaceholderOnFocus
										/>
									) : null}
								</div>
							</>
						)}
					</div>
				</div>
			</>
		);
	}
}

export default BlockQoutes;