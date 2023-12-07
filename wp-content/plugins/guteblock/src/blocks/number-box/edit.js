import { Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
	RichText,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	PanelColorSettings,
	ContrastChecker
} from "@wordpress/editor";
import {
	PanelBody,
	RangeControl,
	Tooltip,
	Dashicon,
	ToggleControl
} from "@wordpress/components";
import classnames from "classnames";

class NumberBoxesEdit extends Component {
	state = {
		selectedBox: 0
	};

	componentDidMount() {}

	onChangeTitle = title => {
		this.props.setAttributes({ title });
	};

	onChangeAlignment = alignment => {
		this.props.setAttributes({ alignment });
	};

	addNewNumberbox = () => {
		const { setAttributes, attributes } = this.props;
		const { numberboxes } = attributes;
		setAttributes({
			numberboxes: [
				...numberboxes,
				{
					title: "",
					content: ""
				}
			]
		});
		this.setState({
			selectedBox: numberboxes.length
		});
	};

	updateNumberbox = (index, type, value) => {
		const { setAttributes, attributes } = this.props;
		const { numberboxes } = attributes;
		let new_numberboxes = [...numberboxes];
		new_numberboxes[index][type] = value;
		setAttributes({ numberboxes: new_numberboxes });
	};

	removeNumberbox = (e, index) => {
		e.preventDefault();

		const { setAttributes, attributes } = this.props;
		const { numberboxes } = attributes;

		setAttributes({
			numberboxes: [
				...numberboxes.slice(0, index),
				...numberboxes.slice(index + 1)
			]
		});
	};

	toggleShadow = () => {
		this.props.setAttributes({ shadow: !this.props.attributes.shadow });
	};

	render() {
		const { className, attributes, setAttributes } = this.props;
		const {
			alignment,
			numberboxes,
			grid_border_radius,
			point_border_radius,
			point_background,
			point_color,
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

		// const isStyle = RegExp(/is-style-/)
		// const styleName = isStyle.test(attributes.className)
		// 	? attributes.className.replace(isStyle, '')
		// 	: null

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

						<RangeControl
							label={__(
								"Point Border Radius (%)",
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
								value: point_background,
								onChange: color => {
									setAttributes({
										point_background: color
									});
								},
								label: __(
									"Point Background",
									"guteblock"
								)
							},
							{
								value: point_color,
								onChange: color => {
									setAttributes({
										point_color: color
									});
								},
								label: __("Point Color", "guteblock")
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
				</InspectorControls>

				<div
					className={classes}
					style={{
						backgroundColor: section_background
					}}
				>
					<div className="wp-block-guteblock-numberbox__container">
						{numberboxes.map((numberbox, index) => {
							return (
								<div
									className="numberbox__outer"
									key={index}
									onClick={() =>
										this.setState({
											selectedBox: index
										})
									}
									style={{
										borderRadius: [
											`${grid_border_radius}px`
										],
										backgroundColor: grid_background
									}}
								>
									<div className="numberbox__remove-btn">
										<Dashicon
											icon={"trash"}
											size={30}
											onClick={e => {
												this.removeNumberbox(
													e,
													index
												);
											}}
										/>
									</div>

									<div
										className="numberbox__point-outer"
										style={{
											borderRadius: [
												`${point_border_radius}%`
											],
											backgroundColor: point_background,
											color: point_color
										}}
									></div>

									<RichText
										className={
											"wp-block-guteblock-numberbox__title"
										}
										tagName="h4"
										onChange={title =>
											this.updateNumberbox(
												index,
												"title",
												title
											)
										}
										value={numberbox.title}
										placeholder={__(
											"Box Title",
											"guteblock"
										)}
										style={{
											color: title_color
										}}
									/>

									<RichText
										className={
											"wp-block-guteblock-numberbox__content"
										}
										tagName="p"
										onChange={content =>
											this.updateNumberbox(
												index,
												"content",
												content
											)
										}
										value={numberbox.content}
										placeholder={__(
											"Box Content",
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
						<Tooltip text={__("Add Box", "guteblock")}>
							<button
								className={
									"wp-block-guteblock-numberbox__addNumberBox"
								}
								onClick={this.addNewNumberbox}
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

export default NumberBoxesEdit;
