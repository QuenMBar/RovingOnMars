import React, { Fragment } from "react";
import { Card, Icon, Modal, Button } from "semantic-ui-react";

const NotifCard = (props) => {
    const [open, setOpen] = React.useState(false);
    return (
        <Fragment>
            <Modal size="large" onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open}>
                <Modal.Content>{props.notifs.description}</Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)} positive>
                        Ok
                    </Button>
                </Modal.Actions>
            </Modal>
            <Card>
                <Card.Content>
                    <Card.Header>{props.notifs.header}</Card.Header>
                    <Card.Description>{props.notifs.description.slice(0, 160)}</Card.Description>
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
