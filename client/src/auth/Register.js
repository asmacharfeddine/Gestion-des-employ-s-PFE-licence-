import React, { Component } from "react";
import "./style.css";
import axios from "axios";
import classnames from "classnames";
import NavBar from '../components/NavBar';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name:"",
      last_name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      role:  this.props.match.params.role
    };

    // console.log(newUser);

    axios
      .post("http://localhost:5000/users/register", newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
      this.props.history.push("/login/"+this.props.match.params.role)
    //call registerUser action and pass user data in argument
   // this.props.registerUser(newUser, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <NavBar/>
      <div className="auth-wrapper">
        <div className="auth-content container">
          <div className="card">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="card-body">
                  <div className="logoHead">
                    <img
                      src="/assets/img/logo/logonew.png"
                      alt=""
                      height="60px"
                      width="60px"
                      className="sticky-logo img-fluid"
                    />
                    <h3>E-learning</h3>
                  </div>
                  <h4 className="mb-3 f-w-400">se connecter a votre compte</h4>
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="feather icon-user" />
                        </span>
                      </div>
                      <input
                        type="text"
                        name="first_name"
                        className={classnames("form-control", {
                          "is-invalid": errors.first_name
                        })}
                        placeholder="Nom"
                        value={this.state.first_name}
                        onChange={this.onChange}
                      />
                      {errors.first_name && (
                        <div className="invalid-feedback">{errors.first_name}</div>
                      )}
                    </div>
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="feather icon-user" />
                        </span>
                      </div>
                      <input
                        type="text"
                        name="last_name"
                        className={classnames("form-control", {
                          "is-invalid": errors.last_name
                        })}
                        placeholder="Prenom"
                        value={this.state.last_name}
                        onChange={this.onChange}
                      />
                      {errors.last_name && (
                        <div className="invalid-feedback">{errors.last_name}</div>
                      )}
                    </div>
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="feather icon-mail" />
                        </span>
                      </div>
                      <input
                        type="email"
                        name="email"
                        className={classnames("form-control", {
                          "is-invalid": errors.email
                        })}
                        placeholder=" address Email "
                        value={this.state.email}
                        onChange={this.onChange}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="feather icon-lock" />
                        </span>
                      </div>
                      <input
                        type="password"
                        name="password"
                        className={classnames("form-control", {
                          "is-invalid": errors.password
                        })}
                        placeholder="Mot de passe"
                        value={this.state.password}
                        onChange={this.onChange}
                      />
                      {errors.password && (
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      )}
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="feather icon-lock" />
                        </span>
                      </div>
                      <input
                        type="password"
                        name="password2"
                        className={classnames("form-control", {
                          "is-invalid": errors.password2
                        })}
                        placeholder="Confirmer mot de passe"
                        value={this.state.password2}
                        onChange={this.onChange}
                      />
                      {errors.password2 && (
                        <div className="invalid-feedback">
                          {errors.password2}
                        </div>
                      )}
                    </div>
                   
                    <div className="form-group text-left mt-2" />
                    <input
                      type="submit"
                      value="Creer un compte"
                      className="btn btn-primary shadow-2 mb-4"
                    />
                  </form>

                  <p className="mb-2">
                   Deja un membre?{" "}
                    <a
                      href={`${process.env.PUBLIC_URL}/login`}
                      className="f-w-400"
                    >
                      se connecter
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-md-6 d-none d-md-block">
                <img
                  src="../assets/img/register.png"
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

//access state from any Component
//state.auth is comming from root reducer
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
  //so we can access data from this state like this.props.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
