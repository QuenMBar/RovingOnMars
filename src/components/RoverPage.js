import React, { Component } from "react";
import SortBar from "./SortBar";
import ImgCardContain from "./ImgCardContain";

class RoverPage extends Component {
    state = {
        images: [],
        roverName: this.props.roverName,
        pageNum: 1,
        urlToSearch: "",
    };

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

    getSearch = (urlToSearch) => {
        this.setState({ urlToSearch });
    };

    handlePrevPage = () => this.setState({ pageNum: this.state.pageNum - 1 });

    handleNextPage = () => this.setState({ pageNum: this.state.pageNum + 1 });

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
