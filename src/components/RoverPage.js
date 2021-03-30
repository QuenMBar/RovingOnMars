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
        // !FIXME Page calls fetch twice when loading a new search result when not on page one since its calling fetch on new url and the new page num
        if (previousState.pageNum !== this.state.pageNum) {
            this.fetchPhotos(this.state.pageNum);
        }
        if (previousState.urlToSearch !== this.state.urlToSearch) {
            this.fetchPhotos(1);
        }
    }

    fetchPhotos = (pageNum) => {
        console.log("here");
        fetch(this.state.urlToSearch + `&page=${pageNum}`)
            .then((res) => res.json())
            .then((images) =>
                this.setState({
                    images: images.photos,
                    pageNum: pageNum,
                })
            );
    };

    getSearch = (urlToSearch) => {
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
                <ImgCardContain images={this.state.images} />
            </div>
        );
    }
}

export default RoverPage;
