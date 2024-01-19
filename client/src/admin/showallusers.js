import React, { Component} from 'react';
// import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import UpdateIcon from '@material-ui/icons/Update';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import axios from 'axios';
//boite de dialogue de confirmation
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import './showallusers';


function DeleteUser(id,props){
      console.log(id);
      axios.delete('http://localhost:5000/user?id='+id)
        .then((result) => {
         window.location.reload()
        });
    }
const divStyle =  {
    display:"contents"
}


 const submit = (props) => {
    confirmAlert({
      title: '',
      message: 'Voulez-vous vraiment supprimer ce projet? ',
      buttons: [
        {
          label: 'confirmer',
          onClick:  ()=>DeleteUser(props.todo._id,props)
        },
        {
          label: 'annuler',
          onClick: () => {}
        }
      ]
    });
  };


const Todo = props => (

    
    <div style={divStyle} >
    
        <tr>
            <td>{props.todo._id.slice(0,5)}</td>
        <td>{props.todo.first_name}</td>
        <td>{props.todo.last_name}</td>
        <td>{props.todo.email}</td>
        <td>{props.todo.role}</td>
        <td>{props.todo.cin}</td>
        <td>{props.todo.phone}</td>
        <td>
            {/* <Link to={"users/edit/"+props.todo._id}>Edit</Link> */}
            {/* <button className="button muted-button" className="btn btn-success"><Link to={"users/edit/"+props.todo._id}>Edit</Link></button> */}
            <a href={"/allusers/edit/"+props.todo._id} className="btn btn-primary btn-info" role="button" aria-pressed="true"  ><UpdateIcon /></a>
             <button
             class="btn btn-primary btn-danger"
             onClick={()=>submit(props)}
              aria-pressed="true" >
                  <DeleteForeverIcon fill={"red"} />
              </button>
        </td>
    </tr>
    </div>
);


export default class UserList extends Component {
    constructor(props) {
        super(props);
        // initialize the state with an empty todos array
        this.state = {todos: [],
                    search:''    
        };
        
    }

    //for searching event in page
    updateSearch(event){
        this.setState({search:event.target.value.substr(0,20)});
    }

    // To retrieve the todos data from the database --> use the componentDidMount lifecycle method
    componentDidMount() {
        //to get data from mongo link
        axios.get('http://localhost:5000/users/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
            
        
       
    }
    

   

    render() {

        let filteredusers=this.state.todos.filter(
            (user)=>{
                return (user.first_name.indexOf(this.state.search)!==-1||
                        user.last_name.indexOf(this.state.search)!==-1||
                        user.email.indexOf(this.state.search)!==-1);
            }
        );
        return (
           
            <div  >
                        
               
               <div style={{padding:"20px", alignItems: "center", display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
               
               <Button style={{width:"250px",textTransform:"lowercase",boxShadow: "12px 5px 12px gray"}}  href="/users/create" variant="outlined" color="primary">
               <AddCircleOutlineIcon /> {''}Ajouter un utilisateur
      </Button>
                <h2>Gérer les utilisateures</h2>
                <input type="text" placeholder="rechercher ..." class="form-control input-sm" style={{marginTop:"15px",width:"250px"}} value={this.state.search} onChange={this.updateSearch.bind(this)}/>
               </div>
      
               <div style={{display:"flex",justifyContent:"center"}} >
                    <table 
                       
                       ref={el => this.el = el}
                        data-order='[[ 1, "asc" ]]'
                        data-page-length='25'
                       
                    >
                     <thead>
                            <tr>
                                <th>ID</th>
                             <th>Prenom</th>
                             <th>Nom</th>
                             <th>Email</th>
                             <th>Type du compte</th>
                             <th>CIN</th>
                             <th>Numéro_téléphone</th>

                             <th>Action a faire </th>
                         </tr>
                     </thead>
                     <tbody>
                       
                         {/* displaying data coming  */}
                     {filteredusers.map(function(currentTodo, i){
           
                    return <Todo todo={currentTodo} key={i} />;})}
                     </tbody>
                 </table>
                 
               </div>
 
            </div>
        )
    }
}