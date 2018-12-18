import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import Text from '../Text';
import styles from './Checkbox.scss';
import { CHECKBOX_VIEWBOX } from '../../constants';

const { block, elem } = bem({
    name: 'Checkbox',
    classnames: styles,
    propsToMods: ['disabled']
});

const Checkbox = props => {
    const { id, children, viewbox, disabled, ...rest } = props;

    return (
        <label {...block(props)} htmlFor={id} disabled={disabled}>
            <input
                type="checkbox"
                id={id}
                {...rest}
                {...elem('input', props)}
                disabled={disabled}
            />
            <span {...elem('box', props)}>
                <svg {...elem('svg', props)} width="12px" height="10px" viewBox={CHECKBOX_VIEWBOX}>
                    <polyline points="1.5 6 3.5 9 8 3" />
                </svg>
            </span>
            <Text {...elem('label', props)} inline muted={disabled}>
                {children}
            </Text>
        </label>
    );
};

Checkbox.propTypes = {
    /** A unique id to reference this checkbox */
    id: PropTypes.string.isRequired,
    /** If the checkbox should be disabled */
    disabled: PropTypes.bool,
    /** The label for the checkbox */
    children: PropTypes.string.isRequired
};

Checkbox.defaultProps = {
    disabled: false
};

export default Checkbox;