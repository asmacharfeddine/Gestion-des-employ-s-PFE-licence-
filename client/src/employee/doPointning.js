import React from 'react'
import { useState, useEffect  } from "react";
import {useSelector} from 'react-redux'
import axios from 'axios'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import './doPointning.scss'
  import 'react-toastify/dist/ReactToastify.css';
  import TimerIcon from '@material-ui/icons/Timer';
  import CreateIcon from '@material-ui/icons/Create';
  import DescriptionIcon from '@material-ui/icons/Description';
const DoPointning = (props) => {
    const user = useSelector(state=>state.users)
    const [PreviousPointning,setPreviousPointning] = useState([])
    const [Project_Id,setId] = useState(0)
    const [Project_Name,setProject_Name] = useState('')
    const [Employee_Fname,setEmployee_Fname] = useState('')
    const [Employee_Lname,setEmployee_Lname] = useState('')
    const [Employee_Id , setEmployee_id] = useState(null)
    const [DoneHours,setDoneHours] = useState(0)
    const [Hours, setHours] = useState(0)
    const [Description, setDescription] = useState('')
    const [Projects,setProjects] = useState([])
    const[ProjectHours,setProjectHours] = useState(0)
    const [Max,setMax] = useState(0)



   
const onSubmit = (e) => {
    e.preventDefault()
    const object = {
      
        Project_Id: Project_Id,
        Employee_Id : Employee_Id,
        Project_Name: Project_Name,
        Employee_Fname :  Employee_Fname ,
        Employee_Lname :  Employee_Lname ,
        Hours: Hours,
        Description: Description
        }
        axios.post('http://localhost:5000/pointning/add',object)


axios.put('http://localhost:5000/project?id='+Project_Id ,{estimatedTime : ProjectHours-Hours})
.then(result=>{
  window.location.reload()

})
.catch(err=>{
  alert(err)
})


      }
//njibou fil utilisateur min auth ila jey mil state w il state fih : ... w il auth fih ...
const {  users } = props.auth; // desctructing objects in javascript 

     useEffect (() =>{
       axios.get('http://localhost:5000/verify_pointning?id='+users.id)
       .then(result=>{
        setPreviousPointning(result.data)
        let done_hours = 0 
         result.data.map((item)=>{
            done_hours = done_hours+item.Hours
            
       })
      //done_hours= nombre d'heures pointées ce jour la 
      
      setDoneHours(done_hours)
      setMax(10-done_hours)
/*   logique des alerts                */
if (DoneHours < 10 ) {
  toast.error(`Il vous reste ${10-done_hours} heures à pointer aujourd'hui`, {
   position: "top-right",
   autoClose: 5000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
 });;
 }

    })
      
        
         //fil front il valeur ta3 id ta3 user 7otilha users.id sig
         //il use effect mchet jabet il id 
        
        
         

         
         
        setEmployee_id(users.id)
        setEmployee_Fname(users.first_name)
        setEmployee_Lname(users.last_name)
        //le resultat va revenir en json alors que j'ai besoin de data seulement donc resultat.data pour prendre 
        //juste les infos dans data et ignorer les autres informations
        //useEffect mchet jabit les données w 3abet il tableau bihom bch mba3ed njm nal9a source de données ila houwa tableau
        //afficher (get de la base de données) seulement les projets dont le nbre d'heures restants à travailler > 0
        axios.get('http://localhost:5000/projects')
        .then (result=>setProjects(result.data.filter(item=>item.estimatedTime>0)))
    },[])



    return(
     
      DoneHours !== 10 ? 
      


<div> <h1 className="h3 mb-3 font-weight-bold" style={{textDecoration:"underline"}}>Pointer</h1>


      <div className="pointning_container" >    
        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
{/* Same as */}
<ToastContainer />    

        
        
        
        <form onSubmit={(e)=>onSubmit(e)}>
       
         

          <div >
            <label className="label_pointning" > <SubtitlesIcon style={{ color: "#1E90FF" }}/>Nom du projet </label> {user}
            <select className="form-control" onChange={(e)=>{
                                
                setProject_Name(e.target.value) 
                //jquery line 
                setId(e.target[e.target.selectedIndex].getAttribute('elementid')) ; 
                setProjectHours(e.target[e.target.selectedIndex].getAttribute('elementhours'))    

                
                }} >
                  <option disabled selected >choisir un projet</option>
               {Projects.map((element)=>{
                   //elementid attribut zedtou 7atit fih id ila yetasna3 automatiquement fil base de données 
                   return <option elementhours={element.estimatedTime}   elementid={element._id} value={element.titre} >{element.titre}</option>
               })}
            </select>
            <br/>
            <br/>
            <label > <TimerIcon style={{ color: "#1E90FF" }} />il vous reste {ProjectHours} heures dans ce projet</label>
            <br/>
            <label className="label_pointning" > <CreateIcon style={{ color: "#1E90FF" }}/>Nombre d'heures </label>
            <input type="number"
            max={Max}
                        className="form-control"
                        name="type" value={Hours} onChange={e=>setHours(e.target.value)} type="Number" placeholder="Taper le nombre d'heures"></input>
           
            </div>
            <div>
            <label className="label_pointning" > <DescriptionIcon style={{ color: "#1E90FF" }}/> Description</label>
             <br/>
            <input  type="text"
            style={{height:"95px"}}
                        className="form-control"
                        name="type" value={Description} onChange={e=>setDescription(e.target.value)} type="text" placeholder="Decrire la tache"></input>
           <br/>
            <button className="glow-on-hover" type="submit">Valider</button>
            </div>
           
           
            
           
        </form>
        

{/* --------------------------------             */ }

        
        
        </div></div>:


        <div>
         <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
{/* Same as */}
<ToastContainer />

Vous avez accompli les heures à pointer aujourd'hui,
vous ne pouvez plus pointer.


        </div>
      

    
    )
}


DoPointning.propTypes = {
   
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { }
  )(DoPointning);