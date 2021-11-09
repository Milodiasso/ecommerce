import React from 'react';
import { useForm } from 'react-hook-form';
const axios = require('axios');

function Inscription() {
  const { register, handleSubmit, } = useForm();
  const onSubmit = (data) => {
    const inscription={
      username:data.username,
      password:data.password,
      email:data.email,
    };

    axios.post('http://127.0.0.1:8000/api/inscription',inscription,{
      headers: {"Content-Type": "application/json"}
    })
    .then(res => {
      alert('succes');
      console.log(res.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username',{ required: true })} placeholder="username"/>
      <input type="password" {...register('password', { required: true })}  placeholder="password" autoComplete="off" />
      <input {...register('email', { required: true })} placeholder="email"/>
      <input type="submit" value="Inscription"/>
    </form>
  );
}

export default Inscription;
