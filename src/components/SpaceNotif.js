import React, { Component, Fragment } from "react";
import { Card } from "semantic-ui-react";
import NotifCard from "./NotifCard";

export default class SpaceNotif extends Component {
    state = {
        notiifs: [],
    };

    type = {
        FLR: "Solar Flare",
        SEP: "Solar Energetic Particle",
        CME: "Coronal Mass Ejection",
        IPS: "Interplanetary Shock",
        MPC: "Magnetopause Crossing",
        GST: "Geomagnetic Storm",
        RBE: "Radiation Belt Enhancement",
        Report: "Report",
    };

    componentDidMount() {
        fetch(`https://api.nasa.gov/DONKI/notifications?type=all&api_key=${this.props.apiKey}`)
            .then((res) => res.json())
            .then((notiifs) => {
                console.log(notiifs);
                this.parseCards(notiifs);
            });
    }

    parseCards = (notifsRaw) => {
        let notiifs = [];
        notifsRaw.forEach((noteRaw) => {
            notiifs.push({
                header: this.type[noteRaw.messageType],
                description: noteRaw.messageBody.slice(
                    noteRaw.messageBody.search("## Summary:") + 12,
                    noteRaw.messageBody.search("## Notes:")
                ),
            });
        });
        this.setState({ notiifs });
    };

    render() {
        return (
            <Fragment>
                <h2>SPACE NOTIFICATIONS!</h2>
                <Card.Group centered>
                    {this.state.notiifs.map((note) => (
                        <NotifCard notifs={note} />
                    ))}
                </Card.Group>
            </Fragment>
        );
    }
}
