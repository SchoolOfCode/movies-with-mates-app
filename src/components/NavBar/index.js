import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationItem
} from "material-ui/BottomNavigation";
import FontIcon from "material-ui/FontIcon";
import Paper from "material-ui/Paper";

import "./NavBar.css";

const NavBar = (props) => {

    return (
      <Paper
        zDepth={1}
        style={{
          width: "100vw",
          position: "fixed",
          bottom: 0
        }}
      >
        <BottomNavigation>
          <NavLink to="/movies" activeClassName="active">
            <BottomNavigationItem
              label="Find"
              icon={<FontIcon className="fa fa-search" />}
            />
          </NavLink>
          <NavLink to="/activity" activeClassName="active">
            <BottomNavigationItem
              label="Activity"
              icon={<FontIcon className="fa fa-comments-o" />}
            />
          </NavLink>
          <NavLink to="/going" activeClassName="active">
            <BottomNavigationItem
              label="Going"
              icon={<FontIcon className="fa fa-check-circle-o" />}
            />
          </NavLink>
          <NavLink to="/profile" activeClassName="active">
            <BottomNavigationItem
              label="Profile"
              icon={<FontIcon className="fa fa-user" />}
            />
          </NavLink>
        </BottomNavigation>
      </Paper>
    );
  }

export default NavBar;
