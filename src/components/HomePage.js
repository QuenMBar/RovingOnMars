import React, { Component } from "react";
import ImgCardContain from "./ImgCardContain";
import ImageOfTheDay from "./ImageOfTheDay";
import { Grid } from "semantic-ui-react";
import SpaceNotif from "./SpaceNotif";

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
            .then((res) => res.json())
            .then((imageOfTheDay) => this.setState({ imageOfTheDay }));
    };

    render() {
        return (
            <Grid columns={2} divided stackable>
                <Grid.Column width="4">
                    <SpaceNotif apiKey={this.apiKey} />
                </Grid.Column>
                <Grid.Column width="12">
                    <div className="mainContain">
                        <div className="ui headerContain">
                            <h2>Image of the Day</h2>
                            <ImageOfTheDay imageOfTheDay={this.state.imageOfTheDay} />
                        </div>
                        <div className="ui container homeMain">
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
