import React, { Component } from "react";
import ImgCardContain from "./ImgCardContain";
import ImageOfTheDay from "./ImageOfTheDay";
import { Grid } from "semantic-ui-react";
import SpaceNotif from "./SpaceNotif";
import PlanetBar from "./PlanetBar";

export default class HomePage extends Component {
    apiKey = this.props.apiKey;
    state = {
        favorites: [],
        imageOfTheDay: "",
    };

    componentDidMount() {
        this.grabFavorites();
        this.grabImageOfTheDay();
    }

    grabFavorites = () => {
        fetch("http://localhost:3000/photos")
            .then((res) => res.json())
            .then((favorites) => this.setState({ favorites }));
    };

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
