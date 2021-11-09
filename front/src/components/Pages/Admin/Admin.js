import React, {useState, useEffect} from 'react';
import Categorie from './Publication/Categories.js';
import SousCategories from './Publication/SousCategories.js';
import { useForm } from 'react-hook-form';
import { reactLocalStorage } from 'reactjs-localstorage';
import {Row, Col} from 'react-bootstrap';
import {Card, Button } from 'react-bootstrap'
import { MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';


const axios = require('axios');

const Admin = (props) => {
  const [info, setInfo] = useState(null);
  const [cCats, setCCats] = useState({id: 0, name: ""});
  const [csCats, setCsCats] = useState({id: 0, name: ""});
  const [currentArticle, setCurrentArticle] = useState(null);
  const [listeArticles, setListeArticles] = useState(null);
  const [article, setArticle] = useState(null);
  const [articleEdition, setArticleEdition] = useState(false);
  const [email, setEmail] = useState(null);

  const hideModal = (article) => {
    setBasicModal(!basicModal);
    !currentArticle ? setCurrentArticle(article) : setCurrentArticle(null)
  }


  const showModal = (article) => {
    setBasicModal(!basicModal);
    currentArticle !== article && setCurrentArticle(article)
  }

  const showModalEdition = (article) => {
    setBasicModal(!basicModal);
    setArticleEdition(true)
  }


  const hideModalEdition = (article) => {
    setBasicModal(!basicModal);
    setArticleEdition(false)
  }

function suppArticle(id) {
  const token = reactLocalStorage.get('token');

  const data = {id: id, token: token}

      axios.post('http://127.0.0.1:8000/api/articles/delete', data,{
        headers: {"Content-Type": "application/json"}
      })
      .then(async res => await(
        hideModal()
      ))
      .catch(function (error) {
        console.log(error);
        alert("Une erreur est survenu")
      })

}


function showArticle(id) {
      axios.get(`http://localhost:8000/api/article/${id}`).then(res => setArticle(res.data.article)).catch(err => console.log(err));
}
function showArticles(id) {

axios.get(`http://localhost:8000/api/articles/${id}`).then(res => setListeArticles(res.data)).catch(err => console.log(err));

  }
  useEffect(() => {
    axios.get("http://localhost:8000/api/categories/read", {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async res => await(setInfo(res.data))).catch(err => {
      return (err)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps

    var token = reactLocalStorage.get('token');
    console.log(token);

    axios.post("http://localhost:8000/api/user", {
      token: token
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      setEmail(res.data.email)
    }).catch(err => {
      return (err)
    });
    // console.log("INFO");
  }, [cCats, csCats, listeArticles, article, articleEdition])

  const [basicModal, setBasicModal] = useState(false);


  const {register, handleSubmit, reset} = useForm();
    const token = reactLocalStorage.get("token")
    const onSubmit = (data) => {
      console.log(data);
      if (data.type === "update") {
        // alert("Mise a jour des info")
        console.log("MISE A JOUR DES INFO");
        const articles = {
          "email": email,
          "token": token,
          "nomProduit": data.nomProduit ? data.nomProduit : article[0].p_nomProduit ,
          "description": data.description ? data.description : article[0].p_description,
          "quantite": data.quantite ? data.quantite : article[0].p_quantite,
          "caracteristique": {
            "key": "car",
            "key2": "car2",
            "key3": "car3"
          },
          "prixUnitaireHt": data.prixUnitaireHt ? data.prixUnitaireHt : article[0].p_prixUnitaireHt,
          "prixUnitaireTtc": data.prixUnitaireTtc ? data.prixUnitaireTtc : article[0].p_prixUnitaireTtc,
          "poids": data.poids ? data.poids : article[0].p_poids,
          "dimension": data.dimension ? data.dimension : article[0].p_dimension,
          "idSousCat": csCats.id,
          "id": data.id
        }

      const forUrl = {url: data.url, idArticle: data.id, token: token, nom: "img43"}
      axios.put('http://127.0.0.1:8000/api/articles/update', articles,{
        headers: {"Content-Type": "application/json"}
      })
      .then(res => {
        // setCurrentArticle(currentArticle)
        // csCats={csCats}
        // console.log(article);
        // showArticle(article[0].p_id)

      axios.post('http://127.0.0.1:8000/api/PhotoArt/add', forUrl,{
        headers: {"Content-Type": "application/json"}
      })
      .then(res => {
        // hideModal()

        console.log("PHOTO CHANGER");


        hideModal()

        showArticles(data.id);

        setListeArticles(articles)
        // showArticles(data.id);

        // setListeArticles(articles)
        // setCurrentArticle(currentArticle)
        // csCats={csCats}
        // console.log(article);
        // showArticle(article[0].p_id)
      })
      .catch(function (error) {
        console.log(error);
        alert("Une erreur est survenu")
      })


      })
      .catch(function (error) {
        console.log(error);
        alert("Une erreur est survenu")
      })



      } else if(data.type === "add") {
        const art = {
          "token": token,
          "nomProduit": data.nomProduit ,
          "description": data.description,
          "quantite": data.quantite,
          "caracteristique": {
            "key": "car",
            "key2": "car2",
            "key3": "car3"
          },
          "prixUnitaireHt": data.prixUnitaireHt,
          "prixUnitaireTtc": data.prixUnitaireTtc,
          "poids": data.poids,
          "dimension": data.dimension,
          "idSousCat": csCats.id,
        }

        /*{
            "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4iLCJyb2xlcyI6IltcIlJPTEVfQURNSU5cIl0iLCJleHAiOjE2MzA3ODQ0NDF9.DLR96kB70BKPpNo0o7XUGBL0d1hMGTjoVTXy9__PPdAVti2CdXyagAzBMMMUjPa12sUe2hJpptU2psopQHWQmg",
             "nom" : "img42",
             "url": "https://www.lenovo.com/medias/lenovo-laptop-workstation-thinkpad-p15v-15-subseries-gallery-4.jpg?context=bWFzdGVyfHJvb3R8NTE0NDR8aW1hZ2UvanBnfGhkNC9oMDIvMTEwMDU0MTEzMjgwMzAuanBnfDA0YTRkY2IzMGM0MTM1YTdhMjIwMzUzMzg0YTBiYTI1MzE2OWQ3MDhmYzk2ZTRhZjA2ZDNlZjJmYzA2NTY4MDc",
            "idArticle": 7
        }*/



      const forUrl = {url: data.url, idArticle: data.id, token: token, nom: "img43"}

      axios.post('http://127.0.0.1:8000/api/articles/add', art,{
        headers: {"Content-Type": "application/json"}
      })
      .then(res => {


              axios.post('http://127.0.0.1:8000/api/PhotoArt/add', forUrl,{
        headers: {"Content-Type": "application/json"}
      })
      .then(res => {
        // hideModal()

                hideModal()

        showArticles(data.id);
        console.log("PHOTO CHANGER");


        // hideModal()

        // showArticles(data.id);

        // setListeArticles(articles)
        // showArticles(data.id);

        // setListeArticles(articles)
        // setCurrentArticle(currentArticle)
        // csCats={csCats}
        // console.log(article);
        // showArticle(article[0].p_id)
      })
      .catch(function (error) {
        console.log(error);
        alert("Une erreur est survenu")
      })

        // setListeArticles(articles)
        // setCurrentArticle(currentArticle)
        // csCats={csCats}
        // console.log(article);
        // showArticle(article[0].p_id)
      })
      .catch(function (error) {
        console.log(error);
        alert("Une erreur est survenu")
      })


        /* {
"nomProduit" : "dxbian",
"description" : "distribution",
"quantite" : 1,
"caracteristique": {"key" : "car", "key2" : "car2", "key3" : "car3"},
"prixUnitaireHt" : 500,
"prixUnitaireTtc" : 600,
"poids" : 2,
"dimension": "150x12090",
"idSousCat" : 2,
"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbiIsInJvbGVzIjoiW1wiUk9MRV9BRE1JTlwiXSIsImV4cCI6MTYyOTkwNTk1NX0.5Mhl8mrRljQh1ifexpNN3KojBN0-dXzwZZZdoLKzYBjSqghzytO-j0IfMzvxCKg7PyHM7k-hVcwU9zqkn8V9bw"
} */


// console.log(data);

        // alert("Ajout")
        // console.log("AJOUT");
      }
    };


  return (<Row className='profil'>
    <h3 className="text-white text-center bandeau p-2 m-2 rounded">Gestion des Articles</h3>
    <Col md='4'>
      <Card style={{
          width: '18rem'
        }}>
        <Card.Body>
          <Card.Title>Catégories</Card.Title>

          <Categorie setListeArticles={setListeArticles} setCCats={setCCats} cCats={cCats} info={info} setInfo={setInfo}/>



        </Card.Body>
      </Card>

    </Col>
    <Col md='4'>
      <Card style={{
          width: '18rem'
        }}>
        <Card.Body>
          <Card.Title>Sous-catégorie</Card.Title>
          <SousCategories showArticles={showArticles} setCsCats={setCsCats} setCCats={setCCats} csCats={csCats} cCats={cCats} info={info} setListeArticles={setListeArticles} listeArticles={listeArticles}/>

        </Card.Body>
      </Card>

    </Col>
    <Col md='4'>
      <Card style={{
          width: '18rem'
        }}>
        <Card.Body>
          <>


          <MDBModal show={basicModal} getOpenState={(e: any) => setBasicModal(e)} tabIndex='-1'>
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>{currentArticle ? currentArticle : ''}</MDBModalTitle>
                  <MDBBtn className='btn-close' color='none' onClick={() => hideModal()}></MDBBtn>
                </MDBModalHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                <MDBModalBody>
                  {console.log(articleEdition)}
                  {articleEdition ?
                    <div className="adminForm">

                      <label htmlFor="nomProduit">Nom du produit</label>
                      <input onClick={() => reset({ nomProduit: "" }) } {...register('nomProduit')} id="nomProduit" placeholder="Nom du produit" autoComplete="off"/>

                      <label htmlFor="description">Description</label>
                      <textarea {...register('description')} id="description" placeholder="Description"/>

                      <label htmlFor="quantite">Quantité</label>
                      <input {...register('quantite')} id="quantite" placeholder="Quantité" autoComplete="off"/>

                      <label htmlFor="prixUnitaireHt">Prix Hunitaire (€)</label>
                      <input {...register('prixUnitaireHt')} id="prixUnitaireHt" placeholder="Prix Hunitaire HT" autoComplete="off"/>

                      <label htmlFor="prixTTC">Prix TTC (€)</label>
                      <input {...register('prixUnitaireTtc')} id="prixTTC" placeholder="Prix Hunitaire TTC" autoComplete="off"/>

                      <label htmlFor="poids">Poids (g)</label>
                      <input {...register('poids')} id="poids" placeholder="Poids" autoComplete="off"/>

                      <label htmlFor="dimension">Dimension</label>
                      <input {...register('dimension')} id="dimension" placeholder="Dimension" autoComplete="off"/>

                      <label htmlFor="url">URL photo</label>
                      <input {...register('url')} id="url" placeholder={article[0].s_url} autoComplete="off"/>
                      <input {...register('id')} type="hidden" defaultValue={article[0].p_id} autoComplete="off"/>

                      <input {...register('type')} type="hidden" defaultValue="add" autoComplete="off"/>



                  </div>:
                  article ?
                  <>
                  {article[0].s_url ? <img src={article[0].s_url} alt="Lights" style={{width:"45%"}}/> : <em>Aucune photo</em>}

                  <div className="adminForm">
                    <label htmlFor="nomProduit">Nom du produit</label>
                    <input onClick={() => reset({ nomProduit: "" }) } {...register('nomProduit')} id="nomProduit" placeholder={article[0].p_nomProduit} autoComplete="off"/>

                    <label htmlFor="description">Description</label>
                    <textarea {...register('description')} id="description" placeholder={article[0].p_description}/>

                    <label htmlFor="quantite">Quantité</label>
                    <input {...register('quantite')} id="quantite" placeholder={article[0].p_quantite} autoComplete="off"/>

                    <label htmlFor="prixUnitaireHt">Prix Hunitaire (€)</label>
                    <input {...register('prixUnitaireHt')} id="prixUnitaireHt" placeholder={`${article[0].p_prixUnitaireHt}`} autoComplete="off"/>

                    <label htmlFor="prixTTC">Prix TTC (€)</label>
                    <input {...register('prixUnitaireTtc')} id="prixTTC" placeholder={`${article[0].p_prixUnitaireTtc}`} autoComplete="off"/>

                    <label htmlFor="poids">Poids (g)</label>
                    <input {...register('poids')} id="poids" placeholder={article[0].p_poids} autoComplete="off"/>

                    <label htmlFor="dimension">Dimension</label>
                    <input {...register('dimension')} id="dimension" placeholder={article[0].p_dimension} autoComplete="off"/>

                    <input {...register('id')} type="hidden" defaultValue={article[0].p_id} autoComplete="off"/>
                    <label htmlFor="url">URL photo</label>
                    <input {...register('url')} id="url" placeholder={article[0].s_url} autoComplete="off"/>

                    <input {...register('type')} type="hidden" defaultValue="update" autoComplete="off"/>

                  </div>
                  </>
                  : ''

                }

                    {/*
{      "email" : "admin@admin",
      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbiIsInJvbGVzIjoiW1wiUk9MRV9BRE1JTlwiXSIsImV4cCI6MTYyOTkwNDA0MH0.nNolb_-_bGyalDWzpcsVVCEIeCzTzbC4IFdNBU3o11vB25qHIKVhlkk_PLAFwQ2sYc99iT6CuRHqMmumsA9XFg",
       "nomProduit" : "dxbian",
      "description" : "distribution",
      "quantite" : 1,
      "caracteristique": {"key" : "car", "key2" : "car2", "key3" : "car3"},
      "prixUnitaireHt" : 500,
      "prixUnitaireTtc" : 600,
      "poids" : 2,
      "dimension": "150x12090",
      "idSousCat" : 3,
      "id": 8
} */}



                </MDBModalBody>

                <MDBModalFooter>

                  {articleEdition ?
                  <Button color='secondary' onClick={() => hideModalEdition()}>Annuler</Button>
                    :
                    <>
                  <Button color='secondary' onClick={() => (hideModal(), setArticleEdition(false))}>Annuler</Button>
                  <Button onClick={() => (suppArticle(article[0].p_id),hideModalEdition())} className="btn-danger">Supprimer</Button>
                </>}

                  <MDBBtn>Sauvegarder</MDBBtn>
                </MDBModalFooter>
              </form>

              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </>
          <Card.Title>Articles</Card.Title>

          {
            listeArticles ?
            <>
            {
            listeArticles.articles.length === 0 ? <>
            </> :
              listeArticles.articles.map((e, k) => (

            <div key={k} className="btn btn-primary btn-block card text-center" onClick={() => (showModal(e.p_nomProduit,e.s_url), showArticle(e.p_id))}>

              <div className="caption">
                {e.p_nomProduit}
              </div>
          </div>
        ))}

            <Button onClick={() => (showModalEdition("Ajouter un article", "url", "", "", "new"))} style={{fontSize: "1.4em", fontWeight: "bold"}}>+</Button>

</> : ''}
        </Card.Body>
      </Card>

    </Col>
  </Row>)
}
export default Admin;
