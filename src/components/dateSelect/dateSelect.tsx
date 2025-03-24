import React from 'react';
import './dateSelect.scss';

type DateSelectProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    id: string;
};

const DateSelect: React.FC<DateSelectProps> = ({ label, value, onChange, id }) => {
    return (
        <div className="date-select">
            <label htmlFor={id}>{label}</label>
            <input
                type="date"
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default DateSelect;
