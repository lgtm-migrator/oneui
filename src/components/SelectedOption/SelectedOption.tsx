import * as React from 'react';
import { IoIosClose } from 'react-icons/io';
import { bem } from '../../utils';
import { ENTER_KEY } from '../../constants';
import styles from './SelectedOption.scss';

export interface Props extends React.HTMLAttributes<HTMLElement> {
    /** the HTML tag in which to render the element */
    As?: string;
    /** callback on delete */
    onDelete: () => void;
    /** the text to be shown */
    children: NotEmptyReactNode;
}

const { block, elem } = bem('SelectedOption', styles);

export const SelectedOption = React.forwardRef<HTMLElement, Props>(
    ({ As = 'div', children, onDelete, ...rest }, ref) => {
        const handleKeyDown = (e) => {
            if (e.key === ENTER_KEY) {
                onDelete();
            }
        };

        // eslint-disable-next-line react/display-name
        const renderChildren = () => {
            if (React.isValidElement(children)) {
                return children;
            }
            return (
                <span title={children} {...elem('label')}>
                    {children}
                </span>
            );
        };

        return (
            <As {...rest} ref={ref} {...block({ ...rest })}>
                <button
                    {...elem('button')}
                    type="button"
                    onClick={onDelete}
                    onKeyDown={handleKeyDown}
                >
                    <IoIosClose {...elem('buttonIcon')} />
                </button>
                {renderChildren()}
            </As>
        );
    }
);

SelectedOption.displayName = 'SelectedOption';
