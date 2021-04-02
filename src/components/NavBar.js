import React from "react";
import { NavLink } from "react-router-dom";
import PropType from "prop-types";

/**
 * Functional component that handles linking all the pages together through a nav bar
 * @augments {Component<Props, State>}
 */
const NavBar = (props) => {
    return (
        <div style={{ borderBottom: "2px solid black", paddingBottom: "10px", marginBottom: "12px" }}>
            <NavLink style={{ marginRight: "10px" }} to="/">
                Home
            </NavLink>
            {props.roverNames.map((rover, i) => (
                <NavLink key={i} style={{ marginRight: "10px" }} to={`/${rover}`}>
                    {rover.charAt(0).toUpperCase() + rover.slice(1)}
                </NavLink>
            ))}
        </div>
    );
};

NavBar.propTypes = {
    /** Array of all the rover names */
    roverNames: PropType.arrayOf(PropType.string),
};

NavBar.defaultProps = {
    roverNames: ["perseverance", "curiosity", "opportunity", "spirit"],
};

export default NavBar;
