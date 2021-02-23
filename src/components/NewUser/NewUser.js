import React from 'react';
import './NewUser.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

const defaultValue = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
}

export default class NewUser extends React.PureComponent {

    state = {
        value: defaultValue,
        isValid: false,
        errors: {}
    }

    validateByField = (key, value) => {
        switch (key) {
            case 'id': 
                if (value.length === 0) {
                    throw new Error('this is required field');
                }
                if (value < 0) {
                    throw new Error('id must be a positive number');
                }
                break;

            case 'firstName':
                if (value.length === 0) {
                    throw new Error('this is required field');
                }
                if (!isNaN(value)) {
                    throw new Error('only enter letters');
                }
                break;

            case 'lastName':
                if (value.length === 0) {
                    throw new Error('this is required field');
                }
                if (!isNaN(value)) {
                    throw new Error('only enter letters');
                }
                break;

            case 'email':
                if (value.length === 0) {
                    throw new Error('this is required field');
                }
                if ( !this.validateEmail(value)) {
                    throw new Error('invalid email');
                };
                break;


            case 'phone':
                if (value.length === 0) {
                    throw new Error('this is required field');
                }
                if (value.length < 11) {
                    throw new Error('the number is too short');
                }
                if (isNaN(value)) {
                    throw new Error('only enter numbers');
                }
                break;
        }    

    }

    handleChangeValid = () => {
        !Object.keys(this.state.errors).length ? (
            this.setState({
                isValid: true
            })
        ) : (
            this.setState({
                isValid: false
            })
        )
    }

    validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
        return re.test(email);
    }

    handleValidateForm = () => {
        const { value } = this.state;

        const errors = Object.keys(value).reduce((accumulator, key) => {
            try {
                this.validateByField(key, value[key]);
                return accumulator;
            } catch (error) {
                return { ...accumulator, [key]: error.message };
            }
        }, {});

        this.setState({ 
            errors
        }, this.handleChangeValid);
    }

    handleChange = (field, value) => {    
        this.setState({
            value: {
                ...this.state.value, [field]: value
            }
        }, this.handleValidateForm);
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.props.onAddNewUser(this.state.value);
        this.setState({
            value: defaultValue
        }, this.handleValidateForm);
    }

    render() {
        const { errors, isValid } = this.state;

        return (
            <Card className="new-user__card">
                <Card.Body>
                    <button className="new-user__btn-close" type="close" onClick={ this.props.onCloseAddData }>
                        &times;
                    </button>
                    <Form onSubmit={ this.handleFormSubmit } noValidate>
                        <Form.Row>
                            <Col xs="auto" >
                                <Form.Label>ID</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    placeholder="Enter id" 
                                    value={ this.state.value.id } 
                                    onChange={ (e) => this.handleChange("id", e.target.value) }
                                    required
                                    isInvalid={ !!errors.id }
                                />
                                {
                                    !!errors.id && (
                                        <Form.Control.Feedback type="invalid"> 
                                            { errors.id }
                                        </Form.Control.Feedback>
                                    )
                                }
                            </Col>
                            <Col xs="auto">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Enter first name" 
                                    value={ this.state.value.firstName }
                                    onChange={ (e) => this.handleChange("firstName", e.target.value) }
                                    required
                                    isInvalid={ !!errors.firstName }
                                />
                                {
                                    !!errors.firstName && (
                                        <Form.Control.Feedback type="invalid"> 
                                            { errors.firstName }
                                        </Form.Control.Feedback>
                                    )
                                }
                            </Col>
                            <Col xs="auto">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter last name" 
                                    value={ this.state.value.lastName }
                                    onChange={ (e) => this.handleChange("lastName", e.target.value) }
                                    required
                                    isInvalid={ !!errors.lastName }
                                />
                                {
                                    !!errors.lastName && (
                                        <Form.Control.Feedback type="invalid"> 
                                            { errors.lastName }
                                        </Form.Control.Feedback>
                                    )
                                }
                            </Col>
                            <Col xs="auto">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Enter email" 
                                    value={ this.state.value.email }
                                    onChange={ (e) => this.handleChange("email", e.target.value) }
                                    required
                                    isInvalid={ !!errors.email }
                                />
                                {
                                    !!errors.email && (
                                        <Form.Control.Feedback type="invalid"> 
                                            { errors.email }
                                        </Form.Control.Feedback>
                                    )
                                }
                            </Col>
                            <Col xs="auto">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control 
                                    type="phone" 
                                    placeholder="Enter phone"
                                    value={ this.state.value.phone }
                                    onChange={ (e) => this.handleChange("phone", e.target.value) }
                                    required
                                    isInvalid={ !!errors.phone }
                                    
                                />
                                {
                                    !!errors.phone && (
                                        <Form.Control.Feedback type="invalid"> 
                                            { errors.phone }
                                        </Form.Control.Feedback>
                                    )
                                }
                            </Col>
                        </Form.Row>
                        <Button className="mt-2" variant="primary" type="submit" disabled={ !isValid }>
                            Добавить в таблицу
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}