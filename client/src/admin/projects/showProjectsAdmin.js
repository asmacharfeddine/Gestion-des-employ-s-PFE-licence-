import React, { Component } from "react";
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
//boite de dialogue de confirmation
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Pdf from "react-to-pdf";

export default class ShowProjectAdmin extends Component {
  constructor(props) {
    super(props);

    /** Setting the initial state of the component by assigned an object to this.state **/
    this.state = {
      todos: [],
      search: ""
    };
  }

  //delete client
   DeleteProject(id,props){
      console.log(id);
      axios.delete('http://localhost:5000/project?id='+id)
        .then((result) => {
         window.location.reload()
        });
    }
  //for searching event in page
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }




  submit = (props) => {
    confirmAlert({
      title: '',
      message: 'Voulez-vous vraiment supprimer ce projet? ',
      buttons: [
        {
          label: 'confirmer',
          onClick:  ()=>this.DeleteProject(props.todo._id,props)
        },
        {
          label: 'annuler',
          onClick: () => {}
        }
      ]
    });
  };


  componentDidMount() {
    //to get data from mongo link
    axios
      .get("http://localhost:5000/projects/")
      .then(response => {
        this.setState({ todos: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  delete(id) {
    console.log(id);
    axios
      .delete("http://localhost:5000/project?id=" + id)
      .then(result => {
        
        toast.success("Deleted successfully");
      })
      .catch(err => {
        // then print response status
        toast.error("Project not deleted");
      });
    setTimeout(
      function() {
        //Start the timer
        window.location.reload(); //After 1 second, set render to true
      }.bind(this),
      1300
    );
  }

    render() {
      const ref = React.createRef();
    const divStyle = {
        display: "contents"
        
    };
    // var message='You selected '+this.state.whoIsChecked.allowDestroyAll
    const Todo = props => (
      <div style={divStyle}>
            <tr>
                 <td>{props.todo._id.slice(0,5)}</td>
          <td>{props.todo.titre}</td>
          
          <td>{props.todo.numero}</td>
                <td>{props.todo.nb_tache} taches</td>
                <td>{props.todo.estimatedTime} heures</td>
                
                 
                <td>
                    





            <a
              href={"/ShowProjectList/edit/" + props.todo._id}
              class="btn btn-primary btn-info"
              role="button"
              aria-pressed="true"
            >
             <UpdateIcon /> 
            </a>
            <br/>
          
            <button
              class="btn btn-primary btn-danger"
              onClick={()=>this.submit(props)}
              aria-pressed="true"
            >
               <DeleteForeverIcon fill={"red"} />
            </button>
            
          </td>
        </tr>
      </div>
    );
    //used in filtering the content coming from database mongo
    let filteredprojects = this.state.todos.filter(project=> {
      return project.titre.indexOf(this.state.search) !== -1;
    });
    return (
      <div  >
      
       <div style={{padding:"20px", alignItems: "center", display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
       <Button style={{width:"200px",textTransform:"lowercase",boxShadow: "12px 5px 12px gray"}}  href="/createProjectAdmin" variant="outlined" color="primary">
               <AddCircleOutlineIcon /> {''}Ajouter un projet
      </Button>
                
          <br />
          <h2
            
          >
                    Gestion des projets 
          </h2>
                <Pdf targetRef={ref} filename="rapport_du_stock.pdf">
                    {({ toPdf }) => <button
                        class="btn btn-primary btn-primary"
                        onClick={toPdf}>Exporter en PDF</button>}
      </Pdf> 
          <input
            type="text"
            placeholder="Chercher..."
            class="form-control input-sm"
            style={{ width: "250px" }}
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />
        </div>

        <div ref={ref} style={{display:"flex",justifyContent:"center"}} >
          <table
           
            id="usertable"
           
            ref={el => (this.el = el)}
            data-order='[[ 1, "asc" ]]'
            data-page-length="25"
          >
            <thead>
                        <tr >
                <th>Id </th>
                <th>Titre  </th>
                <th>Numéro    </th>
                <th>Nombre de tâches    </th>
                <th>Durée estimée   </th>
               <th>Action à faire</th>
              </tr>
            </thead>
            <ToastContainer />
            <tbody>
              {/* displaying clients data coming  */}
              {filteredprojects.map(function(project, i) {
                return <Todo todo={project} key={i} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
