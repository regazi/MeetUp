import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from "../mock-data";

describe('<Event /> component', () => {
    let EventWrapper;

    beforeAll(() => {
        EventWrapper = shallow(<Event event={mockData[0]} />);
    });

    //test components render

    test('renders event item', () => {
        const eventItem = EventWrapper.find('.event-item');
        expect(eventItem).toHaveLength(1);
    });

    test('renders toggle button', () => {
        const detailsButton = EventWrapper.find('.toggle-collapse');
        expect(detailsButton).toHaveLength(1);
    });

    test('renders event-details', () => {
        const eventDetails = EventWrapper.find('.event-details');
        expect(eventDetails).toHaveLength(1);
    });

    //test components functions

    test('button toggles event collapse', () => {
        EventWrapper.setState({ isVisible: true })
        const button = EventWrapper.find('.toggle-collapse')
        button.simulate('click')
        expect(EventWrapper.state("isVisible")).toEqual(false)
    });

    test('button toggles event de-collapse', () => {
        EventWrapper.setState({ isVisible: false })
        const button = EventWrapper.find('.toggle-collapse')
        button.simulate('click')
        expect(EventWrapper.state("isVisible")).toEqual(true)
    });

});