import React from 'react';
import './searchPanel.css';

export default class SearchPanel extends React.Component {

    state = {
        searchString: ''
    };

    onInputChange = event => {
        this.setState({
            searchString: event.target.value
        }, () => this.props.onSearchStringChange(this.state.searchString));
    };

    render() {
        return (
            <input
                type="text"
                className="form-control search-input"
                placeholder="Search"
                value={this.state.searchString}
                onChange={ this.onInputChange }
            />
        );
    }
}