import React from 'react';
import PropTypes from 'prop-types';
import IconBase from '../IconBase';
import { CONTEXTS } from '../../../constants';

const IconExtract = props => (
    <IconBase {...props} viewBox="0 0 77.36 93.32">
        <path d="M5.17,87.36l-.46,4c0,1,2.14,1.91,4.71,1.91H67.93c2.58,0,4.71-.9,4.71-1.91l-.45-4Z" />
        <path d="M2.81,78.6l-.45,3.71c0,1.12,2.25,2,5.05,2H70c2.81,0,5-.9,5-2l-.56-3.71Z" />
        <path d="M75.35,57.15C75.35,55.91,73,55,70,55H55v3.81a3.71,3.71,0,1,1-7.42,0V55H28.75v3.81a3.71,3.71,0,1,1-7.42,0V55H7.3c-2.91,0-5.39,1-5.39,2.13L0,73.55c0,1.24,2.36,2.13,5.39,2.13H72c2.91,0,5.38-1,5.38-2.13Z" />
        <path d="M70.07,0H7.3A5.32,5.32,0,0,0,1.91,5.39V45.58A5.39,5.39,0,0,0,7.3,51H21.45V47.49a3.71,3.71,0,0,1,7.42,0V51H47.73V47.49a3.71,3.71,0,0,1,7.42,0V51h15a5.39,5.39,0,0,0,5.39-5.39V5.39A5.65,5.65,0,0,0,70.07,0ZM51,37.28H25.72V32.79a6.23,6.23,0,0,1,6.17-6.17h3.37V23.7a8.49,8.49,0,0,1-3.26-7c0-4.38,2.92-8,6.51-8s6.51,3.59,6.51,8a8.84,8.84,0,0,1-3.25,7v2.92h3.37a6.23,6.23,0,0,1,6.17,6.17v4.49Z" />
    </IconBase>
);

IconExtract.displayName = 'IconExtract';

IconExtract.propTypes = {
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

IconExtract.defaultProps = {
    context: CONTEXTS[1],
    margin: null,
    size: null,
    title: null
};

export default IconExtract;