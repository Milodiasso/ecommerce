import React, { useState, useEffect } from 'react';
import './App.scss'
import PrivateRoute from './components/Pages/PrivateRoute.js';
import Admin from './components/Pages/Admin/Admin.js'
import Articles from './components/Articles/Articles.js'
import Article from './components/Articles/Article.js'
import Acceuil from './components/Acceuil.js'
import Panier from './components/Pages/Panier/Panier.js'
import Promo from './components/Pages/Promo.js'
import Apropos from './components/Pages/Apropos.js'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { reactLocalStorage } from 'reactjs-localstorage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profil from './components/Pages/Profil.js';
import Header from "./components/Header/Header.js"
import { Col, Container, Row } from 'react-bootstrap';
import Contact from './components/Pages/Contact';

// const dataProvider = restProvider('http://localhost:8000/api');
function App() {
  const [compteur, setCompteur] = useState(0);
  const [ls, setLs] = useState(null);


  useEffect(() => {

  }, [compteur, ls])

  function removeItems(id) {
    let result = reactLocalStorage.getObject('panier');
    for (var i = 0; i < result["detail"].length; i++) {
      if (result["detail"][i].id === id) {
        result["detail"].splice(i, 1);
      }
    }
    result["detail"].length === 0 ? reactLocalStorage.remove('panier') : reactLocalStorage.setObject('panier', result)
    setCompteur(result["detail"].length)
  }

  function moreItem(id) {
    let res = reactLocalStorage.getObject('panier');
    setLs(res)
    res["detail"].filter((tab, i) => {
      if (tab.id === id) {
        tab.quantity += 1;
      }
      reactLocalStorage.setObject('panier', res)
      return true;
    });
  }


  function lessItem(id) {
    let res = reactLocalStorage.getObject('panier');
    setLs(res)
    res["detail"].filter((tab, i) => {
      if (tab.id === id) {
        if (tab.quantity >= 2) { tab.quantity -= 1; }
      }
      reactLocalStorage.setObject('panier', res)
      return true;
    });
  }

  function addItems(...el) {
    let res = reactLocalStorage.getObject('panier');
    if (Object.keys(res).length === 0) {
      reactLocalStorage.setObject('panier', {
        'detail': el
      })
      setCompteur(compteur + 1)
    } else if (res["detail"].length >= 1) {
      if (!res["detail"].some(u => u.id === el[0].id)) {
        res["detail"][res["detail"].length] = {
          id: el[0].id,
          nomProduit: el[0].nomProduit,
          prix: el[0].prix,
          url: el[0].url,
          quantity: el[0].quantity,
          poids: el[0].poids
        };
        setCompteur(res["detail"].length)
      }
      reactLocalStorage.setObject('panier', res)
    }
  }

  return (
    <Router>
      <Header compteur={compteur} setCompteur={setCompteur} addItems={addItems} removeItems={removeItems} moreItem={moreItem} lessItem={lessItem} />
      <Container>
        <div>
          <main>
            <Route exact path="/" component={Acceuil} />
            <Route exact path="/panier" component={() => <Panier setLs={setLs} images={reactLocalStorage.getObject('panier')} compteur={compteur} setCompteur={setCompteur} addItems={addItems} removeItems={removeItems} moreItem={moreItem} lessItem={lessItem} />} />
            <Route exact path="/profil" component={Profil} />
            <Route exact path="/promo" component={Promo} />
            <Route exact path="/apropos" component={Apropos} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/:categorie/:articles/:cat/:nom/:id" component={() => <Article compteur={compteur} setCompteur={setCompteur} addItems={addItems} removeItems={removeItems} />} />
            <Route exact path="/:categorie/:articles/:cat/:nom" component={() => <Articles compteur={compteur} setCompteur={setCompteur} addItems={addItems} removeItems={removeItems} />} />
            <PrivateRoute exact path="/admin" component={Admin} />
          </main>
        </div>
      </Container>
      <footer>

        <Row>
          <Col md='8'>
          </Col>

          <Col md='4' className="links">
            <a href="/"> <span>COPYRIGHTS</span></a>
            <a href="/"> <span>ACCUEUIL</span></a>
            <a href="/contact"> <span>CONTACT</span></a>
            <a href="/apropos"> <span>À PROPOS</span></a>
          </Col>
        </Row>
      </footer>
    </Router>
  )
}

export default App;
