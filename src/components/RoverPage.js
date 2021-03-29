import React, { Component } from "react";
import SortBar from "./SortBar";

class RoverPage extends Component {
    state = {
        images: [],
        roverName: this.props.roverName,
        pageNum: 1,
        urlToSearch: "",
    };

    componentDidUpdate(previousProps, previousState) {
        if (previousState.pageNum !== this.state.pageNum || previousState.urlToSearch !== this.state.urlToSearch) {
            this.fetchPhotos();
        }
    }

    fetchPhotos = () => {
        fetch(this.state.urlToSearch + `&page=${this.state.pageNum}`)
            .then((res) => res.json())
            .then((images) => this.setState({ images: images.photos }));
    };

    getSearch = (urlToSearch) => {
        console.log(urlToSearch);
        this.setState({ urlToSearch });
    };

    handlePrevPage = () => this.setState({ pageNum: this.state.pageNum - 1 });

    handleNextPage = () => this.setState({ pageNum: this.state.pageNum + 1 });

    render() {
        return (
            <div>
                <SortBar getSearch={this.getSearch} roverName={this.state.roverName} />
                <div>
                    <button
                        onClick={this.handlePrevPage}
                        className="ui button"
                        disabled={this.state.pageNum > 1 ? false : true}
                    >
                        Previous Page
                    </button>
                    <button onClick={this.handleNextPage} className="ui button">
                        Next Page
                    </button>
                    <h3>Page {this.state.pageNum}</h3>
                </div>
                <div className="ui three stackable cards">
                    {this.state.images.map((image) => {
                        return (
                            <div className="card">
                                <div className="image">
                                    <img src={image.img_src} alt="img" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default RoverPage;
