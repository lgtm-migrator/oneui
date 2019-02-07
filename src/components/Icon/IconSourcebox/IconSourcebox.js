import React from 'react';
import PropTypes from 'prop-types';
import IconBase from '../IconBase';
import { CONTEXTS } from '../../../constants';

const IconSourcebox = props => (
    <IconBase {...props} viewBox="0 0 76.98 93.03">
        <path d="M19,64.43l-9.7,10a3.85,3.85,0,0,0,0,5.36,3.57,3.57,0,0,0,5.13,0L30.12,63.54a3.85,3.85,0,0,0,0-5.36h0a2,2,0,0,0-.45-.56L14.06,41.34a3.58,3.58,0,0,0-5.14,0,3.83,3.83,0,0,0,0,5.35L18.85,57H.22L.56,15c0-3.9,2.9-7.59,6.47-8.14L50.42.06C54-.5,56.89,2.85,56.89,7.54V29.62H34l9.7-10a3.83,3.83,0,0,0,0-5.35,3.57,3.57,0,0,0-5.13,0L22.76,30.74a3.83,3.83,0,0,0,0,5.35h0a1.83,1.83,0,0,0,.44.56L38.93,52.94a3.58,3.58,0,0,0,5.14,0,3.85,3.85,0,0,0,0-5.36L34.14,37.32H56.78v48c0,4.69-2.9,8.15-6.47,7.7L6.47,87.75A7.85,7.85,0,0,1,0,79.94l.11-15.4H19Z" />
        <path d="M61,89.2c3.68.44,6.7-2.79,6.7-7.14V10.66c0-4.35-2.9-7.36-6.59-6.92Z" />
        <path d="M71.4,82.39c3.12.34,5.58-2.34,5.58-5.91v-60c0-3.57-2.46-6.25-5.58-5.8Z" />
    </IconBase>
);

IconSourcebox.displayName = 'IconSourcebox';

IconSourcebox.propTypes = {
    /** The icon context (e.g. brand, primary, bad, good etc. - defaults to brand) */
    context: PropTypes.oneOf(CONTEXTS),
    /** Adds margin between a given side of the icon and other content */
    margin: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    /** Absolute size for this icon (size in pixels, aspect ratio is 1:1).
     If not defined, icon will scale and align itself with text. */
    size: PropTypes.number,
    /** Optional icon title */
    title: PropTypes.string
};

IconSourcebox.defaultProps = {
    context: CONTEXTS[1],
    margin: null,
    size: null,
    title: null
};

export default IconSourcebox;