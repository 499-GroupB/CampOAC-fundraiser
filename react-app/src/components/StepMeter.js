import React from 'react';
import "../css/Style.css";

const StepMeter = (props) => {
    const { step } = props

    switch (step) {
        case (1):
            return (
                <div className="step-meter">
                    <h2>Select a pick up location</h2>
                    <p class="step-bar">
                        <progress value="33" max="100"></progress>
                    </p>
                </div>
            )
        case (2):
            return (
                <div className="step-meter">
                    <h2>Enter contact information</h2>
                    <p class="step-bar">
                        <progress value="66" max="100"></progress>
                    </p>
                </div>
            )
        case (3):
            return (
                <div className="step-meter">
                    <h2>Loading</h2>
                    <p class="step-bar">
                        <progress value="66" max="100"></progress>
                    </p>
                </div>
            )
        case (4):
            return (
                <div className="step-meter">
                    <h2>Thank you!</h2>
                    <p class="step-bar">
                        <progress value="100" max="100"></progress>
                    </p>
                </div>
            )
        default:
            return (
                <div className="step-meter">
                    <h2>Select a location</h2>
                    <p class="step-bar">
                        <progress max="100"></progress>
                    </p>
                </div>
            )
    }
}

export default StepMeter;