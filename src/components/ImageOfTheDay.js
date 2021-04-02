import React, { Fragment } from "react";
import "semantic-ui-css/semantic.min.css";
import { Modal, Image, Button } from "semantic-ui-react";
import PropType from "prop-types";

/**
 * Image of the day functional component.  This component takes the given data from the image of the day
 * and uses it to populate the webpage with the image of the day and its description.
 * @augments {Component<Props, State>}
 */
const ImageOfTheDay = (props) => {
    // State fpr the images modal
    const [open, setOpen] = React.useState(false);

    return (
        <Fragment>
            {/* Modal so the user can expand the img to its full size */}
            <Modal size="large" onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open}>
                <Modal.Content image>
                    {props.imageOfTheDay.hdurl !== undefined ? (
                        <Image src={props.imageOfTheDay.hdurl} wrapped />
                    ) : (
                        <Image src={props.imageOfTheDay.url} wrapped />
                    )}
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)} positive>
                        Ok
                    </Button>
                </Modal.Actions>
            </Modal>
            <div className="container-Mod ">
                <div className="fixed-container">
                    {/* Grab the image or video base on what parameters is passed back and fix it to the back of the webpage */}
                    {props.imageOfTheDay.thumbnail_url !== undefined ? (
                        <iframe
                            className="fixed"
                            src={props.imageOfTheDay.url}
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title="video"
                        />
                    ) : props.imageOfTheDay.hdurl !== undefined ? (
                        <div onClick={() => setOpen(true)} className="fixed">
                            <img src={props.imageOfTheDay.hdurl} className="fixed" alt="Img Of The Day" />
                        </div>
                    ) : (
                        <div onClick={() => setOpen(true)} className="fixed">
                            <img src={props.imageOfTheDay.url} className="fixed" alt="Img Of The Day" />
                        </div>
                    )}
                </div>
                {/* Overlay the info to go over the photo */}
                <div className="overlay">
                    <h3>Title: {props.imageOfTheDay.title}</h3>
                    <div>
                        <h5>Explanation: </h5>
                    </div>
                    <div>
                        <p className="textPadding">{props.imageOfTheDay.explanation}</p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

ImageOfTheDay.propTypes = {
    /** Image data gotten from nasa servers */
    imageOfTheDay: PropType.shape({
        title: PropType.string.isRequired,
        explanation: PropType.string.isRequired,
        url: PropType.string.isRequired,
        hdurl: PropType.string,
        thumbnail_url: PropType.string,
    }).isRequired,
};

export default ImageOfTheDay;
