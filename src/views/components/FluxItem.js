import React, { Component } from 'react';

class FluxItem extends Component {

    static defaultProps = {
        item: {},
        onRemove: () => { },
        onUpdate: () => { }

    }

    constructor(props) {
        super(props)

        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);

        this.input = React.createRef();

    }

    remove() {
        const { item } = this.props;
        this.props.onRemove(item.id);
    }

    update() {
        const { item } = this.props;
        item.description = this.input.current.value;
        this.props.onUpdate(item);
    }

    render() {

        const { props } = this,
            item = props.item;

        return (
            <li className="todo-list-item">
                <input className="tw-check" type="checkbox" checked={item.isChecked} />
                <input onBlur={this.update} ref={this.input} className="tw-input" type="text" disabled={item.isChecked} defaultValue={item.description} />
                <button className="tw-btn" onClick={this.remove}> X </button>
            </li>
        );
    }
}

export default FluxItem;