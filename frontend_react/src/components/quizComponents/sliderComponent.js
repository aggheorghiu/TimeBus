import React, { useState } from 'react';

const SliderComponent = ({ question }) => {
    const [value, setValue] = useState(0);

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <div className="question">
            <h2>{question.questionText}</h2>
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}

export default SliderComponent;
