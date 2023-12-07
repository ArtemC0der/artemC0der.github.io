import { Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar
} from "@wordpress/editor";
import { PanelBody, ToggleControl } from "@wordpress/components";
import classnames from "classnames";

import { withSelect } from "@wordpress/data";

class SocialShareEdit extends Component {
	onChangeTitle = title => {
		this.props.setAttributes({ title });
	};

	onChangeAlignment = alignment => {
		this.props.setAttributes({ alignment });
	};

	render() {
		const { className, attributes, posturl, setAttributes } = this.props;
		const { alignment, url, facebook, twitter, linkedin, pinterest, reddit } = attributes;

		this.props.setAttributes({ url: posturl });
		
		const isStyle = RegExp(/is-style-/)
		const styleName = isStyle.test(attributes.className)
			? attributes.className.replace(isStyle, '')
			: null
			
		const classes = classnames(className, {
			[`align-${alignment}`]: alignment,
			[`is-style-round`]: !styleName // Setting style class if the style is not chosen.
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
						title={__("Share Icon Settings", "guteblock")}
					>						
						<ToggleControl
							label={__(
								"Facebook",
								"guteblock"
							)}
							onChange={() => setAttributes({ facebook: !this.props.attributes.facebook })}
							checked={facebook}
						/>
						<ToggleControl
							label={__(
								"Twitter",
								"guteblock"
							)}
							onChange={() => setAttributes({ twitter: !this.props.attributes.twitter })}
							checked={twitter}
						/>
						<ToggleControl
							label={__(
								"LinkedIn",
								"guteblock"
							)}
							onChange={() => setAttributes({ linkedin: !this.props.attributes.linkedin })}
							checked={linkedin}
						/>
						<ToggleControl
							label={__(
								"Pinterest",
								"guteblock"
							)}
							onChange={() => setAttributes({ pinterest: !this.props.attributes.pinterest })}
							checked={pinterest}
						/>
						<ToggleControl
							label={__(
								"Reddit",
								"guteblock"
							)}
							onChange={() => setAttributes({ reddit: !this.props.attributes.reddit })}
							checked={reddit}
						/>
					</PanelBody>
				</InspectorControls>

				<div className={classes}>

					{(styleName != 'modern') && (
						<>
							{facebook &&
								<a
									className="icon-button facebook"
									href={
										"https://www.facebook.com/share.php?u=" + url
									}
									target="_blank"
									rel="noopener noreferrer"
								>
									<i className={`icon-facebook`}></i><span></span>
								</a>
							}
							{twitter &&
								<a
									className="icon-button twitter"
									href={"https://twitter.com/share?url=" + url}
									target="_blank"
									rel="noopener noreferrer"
								>
									<i className={`icon-twitter`}></i><span></span>
								</a>
							}
							{linkedin &&
								<a
									className="icon-button linkedin"
									href={"https://www.linkedin.com/sharing/share-offsite/?url=" + url}
									target="_blank"
									rel="noopener noreferrer"
								>
									<i className={`icon-linkedin`}></i><span></span>
								</a>
							}

							{pinterest &&
								<a
									className="icon-button pinterest"
									href={"http://pinterest.com/pin/create/button/?url=" + url}
									target="_blank"
									rel="noopener noreferrer"
								>
									<i className={`icon-pinterest`}></i><span></span>
								</a>
							}
							{reddit &&
								<a
									className="icon-button reddit"
									href={"http://www.reddit.com/submit?url=" + url}
									target="_blank"
									rel="noopener noreferrer"
								>
									<i className='icon-reddit-alien'></i><span></span>
								</a>
							}
						</>
					)}

					{(styleName == 'modern') && (
						<div className="btn__container">
							{facebook &&
								<a href={"https://www.facebook.com/share.php?u=" + url} className="gb-btn gb-btn-facebook" target="_blank" rel="noopener noreferrer">
									<i className="icon-facebook"></i>
									<span>facebook</span>
								</a>
							}
							{twitter &&
								<a href={"https://twitter.com/share?url=" + url} className="gb-btn gb-btn-twitter" target="_blank" rel="noopener noreferrer">
									<i className="icon-twitter"></i>
									<span>twitter</span>
								</a>
							}
							{linkedin &&
								<a href={"https://www.linkedin.com/sharing/share-offsite/?url=" + url} className="gb-btn gb-btn-linkedin" target="_blank" rel="noopener noreferrer">
									<i className="icon-linkedin-squared"></i>
									<span>linkedin</span>
								</a>
							}
							{pinterest &&
								<a href={"http://pinterest.com/pin/create/button/?url=" + url} className="gb-btn gb-btn-pinterest" target="_blank" rel="noopener noreferrer">
									<i className="icon-pinterest"></i>
									<span>pinterest</span>
								</a>
							}
							{reddit &&
								<a href={"http://www.reddit.com/submit?url=" + url} className="gb-btn gb-btn-reddit" target="_blank" rel="noopener noreferrer">
									<i className="icon-reddit-alien"></i>
									<span>reddit</span>
								</a>
							}
						</div>
						
					)}				

				</div>
			</>
		);
	}
}

export default withSelect(select => {
	return {
		posturl: select("core/editor").getPermalink()
	};
})(SocialShareEdit);
