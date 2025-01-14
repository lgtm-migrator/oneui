import * as React from 'react';
import toJson from 'enzyme-to-json';
import { SelectButton } from '../SelectButton';
import { ENTER_KEY } from '../../../../constants';

describe('SelectButton', () => {
    let wrapper;
    const onChangeMock = jest.fn();

    beforeEach(() => {
        wrapper = mount(
            <SelectButton
                value="button 1"
                onChange={onChangeMock}
                context="good"
                size="large"
                isEqualWidth
                isSelected
            >
                Option 1
            </SelectButton>
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should call onChange when clicked', () => {
        wrapper.find('div').simulate('click');
        expect(onChangeMock).toHaveBeenCalledWith('button 1');
    });
    it('should call onChange when Enter key was pressed on it', () => {
        wrapper.find('div').simulate('keyPress', { key: ENTER_KEY });
        expect(onChangeMock).toHaveBeenCalledWith('button 1');
    });
    it('should not call onChange when other key was pressed on it', () => {
        wrapper.find('div').simulate('keyPress', { key: 'b' });
        expect(onChangeMock).not.toHaveBeenCalled();
    });
});
