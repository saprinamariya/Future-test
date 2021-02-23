import React from 'react';
import Button from 'react-bootstrap/Button';

export default class BtnAddNewUser extends React.PureComponent {
    render() {
        return (
            <Button variant="outline-primary" onClick={ this.props.onShowAddData }>Добавить</Button>
        ) 
    }
}