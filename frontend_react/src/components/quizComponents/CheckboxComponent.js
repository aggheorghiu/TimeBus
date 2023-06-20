import React, { useState } from 'react';

const CheckboxComponent = ({ question }) => {
    const [selected, setSelected] = useState([]);

    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            setSelected([...selected, e.target.value]);
        } else {
            setSelected(selected.filter(item => item !== e.target.value));
        }
    };

    return (
        <div className="question">
            <h2>{question.questionText}</h2>
            {question.answerOptions.map((option, index) => (
                <div key={index}>
                    <label>
                        <input
                            type="checkbox"
                            value={option.answerText}
                            checked={selected.includes(option.answerText)}
                            onChange={handleCheckboxChange}
                        />
                        {option.answerText}
                    </label>
                </div>
            ))}
        </div>
    );
};


const styles = {
    
}

export default CheckboxComponent;
