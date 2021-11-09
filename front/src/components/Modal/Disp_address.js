import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Card, Button, InputGroup } from 'react-bootstrap';

const axios = require('axios');


const Display_adresse = (props) => {
    const token = { token: localStorage.getItem('token') }

    const handleDelete = (e) => {
        let confirme = window.confirm("Êtes-vous sûr de supprimer ?")
        if (confirme) {
            if (e.target.dataset.id) {
                const supp = { id_adresse: e.target.dataset.id }
                axios.delete("http://127.0.0.1:8000/api/adresses/delete", { data: supp })
                    .then((res) => {
                        if (res.data.msg) {
                            window.location.reload(false)
                        } else {
                            alert('mauvaise manipulation')
                        }
                    })
                    .catch(err => { return (err) });

            }
        }
    }


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
                            <Button data-id={item.id} onClick={handleDelete} variant="btn btn-danger">Supprimer</Button>
                        </Card.Body>
                    </Card>

                </Col>
            ))}
        </Row>
    )
}
export default Display_adresse;
