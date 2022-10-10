import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';

describe('<NumberOfEvents /> component', () => {
    let locations, NoEwrapper;
    beforeAll(() => {
        locations = extractLocations(mockData);
        NoEwrapper = shallow(<NumberOfEvents locations={locations} />);

    });

    //test component renders

    test('render text input', () => {
        expect(NoEwrapper.find('.numberOfEvents')).toHaveLength(1);
    });
    ;

    test('renders text input correctly', () => {
        const query = NoEwrapper.state('query');
        expect(NoEwrapper.find('.numberOfEvents').prop('value')).toBe(query);
    });

    //test component functions

    test('change state when text input changes', () => {
        NoEwrapper.setState({
            query: '10'
        });
        const eventObject = { target: { value: '5' } };
        NoEwrapper.find('.numberOfEvents').simulate('input', eventObject);
        //Note: data type converted to int in validation code
        expect(NoEwrapper.state('query')).toBe(5);
    });
    test('input cannot exceed 30', () => {
        NoEwrapper.setState({
            query: 10
        });
        const eventObject = { target: { value: '40' } };
        NoEwrapper.find('.numberOfEvents').simulate('input', eventObject);
        expect(NoEwrapper.state('query')).toBe(30);
    });

    test('get correct number of events as selected by the user', () => {
        NoEwrapper.setState({
            query: 30
        });
        const Event = { target: { value: 6 } };
        NoEwrapper.find('.numberOfEvents').simulate('change', Event);
        expect(NoEwrapper.state('numberOfEvents')).toBe(6);
    });
});
