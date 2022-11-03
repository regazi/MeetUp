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
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';
import GenreGraph from './Genre';

import { InfoAlert } from './Alert';
class App extends Component {
  state = {
    events: [],
    locations: [],
    showWelcomeScreen: undefined,
  }

  async componentDidMount() {
    this.mounted = true;
    if (navigator.onLine === false) {
      console.log("offline")
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events), showWelcomeScreen: null });
        }
      });
      return
    } else if (navigator.onLine === true) {
      const accessToken = localStorage.getItem('access_token');
      const isTokenValid = (await checkToken(accessToken)).error ? false :
        true;
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      this.setState({ showWelcomeScreen: !(code || isTokenValid) });
      if ((code || isTokenValid) && this.mounted) {
        getEvents().then((events) => {
          if (this.mounted) {
            this.setState({ events, locations: extractLocations(events) });
          }
        });
      }
    }
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number };
    })
    return data;
  };
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
      className="App whynorender" />

    return (
      <div className="App">
        <div className='offline-alert'>{navigator.onLine === false && (
          <InfoAlert
            text={'App running in offline mode --- App running in offline mode --- App running in offline mode --- App running in offline mode '} style={{ visibility: 'visible' }}
          />)}</div>

        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents events={this.state.events} updateNumberOfEvents={this.updateNumberOfEvents} />
        <GenreGraph events={this.state.events} />
        <ResponsiveContainer height={400} >

          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis type="category" dataKey="city" name="city" />
            <YAxis
              allowDecimals={false}
              type="number"
              dataKey="number"
              name="number of events"
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="Event" data={this.getData()} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
        <EventList events={this.state.events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }} />

      </div>
    );
  }
}
export default App;
