import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Drawer, Divider, IconButton }     from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText }     from '@material-ui/core';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import WorkIcon from '@material-ui/icons/Work';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';

const styles = {
  sideNav: {
  marginTop: '-120px',
    zIndex: 3,
    marginLeft: '0px',
    position: 'fixed',
  },
  link: {
    textSize : "25px",
    color: 'black',
    textDecoration: 'none',
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: "5px",
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    
    top:"120px" 
  }
};



class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpened: true,
    };
  }
  
  onLogoutClick(e) {
    e.preventDefault();

    this.props.logoutUser();
    window.location.href = "/";
  }

  

  render() {
       

    const { isAuthenticated, users } = this.props.auth;
    localStorage.setItem("userid", JSON.stringify(users.id));
    localStorage.setItem("userRole", JSON.stringify(users.role));
    

    if (users.role === "admin") {
      return (
        
<div>
         <div style={styles.sideNav}>
            
          
          <Divider/>
        <Drawer
          variant="persistent"
              open={true}
              
          
            >
              <br />
              <br />
              <br />
              <br />
              
                          <Link to={`${process.env.PUBLIC_URL}/dashboard`} style={styles.link}>
            <List>
              <ListItem button key='Accueil'>
                <ListItemIcon><HomeIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary='Accueil' />
              </ListItem>
            </List>
            </Link>


            <Link to={`${process.env.PUBLIC_URL}/admin_dashboard`} style={styles.link}>
            <List>
              <ListItem button key='Visualisation '>
                <ListItemIcon><DashboardIcon color="primary"/>
                </ListItemIcon>
                <ListItemText primary='Visualisation' />
              </ListItem>
            </List>
              </Link>




            
            <Link to={`${process.env.PUBLIC_URL}/allusers`} style={styles.link}>
            <List>
              <ListItem button key='Gestion des utilisateurs'>
                <ListItemIcon><GroupIcon color="primary"/>
                </ListItemIcon>
                <ListItemText primary='Gestion des employés' />
              </ListItem>
            </List>
              </Link>
              
               <Link to={`${process.env.PUBLIC_URL}/showprojectlist`} style={styles.link}>
            <List>
              <ListItem button key='Gestion des projets '>
                <ListItemIcon><WorkIcon color="primary"/>
                </ListItemIcon>
                <ListItemText primary='Gestion des projets' />
              </ListItem>
            </List>
              </Link>          





              <Link to={`${process.env.PUBLIC_URL}/show_clients_admin`} style={styles.link}>
            <List>
              <ListItem button key='Gestion des clients '>
                <ListItemIcon><ContactMailIcon color="primary"/>
                </ListItemIcon>
                <ListItemText primary='Gestion des clients' />
              </ListItem>
            </List>
              </Link>

               <Link onClick={this.onLogoutClick.bind(this)} style={styles.link}>
            <List>
              <ListItem button key='Se déconnecter'>
                <ListItemIcon><ExitToAppIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary='Se déconnecter' />
              </ListItem>
            </List>
            </Link>   
       </Drawer>
          </div>
          </div>
      );
    }
    else if (users.role === 'employee') {
      var authLinks = (
        <div>
         <div style={styles.sideNav}>
            
          
            <Divider />
            
        <Drawer
          variant="persistent"
          open={true}
         
          >
            
            <br/>
            <br/>
            <br/><Link to={`${process.env.PUBLIC_URL}/employee_home`} style={styles.link}>
            <List>
              <ListItem button key='Accuille'>
                <ListItemIcon><AccessibilityNewIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary={`Bonjour ${users.first_name} !` } />
              </ListItem>
            </List>
            </Link>

                          <Link to={`${process.env.PUBLIC_URL}/employee_home`} style={styles.link}>
            <List>
              <ListItem button key='Accueil'>
                <ListItemIcon><HomeIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary='Accueil' />
              </ListItem>
            </List>
            </Link>
            
            <Link to={`${process.env.PUBLIC_URL}/dopointning`} style={styles.link}>
            <List>
              <ListItem button key='Effectuer un pointage'>
                <ListItemIcon><NoteAddIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary='Effectuer un pointage' />
              </ListItem>
            </List>
            </Link> 

               
              
               <Link onClick={this.onLogoutClick.bind(this)} style={styles.link}>
            <List>
              <ListItem button key='Se déconnecter'>
                <ListItemIcon><ExitToAppIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary='Se déconnecter' />
              </ListItem>
            </List>
            </Link>   
       </Drawer>
      </div>
      
         </div> 
            
          
      );
    } else {
      var authLinks = (
        <div>
         <div style={styles.sideNav}>
            
          
          <Divider/>
        <Drawer
          variant="persistent"
              open={true}
              
          
            >
              <br />
              <br />
              <br />
              <br />
              
                          <Link to={`${process.env.PUBLIC_URL}/dashboard`} style={styles.link}>
            <List>
              <ListItem button key='Accueil'>
                <ListItemIcon><HomeIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary='Accueil' />
              </ListItem>
            </List>
            </Link>
            
            <Link to={`${process.env.PUBLIC_URL}/allusers`} style={styles.link}>
            <List>
              <ListItem button key='Gestion des utilisateurs'>
                <ListItemIcon><GroupIcon color="primary"/>
                </ListItemIcon>
                <ListItemText primary='Gestion des employés' />
              </ListItem>
            </List>
              </Link>
              

              <Link to={`${process.env.PUBLIC_URL}/show_clients_admin`} style={styles.link}>
            <List>
              <ListItem button key='Gestion des clients '>
                <ListItemIcon><ContactMailIcon color="primary"/>
                </ListItemIcon>
                <ListItemText primary='Gestion des clients' />
              </ListItem>
            </List>
              </Link>

               <Link to={`${process.env.PUBLIC_URL}/showprojectlist`} style={styles.link}>
            <List>
              <ListItem button key='Gestion des projets '>
                <ListItemIcon><WorkIcon color="primary"/>
                </ListItemIcon>
                <ListItemText primary='Gestion des projets' />
              </ListItem>
            </List>
              </Link>          
                                
               <Link onClick={this.onLogoutClick.bind(this)} style={styles.link}>
            <List>
              <ListItem button key='Se déconnecter'>
                <ListItemIcon><ExitToAppIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary='Se déconnecter' />
              </ListItem>
            </List>
            </Link>   
       </Drawer>
          </div>
          </div>
      )
    }
    // sig else ?
    const guestLinks = (
     <div className={styles.root}>
        <Divider/>
        <Drawer
          variant="persistent"
          open={true}
          
            >
              <br />
              <br />
              <br />
              <br/>
                          <Link to={`${process.env.PUBLIC_URL}/login`} style={styles.link}>
            <List>
              <ListItem button key='Login'>
                <ListItemIcon><HomeIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary='Se connecter' />
              </ListItem>
            </List>
          </Link>
          </Drawer>
    </div>
    );

    return (
      <Drawer
          variant="persistent"
          open={true}
          
          >
      <div>
       

                          <a href={`${process.env.PUBLIC_URL}/`}>
                            
                          </a>

                        
                         
                            
                              {/* expression boolenne */}
                            {isAuthenticated ? authLinks : guestLinks}
                            
                         

                         
                       
                        
                     
        </div>
        </Drawer>
    );
  }
}

SideBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(SideBar);
