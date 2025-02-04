import React from "react";
import { ReactSurveyElement, ReactElementFactory } from "survey-react-ui";
import './ProgressBar.css';

class PercentageProgressBar extends ReactSurveyElement {
    constructor(props) {
        super(props);
        this.state = {
            progressValue: props.surveyModel.progressValue,
        };
    }

    componentDidMount() {
        // Add event listener for when the current page changes
        this.props.surveyModel.onCurrentPageChanged.add(this.updateProgressValue);
    }

    componentWillUnmount() {
        // Clean up the event listener when the component unmounts
        this.props.surveyModel.onCurrentPageChanged.remove(this.updateProgressValue);
    }

    updateProgressValue = () => {
        // Update the progress value based on the current survey model progress
        this.setState({ progressValue: this.props.surveyModel.progressValue });
    };

    render() {
        return (
            <div className="sv-progressbar-percentage">
                <div className="sv-progressbar-percentage__title">
                    <span>{this.props.title}</span>
                </div>
                <div className="sv-progressbar-percentage__indicator">
                    <div className="sv-progressbar-percentage__value-bar" style={{ width: this.state.progressValue + "%" }}></div>
                </div>
                <div className="sv-progressbar-percentage__value">
                    <span>{this.state.progressValue + "%"}</span>
                </div>
            </div>
        );
    }
}

export default PercentageProgressBar;
