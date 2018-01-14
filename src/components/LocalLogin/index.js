import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { LinkContainer } from "react-router-bootstrap";

import Logo from "../Logo";
import TagLine from "../TagLine";

class LocalLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loggedIn: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const target = e.target,
      value = target.value,
      name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    fetch("/api/login", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        name: "",
        local: {
          email: this.state.email,
          password: this.state.password
        },
        tokens: {},
        fb: {
          fbId: "",
          displayName: ""
        }
      })
    })
      .then(response => response.json())
      .then(value => {
        if (value.message === "ok") {
          this.setState({
            loggedIn: true
          });
        }
        localStorage.setItem("localToken", value.token);
        localStorage.setItem("email", value.email);
        localStorage.setItem("userId", value.userId);
        localStorage.setItem("displayName", value.name);
        localStorage.setItem("picture", "/user.svg");
      })
      .then(() => {
        console.log("loggedIn", this.state.loggedIn);
        this.state.loggedIn
          ? window.location.replace("/profile")
          : window.location.replace("/");
      });
  }
  render() {
    const styles = {
      errorStyle: {
        color: "#F94548"
      },
      underlineStyle: {
        borderColor: "#F94548"
      },
      floatingLabelStyle: {
        color: "#F94548"
      },
      floatingLabelFocusStyle: {
        color: "#F94548"
      }
    };

    return (
      <div style= {{width: "100vw", backgroundColor:"black"}}>
        <img className="background" src={"/cinema-room.jpg"}/>
        <div className="mwmLogo">
          <img
            src= {"/ticket-v5.svg"}
            style={{position: "relative", top: "13vh", left:"23%",height: "50%", width: "50%", transform:"rotate(-45deg)"}}
          />
          <img
            src= {"/ticket-v6.svg"}
            style={{position: "relative", top: "18vh", left:"-23%", height: "50%", width: "50%"}}
          />
        </div>
        <div className="tagLine">
          <TagLine style={{ fontFamily: "Roboto"}} />
        </div>
        <h3>Login Below!</h3>

        <div className="formContainer" style={{position: "relative", top: "34vh"}}>
          <TextField
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleInputChange}
            hintText="Enter your email"
            hintStyle={{color: "white"}}
            underlineFocusStyle={styles.underlineStyle}
            inputStyle={{color: "white"}}
          />

          <br />
          <TextField
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            hintText="Enter your password"
            hintStyle={{color: "white"}}
            underlineFocusStyle={styles.underlineStyle}
            inputStyle={{color: "white"}}
          />
          <br />
          <RaisedButton label="Login" onClick={this.handleSubmit}
            style={{
              color: "white",
              margin: "10px auto",
              marginBottom: "10px",
              width: "68vw"}}
              backgroundColor="white"
              labelColor="#e03c3c"
            />
        </div>
      </div>
    );
  }
}

export default LocalLogin;
