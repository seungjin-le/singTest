import React, { Fragment, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';

const NavDragaCheckBox = ({ style, index, onDelete, item, setState }) => {
  const ref = useRef(null);
  const [size, setSize] = useState({ x: 25, y: 25 });
  const [mouseOver, setMouseOver] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: 'CHECKBOX',
    item: (monitor, item) => {
      const rect = ref.current.getBoundingClientRect();
      return {
        id: `checkBox-${index}`,
        type: 'checkBox',
        offset: {
          defaultPosition: {
            x: monitor.getClientOffset().x - rect.left,
            y: monitor.getClientOffset().y - rect.top,
          },
          position: {
            x: 0,
            y: 0,
          },
          width: size.x,
          height: size.y,
        },
        value: '',
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const combinedRef = (node) => {
    drag(node);
    ref.current = node;
  };

  return (
    <Fragment>
      <div
        style={{
          ...style,
        }}
        className={
          'flex items-center justify-center m-0 p-0 min-w-[25px] min-h-[25px] z-5 '
        }>
        <CustomCheckbox
          ref={combinedRef}
          type="checkbox"
          className={
            'min-h-[25px] min-w-[25px]  cursor-pointer overflow-hidden'
          }
          checked={false}
          style={{
            width: size.x,
            height: size.y,
          }}
        />
      </div>
    </Fragment>
  );
};

export default NavDragaCheckBox;

const CustomCheckbox = styled.input`
  margin: 0;
  border: 0;
  box-sizing: border-box;
  &:hover {
    box-shadow: none;
  }
  &:focus {
    background: red;
    box-shadow: none;
  }
  &:active {
    box-shadow: none;
  }
`;
