import { Component } from 'react';
import Event from './Event';
class EventList extends Component {
    render() {
        const { events } = this.props;
        return (
            <ul className="EventList">
                {events.map(event =>
                    <li className="eventItem" key={event.id}>
                        <Event event={event} />
                    </li>

                )}
            </ul>)
    }
}
export default EventList;