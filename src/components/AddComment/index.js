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
      <Col xs={12} style={{position: "fixed", width: "100%", bottom:0, paddingBottom: "2%"}} >
        <Col xs={10} style={{padding: 0}}>
        <TextField
          name="comment"
          onChange={this.props.handleChange}
          style={{ width: "100%", height: "7vh", padding: 0 }}
          hintText="Add a comment"
          type="text"
          value={this.props.comment}
          underlineStyle={styles.underlineStyle}
          underlineFocusStyle={styles.underlineStyle}
        />
      </Col>
      <Col xs={2} style={{padding: 0}} >
        <FloatingActionButton
        backgroundColor={"#F94548"}
        labelColor={"white"}
        // fullWidth="true"
        buttonStyle={{paddingRight: "1%"}}
        label="send"
        onClick={this.props.addAComment}>
        <img style={{height: "40%", width: "45%"}} src={"/play-arrow-white.svg"}/>
      </FloatingActionButton>
      </Col>
      </Col>
    )
  }
}

export default AddComment;
