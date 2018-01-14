import React from "react";
import TextField from "material-ui/TextField";
import FloatingActionButton from 'material-ui/FloatingActionButton';

const styles = {
  underlineStyle: {
    borderColor: "#F94548"
  }
}

const AddComment = (props) => (
      <div style={{position: "fixed", width: "100%", bottom:0, paddingBottom: "2%"}} >
        <div style={{position:"fixed", display: "inline", left:"3%", bottom: "1%", width: "78%"}}>
        <TextField
          name="comment"
          onChange={props.handleChange}
          style={{ width: "100%", height: "7vh", padding: 0 }}
          hintText="Add a comment"
          type="text"
          fullWidth={true}
          value={props.comment}
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
        onClick={props.addAComment}>
        <img className="sendIcon" style={{position:"relative", left: "-2px", height: "40%", width: "45%", margin: "0 auto"}} src={"/send-msg.svg"}/>
      </FloatingActionButton>
    </div>
  </div>
)

export default AddComment;
