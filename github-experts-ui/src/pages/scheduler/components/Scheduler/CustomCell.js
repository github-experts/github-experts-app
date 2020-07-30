import React, { useState } from 'react';
import styled from 'styled-components';

export const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const CustomCellComponent = styled(({ className, data, color }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className={`${className} custom-component`}
      onMouseOver={() => !show && setShow(!show)}
      onMouseLeave={() => show && setShow(!show)}
    >
      <p className="name">{`@${data.name}`}</p>
      {/* <div className={`Popover position-relative ${!show && 'hidden'}`}>
        <div className="Popover-message Popover-message--top-left p-4 mt-2 Box box-shadow-large">
          <h4 className="mb-2">Popover heading</h4>
          <p>Message about this particular piece of UI.</p>
          <button type="submit" className="btn btn-outline mt-2 text-bold">
            Got it!
          </button>
        </div>
      </div> */}
    </div>
  );
})`
  & {
    // z-index: -1;
    background: ${(props) => props.data.color};
    // border-left-color: rgb(243, 167, 71);
    // border-left-style: solid;
    height: 47px;
    // border-left-width: 6px;
  }
  .name {
    color: white;
  }
  .Popover {
    z-index: 1030;
    &::hover {
      z-index: 10;
    }
  }
  .Popover.hidden {
    display: none;
  }
`;
