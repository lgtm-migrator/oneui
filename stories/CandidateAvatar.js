import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { CandidateAvatar } from '@textkernel/oneui';

storiesOf('CandidateAvatar', module)
    .addDecorator(withKnobs)
    .add('CandidateAvatar', () => (
        <CandidateAvatar
            imageUrl={text('Image URL', '/avatar.png')}
            matchPercentage={number('Match percentage', 75)}
            showPercentageOnHover={boolean('Show percentage on hover', true)}
            size={number('Size', 72)}
        />
    ));
