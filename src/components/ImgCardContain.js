import React, { Component } from "react";
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
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    render() {
        return (
            <div className="ui four stackable cards">
                {this.props.images.map((image) => {
                    return <ImgCard likeCard={this.likeCard} data={image} />;
                })}
            </div>
        );
    }
}
