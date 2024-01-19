import React from 'react'
import ReactDOM from 'react-dom'
import { useEffect, useState } from 'react';
import axios from "axios";

const EditClientAdmin = (props) => {
const [fName,setFName]= useState('')
const [lName,setlName]= useState('')
const [cin,setCin]= useState('')
const [email,setEmail]= useState('')
const [phone,setPhone]= useState('')
    
   
    
useEffect(() => {
        axios
            .get("http://localhost:5000/client?id=" + props.match.params.id)
            .then(result => {
               setCin(result.data.cin)
               setFName(result.data.fName)
               setlName(result.data.lName)
               setEmail(result.data.email)
               setPhone(result.data.phone)
            })
            .catch( (error) => {
                console.log(error);
            });
         }, [props.match.params.id])


    
    
        
        const onSubmit = (e) => {
        e.preventDefault();
      
            const Todo = {
                cin : cin , 
                fName : fName , 
                lName : lName , 
                email : email , 
                phone : phone
            }

        axios
            .put("http://localhost:5000/client?id=" + props.match.params.id, Todo)
            .then(result => {
                window.location.assign("/show_clients_admin/")
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
                                    style={{ textDecoration: "underline",width:"544px"}}
                                >
                                    Modifier un client
                </h1>
                                <br />

                                <div>

                                <label>CIN: </label>
                                    <br />

                                    <input
                                        type="number"
                                        class="form-control"
                                        value={cin}
                                        onChange={(e)=>setCin(e.target.value)}
                                        placeholder="CIN "
                                    />
                                   
                                    <label>Nom : </label>
                                    <br />

                                    <input
                                        type="text"
                                        class="form-control"
                                        value={fName}
                                        onChange={(e)=>setFName(e.target.value)}
                                        placeholder="Nom "
                                    />

                                     <label>Prénom  : </label>
                                    <br />

                                    <input
                                        type="text"
                                        class="form-control"
                                       
                                        value={lName}
                                        onChange={(e)=>setlName(e.target.value)}
                                        placeholder="Prenom  "
                                    />

                                   
                                    <label>Email : </label>
                                    <br />

                                    <input
                                        type="text"
                                        class="form-control"
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                        placeholder="E-mail"
                                    />

                                    <label>Numéro de téléphone : </label>
                                    <br />

                                    <input
                                        type="number"
                                        class="form-control"
                                       
                                        value={phone}
                                        onChange={(e)=>setPhone(e.target.value)}
                                        placeholder="Numero tél."
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


export default EditClientAdmin