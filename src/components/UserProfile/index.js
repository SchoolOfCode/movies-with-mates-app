import React, { Component } from "react";

import FindAMovieButton from "../FindAMovieButton";
import LogoutButton from "../LogoutButton";
import ActivityButton from "../ActivityButton";
import Logo from "../Logo";
import NavBar from "../NavBar";
import AppBar from "../AppBar";
import LoginPage from "../LoginPage";

const tokenChecker = () => {
  return localStorage.getItem("localToken") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("email")
    ? true
    : false;
};

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      picture: "",
      needsToLogIn: false
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
        console.log("data from user fetch", data);
        let fullname = data.payload.name;
        let spaceIndex = fullname.indexOf(" ");
        let name = fullname.slice(0, spaceIndex);
        let picture = localStorage.getItem("picture");
        this.setState({
          name,
          picture
        });
      })
      .catch(err => console.log(err));
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
    console.log("UP history", this.props);
    if(this.state.needsToLogIn){
      return (<LoginPage />)
    }
    return (
      <div style={{ paddingBottom: "2%" }}>
        <AppBar title="Profile" />
        <div style={{height: "55vh", backgroundColor: "rgb(252,252,252)"}}>
          <h1 style={{ margin: 0, paddingTop: 100, paddingBottom: 40 }}>
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

        <FindAMovieButton history={this.props.history} />
        <ActivityButton history={this.props.history} />
        <LogoutButton history={this.props.history} />
        <NavBar history={this.props.history} match={this.props.match.url} />
      </div>
    );
  }
}

export default UserProfile;

/**
<form onSubmit={(e) => {
  e.preventDefault();
  console.log("form event", document.getElementById("userImgUpload").value)
  this.setState({picture: document.getElementById("userImgUpload").value })

}}>
  <input type="file" id="userImgUpload" name="picture" accept="image/*" />
  <input type="submit"/>
</form>
**/
