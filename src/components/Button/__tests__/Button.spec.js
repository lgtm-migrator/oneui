import React from 'react';
import toJson from 'enzyme-to-json';
import Button from '../Button';

describe('<Button> that renders a button', () => {
    it('should render default button correctly', () => {
        const wrapper = mount(<Button>Click me</Button>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should add classes when props are changed', () => {
        const wrapper = mount(
            <Button context="primary" size="large" isBlock>
                <span>Click me</span>
            </Button>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('shoudl call click callback correctly', () => {
        const onClickMock = jest.fn();
        const wrapper = mount(<Button onClick={onClickMock}>Click me</Button>);
        wrapper.find('button').simulate('click');
        expect(onClickMock).toHaveBeenCalled();
    });
    it('should add string html attributes correctly', () => {
        const wrapper = mount(<Button data-test="something">Click me</Button>);
        expect(wrapper.find('button').prop('data-test')).toEqual('something');
    });
    it('should add functional html attributes correctly', () => {
        const onMouseOverMock = jest.fn();
        const wrapper = mount(
            // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
            <Button onMouseOver={onMouseOverMock}>Click me</Button>
        );
        const buttonWrapper = wrapper.find('button');
        buttonWrapper.simulate('mouseover');
        expect(onMouseOverMock).toHaveBeenCalled();
    });
});