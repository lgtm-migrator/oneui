import * as React from 'react';
import { bem } from '../../utils';
import styles from './Chip.scss';

export interface Props extends React.HTMLAttributes<HTMLSpanElement> {
    /** The content of the chip: it is expected to be short text possibly accompanied by an icon */
    children: NotEmptyReactNode;
}

const { block } = bem('Chip', styles);

export const Chip = React.forwardRef<HTMLSpanElement, Props>((props, ref) => {
    const { children, ...rest } = props;

    return (
        <span ref={ref} {...rest} {...block(props)}>
            {children}
        </span>
    );
});

Chip.displayName = 'Chip';
