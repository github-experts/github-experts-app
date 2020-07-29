import React from 'react';
import styled from 'styled-components';

export const ToggleButton = styled(({ className, onClick, value, selected, disabled, children, classes }) => {

  var btnClass = selected ? 'btn-selected' : '';
  var isDisabled = disabled ? 'disabled' : '';

  return (
    <button 
      type="button" 
      className={`${className} ${classes} ${btnClass} btn mr-2 mb-2`} 
      disabled={isDisabled}
      onClick={onClick}>
        {children}
    </button>
  )
})`
  & {
    color: #1999DF;
    background: #FAFBFC;
    border: 1px solid #1999DF;
    box-sizing: border-box;
    box-shadow: 0px 1px 0px rgba(27, 31, 35, 0.04), inset 0px 2px 0px rgba(255, 255, 255, 0.25);
    border-radius: 6px;
  }
  &.btn-selected {
    color: #FFFFFF;
    background: #1999DF;
    border: 1px solid #1999DF;
    box-sizing: border-box;
    box-shadow: 0px 1px 0px rgba(27, 31, 35, 0.04), inset 0px 2px 0px rgba(255, 255, 255, 0.25);
    border-radius: 6px;
  }
`;
