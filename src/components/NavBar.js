import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class NavBar extends Component {
    render() {
        return (
            <div style={{ borderBottom: "2px solid black", paddingBottom: "10px", marginBottom: "12px" }}>
                <NavLink style={{ marginRight: "10px" }} to="/">
                    Home
                </NavLink>
                {this.props.roverNames.map((rover, i) => (
                    <NavLink key={i} style={{ marginRight: "10px" }} to={`/${rover}`}>
                        {rover.charAt(0).toUpperCase() + rover.slice(1)}
                    </NavLink>
                ))}
            </div>
        );
    }
}
