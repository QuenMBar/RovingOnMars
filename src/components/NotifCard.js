import React, { Fragment } from "react";
import { Card, Icon, Modal, Button } from "semantic-ui-react";
import ReactMarkdown from "react-markdown";

const NotifCard = (props) => {
    const [open, setOpen] = React.useState(false);
    return (
        <Fragment>
            <Modal size="small" onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open}>
                <Modal.Header>{props.notifs.header}</Modal.Header>
                <Modal.Content>
                    <ReactMarkdown source={props.notifs.description} />
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)} positive>
                        Ok
                    </Button>
                </Modal.Actions>
            </Modal>
            <Card>
                <Card.Content>
                    <Card.Header>{props.notifs.header}</Card.Header>
                    <Card.Description>{props.notifs.shortDescription}</Card.Description>
                    {/* eslint-disable-next-line */}
                    <a onClick={() => setOpen(true)}>
                        <Icon name="angle double down" />
                        Read more
                    </a>
                </Card.Content>
            </Card>
        </Fragment>
    );
};

export default NotifCard;
