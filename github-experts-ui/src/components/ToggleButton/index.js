import React from 'react';
import styled from 'styled-components';

export const ToggleButton = styled(
  ({ className, onClick, value, selected, disabled, children, classes }) => {
    const btnClass = selected ? 'btn-selected' : '';
    const isDisabled = disabled ? 'disabled' : '';

    return (
      <button
        type="button"
        className={`${className} ${classes} ${btnClass} btn mr-2 mb-2`}
        disabled={isDisabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
)`
  & {
    color: #1999df;
    background: #fafbfc;
    border: 1px solid #1999df;
    box-sizing: border-box;
    box-shadow: 0px 1px 0px rgba(27, 31, 35, 0.04),
      inset 0px 2px 0px rgba(255, 255, 255, 0.25);
    border-radius: 6px;
  }
  &.btn-selected {
    color: #ffffff;
    background: #1999df;
    border: 1px solid #1999df;
    box-sizing: border-box;
    box-shadow: 0px 1px 0px rgba(27, 31, 35, 0.04),
      inset 0px 2px 0px rgba(255, 255, 255, 0.25);
    border-radius: 6px;
  }
`;
