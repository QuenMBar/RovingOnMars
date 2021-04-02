import React, { Component } from "react";
import { Button, Form, Input, Radio, Select } from "semantic-ui-react";
import PropType from "prop-types";

/**
 * Sort bar to be used by the render pages.  Can sort by camera and date (both earth and mars).  Treats the
 * inputs as controlled.
 * @augments {Component<Props, State>}
 */
export default class SortBar extends Component {
    static propTypes = {
        /** The key used to access nasa apis */
        apiKey: PropType.string.isRequired,
        /** The rover for which ever page we are on */
        roverName: PropType.string.isRequired,
        /** Callback to pass back the new url */
        getSearch: PropType.func,
    };

    // array to link rovers to which cameras they have
    roverDetails = [
        {
            name: "perseverance",
            cameras: [
                "NAVCAM_LEFT",
                "NAVCAM_RIGHT",
                "MCZ_LEFT",
                "MCZ_RIGHT",
                "FRONT_HAZCAM_LEFT_A",
                "FRONT_HAZCAM_RIGHT_A",
                "REAR_HAZCAM_LEFT",
                "REAR_HAZCAM_RIGHT",
                "SKYCAM",
                "SHERLOC_WATSON",
            ],
        },
        { name: "curiosity", cameras: ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM"] },
        { name: "opportunity", cameras: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"] },
        { name: "spirit", cameras: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"] },
    ];

    // Shorthand camera names to the full name
    cameraNames = {
        FHAZ: "Front Hazard Avoidance Camera",
        RHAZ: "Rear Hazard Avoidance Camera",
        MAST: "Mast Camera",
        CHEMCAM: "Chemistry and Camera Complex",
        MAHLI: "Mars Hand Lens Imager",
        MARDI: "Mars Descent Imager",
        NAVCAM: "Navigation Camera",
        PANCAM: "Panoramic Camera",
        MINITES: "Miniature Thermal Emission Spectrometer (Mini-TES)",
        NAVCAM_LEFT: "Navigation Camera - Left",
        NAVCAM_RIGHT: "Navigation Camera - Right",
        MCZ_LEFT: "Mast Camera Zoom - Left",
        MCZ_RIGHT: "Mast Camera Zoom - Right",
        FRONT_HAZCAM_LEFT_A: "Front Hazard Avoidance Camera - Left",
        FRONT_HAZCAM_RIGHT_A: "Front Hazard Avoidance Camera - Right",
        REAR_HAZCAM_LEFT: "Rear Hazard Avoidance Camera - Left",
        REAR_HAZCAM_RIGHT: "Rear Hazard Avoidance Camera - Right",
        SKYCAM: "Skycam",
        SHERLOC_WATSON: "Sherloc Watson Camera",
    };

    /**
     * Constructor since things need to be setup when the component first starts
     * @constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);
        // Create the camera options available
        let cameras = this.roverDetails.find((rover) => rover.name === props.roverName).cameras;
        let options = [];
        options.push({ key: 0, text: "None", value: "none" });
        cameras.forEach((camera, i) => {
            options.push({ key: i + 1, text: this.cameraNames[camera], value: camera });
        });

        // Gets the date from 7 days ago and auto sets the earth date to that (Somewhat deprecated since we start on sol now)
        let ourDate = new Date();
        let pastDate = ourDate.getDate() - 7;
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

        // Set states
        this.apiKey = this.props.apiKey;
        this.state = {
            roverName: this.props.roverName,
            cameras: cameras,
            options: options,
            selectedCamera: "none",
            dateType: "1",
            date: date,
            invalidSol: false,
            invalidDate: false,
            sol: 10,
        };
    }

    // Handle any changes of data
    handleCameraChange = (e, { value }) => this.setState({ selectedCamera: value });
    handleRadioChange = (e, { value }) => this.setState({ dateType: value });
    handleDateChange = (e, { value }) => this.setState({ date: value });
    handleSolChange = (e, { value }) => this.setState({ sol: value });

    /**
     * On Submit, it checks all the felids to see if they're valid, then creates the new URL to be used and uses the
     * callback provided to pass it back to the rover page
     */
    handleSub = () => {
        let baseURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${this.state.roverName.toLowerCase()}/photos?api_key=${
            this.apiKey
        }`;

        if (this.state.dateType === "0") {
            // Regex to check if the date format is YYYY-MM-DD
            const regex = new RegExp("^[0-9]{4}[-]{1}[0-1]{1}[0-9]{1}[-]{1}[0-3]{1}[0-9]$");
            if (regex.test(this.state.date)) {
                baseURL += `&earth_date=${this.state.date}`;
                if (this.state.invalidDate === true) {
                    this.setState({
                        invalidDate: false,
                    });
                }
            } else {
                // If it is wrong, show an error message
                this.setState({
                    invalidDate: true,
                });
                return;
            }
        } else {
            // Regex to check if its a number
            const regex = new RegExp("^[0-9]*$");
            if (regex.test(this.state.sol)) {
                baseURL += `&sol=${this.state.sol}`;
                if (this.state.invalidSol === true) {
                    this.setState({
                        invalidSol: false,
                    });
                }
            } else {
                // If it is wrong, show an error message
                this.setState({
                    invalidSol: true,
                });
                return;
            }
        }

        // Add the camera to the url if there is one
        if (this.state.selectedCamera !== "none") {
            baseURL += `&camera=${this.state.selectedCamera}`;
        }

        // Call the callback
        this.props.getSearch(baseURL);
    };

    // When the component first mounts, just pass back a basic url
    componentDidMount() {
        let returnURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${this.state.roverName.toLowerCase()}/photos?api_key=${
            this.apiKey
        }&sol=10`;
        this.props.getSearch(returnURL);
    }

    render() {
        return (
            <Form className="parentForm" error>
                <Form.Group className="sortForm" inline>
                    <Form.Field
                        control={Select}
                        label="Camera Select"
                        placeholder="None"
                        options={this.state.options}
                        value={this.state.selectedCamera}
                        onChange={this.handleCameraChange}
                        width={3}
                    />
                    <Form.Group className="radials" widths={1} inline>
                        <label>Date Type</label>
                        <Form.Field
                            control={Radio}
                            label="Earth Date"
                            value="0"
                            checked={this.state.dateType === "0"}
                            onChange={this.handleRadioChange}
                        />
                        <Form.Field
                            control={Radio}
                            label="Sol"
                            value="1"
                            checked={this.state.dateType === "1"}
                            onChange={this.handleRadioChange}
                        />
                    </Form.Group>
                    {/* Depending on the current states, display the correct input */}
                    {this.state.dateType === "0" ? (
                        this.state.invalidDate ? (
                            <Form.Field
                                control={Input}
                                label="Earth Date"
                                value={this.state.date}
                                placeholder={this.state.date}
                                onChange={this.handleDateChange}
                                className="inputForm"
                                error={{
                                    content: "Your earth date must match the for YYYY-MM-DD.",
                                }}
                            />
                        ) : (
                            <Form.Field
                                control={Input}
                                label="Earth Date"
                                value={this.state.date}
                                placeholder={this.state.date}
                                onChange={this.handleDateChange}
                                className="inputForm"
                            />
                        )
                    ) : this.state.invalidSol ? (
                        <Form.Field
                            control={Input}
                            label="Sol"
                            value={this.state.sol}
                            placeholder={this.state.sol}
                            onChange={this.handleSolChange}
                            className="inputForm"
                            error={{
                                content: "Your sol must be a number.",
                            }}
                        />
                    ) : (
                        <Form.Field
                            control={Input}
                            label="Sol"
                            value={this.state.sol}
                            placeholder={this.state.sol}
                            onChange={this.handleSolChange}
                            className="inputForm"
                        />
                    )}
                    <Form.Field onClick={this.handleSub} control={Button}>
                        Submit
                    </Form.Field>
                </Form.Group>
            </Form>
        );
    }
}
