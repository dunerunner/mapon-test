import React from 'react';

type SelectProps = {
    items: Array<{ unit_id: string; number: string }>;
    value: string;
    label: string;
    id: string;
    onChange: (value: string) => void;
    isLoading: boolean;
    error: string | null;
};

const CustomSelect: React.FC<SelectProps> = ({ items, value, label, id, onChange, isLoading, error }) => {
    if (isLoading) {
        return <p>Loading items...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="form-row">
            <label htmlFor={id}>
                {label}<span className="required">*</span>
            </label>
            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">Select an option</option>
                {items.map((item, index) => (
                    <option key={index} value={item.unit_id}>
                        {item.number}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CustomSelect;
