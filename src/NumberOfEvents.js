import React, { Component } from "react";

class NumberOfEvents extends Component {
    state = {
        query: 10
    }
    setValue = (value) => {
        this.setState({
            query: value
        });
    }
    handleInputChanged = (event) => {
        let min = "1";
        let max = "30";
        let value = event.target.value;
        value = Math.max(min, Math.min(max, Number(event.target.value)));
        this.setValue(value);
        //NOTE: DATA LEAVING AS INT

    }

    render() {
        return (
            <form className="numberOfEventsInput">
                <input type="number" className="numberOfEvents" value={this.state.query} defaultValue={10} onInput={this.handleInputChanged} />
            </form>


        );
    }
}
export default NumberOfEvents;