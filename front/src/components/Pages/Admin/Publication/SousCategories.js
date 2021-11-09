import {Button, InputGroup} from 'react-bootstrap'
import {reactLocalStorage} from 'reactjs-localstorage';
import {useForm} from 'react-hook-form';
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

const SousCategories = ({
  setListeArticles,
  listeArticles,
  showArticles,
  setCsCats,
  setCCats,
  csCats,
  cCats,
  info
}) => {
  const [basicModal, setBasicModal] = useState(false);
  const [modalContent, setModalContent] = useState({title: "",id: 0});

  const hideModal = (article) => {
  setBasicModal(!basicModal);
}


const showModal = (idCat, id, name) => {
  setBasicModal(!basicModal);
  setModalContent({idCat: idCat, id: id,name: name})
}

useEffect(() => {
  },[modalContent])

  const token = reactLocalStorage.get('token');
  const {register, handleSubmit, reset} = useForm();
  const onSubmit = (data) => {
    // alert("submited")
    console.log(data);

console.log(data.nom);
if (data.nom === "" && data.rename) {
  // alert("update")
  const update = {
   "id":modalContent.id,
   "idCat": cCats.id,
   "nom": data.rename,
   "token": token
 }
  axios.put("http://127.0.0.1:8000/api/SousCat/update", update, {
    headers: {
      "Content-Type": "application/json"
    }
  }).then(async res => await(showArticles(cCats.id), setListeArticles(listeArticles), hideModal())).catch(err => {
    return (err)
  });
  console.log(update);


  console.log(data);
} else {

 const SousCateg = {
   "id_cat": cCats.id,
   "nom": data.nom,
   "token": token
 }

    axios.post("http://127.0.0.1:8000/api/SousCat/insert", SousCateg, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async res => await(showArticles(cCats.id), setListeArticles(listeArticles))).catch(err => {
      return (err)
    });
}

/**
 * ADD
 * @type {[type]}
 */
/*
    */
    // alert("onsubmiT")
    // alert(data.nom)
    // console.log("Hey");

/**
 * UPDATE
 * @type {[type]}
 */




  }

  function updateSousCat() {
    const token = reactLocalStorage.get('token');
  }

  function addSousCat() {}

  function suppSousCat(id) {
    alert("Are you sure ?"+id)

    var token = reactLocalStorage.get('token');
      // alert(cCats.id)
      // alert(token)
      const c =
      {
        "idSousCat": csCats.id,
        "token": token
      }

            axios.post('http://127.0.0.1:8000/api/SousCat/delete', c,{
              headers: {"Content-Type": "application/json"}
            })
            .then((res) => {
              alert("OUUIIIII")
              // setCCats(cCats)
              console.log(res);
              showArticles(cCats.id);
              setListeArticles(listeArticles)
              // hideModal()
            }).catch(err => {
              console.log(err);
              alert("Une erreur est survenu")
            });


  }
const active = "active";
const notactive = "";

  useEffect(() => {

}, [cCats, csCats])

  return (
    cCats.id
    ? <div>
      {
        info[cCats.id - 1]
          ? <div>
            {(info[cCats.id - 1].sousCats.map((e, k) => (<InputGroup.Text key={k} onClick={() => {
              setCsCats({id: e.id, name: e.nom});
              showArticles(e.id);
            }} className={`d-flex justify-content-between ${csCats && csCats.name === e.nom ? active : notactive}`}>

            {/* {csCats && console.log(csCats.nom)} */}
            {csCats && console.log(csCats)}
            {e.nom && console.log(e.nom)}
            {e.nom}

            <div>
              <Button variant="primary btn-danger" onClick={() => (setCsCats(csCats.id), suppSousCat(csCats.id))}>
                <svg xmlns="https://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
              </Button>

              <Button variant="primary btn-warning" onClick={() => (showModal(csCats.id, e.id,e.nom))}>
                <svg xmlns="https://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                </svg>
              </Button>
            </div>

          </InputGroup.Text>)))}

          <>


          <MDBModal show={basicModal} getOpenState={(e: any) => setBasicModal(e)} tabIndex='-1'>
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>{modalContent.name}</MDBModalTitle>
                  <MDBBtn className='btn-close' color='none' onClick={() => hideModal()}></MDBBtn>
                </MDBModalHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                <MDBModalBody>
                  <div className="adminForm">
                    <label htmlFor="nomSousCateg">Renommer la sous-catégorie</label>
                    <input {...register('rename')} id="nomSousCateg" placeholder={modalContent.name} autoComplete="off"/>
                  </div>

                </MDBModalBody>

                <MDBModalFooter>
                  <Button color='secondary' onClick={() => hideModal()}>
                    Annuler
                  </Button>
                  <MDBBtn>Sauvegarder</MDBBtn>
                </MDBModalFooter>
              </form>

              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </>










          <form onSubmit = {handleSubmit(onSubmit)} >
            <div className="adminForm">
              <label htmlFor="nomSousCategorie">Ajouter une sous-catégorie</label>
              <input {...register('nom')}  id="nomSousCategorie" placeholder={modalContent.nom} autoComplete="off"/>
              <Button type="submit">ajouter</Button>
            </div>
          </form>

        </div>
          : <> <form onSubmit = {
            handleSubmit(onSubmit)
          } > <div className="adminForm">
              <label htmlFor="nomSousCategories">Ajouter une sous-catégorie</label>
              <input {...register('a')} id="nomSousCategories" placeholder="Nom" autoComplete="off"/>
              <Button type="submit">ajouter</Button>
            </div>
          </form>
        </>
      }
    </div>
    : '')
}

export default SousCategories;
