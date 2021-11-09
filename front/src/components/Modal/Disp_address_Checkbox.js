import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Card, Button, InputGroup } from 'react-bootstrap';

const axios = require('axios');


const Display_adresse_Checkbox = (props) => {
    const token = { token: localStorage.getItem('token') }

    


    return (
        <Row className='profil'>
            {props.info.adresses && props.info.adresses.map((item, key) => (
                <Col key={key} md='6' >
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Adresse n° {key + 1}</Card.Title>
                            <InputGroup.Text>
                                <ul className="adresse" >
                                    <li className="item1">{item.nom}</li>
                                    <li className="item2"> {item.prenom} </li>
                                    <li className="item3">{item.rue}</li>
                                    <li className="item4">{item.ville}</li>
                                    <li className="item5">{item.codePostal}</li>
                                    <li className="item6">{item.pays}</li>
                                </ul>
                            </InputGroup.Text>
                            <Button data-id={item.id} onClick={()=>(props.selection(key))} variant="btn btn-primary">CHOISIR</Button>
                        </Card.Body>
                    </Card>

                </Col>
            ))}
        </Row>
    )
}
export default Display_adresse_Checkbox;
