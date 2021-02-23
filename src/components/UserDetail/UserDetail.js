import React from 'react';
import './UserDetail.css';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

export default class UserDetail extends React.PureComponent {

    render() {
        const { data, onClickRemove } = this.props;

        return (
            <Card className="card">
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            Выбран пользователь: <b>{ data.firstName } { data.lastName }</b>
                        </ListGroup.Item>
                        <ListGroup.Item className="description">
                            Описание: <textarea className="textarea" defaultValue= { data.description }></textarea> 
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Адрес проживания: <b>{ data.address.streetAddress }</b>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Город: <b>{ data.address.city }</b>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Провинция/штат: <b>{ data.address.state }</b>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Индекс: <b>{ data.address.zip }</b>
                        </ListGroup.Item>
                    </ListGroup>
                    <Button variant="outline-danger" onClick={ onClickRemove }>
                        Закрыть
                    </Button>
                </Card.Body>
            </Card>
        )
    }
}