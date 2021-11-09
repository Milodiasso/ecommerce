import React, {useState, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import {Card, Button, InputGroup} from 'react-bootstrap'

const axios = require('axios');

const Admin = (props) => {
  const [info, setInfo] = useState(null);
  const [currentSousCats, setcurrentSousCats] = useState(null);
  const [currentCats, setCurrentCats] = useState(null);
  const [currentCatsName, setCurrentCatsName] = useState(null);
  const [currentSousCatsName, setcurrentSousCatsName] = useState("");
  const [listeArticles, setListeArticles] = useState(null);


  // const token = {
  // "token": reactLocalStorage.get('token') ?? ""
  // }
  function showArticles(id) {

axios.get(`http://localhost:8000/api/articles/${id}`).then(res => setListeArticles(res.data)).catch(err => console.log(err));

    // setcurrentSousCats()
  }
  useEffect(() => {
    axios.get("http://localhost:8000/api/categories/read", {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async res => await(setInfo(res.data), console.log(res.data))).catch(err => {
      return (err)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log("INFO");
    console.log(info && info[currentCats - 1].nom);
    console.log(currentCats);
    console.log(currentSousCats);
  }, [currentCats, currentCatsName, currentSousCats, currentSousCatsName])

  return (<Row className='profil'>
    <h3 className="text-white text-center bandeau p-2 m-2 rounded">Gestion des Articles</h3>
    <Col md='4'>
      <Card style={{
          width: '18rem'
        }}>
        <Card.Body>
          <Card.Title>Catégories</Card.Title>
          {
            info && info.map((e, i) => (<InputGroup.Text key={i} onClick={() => (setListeArticles(null),setCurrentCats(e.id), setCurrentCatsName(e.nom))} className={`d-flex justify-content-between ${currentCatsName === e.nom ? "active": ""}`} >
                <Button variant="primary btn-danger">
                  <svg xmlns="https://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </Button>

                  <input type="text" className="ecrire" value={e.nom}/>
                  <svg xmlns="https://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                  </svg>
            </InputGroup.Text>))
          }

          <Button variant="primary">Modifier</Button>

        </Card.Body>
      </Card>

    </Col>
    <Col md='4'>
      <Card style={{
          width: '18rem'
        }}>
        <Card.Body>
          <Card.Title>Sous-catégorie</Card.Title>

          {
            currentCats
              ? (info[currentCats - 1].sousCats.map((e, k) => (<InputGroup.Text key={k} onClick={() => (setcurrentSousCats(e.id), showArticles(e.id), setcurrentSousCatsName(e.nom))} className="d-flex justify-content-between btn-raised shadow my-button w-xs" className={`d-flex justify-content-between ${currentSousCatsName === e.nom ? "active": ""}`}>
                {e.nom}


                <div>
                <Button variant="primary btn-danger">
                  <svg xmlns="https://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </Button>

                <Button variant="primary btn-info">
                  <svg xmlns="https//www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                  </svg>
                </Button>
              </div>




            </InputGroup.Text>)))
              : ''
          }

        </Card.Body>
      </Card>

    </Col>
    <Col md='4'>
      <Card style={{
          width: '18rem'
        }}>
        <Card.Body>
          <Card.Title>Articles</Card.Title>

          {
            listeArticles ?
              listeArticles.articles.map((e, k) => (

            <div key={k} className="card text-center py-4">

              <img src={e.s_url} alt="Lights" style={{width:"45%"}}/>
              <div className="caption">
                <p>{e.p_nomProduit}</p>
              </div>
          </div>
        ))


            : console.log('Nop')
          }

        </Card.Body>
      </Card>

    </Col>
  </Row>)
}
export default Admin;
