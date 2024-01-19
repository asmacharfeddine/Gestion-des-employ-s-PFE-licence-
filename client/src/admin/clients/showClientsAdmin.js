// component qui contient suppression d'un client qui appartient à gestion des clients
import React, { Component } from "react";
import axios from 'axios'
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Pdf from "react-to-pdf";
import UpdateIcon from '@material-ui/icons/Update';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
//boite de dialogue de confirmation
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default class showClientsAdmin extends Component {
  constructor(props) {
    super(props);

    /** Setting the initial state of the component by assigned an object to this.state **/
    this.state = {
      todos: [],
      projects:[],
      search: ""
    };
  }

  //delete client
   DeleteClient(id,props){
      console.log(id);
      axios.delete('http://localhost:5000/client?id='+id)
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
      message: 'Voulez-vous vraiment supprimer ce client? ',
      buttons: [
        {
          label: 'confirmer',
          onClick:  ()=>this.DeleteClient(props.todo._id,props)
        },
        {
          label: 'annuler',
          onClick: () => {}
        }
      ]
    });
  };
  componentDidMount() {
    //

    axios.get('http://localhost:5000/projects')  
    .then(result=>{
      this.setState({
        projects : result.data
      })
    })


    //to get data from mongo link
    axios
      .get("http://localhost:5000/clients/")
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
      .delete("http://localhost:5000/client?id=" + id)
      .then(result => {
        
        
      })
      .catch(err => {
        // then print response status
       
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
          <td>{props.todo.cin}</td>
          
          <td>{props.todo.fName}</td>
                <td>{props.todo.lName}</td>
                <td>{props.todo.email}</td>
                <td>{props.todo.phone}</td>
                <td> {
                this.state.projects.filter(item=> {
                  return item._id === props.todo.project}).map(item=>{
                    return <p>{item.titre}</p>
                  })
             
               
               }
               </td>
                <td>
                    





            <a
              href={"/edit_client_admin/edit/" + props.todo._id}
              class="btn btn-primary btn-info"
              role="button"
              aria-pressed="true"
            >
            <UpdateIcon />
            </a>
            
          
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
    let filteredclients = this.state.todos.filter(item=> {
      return item.lName.indexOf(this.state.search) !== -1;
    });
    return (
      <div  >
       
     
         <div style={{padding:"20px", alignItems: "center", display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
        
         <Button style={{width:"200px",textTransform:"lowercase",boxShadow: "12px 5px 12px gray"}}  href="/create_client_admin/" variant="outlined" color="primary">
               <AddCircleOutlineIcon /> {''}Ajouter un client
      </Button>
                
          <br />
          <h2
           
          >
                    Gestion des clients   
          </h2>
          {/* button inclut dans la fct de convertion de pdf */}
                <Pdf targetRef={ref} filename="list_client.pdf">
                    {({ toPdf }) => <button
                        class="btn btn-primary btn-primary"
                        onClick={toPdf}>exporter en Pdf</button>}
      </Pdf> 
          <input
            type="text"
            placeholder="chercher..."
            class="form-control input-sm"
            style={{ width: "250px" }}
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />
        </div>
{/* j'ai donnée le ref que j'ai créer à ce div */}
        <div ref={ref} style={{display:"flex",justifyContent:"center"}}  >
          <table
           
            id="usertable"
            style={{ marginTop: 20 , textAlign:"left"}}
            ref={el => (this.el = el)}
            data-order='[[ 1, "asc" ]]'
            data-page-length="25"
          >
            <thead>
                        <tr >
                <th>Id </th>
                <th>Cin </th>
                <th>Nom </th>
                <th>Prénom </th>
                <th>Email </th>
                <th>Numéro de téléphone </th>
                <th>projet</th>
                <th>action a faire</th>
              </tr>
            </thead>
                        <tbody>
              {/* displaying clients data coming  */}
              {filteredclients.map(function(item, i) {
                return <Todo todo={item} key={i} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
