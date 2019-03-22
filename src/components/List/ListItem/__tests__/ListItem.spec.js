import React from 'react';
import toJson from 'enzyme-to-json';
import ListItem from '../ListItem';
import Text from '../../../Text';

describe('ListItem component', () => {
    it('should render ListItem correctly', () => {
        const wrapper = shallow(
            <ListItem>
                <Text>An item</Text>
            </ListItem>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should turn string items to Text', () => {
        const wrapper = mount(<ListItem>Simple string</ListItem>);

        expect(wrapper.find('Text')).toHaveLength(1);
    });
    it('should not add clickable class when onClick is not defined', () => {
        const wrapper = mount(<ListItem>An item</ListItem>);

        expect(wrapper.find('.ListItem--clickable')).toHaveLength(0);
    });
    it('should add clickable class when onClick is defined', () => {
        const wrapper = mount(<ListItem onClick={jest.fn()}>An item</ListItem>);

        expect(wrapper.find('.ListItem--clickable')).toHaveLength(1);
    });
});
