import React, { Component } from "react";
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
    state = {

    }
    componentDidMount() {
        this.setState({
            visibility: 'hidden',
        })
    }
    setValue = (value, message) => {
        if (!message) {
            this.setState({
                visibility: "hidden"

            })
            this.props.updateNumberOfEvents(value)
        } else {
            this.setState({
                visibility: "visible",
                infoText: message,

            })
        }

    }
    handleInputChanged = (event) => {
        const min = 1;
        const max = 30;
        const message = "Please keep result constraints between 1 and 30"
        let value = parseInt(event.target.value);
        if (value >= max) {
            this.setValue(max, message);
        } else if (value <= min) {
            this.setValue(min, message);
        } else {
            this.setValue(value)
        }

        //NOTE: DATA LEAVING AS INT

    }

    render() {
        return (
            <form className="numberOfEventsInput">
                <ErrorAlert style={{ visibility: this.state.visibility }} text={this.state.infoText} />
                <input type="number" className="numberOfEvents" value={this.props.numOfEvents} placeholder="10" onChange={this.handleInputChanged} />
            </form>


        );
    }
}
export default NumberOfEvents;