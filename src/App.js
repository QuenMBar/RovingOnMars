import React, { Component } from "react";
import "./App.css";
import RoverPage from "./components/RoverPage";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./components/HomePage";

class App extends Component {
    roverNames = ["perseverance", "curiosity", "opportunity", "spirit"];
    apiKey = "pJdnVcrflczALUMfVkmcIHLcXidkGpEN6tEcArH8";
    render() {
        return (
            <Router>
                <div className="App">
                    <h1>Roving On Mars</h1>
                    <NavBar roverNames={this.roverNames} />
                    <Route
                        exact
                        path="/"
                        render={(routerProps) => <HomePage {...routerProps} apiKey={this.apiKey} />}
                    />
                    {this.roverNames.map((rover, i) => (
                        <Route
                            key={i}
                            path={`/${rover}`}
                            render={(routerProps) => (
                                <RoverPage {...routerProps} roverName={rover} apiKey={this.apiKey} />
                            )}
                        />
                    ))}
                </div>
            </Router>
        );
    }
}

export default App;
