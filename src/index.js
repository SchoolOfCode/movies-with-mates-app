import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { BrowserRouter as Router } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

const history = createBrowserHistory();
export default history;

const App2 = (props) => (
  <MuiThemeProvider>
    <App history={props.history} />
  </MuiThemeProvider>
);

ReactDOM.render(
  <Router history={history}>
    <App2 history={history}/>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();

/**
TODO: look into cinema api
TODO: display the user activity on their profile
TODO: submit a movie needs UX work
TODO: you are not logged in page
TODO: 404 page
**/
