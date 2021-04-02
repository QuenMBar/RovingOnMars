import React, { Component } from "react";
import SortBar from "./SortBar";
import ImgCardContain from "./ImgCardContain";
import PropType from "prop-types";

/**
 * The template page for the rovers.  This page is dynamically loaded based on which rover is passed to it.  Depending on the
 * rover, it will load in the photos for the rover and put them in an Img Container.  It also has a sort bar to filer which photos
 * we are receiving.
 * @augments {Component<Props, State>}
 */
class RoverPage extends Component {
    static propTypes = {
        /** The key used to access nasa apis */
        apiKey: PropType.string.isRequired,
        /** The rover for which ever page we are on */
        roverName: PropType.string.isRequired,
    };

    state = {
        images: [],
        roverName: this.props.roverName,
        pageNum: 1,
        urlToSearch: "",
    };

    // If the url to search or the page number is changed, then we refetch all the photos from the api
    componentDidUpdate(previousProps, previousState) {
        if (previousState.urlToSearch !== this.state.urlToSearch) {
            if (1 !== this.state.pageNum) {
                this.setState({ pageNum: 1 });
            } else {
                this.fetchPhotos();
            }
        } else if (previousState.pageNum !== this.state.pageNum) {
            this.fetchPhotos();
        }
    }

    // Using the url and page num in state, fetch all the photos from the api
    fetchPhotos = () => {
        fetch(this.state.urlToSearch + `&page=${this.state.pageNum}`)
            .then((res) => res.json())
            .then((images) => {
                this.setState({
                    images: images.photos,
                });
                console.log("here");
            });
    };

    /**
     * Callback to update the state of the url
     * @param {string} urlToSearch
     */
    getSearch = (urlToSearch) => {
        this.setState({ urlToSearch });
    };

    // Increase or decrease the page number
    handlePrevPage = () => this.setState({ pageNum: this.state.pageNum - 1 });
    handleNextPage = () => this.setState({ pageNum: this.state.pageNum + 1 });

    // Jsx to render the page buttons
    pageButtons = () => {
        return (
            <div>
                <button
                    onClick={this.handlePrevPage}
                    className="ui button pageDiv"
                    disabled={this.state.pageNum > 1 ? false : true}
                >
                    Previous Page
                </button>
                <h3 className="pageDiv">Page {this.state.pageNum}</h3>
                <button onClick={this.handleNextPage} className="ui button pageDiv">
                    Next Page
                </button>
            </div>
        );
    };

    render() {
        return (
            <div className="mainDivRover">
                <SortBar getSearch={this.getSearch} roverName={this.state.roverName} apiKey={this.props.apiKey} />
                <this.pageButtons />
                <ImgCardContain boarder={true} images={this.state.images} />
                <this.pageButtons />
            </div>
        );
    }
}

export default RoverPage;
