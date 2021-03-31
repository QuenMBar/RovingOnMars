import React, { Fragment } from "react";
import { Button, Card, Icon, Image, Modal } from "semantic-ui-react";

const ImgCard = (props) => {
    const [open, setOpen] = React.useState(false);
    return (
        <Fragment>
            <Modal size="large" onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open}>
                <Modal.Content image>
                    <Image src={props.data.img_src} wrapped />
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)} positive>
                        Ok
                    </Button>
                </Modal.Actions>
            </Modal>
            <Card raised>
                <Image onClick={() => setOpen(true)} src={props.data.img_src} wrapped ui={false} />
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
                    {!props.isFav ? (
                        // eslint-disable-next-line
                        <a onClick={() => props.handleCard(props.data)}>
                            <Icon name="heart outline" />
                            Add to favorites
                        </a>
                    ) : (
                        // eslint-disable-next-line
                        <a onClick={() => props.handleCard(props.data)}>
                            <Icon name="heart" />
                            Remove from favorites
                        </a>
                    )}
                </Card.Content>
            </Card>
        </Fragment>
    );
};

export default ImgCard;
