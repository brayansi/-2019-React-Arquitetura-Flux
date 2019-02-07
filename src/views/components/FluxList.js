import React, { Component } from 'react';
import FluxItem from './FluxItem';


class FluxList extends Component {

    static defaultProps = {
        items: [],
        onRemove: () => { },
        onUpdate: () => { }

    }

    constructor(props) {
        super(props);
        this.state = {};

        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);

    }

    remove(id) {
        this.props.onRemove(id);
    }

    update(item) {
        this.props.onUpdate(item);
    }

    render() {

        const { props } = this;
        if (props.items.length === 0) {
            return <div>No Item</div>
        }

        return (
            <ul className="todo-list">
                {props.items.map(item => <FluxItem key={item.id} item={item} onRemove={this.remove} onUpdate={this.update} />)}
            </ul>
        );
    }
}

export default FluxList;