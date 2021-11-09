import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';

const Search = () => {
    const [search, setSearch] = useState('');
    const [sousCategorie, setSousCategorie] = useState([]);
    const [selectSousCat, setSelectSousCat] = useState('Tout');
    const [resultatSearch, setResultatSearch] = useState('');


    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/categories/read")
            .then(res => setSousCategorie(res.data))
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        if (search.length > 3) {
            if (selectSousCat == "Tout") {
                axios.get(`http://127.0.0.1:8000/api/search/${search}`)
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    .then((res) => (setResultatSearch(res.data)))

            } else {
                axios.get(`http://127.0.0.1:8000/api/search/${selectSousCat}/${search}`)
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    .then((res) => (setResultatSearch(res.data.article)))

            }
        }
    }, [search, selectSousCat])

    const handleChange = (e) => {
        if (e.target.value.length > 3) {
            setSearch(e.target.value)
        }
        if (e.target.value.length === 0) {
          setResultatSearch('')
        }
    }
    return (

        <div className="search">

            <input className="input" type="text" name="search" placeholder="🔎" onChange={(e) => (handleChange(e))} />
            <select name="sousCat" onChange={(e) => (setSelectSousCat(e.target.options[e.target.options.selectedIndex].value))} >
                <option value="Tout" defaultValue>Toutes les catégories</option>
                {sousCategorie && sousCategorie.map((item) => (item.sousCats.map((i, key) => (
                    <option key={key} value={i.id}>{i.nom}</option>
                ))))}
            </select>
            <div className="resultats">
                {resultatSearch &&
                    resultatSearch.map((item, key) => (
                        // console.log(item)
                        <div className="results" key={key}><a href={'/' + resultatSearch[key].id_cat_id + '/' + resultatSearch[key].id_sous_cat_id + "/" + sousCategorie[resultatSearch[key].id_cat_id - 1].nom + '/' + resultatSearch[key].nom + '/' + resultatSearch[key].id}> {item.nom_produit ?? item.p_nomProduit}</a></div>
                    ))
                }
            </div>

        </div >
    )
}

export default Search;
