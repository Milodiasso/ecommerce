import {Button, InputGroup} from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { reactLocalStorage } from 'reactjs-localstorage';
import React, {useState, useEffect} from 'react';

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


const Categorie = ({setListeArticles, setCCats, cCats, info, setInfo, listeArticles, showArticles}) => {

  const [basicModal, setBasicModal] = useState(false);
  const [modalContent, setModalContent] = useState({title: "",id: 0});

  const { register, handleSubmit, reset} = useForm();

  function supp() {

  var token = reactLocalStorage.get('token');
    // alert(cCats.id)
    // alert(token)
    const c =
    {
      "id_cat": cCats.id,
      "token": token
    }

          axios.post('http://127.0.0.1:8000/api/categories/delete', c,{
            headers: {"Content-Type": "application/json"}
          })
          .then((res) => {
            alert("OUUIIIII")
            setCCats(cCats)
            hideModal()
          }).catch(err => {
            console.log(err);
            alert("Une erreur est survenu")
          });


  }

    const onSubmit = (data) => {
    const token = reactLocalStorage.get('token');
      const categorie = {
        "id_cat": cCats.id,
        "nom": data.nom,
        "base": data.base,
        "token": token
      }

      if (data.type === "normal") {
        axios.put('http://127.0.0.1:8000/api/categories/update', categorie,{
          headers: {"Content-Type": "application/json"}
        })
        .then(res => {
          // alert("ok")
          showArticles(cCats.id)
          setListeArticles(listeArticles)
          hideModal()

        })
        .catch(function (error) {
          console.log(error);
          alert("Une erreur est survenu")
        })

      }

      if (data.type === "new") {
        alert("new")


        const cat = {
          "nom": data.nom,
          "base": data.base,
          "token": token
        }

        axios.post('http://127.0.0.1:8000/api/categories/insert', cat,{
          headers: {"Content-Type": "application/json"}
        })
        .then(res => {
          hideModal()
          // window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
          alert("Une erreur est survenu")
        })
      }

      if (data.type === "remove") {
        alert(token)
        alert("remove")

      }

    // alert(data)
    };

      // alert(data)


  const hideModal = (article) => {
    setBasicModal(!basicModal);
  }


  const showModal = (data, nom, id, base, type) => {
    setBasicModal(!basicModal);
    // alert(base)
    setModalContent({title: nom, id: id, base: base, type: type})
    // alert("nom:"+nom+" id:"+id)
    // console.log(data);
    // console.log(nom);
  }

  useEffect(() => {
  },[modalContent])


  return (<div>
    {
      info && info.map((e, i) => (<InputGroup.Text key={i} onClick={() => (setListeArticles(null), setCCats({id: e.id, name: e.nom}))} className={`d-flex justify-content-between ${cCats.name === e.nom
          ? "active"
          : ""}`}>

          <Button variant="primary btn-danger" onClick={() => showModal("", "Suppression", "", "", "remove")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
          </Button>
{e.nom}
          <Button type="submit" onClick={() => showModal(e, e.nom, e.id, e.base64, "normal")}>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
</svg>
</Button>

      </InputGroup.Text>))
    }

    <>


    <MDBModal show={basicModal} getOpenState={(e: any) => setBasicModal(e)} tabIndex='-1'>
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>{modalContent ? modalContent.title : modalContent.title}</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={() => hideModal()}></MDBBtn>
          </MDBModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
          <MDBModalBody>
          {modalContent.type !== "remove" ?
            <div>
            {modalContent.base ?
            <img src={modalContent.base} alt="Lights" style={{width:"45%"}}/>
            : ''}
            <div className="adminForm">
              <label htmlFor="nomCategorie">Nom de la catégorie</label>
              <input {...register('nom')} id="nomCategorie" placeholder={modalContent.title} autoComplete="off"/>

              <label htmlFor="base">URL de l'image</label>
              <input {...register('base')} id="base" placeholder={modalContent.base} autoComplete="off"/>

              {modalContent.type === "normal" ?
              <input {...register('type')} type="hidden" defaultValue="normal" autoComplete="off"/>
              : ''}
              {modalContent.type === "new" ?
              <input {...register('type')} type="hidden" defaultValue="new" autoComplete="off"/>
              : ''}

              {modalContent.type === "remove" ?
              <input {...register('type')} type="hidden" defaultValue="remove" autoComplete="off"/>
              : ''}


              </div>
            </div>
            : <>
              <p> <img src="https://img.icons8.com/emoji/48/000000/warning-emoji.png"/> Confirmer la suppression ?  </p>
            </>}

          </MDBModalBody>

          <MDBModalFooter>
            <Button color='secondary' onClick={() => hideModal()}>
              Annuler
            </Button>
            {modalContent.type === "remove" ? <MDBBtn className="btn btn-danger" onClick={() => supp("Suppression")}>Confirmer</MDBBtn> : <MDBBtn>Sauvegarder</MDBBtn>}
          </MDBModalFooter>
        </form>

        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  </>
  <Button onClick={() => showModal("", "", "", "", "new")} style={{fontSize: "1.4em", fontWeight: "bold"}}>+</Button>

  </div>)
}

export default Categorie;
