import React, { Component } from "react";

import "./index.scss";
import store from "./store";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";


import Login from "./auth/Login";
import Register from "./auth/Register";
import UserList from "./admin/showallusers";
import CreateUser from "./admin/createuser";
import EditUser from "./admin/edituser";
import ShowProjectList from "./admin/projects/showProjectsAdmin";
import CreateProjectAdmin from "./admin/projects/createProjectAdmin";
import ProjectEdit from "./admin/projects/editProjectAdmin";
import Dashboard from "./admin/Dashboard";
import Home from "./Home";
import DoPointning from "./employee/doPointning"

import { BrowserRouter, Switch, Route } from "react-router-dom";


import PrivateRoute from "./components/common/PrivateRoute";
//actions
import { setCurrentUser, logoutUser } from "./actions/authActions";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Header from "./components/Header";

import createClientAdmin from './admin/clients/createClientAdmin'
import showClientsAdmin from "./admin/clients/showClientsAdmin";
import editClientAdmin from "./admin/clients/editClientAdmin";
import EmployeeHome from "./employee/Home";
import SideBar from "./components/NavBar";
import SecretaryHome from "./secretary/secretary_home";
import AdminDashboard from "./AdminDashboard/adminDashboard";

//profile stuff


//check for token  to avoid state destroy on reload
if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and export default
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isauthenticated
  //we can call any action using below method
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());

    //Redirect to login
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
       
        <BrowserRouter basename={"/"}>
         
          <div id="main">
            <Header />
            
                <SideBar  />
             
           
            <Switch>
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/`}
              component={Home}
            />


<Route
              exact
              path={`${process.env.PUBLIC_URL}/admin_dashboard`}
              component={AdminDashboard}
            />

  
            
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/secretary_home`}
              component={SecretaryHome}
            />
            
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/login`}
              component={Login}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/register`}
              component={Register}
            />
             <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/allusers`}
              component={UserList}
            /> 
            
          
             <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/users/create`}
              component={CreateUser}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/allusers/edit/:id`}
              component={EditUser}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/dashboard`}
              component={Dashboard}
            />
            
             
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/showprojectlist`}
              component={ShowProjectList}
            />
            
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/ShowProjectList/edit/:id`}
              component={ProjectEdit}
              />
              
              <Route exact path={`${process.env.PUBLIC_URL}/employee_home`}  component={EmployeeHome}         />

               <Route
              exact
              path={`${process.env.PUBLIC_URL}/edit_client_admin/edit/:id`}
              component={editClientAdmin}
            />
            <Route
              exact
              path='/CreateProjectAdmin'
              component={CreateProjectAdmin}
            />
            
           <Route
              exact
              path={`${process.env.PUBLIC_URL}/create_client_admin`}
              component={createClientAdmin}
            />
         
            
             <Route
              exact
              path={`${process.env.PUBLIC_URL}/show_clients_admin`}
              component={showClientsAdmin}
            />
             <Route
              exact
              path={`${process.env.PUBLIC_URL}/dopointning`}
              component={DoPointning}
            />
            
            
            
            
          </Switch>
          </div>
          
        </BrowserRouter>
        <Footer/>
      </Provider>
    );
  }
}
export default App
