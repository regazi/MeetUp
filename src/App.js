import React, { Component } from 'react';
import WelcomeScreen from './welcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from
  './api';
import './nprogress.css';
import './App.css';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import CitySearch from './CitySearch';
import GenreGraph from './Genre';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';

import { InfoAlert } from './Alert';
import CityGraph from './CityGraph';
class App extends Component {
  state = {
    events: [],
    locations: [],
    showWelcomeScreen: undefined,
    numOfEvents: 10,
    key: "City"
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
            this.setState({ events, locations: extractLocations(events), numOfEvents: 10 });
          }
        });
      }
    }
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  setKey(tab) {
    this.setState({
      key: tab
    })
  }
  /*
  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number };
    })
    return data;
  };
  */
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
    this.setState({
      numOfEvents: number,
    });
  }

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div
      className="App" />

    return (
      <div className="App">
        <div className='offline-alert'>{navigator.onLine === false && (
          <InfoAlert
            text={'App running in offline mode --- App running in offline mode --- App running in offline mode --- App running in offline mode '} style={{ visibility: 'visible' }}
          />)}</div>

        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} updateNumberOfEvents={this.updateNumberOfEvents} />
        <NumberOfEvents events={this.state.events} updateNumberOfEvents={this.updateNumberOfEvents} numOfEvents={this.numOfEvents} />
        <div>
          <Tabs
            id="controlled-tab-example"
            activeKey={this.key}
            onSelect={(k) => this.setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="Cities" title="Cities">
              <CityGraph events={this.state.events} locations={this.state.locations} />
            </Tab>
            <Tab eventKey="Themes" title="Themes">
              <GenreGraph events={this.state.events} />
            </Tab>
          </Tabs>


        </div>
        <EventList events={this.state.events.slice(0, this.state.numOfEvents)} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }} />

      </div>
    );
  }
}
export default App;
