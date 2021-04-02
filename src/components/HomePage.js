import React, { Component } from "react";
import ImgCardContain from "./ImgCardContain";
import ImageOfTheDay from "./ImageOfTheDay";
import { Grid } from "semantic-ui-react";
import SpaceNotif from "./SpaceNotif";
import PlanetBar from "./PlanetBar";
import PropType from "prop-types";

/**
 * Home page for our app.  This page contains the image of the day, along with a bar showing how close
 * all notable objects are to earth, and the notifications for space in a given week.
 * @augments {Component<Props, State>}
 */
export default class HomePage extends Component {
    static propTypes = {
        /** The key used to access nasa apis */
        apiKey: PropType.string.isRequired,
    };

    // Setting up the states for the app
    apiKey = this.props.apiKey;
    state = {
        favorites: [],
        imageOfTheDay: "",
    };

    // When the components load, make our api calls
    componentDidMount() {
        this.grabFavorites();
        this.grabImageOfTheDay();
    }

    // Get locally stored favorite photos
    grabFavorites = () => {
        fetch("http://localhost:3000/photos")
            .then((res) => res.json())
            .then((favorites) => this.setState({ favorites }));
    };

    // Get the Image Of the Day from nasa
    grabImageOfTheDay = () => {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=${this.apiKey}&thumbs=true`)
            // fetch(`https://api.nasa.gov/planetary/apod?date=2021-03-30&api_key=${this.apiKey}`)
            .then((res) => res.json())
            .then((imageOfTheDay) => this.setState({ imageOfTheDay }));
    };

    render() {
        return (
            <Grid columns={2} divided stackable>
                <Grid.Column width="4">
                    <SpaceNotif apiKey={this.apiKey} />
                </Grid.Column>
                <Grid.Column width="12" as="div">
                    <h2 className="overlay">Image of the Day</h2>
                    <ImageOfTheDay grabPhoto={this.grabPhoto} imageOfTheDay={this.state.imageOfTheDay} />
                    <div className="overlay bottomDiv">
                        <PlanetBar apiKey={this.apiKey} />
                        <div className="ui homeMain overlay">
                            <h2>Favorite Images</h2>
                            <ImgCardContain
                                boarder={false}
                                images={this.state.favorites}
                                grabFavorites={this.grabFavorites}
                            />
                        </div>
                    </div>
                </Grid.Column>
            </Grid>
        );
    }
}
