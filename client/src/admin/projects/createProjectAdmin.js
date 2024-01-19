import React, { Component } from 'react';
import {useState} from 'react'
import axios from 'axios'  






const CreateProjectAdmin = () => {

    const [titre,setTitre] = useState('')
    const [numero,setNumero] = useState('')
    const [nb_tache, setNbTache] = useState(0)
    const [estimatedTime, setEstimatedTime] = useState(0);
    
    

 
     
    /** Method to handle the submit event of the form **/
   const onSubmit = (e) => {
        e.preventDefault(); //ensure that the default HTML form submit behaviour is prevented

        console.log(`Form submitted:`);
        
       
        const newTodo = {
           
            titre:titre,
            numero: numero ,
            nb_tache: nb_tache,
            estimatedTime: estimatedTime,
            globalTime : estimatedTime
           
            
        };

        axios.post('http://localhost:5000/project/add', newTodo)
        .then((result) => {
            //Retour automatique à la liste des projets
            window.location.assign("/showprojectlist")
        })
       .catch(err=>console.log(err))

        // Reset the Values.
       setTitre('')
       setEstimatedTime('')
       setNbTache('')
       setNumero('')
      
    }
    
        return(
             
        

<div>
{/* <NavBar /> */}
<div className="container">
    <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
            <form onSubmit={onSubmit} >
                
                <h1 className="h3 mb-3 font-weight-bold" style={{textDecoration:"underline",width:"544px"}}>Ajouter un projet  </h1>
                <div className="form-group">
                    <label>Titre du projet </label>
                    <input type="text"
                        className="form-control"
                        name="type"
                        
                        value={titre}
                            onChange={(e)=>setTitre(e.target.value)}
                                    />
                          <label>Numéro </label>          
                    <input type="text"
                        className="form-control"
                        name="marque"
                        
                        value={numero}
                            onChange={(e)=>setNumero(e.target.value)}
                                    />
                                <label>Temps estimé </label>   
                    <input type="number"
                        className="form-control"
                        name="model"
                       
                        value={estimatedTime}
                            onChange={(e)=>setEstimatedTime(e.target.value)}
                                    />
                                 <label>Nombre prévu des tâches </label>    
                    <input type="number"
                        className="form-control"
                        name="etat"
                       
                        value={nb_tache}
                            onChange={(e)=>setNbTache(e.target.value)}
                                    />
                         
                </div>
                
                <br/>
                 <input type="submit" value="Ajouter un projet" className="btn btn-lg btn-info btn-info btn-block" />
            </form>
            <br/>
        </div>
    </div>
    </div>
</div>
        )
    
}


export default CreateProjectAdmin