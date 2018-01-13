import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import Logo from "../Logo";
import TagLine from "../TagLine";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: ""
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
    fetch("/api/register", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
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
        console.log(value);
        localStorage.setItem("email", this.state.email);
        localStorage.setItem("displayName", this.state.name);
        localStorage.setItem("picture", "/user.svg");
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
        <h3>Sign up below!</h3>

        <div className="formContainer" style={{position: "relative", top: "31vh"}}>
        <TextField
          name="name"
          type="text"
          value={this.state.name}
          onChange={this.handleInputChange}
          hintText="Enter your name"
          underlineFocusStyle={styles.underlineStyle}
          hintStyle={{color: "white"}}
          inputStyle={{color: "white"}}
        />
        <TextField
          name="email"
          type="email"
          value={this.state.email}
          onChange={this.handleInputChange}
          hintText="Enter your email"
          underlineFocusStyle={styles.underlineStyle}
          hintStyle={{color: "white"}}
          inputStyle={{color: "white"}}
        />

        <br />
        <TextField
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.handleInputChange}
          hintText="Enter your password"
          underlineFocusStyle={styles.underlineStyle}
          hintStyle={{color: "white"}}
          inputStyle={{color: "white"}}
        />
        <br />
        <LinkContainer to="/" style={{width: "68vw", marginTop:"1vh"}}>
          <RaisedButton label="Register" onClick={this.handleSubmit}
            style={{
              margin: "10px auto",
              marginBottom: "10px",
              }}
              backgroundColor="white"
              labelColor="#e03c3c"
            />
        </LinkContainer>
      </div>
      </div>
    );
  }
}

export default Register;
