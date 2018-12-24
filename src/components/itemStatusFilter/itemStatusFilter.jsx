import React from 'react';
import './itemStatusFilter.css';

export default class ItemStatusFilter extends React.Component {

    buttons = [
        {
            name: 'All',
            value: 'all',
        },
        {
            name: 'Active',
            value: 'active',
        },
        {
            name: 'Done',
            value: 'done',
        },
    ];

    render() {
        const { filterStatus, onSetFilterStatus } = this.props;

        const buttons = this.buttons.map(({ name, value }) =>
            <button
                key={ value }
                type="button"
                className={`btn ${filterStatus === value ? 'btn-info' : 'btn-outline-secondary'}`}
                onClick={ () => onSetFilterStatus(value) }
            >
                { name }
            </button>
        );

        return (
            <div className="btn-group">
                { buttons }
            </div>
        );
    }
}
