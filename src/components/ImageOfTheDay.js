import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css'

export default class ImageOfTheDay extends Component {
  render() {
    return (
      <div className="ImageOfTheDay ui container">
        <div className="ui items">
          <div className="item">
            <div className="ui medium image">
              <img src={this.props.imageOfTheDay.url}/>
            </div>
            <div className="content">
              <a className="header">Title: {this.props.imageOfTheDay.title}</a>
              <div class="meta">
                <span>Explanation</span>
              </div>
              <div className="description">
                <p>{this.props.imageOfTheDay.explanation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
