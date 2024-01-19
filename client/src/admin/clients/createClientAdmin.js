//création d'un utilisateur 
import React, { Component, useEffect } from 'react';
import {useState} from 'react'
import axios from 'axios'  

//useState bch najem nlem fi objet les variables ila ida5alhom utilisateur  fil front w nab3athhom lil back 
const CreateClientAdmin = () => {
    
  
    const [cin,setCin] = useState('')
    const [fName,setFName] = useState('')
    const [lName, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState(0)
    const [project,setProject] = useState('')
    const [projects,setProjects] = useState([])
     
    


useEffect(()=>{
    axios.get('http://localhost:5000/projects')
    .then(result=>{
        setProjects(result.data)
    })
},[])


    /** Method to handle the submit event of the form **/
   const onSubmit = (e) => {
        e.preventDefault(); //ensure that the default HTML form submit behaviour is prevented

        const newTodo = {
           
            cin:cin,
            fName: fName,
            lName: lName,
            email: email ,
            phone : phone,
            project:project
            
        };

        axios.post('http://localhost:5000/client/add', newTodo)
        .then((result) => {
           window.location.assign("/show_clients_admin/")
        })
       .catch(err=>console.log(err))

        // Reset the Values.
       setCin(0)
       setFName('')
       setLName('')
       setEmail('')
       setPhone(0)
       setProject('')
      
    }
    
        return(
             
        
      
<div>

                <div className="container1">
                     <h1 className="h3 mb-3 font-weight-bold" style={{textDecoration:"underline"}}>ajouter un Client </h1>
    <div className="row">
                        <div className="col-md-6 mt-5 mx-auto">
                            
            <form onSubmit={onSubmit} >
                
               
                <div className="form-group">
                   
                                    <label>CIN : </label>
                                    <br />

                                    <input
                                        type="number"
                                        class="form-control"
                                        name="Type"
                                        value={cin}
                                        onChange={(e)=>setCin(e.target.value)}
                                        placeholder="Type "
                                    />
                                    <label>Prenom: </label>
                                    <br />

                                    <input
                                        type="text"
                                        class="form-control"
                                        name="Marque"
                                        value={fName}
                                        onChange={(e)=>setFName(e.target.value)}
                                        placeholder="Prenom "
                                    />

                                    <label>Nom: </label>
                                    <br />

                                    <input
                                        type="text"
                                        class="form-control"
                                        name="model"
                                        value={lName}
                                        onChange={(e)=>setLName(e.target.value)}
                                        placeholder="Nom "
                                    />
                                    <label>Email : </label>
                                    <br />

                                    <input
                                        type="text"
                                        class="form-control"
                                        name="Etat"
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                        placeholder="address Email"
                                    />

<label>Numéro de téléphone : </label>
                                    <br />

                                    <input
                                        type="number"
                                        class="form-control"
                                        name="Etat"
                                        value={phone}
                                        onChange={(e)=>setPhone(e.target.value)}
                                        placeholder="Numero telephonique"
                                    />

<label>Projet : </label>
                                    <br />

                                   <select onChange={(e)=>setProject(e.target.value)}>
                                            <option disabled selected >veuillez choisir un projet</option>
                                            {projects.map(item=>{
                                                return <option value={item._id} >{item.titre}</option>
                                            })}
                                   </select>
                           
                            

                </div>
                
                <br/>
                 <input type="submit" value="Ajouter un client " className="btn btn-lg btn-info btn-info btn-block" />
            </form>
        </div>
    </div>
    </div>
</div>
        )
    
}


export default CreateClientAdmin