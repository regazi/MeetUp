import React, { Component } from 'react';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import './App.css';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import CitySearch from './CitySearch';
import { mockData } from "./mock-data";
class App extends Component {
  state = {
    events: mockData,
    locations: extractLocations(mockData),
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }

  render() {


    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents />
        <EventList events={this.state.events} />
      </div>
    );
  }
}
export default App;
