import "./blocks/container";
import "./blocks/team-member";
import "./blocks/testimonial";
import "./blocks/separator";
import "./blocks/number-box";
import "./blocks/post-grid";
import "./blocks/drop-cap";
import "./blocks/notification";
import "./blocks/share-icons";
import "./blocks/author-profile";
import "./blocks/cta";
import "./blocks/spacer-divider";
import "./blocks/blockquote";
import "./blocks/icon-list";
import "./blocks/button";
import "./blocks/feature-grid";
import "./blocks/accordion";
import "./blocks/count-up";
import "./blocks/newsletter";
import "./blocks/card";
import "./blocks/inline-notice";

import "./common/css/style.editor.scss";

// Adding Icon to Block Categories
const icon = (
	<svg viewBox="0 0 100 100">
		<style />
		<g id="prefix__Layer_1">
			<linearGradient
				id="prefix__SVGID_1_"
				gradientUnits="userSpaceOnUse"
				x1={68.035}
				y1={10.602}
				x2={33.222}
				y2={86.651}
			>
				<stop offset={0} stopColor="#ffd500" />
				<stop offset={0.258} stopColor="#ff683e" />
				<stop offset={0.498} stopColor="#ff1d6b" />
				<stop offset={0.781} stopColor="#5d25cd" />
				<stop offset={1} stopColor="#3eb9fa" />
			</linearGradient>
			<path
				d="M31.95 17.49L17.49 31.95c-9.14 9.14-9.14 23.96 0 33.1L34.94 82.5c9.14 9.14 23.96 9.14 33.1 0L82.5 68.04c9.14-9.14 9.14-23.96 0-33.1L65.06 17.49c-9.15-9.14-23.96-9.14-33.11 0z"
				fill="url(#prefix__SVGID_1_)"
			/>
			<path
				d="M65.81 36.74c-3.94 0-7.64 1.53-10.43 4.32l-5.85 5.85a6.488 6.488 0 000 9.17 6.488 6.488 0 009.17 0l5.85-5.85c.43-.43.92-.52 1.26-.52.34 0 .83.09 1.26.52.43.43.52.92.52 1.26 0 .34-.09.83-.52 1.26L52.98 66.83c-.05.05-.1.1-.14.15-.44.47-.96.58-1.32.58-.36.01-.88-.08-1.33-.54L32.98 49.81c-.69-.69-.72-1.79-.09-2.52l14.17-14.17c.05-.05.1-.1.14-.15.67-.71 1.78-.73 2.54-.04l.98.95c2.57 2.49 6.68 2.43 9.17-.14 2.49-2.57 2.43-6.68-.14-9.17l-1.03-1c-.03-.03-.05-.05-.08-.07-5.94-5.57-15.25-5.33-20.82.51l-14.2 14.2c-.05.05-.1.1-.14.15a14.744 14.744 0 00.33 20.61l17.21 17.22c2.8 2.81 6.51 4.34 10.47 4.34h.24c4.01-.06 7.73-1.69 10.49-4.59l14.02-14.02c2.79-2.79 4.32-6.49 4.32-10.43 0-3.94-1.53-7.64-4.32-10.43a14.668 14.668 0 00-10.43-4.32z"
				fill="#fff"
			/>
		</g>
	</svg>
);

(function() {
	wp.blocks.updateCategory("guteblock", { icon: icon });
})();
