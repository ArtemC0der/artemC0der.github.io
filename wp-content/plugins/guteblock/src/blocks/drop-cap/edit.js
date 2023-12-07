import { Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
	RichText,
	InspectorControls,
	BlockControls,
	AlignmentToolbar
} from "@wordpress/editor";
import { PanelBody, ColorPicker, RangeControl } from "@wordpress/components";
import classnames from "classnames";

class DropCapEdit extends Component {
	onChangeContent = content => {
		this.props.setAttributes({ content });
	};

	onChangeAlignment = alignment => {
		this.props.setAttributes({ alignment });
	};

	render() {
		const { className, attributes, setAttributes, clientId } = this.props;
		const {
			content,
			textColor,
			dropCapColor,
			fontSize,
			alignment,
			blockid
		} = attributes;

		var blockid_strip = clientId.substring(0, 8);
		this.props.setAttributes({ blockid: blockid_strip });

		const classes = classnames(className, {
			[`align-${alignment}`]: alignment
		});

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
					<PanelBody
						title={__("Drop Cap Settings", "guteblock")}
					>
						<RangeControl
							label={__("Drop Cap Size", "guteblock")}
							value={fontSize}
							onChange={fontSize =>
								setAttributes({ fontSize })
							}
							min={50}
							max={500}
							step={10}
						/>

						<h4>{__("Text Color", "guteblock")}</h4>
						<ColorPicker
							color={textColor}
							onChangeComplete={color =>
								setAttributes({ textColor: color.hex })
							}
							disableAlpha
						/>

						<h4>{__("Drop Cap Color", "guteblock")}</h4>
						<ColorPicker
							color={dropCapColor}
							onChangeComplete={color =>
								setAttributes({
									dropCapColor: color.hex
								})
							}
							disableAlpha
						/>
					</PanelBody>
				</InspectorControls>

				<div id={`block-${blockid}`} className={classes}>
					<RichText
						className={"wp-block-guteblock-drop-cap__content"}
						tagName="p"
						onChange={this.onChangeContent}
						value={content}
						placeholder={__("Title", "guteblock")}
						style={{
							color: textColor
						}}
					/>
					<style
						dangerouslySetInnerHTML={{
							__html: [
								`#block-${blockid}.wp-block-guteblock-drop-cap p:first-child:first-letter, .wp-block-guteblock-drop-cap p:nth-of-type(1):first-letter { color: ${dropCapColor}; font-size: ${fontSize}px; }`
							].join("\n")
						}}
					></style>
					{/* <style
						dangerouslySetInnerHTML={{
							__html: [
								`.wp-block-guteblock-drop-cap p:first-child:first-letter, .wp-block-guteblock-drop-cap p:nth-of-type(1):first-letter { color: ${dropCapColor}; font-size: ${fontSize}px; }
								#${blockid} p { font-weight: bold; }`
							].join("\n")
						}}
					></style> */}
				</div>
			</>
		);
	}
}

export default DropCapEdit;
