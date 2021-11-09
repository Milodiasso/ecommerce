import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Card, Button, InputGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Adresse from '../Modal/Ad_address';
import Display_adresse from '../Modal/Disp_address';


const axios = require('axios');


const Profil = (props) => {
    const history = useHistory();
    const token = { token: localStorage.getItem('token') }

    const [info, setInfo] = useState({ username: 'none', email: 'none', dateCreation: 'none' });
    // const [modify, setModify] = useState('');


    const handleDelete = (e) => {
        let confirme = window.confirm("Êtes-vous sûr de supprimer ?")
        if (confirme) {
            if (e.target.dataset.name) {
                axios.put("http://127.0.0.1:8000/api/user/delete", token)
                    .then((res) => {
                        localStorage.clear('token');
                        setInterval(() => {
                            history.push("/")
                            window.location.reload(false)
                        }, 2500)
                    })
            }

        }

    }

    const handleModify = (e) => {
        let value = window.prompt("La nouvelle valeur : ")
        const changes = { token: token.token, [e.target.dataset.name]: value }
        axios.put("http://127.0.0.1:8000/api/user/update", changes)
            .then((res) => { if (res.data.msg) window.location.reload(false) })
    }


    useEffect(() => {
        axios.post("http://127.0.0.1:8000/api/user", token, {
            headers: { "Content-Type": "application/json" }
        })

            .then(async res => await (setInfo(res.data)))
            .catch(err => { return (err) });
    }, [])


    return (
        <Row className='profil'>
            <Col md='4'>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>USERNAME</Card.Title>
                        <InputGroup.Text >
                            {info.username}
                        </InputGroup.Text>
                        <Button onClick={handleModify} variant="primary" data-name="username">Modifier</Button>

                    </Card.Body>
                </Card>

            </Col>
            <Col md='4'>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>E-MAIL</Card.Title>
                        <InputGroup.Text>
                            {info.email}
                        </InputGroup.Text>
                        <Button onClick={handleModify} variant="primary" data-name="email_change">Modifier</Button>

                    </Card.Body>
                </Card>

            </Col>
            <Col md='4'>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>DATE D'INSCRIPTION</Card.Title>
                        <InputGroup.Text>
                            {info.dateCreation}

                        </InputGroup.Text>

                    </Card.Body>
                </Card>

            </Col>


            <Display_adresse info={info} />
            <Adresse />

            <Col md='12'>
                <Button data-name="flag" variant="danger" onClick={handleDelete}>Supprimer le compte</Button>
            </Col>
        </Row>
    )
}
export default Profil;
