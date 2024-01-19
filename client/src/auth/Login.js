import React, { Component } from "react";
import "./style.css";
import EmailIcon from '@material-ui/icons/Email';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import IconButton from "@material-ui/core/IconButton";

import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      role: "" ,
      showPassword:false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

   handleClickShowPassword ()  {
    this.setState({showPassword:!this.state.showPassword})
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(newUser);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.state.role=nextProps.auth.users.role;
      if(nextProps.auth.users.role == 'admin'){
        this.props.history.push("/dashboard");
      }
      else if (nextProps.auth.users.role == 'secretary'){
        this.props.history.push("/secretary_home");
      } else {
        this.props.history.push("/employee_home");
      }
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      console.log(nextProps.errors)
      if (nextProps.errors.email) {
        toast.error("veuillez vérifier votre adresse email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      } else if (nextProps.errors.password) {
        toast.error("Veuillez vérifier votre mot de passe", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      }
         
    }    
  }

  render() {
    const { errors } = this.state;
     
    return (
                  <div className="App">
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

<ToastContainer />
        <form style={{ "max-width": " 552px" }} className="form" onSubmit={this.onSubmit}>
          <h2>
            connecter vous
          </h2>
           
          <div className="input-group">
            <label htmlFor="email"><EmailIcon />Email</label>
            <input value={this.state.email}
                onChange={this.onChange} class='validate' type='email' name='email' id='email' />
          </div>
          <div className="input-group" >
            <label htmlFor="password"><LockOpenIcon  />mot de passe </label>
            <input value={this.state.password}
                onChange={this.onChange} class='validate'  type={this.state.showPassword ? "text" : "password"} name='password' id='password' />
                 <a
              onClick={()=>this.handleClickShowPassword()}
              
            >
              {this.state.showPassword ? <React.Fragment> Masquer le mot de passe <Visibility /> </React.Fragment>  : <React.Fragment> Afficher le mot de passe <VisibilityOff /></React.Fragment> }
            </a>
          </div>
          <button type="submit" className="primary">se connecter</button>
        </form>
        
      </div>



                          
           
      );
  }
}

//map properties to proptypes
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
 
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);