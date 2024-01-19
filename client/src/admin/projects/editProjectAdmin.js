import React from 'react'
import ReactDOM from 'react-dom'
import { useEffect, useState } from 'react';
import axios from "axios";

const ProjectEdit = (props) => {

    
   const [titre,setTitre] = useState('')
    const [numero,setNumero] = useState('')
    const [nb_tache, setNbTache] = useState(0)
    const [estimatedTime, setEstimatedTime] = useState(0)

useEffect(() => {
        axios
            .get("http://localhost:5000/project?id=" + props.match.params.id)
            .then(response => {
                
                setTitre(response.data.titre)
                setNumero(response.data.numero)
                setNbTache(response.data.nb_tache)
                setEstimatedTime(response.data.estimatedTime)
                
            })
            .catch( (error) => {
                console.log(error);
            });
         }, [props.match.params.id])


    
    
        
        const onSubmit = (e) => {
        e.preventDefault();
      
        axios
            .put("http://localhost:5000/project?id=" + props.match.params.id, {
                titre,
                numero,
                nb_tache,
                estimatedTime,
               
            })
            .then(result => {
                //Retour automatique à la liste des prjets
                window.location.assign("/showprojectlist/");
            })

        }
               
        return (
            <div>
        
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mt-5 mx-auto">
                            <form onSubmit={onSubmit}>
                
                                <br />
                                <br />
                                <h1
                                    className="h3 mb-3 font-weight-bold"
                                    style={{ textDecoration: "underline",width:"540px" }}
                                >
                                    Modifier le projet
                </h1>
                                <br />

                                <div>
                                    <label>Titre du projet : </label>
                                    <br />

                                    <input
                                        type="text"
                                        class="form-control"
                                        name="Type"
                                        value={titre}
                                        onChange={(e)=>setTitre(e.target.value)}
                                        placeholder="titre "
                                    />
                                    <label>Numéro: </label>
                                    <br />

                                    <input
                                        type="text"
                                        class="form-control"
                                        name="Marque"
                                        value={numero}
                                        onChange={(e)=>setNumero(e.target.value)}
                                        placeholder="Numero "
                                    />

                                    <label>Nombre des tâches: </label>
                                    <br />

                                    <input
                                        type="number"
                                        class="form-control"
                                        name="model"
                                        value={nb_tache}
                                        onChange={(e)=>setNbTache(e.target.value)}
                                        placeholder="nombre des taches "
                                    />
                                    <label>Durée estimé en heures : </label>
                                    <br />

                                    <input
                                        type="number"
                                        class="form-control"
                                        name="Etat"
                                        value={estimatedTime}
                                        onChange={(e)=>setEstimatedTime(e.target.value)}
                                        placeholder="Etat du L'item"
                                    />

                                </div>
                

                                <br />
                                <button
                                    type="submit"
                                    className="btn btn-lg btn-info btn-block"
                                >
                                    Confirmer
                </button>
                            </form>
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


export default ProjectEdit