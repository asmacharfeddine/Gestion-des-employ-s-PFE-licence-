import React, { Component , useState,useEffect } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';
import Select from 'react-select'

const options = [
    { value: 'employee', label: 'Employé' },
    { value: 'secretary', label: 'secretaire' }
    
  ]
const CreateUser = () => {
    const [first_name,setFirst_name] = useState('')
    const [last_name,setLast_name] = useState('')

    const [email,setEmail] = useState('')

    const [password,setPassword] = useState('')

    const [role,setRole] = useState('')
    const [phone,setPhone] = useState('')

    const [cin,setCin] = useState('')


   const onSubmit=(e)=> {
        e.preventDefault(); //ensure that the default HTML form submit behaviour is prevented

        const newTodo = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password:password,
            role: role,
            phone : phone ,
            cin : cin
        };

        axios.post('http://localhost:5000/user/', newTodo)
        .then((result) => {
            //pour revenir à l'interface de tous les utilisateurs (=hizni lil lien hedha)
            window.location.assign("/allusers/")
          });

        // Reset the Values.
        
    }
    return (

<div>
                <NavBar />
            
        <div className="container">
    <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
            <form onSubmit={onSubmit} >
                
                <h1 className="h3 mb-3 font-weight-bold" style={{textDecoration:"underline",width:"544px"}}>Ajouter un utilisateur</h1>
                <div className="form-group">
                    <label>Prenom </label>
                    <input type="text"
                        className="form-control"
                        value={first_name}
                        onChange={(e)=>setFirst_name(e.target.value)}
                        />
                </div>

                <div className="form-group">
                    <label>Nom:</label>
                    <input type="text"
                        className="form-control"
                        value={last_name}
                        onChange={(e)=>setLast_name(e.target.value)}
                        />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input type="text"
                        className="form-control"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                </div>

                <div className="form-group">
                    <label>Mot de passe:</label>
                    <input type="text"
                        className="form-control"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                </div>

               


                <div className="form-group">
                    <label>CIN:</label>
                    <input type="Number"
                        className="form-control"
                        value={cin}
                        onChange={(e)=>setCin(e.target.value)}
                        />
                </div>


                <div className="form-group">
                    <label>Numéro de téléphone:</label>
                    <input type="text"
                        className="form-control"
                        value={phone}
                        onChange={(e)=>setPhone(e.target.value)}
                        />
                </div>

                <div>
                               

                            <label>Rôle: </label>
                            <br/>
                    
                        <select  onChange={e=>setRole(e.target.value)} >
                            {options.map(item=>{
                                return <option value={item.value} >{item.label}</option>
                            })}
                            </select>                 
                            
                            </div>
                
                <br/>

                <input type="submit" value="Ajouter un utilisateur" className="btn btn-lg btn-info btn-info btn-block" />
                <br/>
               
            </form>
        </div>
    </div>
    </div>
</div>





    )
}

export default CreateUser




        
   

   
   
   