import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";

const ImgCard = (props) => {
    return (
        <Card raised>
            <Image src={props.data.img_src} wrapped ui={false} />
            <Card.Content>
                <Card.Header>
                    {props.data.rover.name}: {props.data.id}
                </Card.Header>
                <Card.Description>
                    Sol: {props.data.sol} <br />
                    Earth Date: {props.data.earth_date} <br />
                    Camera: {props.data.camera.full_name} <br />
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a onClick={() => props.likeCard(props.data)}>
                    <Icon name="heart outline" />
                    Add to favorites
                </a>
            </Card.Content>
        </Card>
    );
};

export default ImgCard;
