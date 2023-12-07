import { Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
	RichText,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	PanelColorSettings,
	ContrastChecker,
	MediaUpload,
	URLInput
} from "@wordpress/editor";
import {
	PanelBody,
	RangeControl,
	Tooltip,
	Dashicon,
	ToggleControl,
	IconButton
} from "@wordpress/components";
import classnames from "classnames";

class CardEdit extends Component {
	state = {
		selectedCard: 0
	};

	componentDidMount() {

	}

	onChangeTitle = title => {
		this.props.setAttributes({ title });
	};

	onChangeAlignment = alignment => {
		this.props.setAttributes({ alignment });
	};

	addNewCard = () => {
		const { setAttributes, attributes } = this.props;
		const { cards } = attributes;
		setAttributes({
			cards: [
				...cards,
				{
					title: "",
					content: "",
					authorImageID: "",
					authorImageUrl: "",
					authorImageAlt: "",
				}
			]
		});
		this.setState({
			selectedCard: cards.length
		});
	};

	updateCard = (type, value) => {
		const { setAttributes, attributes } = this.props;
		const { cards } = attributes;
		const { selectedCard } = this.state;
		let new_cards = [...cards];
		new_cards[selectedCard][type] = value;
		setAttributes({ cards: new_cards });
	};

	removeCard = (e, index) => {
		e.preventDefault();

		const { setAttributes, attributes } = this.props;
		const { cards } = attributes;

		setAttributes({
			cards: [
				...cards.slice(0, index),
				...cards.slice(index + 1)
			]
		});
	};

	toggleShadow = () => {
		this.props.setAttributes({ shadow: !this.props.attributes.shadow });
	};
	toggleHover = () => {
		this.props.setAttributes({ hover: !this.props.attributes.hover });
	};

	toggleShowTitle = () => {
		this.props.setAttributes({
			showTitle: !this.props.attributes.showTitle
		});
	};

	toggleShowButton = () => {
		this.props.setAttributes({
			showButton: !this.props.attributes.showButton
		});
	};
	toggleNewTab = () => {
		this.props.setAttributes({
			newTab: !this.props.attributes.newTab
		});
	};
	toggleShowImage = () => {
		this.props.setAttributes({
			showImage: !this.props.attributes.showImage
		});
	};

	onSelectImage = ({ id, url, alt }) => {
		this.updateCard("authorImageID", id);
		this.updateCard("authorImageUrl", url);
		this.updateCard("authorImageAlt", alt);
	};

	render() {
		const { className, attributes, setAttributes } = this.props;
		const {
			alignment,
			cards,
			grid_border_radius,
			point_border_radius,
			section_background,
			grid_background,
			title_color,
			content_color,
			shadow,
			showTitle,
			showButton,
			newTab,
			showImage,
			button_color,
			title_font_size,
			link_font_size,
			button_border_radius,
			image_margin,
			title_margin,
			button_margin
		} = attributes;

		const classes = classnames(className, {
			[`align-${alignment}`]: alignment,
			[`has-shadow`]: shadow
		});

		let showtitle;
		{showTitle ? showtitle="block" : showtitle="none"}

		let showbutton;
		{showButton ? showbutton="block" : showbutton="none"}
		let showimage;
		{showImage ? showimage="block" : showimage="none"}
		
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
					<PanelBody title={__("General Settings", "guteblock")} initialOpen={false}>
						<ToggleControl
								label={__("Show Image", "guteblock")}
								onChange={this.toggleShowImage}
								checked={showImage}
						/>
						<ToggleControl
								label={__("Show Title", "guteblock")}
								onChange={this.toggleShowTitle}
								checked={showTitle}
						/>
						<ToggleControl
								label={__("Show Button/Link", "guteblock")}
								onChange={this.toggleShowButton}
								checked={showButton}
						/>
						<ToggleControl
								label={__("Card Open in New Tab", "guteblock")}
								onChange={this.toggleNewTab}
								checked={newTab}
						/>

						<ToggleControl
							label={__("Shadow", "guteblock")}
							onChange={this.toggleShadow}
							checked={shadow}
						/>


						<RangeControl
							label={__(
								"Card Border Radius (px)",
								"guteblock"
							)}
							value={grid_border_radius}
							onChange={grid_border_radius =>
								setAttributes({ grid_border_radius })
							}
							min={0}
							max={100}
							step={1}
						/>

						<RangeControl
							label={__(
								"Image Border Radius (%)",
								"guteblock"
							)}
							value={point_border_radius}
							onChange={point_border_radius =>
								setAttributes({ point_border_radius })
							}
							min={0}
							max={100}
							step={1}
						/>
					</PanelBody>
					<PanelColorSettings
						title={__("Color Settings", "guteblock")}
						initialOpen={false}
						colorSettings={[
							{
								value: section_background,
								onChange: color => {
									setAttributes({
										section_background: color
									});
								},
								label: __(
									"Section Background Color",
									"guteblock"
								)
							},
							{
								value: grid_background,
								onChange: color => {
									setAttributes({
										grid_background: color
									});
								},
								label: __(
									"Card Background Color",
									"guteblock"
								)
							},
							{
								value: button_color,
								onChange: color => {
									setAttributes({
										button_color: color
									});
								},
								label: __("Button Color", "guteblock")
							}
						]}
					>
						
					</PanelColorSettings>

					<PanelColorSettings
						title={__("Font Color Settings", "guteblock")}
						initialOpen={false}
						colorSettings={[
							{
								value: title_color,
								onChange: color => {
									setAttributes({
										title_color: color
									});
								},
								label: __("Title Color", "guteblock")
							},
							{
								value: content_color,
								onChange: color => {
									setAttributes({
										content_color: color
									});
								},
								label: __("Link Color", "guteblock")
							}
						]}
					>
						<ContrastChecker
							textColor={title_color}
							backgroundColor={grid_background}
						/>
						<ContrastChecker
							textColor={content_color}
							backgroundColor={grid_background}
						/>
						<ContrastChecker
							textColor={button_color}
							backgroundColor={grid_background}
						/>
					</PanelColorSettings>

					<PanelColorSettings
						title={__("Button Settings", "guteblock")}
						initialOpen={false}
						colorSettings={[
							{
								value: button_color,
								onChange: color => {
									setAttributes({
										button_color: color
									});
								},
								label: __("Button Color", "guteblock")
							}
						]}
					>
						<RangeControl
							label={__(
								"Button Border Radius (px)",
								"guteblock"
							)}
							value={button_border_radius}
							onChange={button_border_radius =>
								setAttributes({ button_border_radius })
							}
							min={0}
							max={100}
							step={1}
						/>
					</PanelColorSettings>

					<PanelBody title={__("Font Size Settings", "guteblock")} initialOpen={false}>
						<RangeControl
							label={__(
								"Title Font Size (px)",
								"guteblock"
							)}
							value={title_font_size}
							onChange={title_font_size =>
								setAttributes({ title_font_size })
							}
							min={12}
							max={75}
							step={1}
						/>
						<RangeControl
							label={__(
								"Link/Button Font Size (px)",
								"guteblock"
							)}
							value={link_font_size}
							onChange={link_font_size =>
								setAttributes({ link_font_size })
							}
							min={12}
							max={35}
							step={1}
						/>
					</PanelBody>
					<PanelBody title={__("Margin Settings", "guteblock")} initialOpen={false}>
					<RangeControl
							label={__(
								"Image Margin (px)",
								"guteblock"
							)}
							value={image_margin}
							onChange={image_margin =>
								setAttributes({ image_margin })
							}
							min={0}
							max={35}
							step={1}
						/>
						<RangeControl
							label={__(
								"Title Margin (px)",
								"guteblock"
							)}
							value={title_margin}
							onChange={title_margin =>
								setAttributes({ title_margin })
							}
							min={0}
							max={35}
							step={1}
						/>
						<RangeControl
							label={__(
								"Button/Link Margin (px)",
								"guteblock"
							)}
							value={button_margin}
							onChange={button_margin =>
								setAttributes({ button_margin })
							}
							min={0}
							max={35}
							step={1}
						/>
					</PanelBody>
				</InspectorControls>
			
				<div
					className={classes}
					style={{
						backgroundColor: section_background
					}}
				>
					<div className="wp-block-guteblock-card__container">
						{cards.map((cardbox, index) => {
							return (
								<div
									className="card__outer"
									key={index}
									onClick={() =>
										this.setState({
											selectedCard: index
										})
									}
									style={{
										borderRadius: [
											`${grid_border_radius}px`
										],
										backgroundColor: grid_background
									}}
								>
									<div className="card__remove-btn">
										<Dashicon
											icon={"trash"}
											size={30}
											onClick={e => {
												this.removeCard(
													e,
													index
												);
											}}
										/>
									</div>

									<div
										className="card__point-outer"
										style={{
											borderRadius: [
												`${point_border_radius}%`
											],
											display: showimage,
											margin: `${image_margin}px 0`
										}}
									>

									<MediaUpload
												className="card__point-outer__image-upload-button"
												onSelect={
													this
														.onSelectImage
												}
												allowedTypes={[
													"image"
												]}
												value={
													cardbox.authorImageID
												} // To highlight the selected image in the Media Library
												render={({
													open
												}) => {
													return (
														<>
															{cardbox.authorImageUrl ? (
																<img
																	src={
																		cardbox.authorImageUrl
																	}
																	alt={cardbox.authorImageAlt}
																	onClick={
																		open
																	}
																	data-id={cardbox.authorImageID}
																	style={{borderRadius: [
																		`${point_border_radius}%`
																	]}}
																/>
															) : (
																<IconButton
																	className="components-icon-button-components-toolbar__control"
																	label={__(
																		"Edit Image",
																		"guteblock"
																	)}
																	onClick={
																		open
																	}
																	icon="format-image"
																/>
															)}
														</>
													);
												}}
											/>
									</div>
									
									<RichText
										className={
											"wp-block-guteblock-card__title"
										}
										tagName="h4"
										onChange={title =>
											this.updateCard(
												"title",
												title
											)
										}
										value={cardbox.title}
										placeholder={__(
											"Title",
											"guteblock"
										)}
										style={{
											color: title_color,
											display: showtitle,
											fontSize: `${title_font_size}px`,
											margin: `${title_margin}px 0`
										}}
									/>

									<div  
											className={
												"wp-block-guteblock-card__button"
											}
											style={{
												display:showbutton,
												backgroundColor: button_color,
												borderRadius: [
													`${button_border_radius}px`
												],
												margin: `${button_margin}px 0`,
											}} >
										<RichText
											className={
												"wp-block-guteblock-card__content"
											}
											tagName="p"
											onChange={content =>
												this.updateCard(
													"content",
													content
												)
											}
											value={cardbox.content}
											placeholder={__(
												"Button/link Title",
												"guteblock"
											)}
											style={{
												fontSize:`${link_font_size}px`,
												color: content_color,
											}}
										/>
										</div>
										<URLInput
													className={
														"wp-block-guteblock-card__link"
													}
													style={{
														display:showbutton,
														
													}}
													label={__("Link/ URL", "guteblock")}
													value= {cardbox.link}
													onChange={link =>
														this.updateCard(
															"link",
															link
														)
													}
												/>										
									<div className="clear"></div>
								</div>
							);
						})}
						<div className="clear"></div>
						<Tooltip text={__("Add Box", "guteblock")}>
							<button
								className={
									"wp-block-guteblock-card__addCard"
								}
								onClick={this.addNewCard}
							>
								<Dashicon icon={"plus"} size={20} />
							</button>
						</Tooltip>
					</div>
				</div>
			</>
		);
	}
}

export default CardEdit;
