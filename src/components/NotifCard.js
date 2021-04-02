import React, { Fragment } from "react";
import { Card, Icon, Modal, Button } from "semantic-ui-react";
import ReactMarkdown from "react-markdown";
import PropType from "prop-types";

/**
 * Functional component that handles creating a notification card and its corresponding modal
 * @augments {Component<Props, State>}
 */
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

NotifCard.propTypes = {
    /** Notification to display */
    notifs: PropType.shape({
        header: PropType.string,
        shortDescription: PropType.string,
        description: PropType.string,
    }).isRequired,
};

export default NotifCard;
