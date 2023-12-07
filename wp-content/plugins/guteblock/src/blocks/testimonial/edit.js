import { Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
	RichText,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	MediaUpload,
	PanelColorSettings,
	ContrastChecker
} from "@wordpress/editor";
import {
	PanelBody,
	//TextControl,
	IconButton,
	RangeControl,
	Tooltip,
	Dashicon,
	ToggleControl
} from "@wordpress/components";
import classnames from "classnames";

class TestimonialsEdit extends Component {
	state = {
		selectedTestimonial: 0
	};

	componentDidMount() {}

	onChangeTitle = title => {
		this.props.setAttributes({ title });
	};

	onChangeAlignment = alignment => {
		this.props.setAttributes({ alignment });
	};

	addNewTestimonial = () => {
		const { setAttributes, attributes } = this.props;
		const { testimonials } = attributes;
		setAttributes({
			testimonials: [
				...testimonials,
				{
					authorImageID: "",
					authorImageUrl: "",
					authorImageAlt: "",
					title: "",
					job_position: "",
					content: ""
				}
			]
		});
		this.setState({
			selectedTestimonial: testimonials.length
		});
	};

	updateTestimonial = (type, value) => {
		const { setAttributes, attributes } = this.props;
		const { testimonials } = attributes;
		const { selectedTestimonial } = this.state;
		let new_testimonials = [...testimonials];
		new_testimonials[selectedTestimonial][type] = value;
		setAttributes({ testimonials: new_testimonials });
	};

	removeTestimonial = (e, index) => {
		e.preventDefault();

		const { setAttributes, attributes } = this.props;
		const { testimonials } = attributes;

		setAttributes({
			testimonials: [
				...testimonials.slice(0, index),
				...testimonials.slice(index + 1)
			]
		});
	};

	toggleShadow = () => {
		this.props.setAttributes({ shadow: !this.props.attributes.shadow });
	};

	onSelectImage = ({ id, url, alt }) => {
		this.updateTestimonial("authorImageID", id);
		this.updateTestimonial("authorImageUrl", url);
		this.updateTestimonial("authorImageAlt", alt);
	};

	render() {
		const { className, attributes, setAttributes } = this.props;
		const {
			alignment,
			testimonials,
			grid_border_radius,
			image_border_radius,
			section_background,
			grid_background,
			title_color,
			content_color,
			shadow
		} = attributes;

		const classes = classnames(className, {
			[`align-${alignment}`]: alignment,
			[`has-shadow`]: shadow
		});

		const isStyle = RegExp(/is-style-/);
		const styleName = isStyle.test(attributes.className)
			? attributes.className.replace(isStyle, "")
			: null;

		// const isStyle = RegExp(/is-style-/);
		// if(attributes.className.split(" ")) {

		// }

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
									"Grid Background Color",
									"guteblock"
								)
							},
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
								label: __("Content Color", "guteblock")
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
					</PanelColorSettings>
					<PanelBody title={__("Settings", "guteblock")}>
						<ToggleControl
							label={__("Shadow", "guteblock")}
							onChange={this.toggleShadow}
							checked={shadow}
						/>

						<RangeControl
							label={__(
								"Grid Border Radius (px)",
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
						{styleName != "multiple" && (
							<RangeControl
								label={__(
									"Image Border Radius (%)",
									"guteblock"
								)}
								value={image_border_radius}
								onChange={image_border_radius =>
									setAttributes({
										image_border_radius
									})
								}
								min={0}
								max={100}
								step={1}
							/>
						)}
					</PanelBody>
				</InspectorControls>

				<div
					className={classes}
					style={{
						backgroundColor: section_background
					}}
				>
					<div className="wp-block-guteblock-testimonial__container">
						{testimonials.map((testimonial, index) => {
							return (
								<div
									className="testimonial__outer"
									key={index}
									onClick={() =>
										this.setState({
											selectedTestimonial: index
										})
									}
									style={{
										borderRadius: [
											`${grid_border_radius}px`
										],
										backgroundColor: grid_background
									}}
								>
									<div className="testimonial__remove-btn">
										<Dashicon
											icon={"trash"}
											size={30}
											onClick={e => {
												this.removeTestimonial(
													e,
													index
												);
											}}
										/>
									</div>

									{styleName != "multiple" && (
										<div
											className="testimonial__image-outer"
											style={{
												borderRadius: [
													`${image_border_radius}%`
												]
											}}
										>
											<MediaUpload
												onSelect={
													this
														.onSelectImage
												}
												allowedTypes={[
													"image"
												]}
												value={
													testimonial.authorImageID
												} // To highlight the selected image in the Media Library
												render={({
													open
												}) => {
													return (
														<>
															{testimonial.authorImageUrl ? (
																<img
																	src={
																		testimonial.authorImageUrl
																	}
																	alt="{testimonial.authorImageAlt}"
																	onClick={
																		open
																	}
																	data-id="{testimonial.authorImageID}"
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
									)}

									<RichText
										className={
											"wp-block-guteblock-testimonial__title"
										}
										tagName="h4"
										onChange={title =>
											this.updateTestimonial(
												"title",
												title
											)
										}
										value={testimonial.title}
										placeholder={__(
											"Testimonial Title",
											"guteblock"
										)}
										style={{
											color: title_color
										}}
									/>

									<RichText
										className={
											"wp-block-guteblock-testimonial__jobposition"
										}
										tagName="p"
										onChange={job_position =>
											this.updateTestimonial(
												"job_position",
												job_position
											)
										}
										value={
											testimonial.job_position
										}
										placeholder={__(
											"Job Position",
											"guteblock"
										)}
										style={{
											color: title_color
										}}
									/>

									<RichText
										className={
											"wp-block-guteblock-testimonial__content"
										}
										tagName="p"
										onChange={content =>
											this.updateTestimonial(
												"content",
												content
											)
										}
										value={testimonial.content}
										placeholder={__(
											"Testimonial Content",
											"guteblock"
										)}
										style={{
											color: content_color
										}}
									/>

									<div className="clear"></div>
								</div>
							);
						})}
						<div className="clear"></div>
						<Tooltip
							text={__("Add Testimonial", "guteblock")}
						>
							<button
								className={
									"wp-block-guteblock-testimonial__addTestimonial"
								}
								onClick={this.addNewTestimonial}
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

export default TestimonialsEdit;
