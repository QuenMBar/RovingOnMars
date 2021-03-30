import React, { Component } from "react";
import { Card, CardContent, Image, Modal} from "semantic-ui-react"

export default class ImageOfTheDay extends Component {
  render() {
    return (
      <div>
        <Card className='ui centered card'>
        <Card.Content>
            <Card.Header>
              Title - {this.props.imageOfTheDay.title}
            </Card.Header>
          </Card.Content>
          <Image src={this.props.imageOfTheDay.url} wrapped ui={false} />
          <Card.Content>
            <Card.Description>
              Date: {this.props.imageOfTheDay.date} <br />
              Explanation: {this.props.imageOfTheDay.explanation}
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    )
  }
}