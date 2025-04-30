// src/BMICalculator.jsx
import React, { useState } from 'react';

const BMICalculator = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState('');

    const calculateBMI = () => {
        if (weight && height) {
            const heightInMeters = height / 100; // Convert height to meters
            const bmiValue = weight / (heightInMeters * heightInMeters);
            setBmi(bmiValue.toFixed(2));
            determineCategory(bmiValue);
        }
    };

    const determineCategory = (bmiValue) => {
        if (bmiValue < 18.5) {
            setCategory('Underweight - Consult Dietician');
        } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
            setCategory('Normal weight - Keep it Up!');
        } else if (bmiValue >= 25 && bmiValue < 29.9) {
            setCategory('Overweight - Consult Dietician');
        } else {
            setCategory('Obesity - Consult Dietician');
        }
    };

    return (
        <div className="bmi-card container">
            <h1>BMI Calculator</h1>
            <div className="input-group">
                <label>
                    Weight (kg):
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                </label>
            </div>
            <div className="input-group">
                <label>
                    Height (cm):
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                </label>
            </div>
            <button className="calculate-button" onClick={calculateBMI}>
                Calculate BMI
            </button>
            {bmi && (
                <div className="result">
                    <h2>Your BMI: {bmi}</h2>
                    <h3>Category: {category}</h3>
                </div>
            )}
        </div>
    );
};

export default BMICalculator;