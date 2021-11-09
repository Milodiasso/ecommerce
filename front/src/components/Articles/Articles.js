import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {NavLink} from "react-router-dom";
const axios = require('axios');

function Articles({compteur, setCompteur, addItems, removeItems}) {
  let {cat, nom, categorie, articles} = useParams();
  const [listeArticles, setListeArticles] = useState(null);
  useEffect(() => {
    axios.get(`http://localhost:8000/api/articles/${articles}`).then(res => setListeArticles(res.data)).catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="main">
      <div className="container-fluid">
        <h1>{cat}: {nom}</h1>
        <div className="row">
          <div className="col-sm-4">
            <b><u>FILTRE</u></b>
            <div className="radio">
              <label><input type="radio" name="optradio"/>Ordinateur-Tours</label>
            </div>
            <div className="radio">
              <label><input type="radio" name="optradio"/>PC portable</label>
            </div>
            <div className="radio disabled">
              <label><input type="radio" name="optradio"/>Composants informatique</label>
            </div>
            <hr/>
            <label htmlFor="customRange1" className="form-label"><b>Prix</b></label>
            <input type="range" className="form-range" id="customRange1"/>
            <hr/>

            <div className="form-group">
              <label htmlFor="sel1"><b>Dimension</b></label>
              <select className="form-control" id="sel1">
                <option>40x40x40</option>
                <option>70x50x30</option>
                <option>50x20x30</option>
                <option>130x520x80</option>
              </select>
            </div>
            <button className="btn btn-primary">Filtrer</button>
          </div>
          <div className="col-sm-8">
            {
              listeArticles ? listeArticles.articles.map((e, k) => (

            <div key={k} className="card text-center py-4">
              <NavLink to={`${nom}/${e.p_id}`}>

              <img src={e.s_url} alt="Lights" style={{width:"45%"}}/>
              <div className="caption">
                <p>{e.p_nomProduit}</p>
              </div>
            </NavLink>
            <div className="btn-group">
                <NavLink className="btn btn-success" to={`${nom}/${e.p_id}`}>
                Voir le produit
                </NavLink>
                <button type="button" className="btn btn-primary" onClick={() => addItems({id:e.p_id, nomProduit:e.p_nomProduit, prix:e.p_prixUnitaireTtc, url: e.s_url,quantity: 1, poids: e.p_poids})}>Ajouter au panier</button>
              </div>
          </div>
        )) : <div className="d-flex justify-content-center">
                <div className="spinner-grow text-warning text-center" role="status">
                  <span className="sr-only"></span>
                </div>
              </div>
      }
          </div>
        </div>
      </div>
  </div>
);
}

export default Articles;


/*
{
  listeArticles && listeArticles.articles.map((e, f) => (
  <div key={f} className="main-bloc-article">
  {console.log(e)}
    <div className="bloc-article">
      <div key={f} className="article-description">
        <div className="article-des-image"><img src={e.s_url} alt="article"/></div>
        <div className="article-text">
        {e.p_nomProduit}
        </div>

        <div className="article-nav">
          <div className="voir">
            <NavLink key={f} to={`${nom}/${e.p_id}`}>
              <div className="button-texte">
                Voir le produit
              </div>
            </NavLink>
          </div>
          <div className="ajouter">
            <div onClick={() => addItems({id:e.p_id, nomProduit:e.p_nomProduit, prix:e.p_prixUnitaireTtc, url: e.s_url,quantity: 1})} className="button-texte">
              Ajouter au panier
            </div>
          </div>
        </div>
      </div>
      {
        e.p_quantite && e.p_quantite !== 0
          ? <div className="stock">En stock ({e.p_quantite} restant)</div>
          : <div className="rupture">En Rupture</div>
      }

    </div>

  </div>))
}
*/
