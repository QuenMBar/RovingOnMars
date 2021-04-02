import React, { Component, Fragment } from "react";
import ImgCard from "./ImgCard";
import PropType from "prop-types";

/**
 * ImgCardContain is a container class for the Img Cards.  It displays them as a 4 wide grid that is also stackable for
 * mobile view.  It also handles the states for all the cards since they are just functional components.
 * @augments {Component<Props, State>}
 */
export default class ImgCardContain extends Component {
    static propTypes = {
        /** Array of image data to display.  Should be formatted how nasa formats their images. */
        images: PropType.arrayOf(
            PropType.shape({
                id: PropType.number.isRequired,
                earth_date: PropType.string.isRequired,
                img_src: PropType.string.isRequired,
                sol: PropType.number.isRequired,
                rover: PropType.shape({ name: PropType.string.isRequired }),
                camera: PropType.shape({ full_name: PropType.string.isRequired }),
            }).isRequired
        ).isRequired,
        /** If the object should have its default css boarder around it */
        boarder: PropType.bool,
        /** A callback for the home page to update the favorites */
        grabFavorites: PropType.func,
    };

    static defaultProps = {
        boarder: true,
    };

    state = {
        currentFavs: [],
    };

    /**
     * Posts the photo to he favorites list and appends it to the favorites list in state
     * @param {object} img
     */
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

    /**
     * Removes the img from the database and removes it from the state.  Also calls grabFavorites if one is provided
     * @param {object} img
     */
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
                if (this.props.grabFavorites !== undefined) {
                    this.props.grabFavorites();
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    // When the component mounts, grab the favorite photos
    componentDidMount() {
        fetch("http://localhost:3000/photos")
            .then((res) => res.json())
            .then((currentFavs) => {
                this.setState({ currentFavs });
            });
    }

    render() {
        let divClass = this.props.boarder ? "ui four stackable cards imgContain" : "ui four stackable cards";
        return (
            <div className={divClass}>
                {/* Map through all the images putting them on ImgCards and adding if they're a favorite or not */}
                {this.props.images.map((image) => {
                    return (
                        <Fragment key={image.id}>
                            {this.state.currentFavs.find((photo) => photo.id === image.id) ? (
                                <ImgCard handleCard={this.removeCard} data={image} isFav={true} />
                            ) : (
                                <ImgCard handleCard={this.likeCard} data={image} isFav={false} />
                            )}
                        </Fragment>
                    );
                })}
            </div>
        );
    }
}
