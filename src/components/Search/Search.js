import React from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export default class Search extends React.PureComponent {

    state = {
        value: ''
    }
    
    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <InputGroup className="input" value={ this.state.value } onChange={ this.handleChange }>
                <FormControl
                placeholder="Search..."
                />
                <InputGroup.Append>
                <Button variant="outline-secondary" onClick={() => this.props.onChangeData(this.state.value) }>Search</Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }
}