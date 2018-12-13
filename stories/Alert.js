import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import Alert from '../src/components/Alert';
import { CONTEXTS } from '../src/constants';

storiesOf('Alert', module)
    .addDecorator(withKnobs)
    .add('Alert', () => {
        const hasAction = boolean('Has an action', true);

        return (
            <Alert
                action={
                    hasAction
                        ? {
                              label: 'Dismiss',
                              onClick: () => {
                                  // eslint-disable-next-line no-alert
                                  window.alert('Alright');
                              }
                          }
                        : null
                }
                context={select('Context', CONTEXTS, CONTEXTS[1])}
                title={text('Title', 'Hi there!')}
            >
                {text('Content', 'This is some information for you')}
            </Alert>
        );
    });