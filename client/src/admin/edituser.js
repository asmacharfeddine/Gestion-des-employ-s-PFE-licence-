import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Navbar from "../components/NavBar";

import axios from 'axios';
import {useState, useEffect} from 'react'

//props bech il component ila 9ablou injm i3adilou il id
const EditUser = (props) =>{

  const Roles = [
    { value: 'user', label: 'Employée' },
    { value: 'secretary', label: 'secretaire' }
    
  ]
  const [first_name,setFirst_name] = useState('')
  const [last_name,setLast_name] = useState('')

  const [email,setEmail] = useState('')

  const [password,setPassword] = useState('')

  const [role,setRole] = useState('')
  const [phone,setPhone] = useState(0)

  const [cin,setCin] = useState('')
  const [Users,setUsers] = useState([])



  
  const onSubmit = (e) => {
    e.preventDefault();
  
    const object = { 
      //tous simplement c'est une fct javaScript qui permet le traitement suivant : les anciennes valeures prennent les nouvelles valeures
      //les attributs ecrit dans la base de données recoivent les nouvelles valeurs
      //ils doivent etre ecrit comme ds le modele de la base de données
      cin: cin,
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password, 
      phone: phone,
      role: role 
    }
    axios.put("http://localhost:5000/user?id="+ props.match.params.id, object)
    .then(result => {
      window.location.assign("/allusers/")
    })
    .catch(err=>{
      console.log(err)
    })
  }
  
    useEffect (() =>{
      console.log(props)
    //get element by id from backend+ getting the id it self(props.match.params.id=id it self)
    //haw lena il id t3ada bil props
     axios.get('http://localhost:5000/user?id='+props.match.params.id)
     //the result will contain the data , the historique and many other informations so we just call the data 
     //because we only need the data 
      .then(result=>{
        setCin(result.data.cin)
        setFirst_name(result.data.first_name)
        setLast_name(result.data.last_name)
        setPassword(result.data.password)
        setPhone(result.data.phone)
        setRole(result.data.role)
      })
      .catch((error) => {
        console.log(error);
      });
    },[props.match.params.id])


  

  return(
  <div>
  <Navbar/>
<div class="container">
  <div class="panel panel-default">
    <div class="panel-heading">
      <br/>
      <h3 class="panel-title">
        Mettre à jour un utilisateur
      </h3>
    </div>
    <div class="panel-body">
     
      <br/>
      <form onSubmit={(e)=>onSubmit(e)}>
        <div class="form-group">
          <label for="First Name">Prénom:</label>
          <input type="text" class="form-control" name="first_name" value={first_name} onChange={(e)=>setFirst_name(e.target.value)} placeholder="first name" />
        </div>
        <div class="form-group">
          <label for="First Name">Nom:</label>
          <input type="text" class="form-control" name="last_name" value={last_name} onChange={(e)=>setLast_name(e.target.value)} placeholder="first name" />
        </div>
        {/* <div class="form-group">
          <label for="Last Name">nom:</label>
          <input type="text" class="form-control" name="last_name" value={last_name} onChange={(e)=>setFirst_name(e.target.value)} placeholder="last name" />
        </div> */}
        <div class="form-group">
          <label for="Email">Email:</label>
          <input type="text" class="form-control" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email" />
        </div>
        <div class="form-group">
          <label for="Password">Mot de passe:</label>
          <input type="password" class="form-control" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password" />
          {/* <div class="form-group">
          <label for="role">role:</label>
          <input type="text" class="form-control" name="role" value={role} onChange={(e)=>setRole(e.target.value)} placeholder="role" />
        </div> */}
        <div class="form-group">
          <label for="phone">Numéro de téléphone:</label>
          <input type="Number" class="form-control" name="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="phone" />
        </div>
        <div class="form-group">
          <label for="cin">CIN:</label>
          <input type="Number" class="form-control" name="cin" value={cin} onChange={(e)=>setCin(e.target.value)} placeholder="cin" />
        </div>
        </div>
        <div>
        <label>Rôle</label>
        <select 
                    className="form-control" name="role">
                        {Roles.map((item, index) => {
                                return    <option value={item.value}>{item.label}</option>
                    })}
                      
                        
                    </select>
                    
                    </div>
       
        <br/>
        <button type="submit" class="btn btn-dark">Mettre à jour</button> &nbsp;
       </form>
    </div>
  </div>
</div>
</div>
)}

export default EditUser 




    
