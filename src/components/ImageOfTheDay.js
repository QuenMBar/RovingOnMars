import React, { Fragment } from "react";
import "semantic-ui-css/semantic.min.css";
import { Modal, Image, Button } from "semantic-ui-react";

const ImageOfTheDay = (props) => {
    const [open, setOpen] = React.useState(false);

    return (
        <Fragment>
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
            {/* </div> */}
            {/* </div> */}
        </Fragment>
    );
};

export default ImageOfTheDay;
