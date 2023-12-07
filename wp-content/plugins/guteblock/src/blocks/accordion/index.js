import "./style.editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/editor";
import edit from "./edit.js";
import classnames from 'classnames';

const attributes = {
	title: {
		type: "string",
		source: "html",
		selector: "p.wp-block-guteblock-accordion__title"
	},
	content: {
		type: "string",
		source: "html",
		selector: "p.wp-block-guteblock-accordion__content"
	},
	align: {
		type: "string",
		default: "center"
	},
	alignment: {
		type: "string",
		default: "left"
	},
	//accordion single style
	accordions: {
		type: "array",
		default: [
			{
				title: "Question",
				content: "Answer",
				iconImage: "",
				isIconImage: false,
				controlIcon: "",
				controllcontent: "",
				status: false,
				innerTitle: "",
				isInnerTitleShown: false,
				longContentWithSplit: "",
				islongContentWithSplit: false,
				centerTitleContent: "",
				isCenterTitleContent: false
			}
		]
	},
	//main Container
	conatinerBgColor: {
		type: "object",
		default: {
			r: 255,
			g: 255,
			b: 255,
			a: 0.8,
			realColor: "#dcd7ca"
		}
	},
	containerPadding: {
		type: "object",
		default: {
			top: 60,
			bottom: 60,
			left: 0,
			right: 0,
			isEqualPadding: false
		}
	},
	containerMargin: {
		type: "object",
		default: {
			top: 0,
			bottom: 0,
			isSameNeeded: false
		}
	},
	//inner Conatiner
	IConatinerWidth: {
		type: "number",
		default: 90
	},
	IconatinerBgColor: {
		type: "object",
		default: {
			r: 255,
			g: 255,
			b: 255,
			a: 1,
			realColor: "#fff"
		}
	},
	IcontainerPadding: {
		type: "object",
		default: {
			top: 20,
			bottom: 20,
			left: 0,
			right: 10,
			isEqualPadding: false
		}
	},
	IcontainerMargin: {
		type: "object",
		default: {
			top: 0,
			bottom: 0,
			isSameNeeded: false
		}
	},
	IcontainerBorderRadius: {
		type: "number",
		default: 0
	},
	IConatinerBoxShadow: {
		type: "object",
		default: {
			xoffset: 2,
			yOffset: 2,
			Blur: 3,
			spreadShadow: 0,
			colorShadow: "#eee",
			isNeeded: false
		}
	},
	//accordion-single-settings
	AconatinerBgColor: {
		type: "object",
		default: {
			r: 255,
			g: 255,
			b: 255,
			a: 1,
			realColor: "#fff"
		}
	},
	AcontainerPadding: {
		type: "object",
		default: {
			top: 10,
			bottom: 0,
			left: 25,
			right: 0,
			isEqualPadding: false
		}
	},
	AcontainerMargin: {
		type: "object",
		default: {
			top: 10,
			bottom: 10,
			isSameNeeded: false
		}
	},
	AConatinerBoxShadow: {
		type: "object",
		default: {
			xoffset: 0,
			yOffset: 0,
			Blur: 3,
			spreadShadow: 3,
			colorShadow: "#eee",
			isNeeded: false
		}
	},
	AcontainerBorderRadius: {
		type: "number",
		default: 0
	},
	AcontainerSepartorWidth: {
		type: "number",
		default: 90
	},
	AcontainerSeparatorBgColor: {
		type: "string",
		default: "#ccc"
	},
	AcontainerSeparatorBgOpacity: {
		type: "number",
		default: 0.8
	},
	AcontainerSeparatorBgStyle: {
		type: "string",
		default: "solid"
	},
	AconatinerSeparatorIsNeeded: {
		type: "boolean",
		default: true
	},
	AconatinerSeparatorheight: {
		type: "number",
		default: 1
	},
	//content conatiner
	CcontainerPadding: {
		type: "object",
		default: {
			top: 10,
			bottom: 0,
			left: 75,
			right: 5,
			isEqualPadding: false
		}
	},
	CcontainerMargin: {
		type: "object",
		default: {
			top: 0,
			bottom: 0,
			isSameNeeded: false
		}
	},
	CcontainerSplitIsNeeded: {
		type: "boolean"
	},
	//inner conatiner head title
	IHeading: {
		type: "string",
		default: ""
	},
	IHeadingMargin: {
		type: "object",
		default: {
			top: 0,
			bottom: 0,
			isSameNeeded: false
		}
	},
	IHeadingPadding: {
		type: "object",
		default: {
			top: 10,
			bottom: 0,
			left: 0,
			right: 5,
			isEqualPadding: false
		}
	},
	isIHeadShown: {
		type: "boolean",
		default: false
	},
	IHeadingFontSetup: {
		type: "object",
		default: {
			size: 18,
			weight: 800,
			color: "#000",
			style: "normal",
			align: "left",
			lSpace: 1
		}
	},
	ATitleMargin: {
		type: "object",
		default: {
			top: 0,
			bottom: 0,
			isSameNeeded: false
		}
	},
	ATitlePadding: {
		type: "object",
		default: {
			top: 10,
			bottom: 0,
			left: 0,
			right: 5,
			isEqualPadding: false
		}
	},
	ATitleFontSetup: {
		type: "object",
		default: {
			size: 18,
			weight: 800,
			color: "#000",
			style: "normal",
			align: "left",
			lSpace: 1
		}
	},
	ACTitleIsShown: {
		type: "boolean",
		default: false
	},
	//center title in head
	ACTitleFontSetup: {
		type: "object",
		default: {
			size: 18,
			weight: 800,
			color: "#000",
			style: "normal",
			align: "left",
			lSpace: 1,
			pleft: 0,
			pright: 0,
			ptop: 0,
			pbottom: 0,
			mtop: 0,
			mbottom: 0,
			pisEqualPadding: false,
			misSameNeeded: false
		}
	},
	//main Content
	ContentFontSetup: {
		type: "object",
		default: {
			size: 18,
			weight: 800,
			color: "#000",
			style: "normal",
			align: "left",
			lSpace: 1,
			pleft: 0,
			pright: 0,
			ptop: 0,
			pbottom: 0,
			mtop: 0,
			mbottom: 0,
			lineHeight: 25
		}
	},
	lengthyContentFontSetup: {
		type: "object",
		default: {
			size: 18,
			weight: 800,
			color: "#000",
			style: "normal",
			align: "left",
			lSpace: 1,
			pleft: 0,
			pright: 0,
			ptop: 0,
			pbottom: 0,
			mtop: 0,
			mbottom: 0,
			lineHeight: 25
		}
	},
	AdditionalContentFontSetup: {
		type: "object",
		default: {
			size: 18,
			weight: 800,
			color: "#000",
			style: "normal",
			align: "left",
			lSpace: 1,
			pleft: 0,
			pright: 0,
			ptop: 0,
			pbottom: 0,
			mtop: 0,
			mbottom: 0,
			lineHeight: 25
		}
	},
	iconImageSetup: {
		type: "object",
		default: {
			padding: 5,
			borderRadius: 10,
			OuterMleft: 1,
			OuterMright: 1,
			OuterMtop: 1,
			OuterMbottom: 1,
			width: 6
		}
	},
	iconImageBgSetup: {
		type: "object",
		default: {
			r: 255,
			g: 255,
			b: 255,
			a: 1,
			realColor: "#fff"
		}
	},
	titleSepratorSettings: {
		type: "object",
		default: {
			width: 50,
			height: 3,
			color: "#cccccc",
			opacity: 0.8,
			isNeeded: false
		}
	},
	isTitleImageIsneeded: {
		type: "boolean",
		default: false
	},
	iconNormalSetup: {
		type: "object",
		default: {
			size: 6,
			color: "#ed6558",
			horizontal: 50,
			vertical: 1
		}
	},
	activateIconPosToBelow: {
		type: "boolean",
		default: false
	},
	iconBelowSetup: {
		type: "object",
		default: {
			size: 24,
			color: "#ed6558",
			horizontal: 50,
			bgcolor: "#fff",
			bRadius: 0
		}
	}
};
registerBlockType("guteblock/accordion", {
	title: __("Accordion Block", "guteblock"),
	description: __("Block for adding accordion.", "guteblock"),
	icon: (
		<svg
			id="prefix__Layer_1"
			x={0}
			y={0}
			viewBox="0 0 24 24"
			xmlSpace="preserve"
		>
			<linearGradient
				id="prefix__SVGID_1_"
				gradientUnits="userSpaceOnUse"
				x1={18.698}
				y1={-1.483}
				x2={-0.839}
				y2={15.648}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M3.86 5.39h16.29c.55 0 1-.45 1-1s-.45-1-1-1H3.86c-.55 0-1 .45-1 1s.44 1 1 1z"
				fill="url(#prefix__SVGID_1_)"
			/>
			<linearGradient
				id="prefix__SVGID_2_"
				gradientUnits="userSpaceOnUse"
				x1={20.441}
				y1={0.505}
				x2={0.903}
				y2={17.635}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M20.14 6.91H3.86c-.55 0-1 .45-1 1s.45 1 1 1h16.29c.55 0 1-.45 1-1s-.45-1-1.01-1z"
				fill="url(#prefix__SVGID_2_)"
			/>
			<linearGradient
				id="prefix__SVGID_3_"
				gradientUnits="userSpaceOnUse"
				x1={20.524}
				y1={0.6}
				x2={0.987}
				y2={17.73}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M3.86 12.86h7.64c.55 0 1-.45 1-1s-.45-1-1-1H3.86c-.55 0-1 .45-1 1s.44 1 1 1z"
				fill="url(#prefix__SVGID_3_)"
			/>
			<linearGradient
				id="prefix__SVGID_4_"
				gradientUnits="userSpaceOnUse"
				x1={22.376}
				y1={2.711}
				x2={2.838}
				y2={19.841}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M3.86 16.6h7.64c.55 0 1-.45 1-1s-.45-1-1-1H3.86c-.55 0-1 .45-1 1s.44 1 1 1z"
				fill="url(#prefix__SVGID_4_)"
			/>
			<linearGradient
				id="prefix__SVGID_5_"
				gradientUnits="userSpaceOnUse"
				x1={26.242}
				y1={7.122}
				x2={6.705}
				y2={24.252}
			>
				<stop offset={0} stopColor="#eb7d31" />
				<stop offset={1} stopColor="#ee576f" />
			</linearGradient>
			<path
				d="M20.14 18.61H3.86c-.55 0-1 .45-1 1s.45 1 1 1h16.29c.55 0 1-.45 1-1s-.45-1-1.01-1z"
				fill="url(#prefix__SVGID_5_)"
			/>
		</svg>
	),
	category: "guteblock",
	keywords: [__("accordion", "guteblock")],
	supports: {
		reusable: false,
		html: false,
		align: ["wide", "full"]
	},
	attributes,
	edit,
	styles: [
		{
			name: "1",
			label: __("Basic", "guteblock"),
			isDefault: true
		},
		{
			name: "2",
			label: __("Customizable", "guteblock"),
			isDefault: false
		},
	],
	save: ({ attributes }) => {
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

		const classes = classnames({
			[`align-${alignment}`]: alignment
		});
		const isStyle = RegExp(/is-style-/);
		const styleName = isStyle.test(attributes.className)
			? attributes.className.replace(isStyle, "")
			: null;
		return (
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
							<RichText.Content
								className={
									"wp-block-guteblock-accordion__title"
								}
								tagName="h4"
								value={IHeading}
								style={{
									fontSize: `${IHeadingFontSetup.size}px`,
									color: IHeadingFontSetup.color,
									fontStyle: IHeadingFontSetup.style,
									fontWeight:
										IHeadingFontSetup.weight,
									textAlign: IHeadingFontSetup.align,
									letterSpacing: `${IHeadingFontSetup.lSpace}px`
								}}
							/>
						</div>
					) : null}
					{accordions.map((accordion, index) => {
						return (
							<>
								<div
									className="wp-block-guteblock-accordion-main-holder"
									key={index}
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
									<div className="wp-block-guteblock-accordion__title-outer">
										{styleName === "2" ? (
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
											<RichText.Content
												className={
													"wp-block-guteblock-accordion__title"
												}
												tagName="p"
												value={
													accordion.title
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
											/>
										</div>
										{styleName === "2" ? (
											<>
												{ACTitleIsShown ? (
													accordion.isCenterTitleContent ? (
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
															<RichText.Content
																className={
																	"wp-block-guteblock-accordion__title"
																}
																tagName="p"
																value={
																	accordion.centerTitleContent
																}
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
															/>
														</div>
													) : null
												) : null}
											</>
										) : null}
										{!activateIconPosToBelow ? (
											<>
												<div className="wp-block-guteblock-accordion__controlIcon">
													<i
														className="accordion-arrow"
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
																className="accordion-arrow"
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
									{styleName === "2" ? (
										<>
											{CcontainerSplitIsNeeded ? (
												<>
													{!accordion.isInnerTitleShown ? (
														<>
															<div
																className="wp-block-guteblock-accordion__content-outer"
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
																<RichText.Content
																	className={
																		"wp-block-guteblock-accordion__content"
																	}
																	tagName="p"
																	value={
																		accordion.content
																	}
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
																className="wp-block-guteblock-accordion__content-outer"
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
																		<RichText.Content
																			className={
																				"wp-block-guteblock-accordion__content-two-peace"
																			}
																			tagName="p"
																			value={
																				accordion.longContentWithSplit
																			}
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

																<div
																	className={
																		"wp-block-guteblock-accordion__content-two"
																	}
																>
																	<RichText.Content
																		className={
																			"wp-block-guteblock-accordion__content-two-peace"
																		}
																		tagName="h5"
																		value={
																			accordion.innerTitle
																		}
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
																	<RichText.Content
																		className={
																			"wp-block-guteblock-accordion__content-one-peace"
																		}
																		tagName="p"
																		value={
																			accordion.content
																		}
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
												/*if split is not active*/
												<>
													<div
														className="wp-block-guteblock-accordion__content-outer"
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
														<RichText.Content
															className={
																"wp-block-guteblock-accordion__content"
															}
															tagName="p"
															value={
																accordion.content
															}
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
												className="wp-block-guteblock-accordion__content-outer"
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
												<RichText.Content
													className={
														"wp-block-guteblock-accordion__content"
													}
													tagName="p"
													value={
														accordion.content
													}
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
											{styleName === "2" ? (
												<>
													<div className="wp-block-guteblock-accordion__controlIconOnBelow">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 24 24"
															className="accordion-arrow1"
															style={{
																fill: `${iconBelowSetup.color}`,
																width: `${iconBelowSetup.size}px`,
																height: `${iconBelowSetup.size}px`,
																right: `${iconBelowSetup.horizontal}%`,
																backgroundColor: `${iconBelowSetup.bgcolor}`,
																borderRadius: `${iconBelowSetup.bRadius}%`
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
			</div>
		);
	}
});
