import React, { Component } from 'react';
import WelcomeScreen from './welcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from
  './api';
import './nprogress.css';
import './App.css';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import CitySearch from './CitySearch';
import { mockData } from "./mock-data";

import { InfoAlert } from './Alert';
class App extends Component {
  state = {
    events: [],
    locations: mockData,
    showWelcomeScreen: undefined,
  }

  async componentDidMount() {
    if (navigator.onLine === false) {
      console.log("offline")
    }
    if (navigator.onLine === true) {
      console.log("online")
    }
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false :
      true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    console.log("made it to conditional in componentdidmount")
    console.log(`code: ${code}, isTokenValid: ${isTokenValid}, mounted: ${this.mounted}`)
    if ((code || isTokenValid) && this.mounted) {
      console.log("about to call getEvents")
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
        else {
          console.log("did not call get events")
        }
      });
    }
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
  updateNumberOfEvents = (number) => {
    getEvents().then((events) => {
      let updatedEvents = []
      for (let i = 1; i <= number; i++) {
        updatedEvents.push(events[i])

      }
      this.setState({
        events: updatedEvents
      });
    });
  }

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div
      className="App" />

    return (
      <div className="App">
        <div className='offline-alert'>{navigator.onLine === false && (
          <InfoAlert
            infoText={
              'App is in offline mode'
            }
          />)}</div>

        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents events={this.state.events} updateNumberOfEvents={this.updateNumberOfEvents} />
        <EventList events={this.state.events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}
export default App;
