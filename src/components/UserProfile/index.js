import React, { Component } from "react";
import SocialLoginButton from "react-social-login-buttons/lib/buttons/SocialLoginButton";
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import FindAMovieButton from "../FindAMovieButton";
import ActivityButton from "../ActivityButton";
import Logo from "../Logo";
import NavBar from "../NavBar";
import AppBar from "../AppBar";
import LoginPage from "../LoginPage";
import Return from "../ReturnHome";

const tokenChecker = require("../../tests/frontEndFunctions").tokenChecker;

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      picture: "",
      needsToLogIn: false,
      error: false
    };
    this.getFB = this.getFB.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }

  componentDidMount() {
    tokenChecker() ? this.getInfo() : this.getLogInPage();
  }

  getInfo() {
    localStorage.getItem("fbId") ? this.getFB() : this.getLocal();
  }

  getLogInPage() {
    this.setState({needsToLogIn: true})
  }

  getFB() {
    fetch("/api/fb", {
      headers: {
        fbId: localStorage.getItem("fbId")
      },
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        let fullname = data.payload.name;
        let spaceIndex = fullname.indexOf(" ");
        let name = fullname.slice(0, spaceIndex);
        let picture = localStorage.getItem("picture");
        this.setState({
          name,
          picture
        });
      })
      .catch(err => this.setState({error: true}))
  }

  getLocal() {
    fetch("/api/login", {
      headers: {
        email: localStorage.getItem("email")
      },
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        let name = data.payload.name;
        this.setState({
          name,
          picture: "/user.svg"
        });
      });
  }
  render() {
    if(this.state.needsToLogIn){
      return (<LoginPage />)
    }
    if (this.state.error) {
      return (
        <div style={{position: "fixed", backgroundColor: "white", zIndex: "1000", height: "100vh", width: "100vw"}}>
          <h2 style={{ margin: 0, fontFamily:"Ubuntu", position:"relative", top:"175px" }}>Aw, shucks.</h2>
          <h2 style={{ margin: 0, fontFamily:"Ubuntu", position:"relative", top:"175px" }}>We're experiencing some technical difficulties</h2>
          <h1 style={{ margin: 0, fontFamily:"Ubuntu", position:"relative", top:"175px", fontSize: "10em", marginTop:"10vh"}}> :( </h1>
          <Return />
        </div>
      )
    }
    return (
      <div style={{ paddingBottom: "2%" }}>
        <AppBar title="Profile" />
        <IconMenu
          style={{ zIndex: "500", left: "160px", top: "2px"}}
          iconStyle={{color: "white"}}
          menuStyle={{padding:"0px", margin:"0px"}}
           iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
           anchorOrigin={{horizontal: 'right', vertical: 'top'}}
           targetOrigin={{horizontal: 'right', vertical: 'top'}}
         >
           <MenuItem primaryText="Logout"
             onClick={() => {
               localStorage.removeItem("accessToken");
               localStorage.removeItem("fbId");
               localStorage.removeItem("localToken");
               localStorage.removeItem("email");
               localStorage.removeItem("picture");
               localStorage.removeItem("displayName");
               localStorage.removeItem("userId");
               this.props.history.push("/");
             }}
           />
       </IconMenu>
        <div style={{height: "45vh", backgroundColor: "rgb(252,252,252)"}}>
          <h1 style={{ margin: 0, paddingTop: "10%", paddingBottom: 40 }}>
            Hi, {this.state.name}!
          </h1>
          <img
            src={this.state.picture}
            style={
              this.state.picture === "/user.svg"
                ? { zoom: 0.3 }
                : { borderRadius: "50%", height: "20vh" }
            }
          />
        </div>
        <div style={{position:"relative", top: "5vh"}}>
          <SocialLoginButton style={{
            background: "#e03c3c",
            margin: "10px auto",
            marginBottom: "10px",
            width: "55vw"}}
            icon={"/plus-button-white.svg"}
            onClick={() => this.props.history.replace("/create")}/>
              <span
                style={{
                  position: "relative",
                  verticalAlign: "middle",
                  display: "inline-block",
                  top: "-46px",
                  left: "-20px",
                  fontFamily: "Ubuntu, sans-serif",
                  color: "white",
                  fontSize: "1.2em"
                }}
              >
                Post a Movie Event
              </span>
              <img
                src="/plus-button-white.svg"
                style={{
                  position: "relative",
                  display: "inline",
                  height: "3.5vh",
      						top: "-46px",
                  left: "26px"
                }}
              />
          </div>

        <NavBar history={this.props.history} match={this.props.match.url} />
      </div>
    );
  }
}

export default UserProfile;
