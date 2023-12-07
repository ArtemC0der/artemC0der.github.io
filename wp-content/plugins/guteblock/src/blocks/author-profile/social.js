import React from 'react';

const person = (props) => {
    const { social_facebook, social_twitter, social_instagram, social_pinterest, social_youtube, social_linkedin} = props;
    return (
        <>
            {(social_facebook ||
				social_twitter ||
				social_instagram ||
				social_pinterest ||
				social_youtube ||
				social_linkedin) && (
				<div className="wp-block-guteblock-author-profile__socialOuter">
					{social_facebook && (
						<a
							className="social_links social_facebook"
							href={social_facebook}
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="icon-facebook"></i>
						</a>
					)}
					{social_twitter && (
						<a
							className="social_links social_twitter"
							href={social_twitter}
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="icon-twitter"></i>
						</a>
					)}
					{social_instagram && (
						<a
							className="social_links social_instagram"
							href={social_instagram}
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="icon-instagram"></i>
						</a>
					)}
					{social_pinterest && (
						<a
							className="social_links social_pinterest"
							href={social_pinterest}
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="icon-pinterest"></i>
						</a>
					)}
					{social_youtube && (
						<a
							className="social_links social_youtube"
							href={social_youtube}
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="icon-youtube"></i>
						</a>
					)}
					{social_linkedin && (
						<a
							className="social_links social_linkedin"
							href={social_linkedin}
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="icon-linkedin-squared"></i>
						</a>
					)}
				</div>
			)}
        </>
    )
}

export default person;