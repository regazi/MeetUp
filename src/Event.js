import React, { Component } from 'react'
import './Event.css'
import Card from 'react-bootstrap/Card'


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
                <Card>
                    <Card.Header classNme="cardHeader">
                        <Card.Title>{event.summary}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <p>{event.description}</p>

                        <div className={isVisible === true ? "event-details visible" : "event-details"}>
                            <h3>Location: {event.location}</h3>
                            <p>From: {event.start.dateTime}</p>
                            <p>Until: {event.end.dateTime}</p>
                        </div>
                        <button className='toggle-collapse' onClick={this.clickHandler}>
                            Details
                        </button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Event