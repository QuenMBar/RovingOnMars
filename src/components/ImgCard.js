import React, { Fragment } from "react";
import { Button, Card, Icon, Image, Modal } from "semantic-ui-react";
import PropType from "prop-types";

/**
 * Image card functional component.  This component takes the given img data, usually from the img container, and
 * creates a card out of it.  This card has the photo, some info, and a like/unlike button
 * @augments {Component<Props, State>}
 */
const ImgCard = (props) => {
    // State fpr the images modal
    const [open, setOpen] = React.useState(false);
    return (
        <Fragment>
            {/* Modal to expand the photo when the user clicks on it */}
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
                    {/* Dynamically create the button based on the like state */}
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

ImgCard.propTypes = {
    /** If the card is favorited or not */
    isFav: PropType.bool,
    /** The img data from nasa */
    data: PropType.shape({
        id: PropType.number.isRequired,
        earth_date: PropType.string.isRequired,
        img_src: PropType.string.isRequired,
        sol: PropType.number.isRequired,
        rover: PropType.shape({ name: PropType.string.isRequired }),
        camera: PropType.shape({ full_name: PropType.string.isRequired }),
    }).isRequired,
    /** Function to be done when the like/unlike button is clicked */
    handleCard: PropType.func.isRequired,
};

ImgCard.defaultProps = {
    isFav: true,
};

export default ImgCard;
