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
