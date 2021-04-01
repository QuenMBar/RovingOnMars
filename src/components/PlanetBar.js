import React, { Component, Fragment } from "react";
import { Image, Popup } from "semantic-ui-react";
import localImg from "../assets/earth.png";

class PlanetBar extends Component {
    arrayOfColors = [
        "#EF5350",
        "#EC407A",
        "#AB47BC",
        "#673AB7",
        "#3F51B5",
        "#2196F3",
        "#29B6F6",
        "#26C6DA",
        "#26A69A",
        "#66BB6A",
        "#9CCC65",
        "#D4E157",
        "#FFEE58",
        "#FFCA28",
        "#FFA726",
        "#FF8A65",
        "#A1887F",
        "#E0E0E0",
        "#90A4AE",
        "#000000",
        "#C62828",
        "#AD1457",
        "#6A1B9A",
        "#4527A0",
        "#283593",
        "#1565C0",
        "#0277BD",
        "#00838F",
        "#00695C",
        "#2E7D32",
        "#558B2F",
        "#9E9D24",
        "#F9A825",
        "#FF8F00",
        "#EF6C00",
        "#D84315",
        "#4E342E",
        "#424242",
        "#37474F",
    ];

    scale = 46480000;

    containerStyles = {
        height: 20,
        width: "80%",
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        marginTop: 40,
        marginLeft: "10%",
        marginRight: "10%",
        position: "relative",
    };

    createFillerStyle = (percent) => {
        return {
            height: 20,
            width: 20,
            marginLeft: `${percent}%`,
            backgroundColor: this.arrayOfColors[Math.floor(Math.random() * this.arrayOfColors.length)],
            borderRadius: "inherit",
            textAlign: "right",
            position: "absolute",
            zIndex: 2,
        };
    };

    earthStyle = {
        height: 40,
        width: 40,
        marginLeft: `${-1}%`,
        borderRadius: "inherit",
        textAlign: "right",
        position: "absolute",
        bottom: -10,
        zIndex: 1,
    };

    state = { objArr: [] };

    componentDidMount() {
        let ourDate = new Date();
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

        fetch(`https://api.nasa.gov/neo/rest/v1/feed?api_key=${this.props.apiKey}&start_date=${date}&end_date=${date}`)
            .then((res) => res.json())
            .then((data) => {
                let arrayOnDate = data.near_earth_objects[date];
                let reducedArray = [];
                arrayOnDate.forEach((obj) => {
                    reducedArray.push({
                        name: obj.name,
                        diameter:
                            (obj.estimated_diameter.miles.estimated_diameter_min +
                                obj.estimated_diameter.miles.estimated_diameter_max) /
                            2,
                        isHazardous: obj.is_potentially_hazardous_asteroid,
                        distance: obj.close_approach_data[0].miss_distance.miles,
                        styleWithColor: this.createFillerStyle(
                            (obj.close_approach_data[0].miss_distance.miles / this.scale) * 100
                        ),
                    });
                });
                this.setState({ objArr: reducedArray });
            });
    }

    render() {
        return (
            <Fragment>
                <h2>Near Earth Objects</h2>
                <p>A visual representation of how close objects are to earth today.</p>
                <div style={this.containerStyles}>
                    <Popup trigger={<Image src={localImg} style={this.earthStyle} alt="Earth" />}>
                        <Popup.Header>Earth</Popup.Header>
                    </Popup>
                    {this.state.objArr.map((obj, i) => (
                        <Popup key={i} trigger={<div style={obj.styleWithColor}></div>}>
                            <Popup.Header>{obj.name}</Popup.Header>
                            <Popup.Content>
                                Size: {obj.diameter} mi
                                <br />
                                Could be hazardous: {obj.isHazardous.toString()}
                                <br />
                                Distance From Earth: {obj.distance} mi
                            </Popup.Content>
                        </Popup>
                    ))}
                </div>
            </Fragment>
        );
    }
}

export default PlanetBar;
