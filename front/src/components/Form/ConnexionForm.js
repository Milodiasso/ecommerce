import React from 'react';
import { useForm } from 'react-hook-form';
import { reactLocalStorage } from 'reactjs-localstorage';
const axios = require('axios');

function Connexion() {
  const {
    register,
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    const inscription={
      password:data.password,
      email:data.email,
    };


    axios.post('http://127.0.0.1:8000/api/connexion', inscription,{
      headers: {"Content-Type": "application/json"}
    })
      .then(res => {
        console.log(res.data);
        if (res.data == false) {
          alert("e-mail ou mot de passe incorrect !")
        } else {
          reactLocalStorage.set('token', res.data)
          setInterval(()=>{
            window.location.reload(false);
          }, 4000)
        }
        
      })
      .catch(function (error) {
        console.log(error);
      })

    setInterval(()=>{
      localStorage.clear('token');
    }, 300000)
    
    



      // ________________pour le DECODE TOKEN______________________
    //   axios.post('http://127.0.0.1:8000/api/decode',{'token': localStorage.getItem('token')},{
    //   headers: {"Content-Type": "application/json"}
    // })
    //   .then(res => {
    //     console.log(res.data);
    //     // localStorage.setItem('token',res.data)
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: true })} placeholder="email"/>
      <input {...register('password', { required: true })} placeholder="password" type="password"  autoComplete="off"/>
      <input type="submit" value="Connexion"/>
    </form>
  );
}

export default Connexion;
