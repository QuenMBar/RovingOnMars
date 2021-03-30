import React, { Component, Fragment } from "react";
import "semantic-ui-css/semantic.min.css";
import { Modal, Image, Button } from "semantic-ui-react";

const ImageOfTheDay = (props) => {
    const [open, setOpen] = React.useState(false);
    return (
        <Fragment>
            <Modal size="large" onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open}>
                <Modal.Content image>
                    <Image size="fullscreen" src={props.imageOfTheDay.url} wrapped />
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)} positive>
                        Ok
                    </Button>
                </Modal.Actions>
            </Modal>
            <div className="ImageOfTheDay ui container">
                <div className="ui items">
                    <div className="item">
                        <div onClick={() => setOpen(true)} className="ui medium image">
                            <img src={props.imageOfTheDay.url} />
                        </div>
                        <div className="content">
                            <a className="header">Title: {props.imageOfTheDay.title}</a>
                            <div class="meta">
                                <span>Explanation</span>
                            </div>
                            <div className="description">
                                <p>{props.imageOfTheDay.explanation}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ImageOfTheDay;
