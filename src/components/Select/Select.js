import React from 'react';
import './Select.css';
import Form from 'react-bootstrap/Form'

export default class Select extends React.PureComponent {
    render() {
        return (
            <Form.Control
                as="select"
                className="my-1 mr-sm-2 select"
                custom
                onChange={ this.props.onChangeData }
                value={ this.props.value }
            >
                <option value="small">Small data</option>
                <option value="big">Big Data </option>
            </Form.Control>
        )
    }
} 