import React, {useState, useEffect} from 'react';
import {NavLink} from "react-router-dom";
const axios = require('axios');

function Acceuil(props) {
  const [categorie, setCategorie] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/categories/read").then(res => (setCategorie(res.data))).catch(err => console.log(err));
  }, [])

  return (<div>

    <div className="container">
      <div className="container-fluid">
        <h2>Categories</h2>
        {
          categorie
            ? categorie.map((el, x) => (<div key={x} className="card text-center">
              <div className="row">
                <div className="col-sm-4"></div>
              </div>

              <div className="zoneButton">
                <button type="button" className="btn btn-primary btn-block">{el.nom}</button>
              </div>
              <div className="hiddenSC">
                <div className="categorieImg">
                  <img alt="categorie" className="imgCat" src={el.base64}/>
                </div>
                <div className="btn-group btn-group-justified linkSC">
                {console.log(el)}
                  {
                    el.sousCats.map((e, f) => (<NavLink className="btn" key={f} to={`${el.id}/${e.id}/${el.nom}/${e.nom}`}>{e.nom}
                    </NavLink>))
                  }
                </div>
              </div>
            </div>))
            : <div className="d-flex justify-content-center">
                <div className="spinner-grow text-warning text-center" role="status">
                  <span className="sr-only"></span>
                </div>
              </div>
        }
      </div>
    </div>
  </div>)
}
export default Acceuil;
