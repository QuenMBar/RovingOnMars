import React, { Component } from 'react'

class RoverPage extends Component {

  state = {
    images: [],
    roverName: 'curiosity',
  }

  componentDidMount() {
    let apiKey = 'pJdnVcrflczALUMfVkmcIHLcXidkGpEN6tEcArH8'
    let rover = this.state.roverName
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=10&api_key=${apiKey}`)
    .then(res => res.json())
    .then(images => this.setState({ images:images.photos }))
  }

  render(){
    return (
      <div>
        {/* {this.state.images.photos.map(photo => <img src={photo.img_src}/>)} */}
      </div>
    )
  }
}

export default RoverPage

