import React, { Component } from 'react'


class Event extends Component {

    state = {
        isVisible: false,
    }



    clickHandler = () => {
        this.setState({ isVisible: !this.state.isVisible });
    };

    render() {
        const isVisible = this.state.isVisible;
        const { event } = this.props;

        return (
            <div className='event-item'>
                <h2>{event.summary}</h2>
                <p>{event.description}</p>
                <button className='toggle-collapse' onClick={this.clickHandler}>
                    Details
                </button>
                <div className={isVisible ? "event-details visible" : "event-details"}>
                    <h3>Location: {event.location}</h3>
                    <p>From: {event.start.dateTime}</p>
                    <p>Until: {event.end.dateTime}</p>
                </div>
            </div>
        );
    }
}

export default Event