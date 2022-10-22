
import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import Event from '../Event';
import { mockData } from '../mock-data';


const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {
    let AppWrapper;
    let eventWrapper;
    test('An event element is collapsed by default.', ({ given, when, then }) => {
        given('A collapsed event element is loaded on the page.', () => {
            eventWrapper = shallow(<Event event={mockData[0]} />);

        });

        when('The user opens the app and performs no action.', () => {
            AppWrapper = mount(<App />);
        });

        then('The event element is collapsed by default.', () => {
            AppWrapper.update();
            expect(eventWrapper.state('isVisible')).toBe(false);

        });
    });
    test('User can expand an event to see its details.', ({ given, when, then }) => {
        given('The event list and event elements have loaded.', () => {
            AppWrapper = mount(<App />);
            eventWrapper = shallow(<Event event={mockData[0]} />);

        });

        when('The user clicks on a  details button in the event element.', () => {
            AppWrapper.update();
            eventWrapper.find('.event-item .toggle-collapse').at(0).simulate('click');

        });

        then('The event element expands to show details about the specific event chosen.', () => {
            expect(eventWrapper.state('isVisible')).toBe(true);

        });
    });

    test('User can collapse an event to hide its details.', ({ given, when, then }) => {
        given('The event element is showing the event details.', async () => {
            AppWrapper = await mount(<App />);
            AppWrapper.update();
            AppWrapper.find('.event-item .toggle-collapse').at(0).simulate('click');
            eventWrapper = shallow(<Event event={mockData[0]} />)
        });

        when('The user clicks on the details button again.', () => {
            AppWrapper.update();
            AppWrapper.find('.event-item .toggle-collapse').at(0).simulate('click');
        });

        then('The event details part of the event element is collapsed.', () => {
            expect(eventWrapper.state('isVisible')).toBe(false);
        });
    });
});
