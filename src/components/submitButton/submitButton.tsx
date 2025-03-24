import React from 'react';
import './submitButton.scss';

type SubmitButtonProps = {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    isLoading: boolean;
    label?: string;
    disabled?: boolean;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, isLoading, label = '', disabled = false }) => {
    return (
        <button
            className="submit-button"
            type="button"
            onClick={onClick}
            disabled={disabled || isLoading}
        >
            {isLoading ? 'Loading...' : label}
        </button>
    );
};

export default SubmitButton;
