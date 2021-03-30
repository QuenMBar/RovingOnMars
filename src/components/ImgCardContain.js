import React, { Component, Fragment } from "react";
import ImgCard from "./ImgCard";

export default class ImgCardContain extends Component {
    likeCard = (img) => {
        fetch("http://localhost:3000/photos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(img),
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    currentFavs: [...this.state.currentFavs, data],
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    removeCard = (img) => {
        fetch(`http://localhost:3000/photos/${img.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                let ind = this.state.currentFavs.findIndex((fav) => fav.id === img.id);
                this.setState({
                    currentFavs: [...this.state.currentFavs.slice(0, ind), ...this.state.currentFavs.slice(ind + 1)],
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    state = {
        currentFavs: [],
    };

    componentDidMount() {
        fetch("http://localhost:3000/photos")
            .then((res) => res.json())
            .then((currentFavs) => {
                this.setState({ currentFavs });
            });
    }

    render() {
        return (
            <div className="ui four stackable cards">
                {this.props.images.map((image) => {
                    return (
                        <Fragment>
                            {this.state.currentFavs.find((photo) => photo.id === image.id) ? (
                                <ImgCard key={image.id} handleCard={this.removeCard} data={image} isFav={true} />
                            ) : (
                                <ImgCard key={image.id} handleCard={this.likeCard} data={image} isFav={false} />
                            )}
                        </Fragment>
                    );
                })}
            </div>
        );
    }
}
