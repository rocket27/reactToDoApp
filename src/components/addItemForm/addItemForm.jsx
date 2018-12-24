import React from 'react';
import './addItemForm.css';

export default class AddItemForm extends React.Component {

    state = {
        inputValue: ''
    };

    onInputChange = event => {
        this.setState({
            inputValue: event.target.value
        });
    };

    onFormSubmit = (event) => {
        event.preventDefault();

        this.props.onAddItem(this.state.inputValue);

        this.setState(() => {
            return {
                inputValue: ''
            }
        });
    };

    render() {
        return (
            <form
                className={"add-item d-flex"}
                onSubmit={ this.onFormSubmit }
            >
                <input
                    type="text"
                    className={"form-control"}
                    placeholder={"What needs to be done.."}
                    value={this.state.inputValue}
                    onChange={ this.onInputChange }
                />
                <button className="add-item-button btn btn-info">
                    Add task
                </button>
            </form>
        );
    }
}