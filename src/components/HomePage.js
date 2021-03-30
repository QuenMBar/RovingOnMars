import React, { Component } from "react";
import ImgCardContain from "./ImgCardContain"
import ImageOfTheDay from "./ImageOfTheDay";

export default class HomePage extends Component {
  
  constructor() {
    super()
    this.apiKey = "pJdnVcrflczALUMfVkmcIHLcXidkGpEN6tEcArH8"
    this.state = {
      favorites: [],
      imageOfTheDay: ""
    }
  }

  componentDidMount() {
    this.grabFavorites()
    this.grabImageOfTheDay()
  }

  grabFavorites = () => {
    fetch('http://localhost:3000/photos')
    .then(res => res.json())
    .then(favorites => this.setState({favorites}))
  }

  grabImageOfTheDay = () => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${this.apiKey}`)
    .then(res => res.json())
    .then(imageOfTheDay => this.setState({imageOfTheDay}))
  }
    
  render() {
      
      return (
      <div>
        <div>
        <h2>Image of the Day</h2>
        <ImageOfTheDay imageOfTheDay={this.state.imageOfTheDay}/>
        </div>
        <div className="ui container">
          <h2>Favorite Images</h2>
          <ImgCardContain images={this.state.favorites} grabFavorites={this.grabFavorites}/>
        </div>
      </div>
    )
  }
}
