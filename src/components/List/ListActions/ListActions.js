import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './ListActions.scss';

const { block } = bem({
    name: 'ListActions',
    classnames: styles
});

const ListActions = props => {
    const { children, ...rest } = props;

    return (
        <div {...rest} {...block(props)}>
            {children}
        </div>
    );
};

ListActions.displayName = 'ListActions';

ListActions.propTypes = {
    /** Actions to be pushed to the left side of a List Item */
    children: PropTypes.node
};

ListActions.defaultProps = {
    children: null
};

export default ListActions;