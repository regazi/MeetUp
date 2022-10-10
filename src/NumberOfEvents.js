import React, { Component } from "react";

class NumberOfEvents extends Component {
    state = {
        query: 10
    }
    setValue = (value) => {
        this.setState({
            query: value
        });
        this.props.updateNumberOfEvents(value)
    }
    handleInputChanged = (event) => {
        const min = 1;
        const max = 30;
        let value = parseInt(event.target.value);
        if (value >= max) {
            this.setValue(max);
        } else if (value <= min) {
            this.setValue(min);
        } else {
            this.setValue(value)
        }

        //NOTE: DATA LEAVING AS INT

    }

    render() {
        return (
            <form className="numberOfEventsInput">
                <input type="number" className="numberOfEvents" value={this.state.query} onInput={this.handleInputChanged} />
            </form>


        );
    }
}
export default NumberOfEvents;