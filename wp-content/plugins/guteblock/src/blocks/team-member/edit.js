import { Component } from "@wordpress/element";
import {
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
	URLInput,
	PanelColorSettings
} from "@wordpress/editor";
import { __ } from "@wordpress/i18n";
import { isBlobURL } from "@wordpress/blob";
import {
	Spinner,
	withNotices,
	Toolbar,
	IconButton,
	PanelBody,
	//TextareaControl,
	SelectControl,
	Dashicon,
	Tooltip,
	TextControl
} from "@wordpress/components";
import { withSelect } from "@wordpress/data";
import {
	SortableContainer,
	SortableElement,
	arrayMove
} from "react-sortable-hoc";

class TeamMemberEdit extends Component {
	state = {
		selectedLink: null
	};

	componentDidMount() {
		const { attributes, setAttributes } = this.props;
		const { url, id } = attributes;
		if (url && isBlobURL(url) && !id) {
			setAttributes({
				url: "",
				alt: ""
			});
		}
	}
	componentDidUpdate(prevProps) {
		if (prevProps.isSelected && !this.props.isSelected) {
			this.setState({
				selectedLink: null
			});
		}
	}
	onChangeTitle = title => {
		this.props.setAttributes({ title });
	};
	onChangeInfo = info => {
		this.props.setAttributes({ info });
	};
	onSelectImage = ({ id, url, alt }) => {
		this.props.setAttributes({
			id,
			url,
			alt
		});
	};
	onSelectURL = url => {
		this.props.setAttributes({
			url,
			id: null,
			alt: ""
		});
	};
	onUploadError = message => {
		const { noticeOperations } = this.props;
		noticeOperations.createErrorNotice(message);
	};
	removeImage = () => {
		this.props.setAttributes({
			url: "",
			id: null,
			alt: ""
		});
	};
	onChangeAlt = alt => {
		this.props.setAttributes({ alt });
	};
	onImageSizeChange = url => {
		this.props.setAttributes({ url });
	};
	getImageSizes() {
		const { image, imageSizes } = this.props;
		if (!image) return [];
		let options = [];
		const sizes = image.media_details.sizes;
		for (const key in sizes) {
			const size = sizes[key];
			const imageSize = imageSizes.find(size => size.slug === key);
			if (imageSize) {
				options.push({
					label: imageSize.name,
					value: size.source_url
				});
			}
		}
		return options;
	}

	addNewLink = () => {
		const { setAttributes, attributes } = this.props;
		const { social } = attributes;
		setAttributes({
			social: [...social, { icon: "facebook", link: "#" }]
		});
		this.setState({
			selectedLink: social.length
		});
	};

	updateSocialItem = (type, value) => {
		const { setAttributes, attributes } = this.props;
		const { social } = attributes;
		const { selectedLink } = this.state;

		/* 
		This is the common practise in React...
		To prevent mutation, we will create a copy of the array, make the necessary changes
		and then replace the origanl attributes with the updated copy.

		NEED TO STUDY FURTHER HERE....		
		*/

		let new_social = [...social];
		new_social[selectedLink][type] = value;
		setAttributes({ social: new_social });
	};

	removeSocialItem = e => {
		e.preventDefault();

		const { setAttributes, attributes } = this.props;
		const { social } = attributes;
		const { selectedLink } = this.state;

		/* 
		// Method 1
		let new_social = [...social];
		new_social.splice(selectedLink, 1);		
		setAttributes({social: new_social});
		*/

		//Method 2
		setAttributes({
			social: [
				...social.slice(0, selectedLink),
				...social.slice(selectedLink + 1)
			]
		});

		this.setState({
			selectedLink: null
		});
	};

	onSortEnd = (oldIndex, newIndex) => {
		const { setAttributes, attributes } = this.props;
		const { social } = attributes;
		let new_social = arrayMove(social, oldIndex, newIndex);
		setAttributes({ social: new_social });
		this.setState({
			selectedLink: null
		});
	};

	onChangeSocialColor = socialColor => {
		this.props.setAttributes({ socialColor });
	};
	onChangeTitleColor = titleColor => {
		this.props.setAttributes({ titleColor });
	};
	onChangeContentColor = contentColor => {
		this.props.setAttributes({ contentColor });
	};

	render() {
		const { className, attributes, noticeUI, isSelected } = this.props;
		const {
			title,
			info,
			url,
			alt,
			id,
			social,
			socialColor,
			titleColor,
			contentColor
		} = attributes;

		const SortableList = SortableContainer(() => {
			return (
				<ul>
					{social.map((item, index) => {
						let SortableItem = SortableElement(() => {
							return (
								<li
									key={index}
									onClick={() =>
										this.setState({
											selectedLink: index
										})
									}
									className={
										this.state.selectedLink ===
										index
											? "is-selected"
											: null
									}
									style={{
										color: socialColor
									}}
								>
									<i
										className={`demo-icon icon-${item.icon}`}
									></i>
								</li>
							);
						});
						return <SortableItem key={index} index={index} />;
					})}
					{isSelected && (
						<li className="wp-block-guteblock-team-member__addIconLI">
							<Tooltip text={__("Add Item", "guteblock")}>
								<button
									className={
										"wp-block-guteblock-team-member__addIcon"
									}
									onClick={this.addNewLink}
								>
									<Dashicon
										icon={"plus"}
										size={14}
									/>
								</button>
							</Tooltip>
						</li>
					)}
				</ul>
			);
		});
		return (
			<>
				<InspectorControls>
					<PanelColorSettings
						title={__("Color Settings", "guteblock")}
						colorSettings={[
							{
								value: socialColor,
								onChange: this.onChangeSocialColor,
								label: __(
									"Social Icons Color",
									"guteblock"
								)
							},
							{
								value: titleColor,
								onChange: this.onChangeTitleColor,
								label: __("Title Color", "guteblock")
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
					<PanelBody title={__("Image Settings", "guteblock")}>
						{url && !isBlobURL(url) && (
							<TextControl
								value={alt}
								onChange={this.onChangeAlt}
								placeholder="Image Alt Text"
								help={__(
									"This is the alt text for the image. This will help to improve the SEO",
									"guteblock"
								)}
							/>
						)}
						{id && (
							<SelectControl
								label={__("Image Size", "guteblock")}
								options={this.getImageSizes()}
								onChange={this.onImageSizeChange}
							/>
						)}
					</PanelBody>
				</InspectorControls>
				<BlockControls>
					{url && (
						<Toolbar>
							{id && (
								<MediaUploadCheck>
									<MediaUpload
										onSelect={this.onSelectImage}
										allowedTypes={["image"]}
										value={id} // To highlight the selected image in the Media Library
										render={({ open }) => {
											return (
												<IconButton
													className="components-icon-button-components-toolbar__control"
													label={__(
														"Edit Image",
														"guteblock"
													)}
													onClick={open}
													icon="edit"
												/>
											);
										}}
									/>
								</MediaUploadCheck>
							)}
							<IconButton
								className="components-icon-button-components-toolbar__control"
								label={__("Remove Image", "guteblock")}
								onClick={this.removeImage}
								icon="trash"
							/>
						</Toolbar>
					)}
				</BlockControls>

				<div className={className}>
					{url ? (
						<>
							<div className="wp-block-guteblock-team-member__image-outer">
								<img
									src={url}
									alt={
										alt
									} /*onClick={ this.onImageClick}*/
								/>
								{isBlobURL(url) && (
									<div className="wp-block-guteblock-team-member__spinner-outer">
										<Spinner />
									</div>
								)}
							</div>
						</>
					) : (
						<MediaPlaceholder
							icon="format-image"
							onSelect={this.onSelectImage}
							onSelectURL={this.onSelectURL}
							onError={this.onUploadError}
							accept="image/*"
							allowedTypes={["image"]}
							notices={noticeUI}
						/>
					)}

					<div className="content-outer">
						<div className="content-inner">
							<div
								className={
									"wp-block-guteblock-team-member__social"
								}
							>
								<SortableList
									axis="x"
									helperClass={"social_dragging"}
									distance={10}
									onSortEnd={({
										oldIndex,
										newIndex
									}) =>
										this.onSortEnd(
											oldIndex,
											newIndex
										)
									}
								/>
							</div>

							{this.state.selectedLink !== null && (
								<div
									className={
										"wp-block-guteblock-team-member__linkForm"
									}
								>
									<SelectControl
										label={__(
											"Icon",
											"guteblock"
										)}
										onChange={icon =>
											this.updateSocialItem(
												"icon",
												icon
											)
										}
										value={
											social[
												this.state
													.selectedLink
											].icon
										}
										options={[
											{
												label: "Facebook",
												value: "facebook"
											},
											{
												label: "Twitter",
												value: "twitter"
											},
											{
												label: "Instagram",
												value: "instagram"
											},
											{
												label: "Pinterest",
												value: "pinterest"
											},
											{
												label: "Youtube",
												value: "youtube"
											}
										]}
									/>
									<URLInput
										label={__("URL", "guteblock")}
										value={
											social[
												this.state
													.selectedLink
											].link
										}
										onChange={link =>
											this.updateSocialItem(
												"link",
												link
											)
										}
									/>
									<a
										className="wp-block-guteblock-team-member__removeLink"
										onClick={
											this.removeSocialItem
										}
									>
										{__(
											"Remove Link",
											"guteblock"
										)}
									</a>
								</div>
							)}

							<RichText
								className={
									"wp-block-guteblock-team-member__title"
								}
								tagName="h4"
								onChange={this.onChangeTitle}
								value={title}
								placeholder={__(
									"Member Name",
									"guteblock"
								)}
								formattingControls={[]}
								style={{ color: titleColor }}
							/>
							<RichText
								className={
									"wp-block-guteblock-team-member__info"
								}
								tagName="p"
								onChange={this.onChangeInfo}
								value={info}
								placeholder={__(
									"Member Info",
									"guteblock"
								)}
								formattingControls={[]}
								style={{ color: contentColor }}
							/>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default withSelect((select, props) => {
	const id = props.attributes.id;
	return {
		image: id ? select("core").getMedia(id) : null,
		imageSizes: select("core/editor").getEditorSettings().imageSizes
	};
})(withNotices(TeamMemberEdit));
