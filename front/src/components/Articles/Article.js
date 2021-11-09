import React, {useState, useEffect} from 'react';
import {NavLink} from "react-router-dom";

import {useParams} from "react-router-dom";
const axios = require('axios');

function Article(props) {
  let {id} = useParams();
  const [article, setArticle] = useState(null);

function add() {
  props.addItems({"id":article[0].p_id, "nomProduit":article[0].p_nomProduit, "prix":article[0].p_prixUnitaireTtc, "url": article[0].s_url,"quantity": 1, "poids" : article[0].p_poids});
}
console.log(article);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/article/${id}`).then(res => setArticle(res.data.article)).catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

return (
  <div className="main">
    <div className="row">
      <div className="col-sm-2"><h3 className="padding text-center">Avis clients</h3></div>
      <div className="col-sm-8">
        <div className="jumbotron text-center">
          <h1>{article && article[0].p_nomProduit}</h1>
          <p>{article && article[0].p_description}</p>
        </div>
        <div className="container-fluid">
          <h2>Description</h2>
          <table className="table table-bordered">
            <tbody>
              {
                article && Object.entries(article[0].p_caracteristique).map(([key, val]) =>
                <tr key={key}>
                  <td>{key}</td>
                  <td>{val}</td>
                </tr>)
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-sm-2">
        <div className="btn-group-vertical">
          <button onClick={() => add()} type="button" className="btn btn-primary">Ajouter au Panier</button>
          <NavLink onClick={() => add()} to="/panier" className="btn btn-primary">Acheter</NavLink>
        </div>
    </div>
    </div>
  </div>
);
}

export default Article;

/*

<div class="row">
  <div class="col-sm-2">.col-sm-2</div>
  <div class="col-sm-8">.col-sm-8</div>
  <div class="col-sm-2">.col-sm-2</div>
</div>

      <div className="aside-right">
        {
          article && article.p_quantite !== 0
            ? <div>
                <div className="stock">En stock ({article.p_quantite}
                  restant)</div>
                <div>{article[0].p_prixUnitaireHt}€ (HT)</div>
                <div>{article[0].p_prixUnitaireTtc}€ (TTC)</div>
                <div>{article[0].p_poids} g</div>
              </div>
            : <div className="rupture">En Rupture</div>
        }
  </div>

  */

/*
  <div className="container">
  <div className="section">
    <div className="aside-left">Avis clients</div>
    <div className="section-article">

      <div className="article-description">
        <h1>Description</h1>
        <p>{article && article[0].p_description}</p>
        <div className="article-des-image"></div>
      </div>

      <div className="article-caracteristique">
        <h1>Caractéristiques technique</h1>
        <div className="article-des-image"></div>
        <table>
          <tbody>
            {
              article && Object.entries(article[0].p_caracteristique).map(([key, val]) =>
              <tr key={key}>
                <td>{key}</td>
                <td>{val}</td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
   */
