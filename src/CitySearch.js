import React, { Component } from "react";
import { InfoAlert } from './Alert';

class CitySearch extends Component {
    state = {
        query: '',
        suggestions: [],
        showSuggestions: false,
    }
    componentDidMount() {
        this.setState({
            visibility: 'hidden'
        })
    }





    handleInputChanged = (event) => {
        const value = event.target.value;
        console.log(value)
        console.log(this.props.locations)
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        }); if (suggestions.length === 0) {
            this.setState({
                query: value,
                infoText: 'We can not find the city you are looking for. Please try another city',
                visibility: "visible",
                showSuggestions: false
            });
            console.log(this.visibility)
        } else {
            this.setState({
                query: value,
                suggestions: suggestions,
                showSuggestions: true,
                infoText: '',
                visibility: "hidden",
            })
        }
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

            <div className="CitySearch" id="CitySearch">
                <InfoAlert text={this.state.infoText} style={{ visibility: this.state.visibility }} />
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