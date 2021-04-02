import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import NotifCard from "./NotifCard";
import PropType from "prop-types";

/**
 * Notification container for the space notifications.
 * @augments {Component<Props, State>}
 */
export default class SpaceNotif extends Component {
    static propTypes = {
        /** The key used to access nasa apis */
        apiKey: PropType.string.isRequired,
    };

    state = {
        notiifs: [],
    };

    // Link the shorthand to the full names
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

    // When the components mount, fetch the notification data
    componentDidMount() {
        fetch(
            `https://api.nasa.gov/DONKI/notifications?startDate=${this.getWeek(false)}&endDate=${this.getWeek(
                true
            )}&type=all&api_key=${this.props.apiKey}`
        )
            .then((res) => res.json())
            .then((notiifs) => {
                this.parseCards(notiifs);
            });
    }

    /**
     * Create a notification object that can be passed to the cards
     * @param {object} notifsRaw
     */
    parseCards = (notifsRaw) => {
        let notiifs = [];
        notifsRaw.forEach((noteRaw) => {
            notiifs.push({
                header: this.type[noteRaw.messageType],
                shortDescription: noteRaw.messageBody.slice(
                    noteRaw.messageBody.search("## Summary:") + 12,
                    noteRaw.messageBody.search("## Summary:") + 12 + 160
                ),
                description: noteRaw.messageBody,
            });
        });
        this.setState({ notiifs });
    };

    // Get either the previous or next week date
    getWeek = (isNext) => {
        let ourDate = new Date();
        let pastDate;
        if (!isNext) {
            pastDate = ourDate.getDate() - 7;
        } else {
            pastDate = ourDate.getDate() + 7;
        }
        ourDate.setDate(pastDate);
        let date = ourDate.getFullYear() + "-";
        let dateMonth = ourDate.getMonth() + 1;
        if (dateMonth.toString().length === 1) {
            date += `0${dateMonth}-`;
        } else {
            date += `${dateMonth}-`;
        }
        let dateDay = ourDate.getDate();
        if (dateDay.toString().length === 1) {
            date += `0${dateDay}`;
        } else {
            date += `${dateDay}`;
        }
        return date;
    };

    render() {
        return (
            <div className="overlay">
                <h2>SPACE NOTIFICATIONS!</h2>
                <Card.Group centered itemsPerRow={1} stackable>
                    {this.state.notiifs.map((note, i) => (
                        <NotifCard key={i} notifs={note} />
                    ))}
                </Card.Group>
            </div>
        );
    }
}
