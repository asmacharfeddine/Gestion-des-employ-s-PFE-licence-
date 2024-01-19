import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

//styles customize
import { makeStyles } from "@material-ui/core/styles";


import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Colors from '@material-ui/core/colors';
import Typography from "@material-ui/core/Typography";


import useScrollTrigger from "@material-ui/core/useScrollTrigger";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({

  toolbarMargin: {
    // palette: {
    //   textColor: Colors.darkBlack,
    //   primary1Color: Colors.white,
    //   primary2Color: Colors.indigo700,
    //   accent1Color: Colors.redA200,
    //   pickerHeaderColor: Colors.darkBlack,
    // },
    backgroundColor: "#cccccc" ,
    ...theme.mixins.toolbar,
    marginBottom: `4em`,
    [theme.breakpoints.down("md")]: {
      marginBottom: "3em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "2em",
    },
  },

  logo: {
    cursor: `pointer`,
    paddingLeft: "15px",
    [theme.breakpoints.md]: {
      paddingLeft: "5px",
    },
  },
  // tabContainer: {
  //   marginLeft: `auto`,
  // },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    margin: "20px 25px 20px 0",
    opacity: 0.6,
    "&.Mui-selected": {
      borderBottom: `2px solid #fff`,
      "&:hover": {
        opacity: 1,
      },
    },
    "&:hover": {
      opacity: 0.8,
    },
  },
  // button: {
  //   ...theme.typography.estimate,
  //   marginLeft: `50px`,
  //   marginRight: `25px`,
  //   height: `45px`,
  //   "&:hover": {
  //     backgroundColor: theme.palette.secondary.light,
  //   },
  // },
  // menu: {
  //   // backgroundColor: theme.palette.common.red,
  //   color: "white",
  //   borderRadius:0,
  // },
  // menuItem: {
  //   // ...theme.typography.tab,
  //   opacity: 0.6,
  //   "&.Mui-selected": {
  //     opacity: 1,
  //     "&:hover": {
  //       opacity: 1,
  //     },
  //   },
  //   "&:hover": {
  //     opacity: 0.8,
  //   },
  // },

  // drawerIconContainer: {
  //   marginLeft: "auto",
  //   "&:hover": {
  //     backgroundColor: "transparent",
  //   },
  // },
  // drawerIcon: {
  //   height: `50px`,
  //   width: `50px`,
  //   color: `#fff`,
  //   [theme.breakpoints.down("xs")]: {
  //     height: `40px`,
  //     width: `40px`,
  //   },
  // },
  drawer: {
    backgroundColor: theme.palette.primary.main,
  },
  drawerItemText: {
    ...theme.typography.tab,
    color: "#fff",
    opacity: "0.7",
    "&:hover": {
      opacity: "1",
    },
  },
  // drawerItemSelected: {
  //   ...theme.typography.tab,
  //   color: "#fff",
  //   opacity: "1",
  // },


  appBar: {
    //zIndex pour mettre l'appBar(=Navbar)sur le sideBar (fo9ou)
    zIndex: theme.zIndex.modal + 1,
  },
}));
const Header = ({ value, setValue, selectedIndex, setSelectedIndex }) => {
  const classes = useStyles();
  const theme = useTheme();


  let history = useHistory();

  return (
    <>
      <ElevationScroll>
        <AppBar className={classes.appBar}>
          <Toolbar

            style={{ maxWidth: "3000px", margin: "auto 0px  auto", width: "400%" , backgroundColor:"#3c8dbc" }}
          >

             <Typography
              className={classes.logo}
              onClick={() => {
                history.push("./");
                setValue(0);
              }}
              style={{ color: "#fff" }}
            >
             <img className="header-img"  alt="" src="https://img.icons8.com/emoji/452/factory-emoji.png" />
            </Typography>

           {/* why 9a3din na3mlou fi onClick */}
            <Typography
              className={classes.logo}
              onClick={() => {
                history.push("./");
                setValue(0);
              }}
              style={{ color: "#fff"}}
            >
             Gestion d'un atelier
            </Typography>

          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};
export default Header;