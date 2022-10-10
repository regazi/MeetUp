import React, { Component } from "react";

class CitySearch extends Component {
    state = {
        query: '',
        suggestions: [],
        showSuggestions: false,
        locations: this.props.locations
    }
    handleInputChanged = (event) => {
        const value = event.target.value;
        const suggestions = this.state.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        this.setState({
            query: value,
            suggestions,
            showSuggestions: true
        });
    }
    handleItemClicked = (suggestion) => {
        this.setState({
            query: suggestion,
            showSuggestions: false,

        });
        this.props.updateEvents(suggestion)
    }
    render() {
        return (

            <div className="CitySearch">
                <input type="text" className="city" value={this.state.query} onChange={this.handleInputChanged} onFocus={() => { this.setState({ showSuggestions: true }) }} />

                <ul className={
                    `suggestions  ${this.state.showSuggestions ? "showSuggestions" : "display-none"}`
                } style={this.state.showSuggestions ? {} : { display: 'none' }}>
                    {this.state.suggestions.map((suggestion) => (
                        <li key={suggestion} onClick={() => this.handleItemClicked(suggestion)}>{suggestion}</li>
                    ))}
                    <li key='all'>
                        <b onClick={() => this.handleItemClicked("all")}>See all cities</b>
                    </li>
                </ul>
            </div>
        );
    }
}
export default CitySearch;