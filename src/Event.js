import React, { Component } from 'react'
import './Event.css'


class Event extends Component {

    state = {
        isVisible: false,
    }



    clickHandler = () => {
        if (this.state.isVisible !== true) {
            this.setState({
                isVisible: true
            })
        } else {
            this.setState({
                isVisible: false
            })
        }

    };

    render() {
        const isVisible = this.state.isVisible;
        const { event } = this.props;

        return (
            <div className='event-item'>
                <h2>{event.summary}</h2>
                <p>{event.description}</p>

                <div className={isVisible === true ? "event-details visible" : "event-details"}>
                    <h3>Location: {event.location}</h3>
                    <p>From: {event.start.dateTime}</p>
                    <p>Until: {event.end.dateTime}</p>
                </div>
                <button className='toggle-collapse' onClick={this.clickHandler}>
                    Details
                </button>
            </div>
        );
    }
}

export default Event