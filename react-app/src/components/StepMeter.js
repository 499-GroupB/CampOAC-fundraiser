import React from 'react';
import "../css/Style.css";

const StepMeter = (props) => {
    const { step } = props

    switch (step) {
        case (1):
            return (
                <div className="step-meter">
                    <h2 className="step-header">select a pick up location</h2>
                    <p class="step-bar">
                        <progress value="25" max="100"></progress>
                    </p>
                </div>
            )
        case (2):
            return (
                <div className="step-meter">
                    <h2 className="step-header">enter contact information</h2>
                    <p class="step-bar">
                        <progress value="50" max="100"></progress>
                    </p>
                </div>
            )
        case (3):
            return (
                <div className="step-meter">
                    <h2 className="step-header">please wait...</h2>
                    <p class="step-bar">
                        <progress max="100"></progress>
                    </p>
                </div>
            )
        case (4):
            return (
                <div className="step-meter">
                    <h2 className="step-header">thank you!</h2>
                    <p class="step-bar">
                        <progress value="100" max="100"></progress>
                    </p>
                </div>
            )
        case (5):
            return (
                <div className="step-meter">
                    <h2 className="step-header">enter payment information</h2>
                    <p class="step-bar">
                        <progress value="75" max="100"></progress>
                    </p>
                </div>
            )
        default:
            return (
                <div className="step-meter">
                    <h2 className="step-header">figuring stuff out</h2>
                    <p class="step-bar">
                        <progress max="100"></progress>
                    </p>
                </div>
            )
    }
}

export default StepMeter;