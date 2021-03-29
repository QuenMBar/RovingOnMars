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

    render() {
        return (
            <div>
                <SortBar getSearch={this.getSearch} roverName={this.state.roverName} />
                {/* {this.state.images.photos.map(photo => <img src={photo.img_src}/>)} */}
            </div>
        );
    }
}

export default RoverPage;
