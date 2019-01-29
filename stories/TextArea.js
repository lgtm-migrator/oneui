import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { TextArea } from '@textkernel/oneui';
import { CONTEXTS, SIZES } from '@textkernel/oneui/constants';

storiesOf('TextArea', module)
    .addDecorator(withKnobs)
    .add('Default behavior', () => (
        <TextArea
            context={select('Context', CONTEXTS, CONTEXTS[1])}
            defaultValue="This is a default value"
            disabled={boolean('Disabled', false)}
            isBlock={boolean('isBlock', false)}
            onChange={e => {
                const { value } = e.target;
                // eslint-disable-next-line no-console
                console.log(value);
            }}
            placeholder={text('Placeholder', 'Some text goes here...')}
            size={select('Size', SIZES, SIZES[1])}
        />
    ))
    .add('Controlled component', () => (
        <TextArea
            context={select('Context', CONTEXTS, CONTEXTS[1])}
            disabled={boolean('Disabled', false)}
            isBlock={boolean('isBlock', false)}
            onChange={e => {
                const { value } = e.target;
                // eslint-disable-next-line no-console
                console.log(value);
            }}
            placeholder={text('Placeholder', 'While typing, check your console log...')}
            size={select('Size', SIZES, SIZES[1])}
            value={text('Textarea value', '')}
        />
    ));
