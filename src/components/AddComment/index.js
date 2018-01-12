import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {Col, Row} from "react-bootstrap";

const styles = {
  underlineStyle: {
    borderColor: "#F94548"
  }
}

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  };

  render() {
    return (
      <div style={{position: "fixed", width: "100%", bottom:0, paddingBottom: "2%"}} >
        <div style={{position:"fixed", display: "inline", left:"3%", bottom: "1%", width: "78%"}}>
        <TextField
          name="comment"
          onChange={this.props.handleChange}
          style={{ width: "100%", height: "7vh", padding: 0 }}
          hintText="Add a comment"
          type="text"
          fullWidth={true}
          value={this.props.comment}
          underlineStyle={styles.underlineStyle}
          underlineFocusStyle={styles.underlineStyle}
        />
      </div>
      <div style={{position:"relative", display: "inline", left: "40%"}} >
        <FloatingActionButton
        backgroundColor={"#F94548"}
        labelColor={"white"}
        buttonStyle={{paddingRight: "1%"}}
        label="send"
        onClick={this.props.addAComment}>
        <img className="sendIcon" style={{position:"relative", left: "-2px", height: "40%", width: "45%", margin: "0 auto"}} src={"/send-msg.svg"}/>
      </FloatingActionButton>
    </div>
  </div>
    )
  }
}

export default AddComment;
