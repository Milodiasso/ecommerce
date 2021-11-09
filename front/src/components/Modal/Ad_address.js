import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';


const axios = require('axios');


const Adresse = (props) => {
    const token = { token: localStorage.getItem('token') }

    const [toggle, setToggle] = useState(false);

    function formulaire() {
        toggle ? setToggle(false) : setToggle(true);
    }

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        const adresse = {
            token: token.token,
            nom: data.nom,
            prenom: data.prenom,
            rue: data.rue,
            ville: data.ville,
            codePostal: data.codePostal,
            pays: data.pays
        };
        axios.post("http://127.0.0.1:8000/api/adresses/insert", adresse)
            .then((res) => (window.location.reload(false)))
            .catch(err => { alert("Veuillez remplir les champs correctement") })
    }


    return (
        <Row>
            <Col md='6' >
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <div className="add_address" onClick={formulaire}>
                            <span>+</span>
                        </div>
                        <Card.Title>AJOUTER ADRESSE</Card.Title>

                    </Card.Body>
                </Card>

            </Col>
            {toggle ?
                <div className='add_form'>
                    <form action="/profil" method="post" onSubmit={handleSubmit(onSubmit)}>
                        <p>  NOM</p>
                        <input type='text' className="nom" {...register('nom', { required: true })} />
                        <p>  PRENOM</p>
                        <input type='text' className="prenom" {...register('prenom', { required: true })} />
                        <p>  RUE</p>
                        <input type='text' className="rue" {...register('rue', { required: true })} />
                        <p>  VILLE</p>
                        <input type='text' className="ville" {...register('ville', { required: true })} />
                        <p>  Code Postal</p>
                        <input type='text' className="codePostal" {...register('codePostal', { required: true })} />
                        <p>  PAYS</p>
                        <select name="Pays" className="pays" {...register('pays', { required: true })}>
                            <option value="FR" selected>FR</option>
                            <option value="EN">EN</option>
                            <option value="BE">BE</option>
                            <option value="DE">DE</option>
                            <option value="ES">ES</option>
                        </select>
                        <div className="btn_form">
                            <button type='button' className='btn btn-danger' onClick={formulaire}>Fermer</button>
                            <input type='submit' className='btn btn-success' value="Ajouter adresse" />
                        </div>


                    </form>
                </div> : <p></p>
            }
        </Row>

            
    )
}
export default Adresse;
