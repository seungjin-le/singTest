import React, { Fragment, useRef, useState } from 'react';
import ToolTip from './ToolTip';
import Draggable from 'react-draggable';
import styled from 'styled-components';

const DragCheckBox = ({ item, setState, onChange, style, onDelete }) => {
  const nodeRef = useRef(null);
  const [mouseOver, setMouseOver] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ x: 25, y: 25 });
  const [Opacity, setOpacity] = useState(false);

  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };
  const handleStart = () => {
    setOpacity(true);
  };
  const handleEnd = () => {
    setOpacity(false);
    setState((prev) => {
      return prev.map((data) =>
        data.id === item.id
          ? {
              ...data,
              offset: { ...data.offset, position: position },
            }
          : data
      );
    });
  };
  const handlerReSizing = (mouseDownEvent) => {
    const startSize = size;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };
    const onMouseMove = (mouseMoveEvent) => {
      const deltaX = mouseMoveEvent.pageX - startPosition.x;
      const deltaY = mouseMoveEvent.pageY - startPosition.y;

      const maxDelta = Math.max(Math.abs(deltaX), Math.abs(deltaY));
      const directionX = deltaX >= 0 ? 1 : -1;
      const newSize = startSize.x + directionX * maxDelta;

      setSize({
        x: Math.max(newSize, 25), // Ensure X-axis width is at least 25px
        y: Math.max(newSize, 25), // Y-axis is still determined by newSize
      });
    };
    const onMouseUp = () => {
      document.body.removeEventListener('mousemove', onMouseMove);
    };

    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseup', onMouseUp, { once: true });
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      onDrag={(e, data) => trackPos(data)}
      onStart={handleStart}
      onStop={handleEnd}
      bounds="parent"
      defaultClassName={'z-10'}
      style={{
        width: size.x,
        height: size.y,
      }}>
      <div
        ref={nodeRef}
        className="box"
        style={{
          opacity: Opacity ? '0.6' : '1',
          ...style,
        }}
        onMouseOver={() => setMouseOver(true)}
        onMouseOut={() => setMouseOver(false)}>
        <CustomCheckbox
          type="checkbox"
          className={'min-h-[25px] min-w-[25px]'}
          style={{
            width: size.x,
            height: size.y,
          }}
        />
        {mouseOver && (
          <Fragment>
            <span
              className={
                'absolute w-3 h-3 bg-[red] top-full -translate-x-[80%] -translate-y-[120%] rounded-full cursor-pointer z-20'
              }
              onMouseDown={handlerReSizing}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item?.id);
              }}
              className={
                'absolute left-full top-0 px-2 bg-red-400 rounded-full flex items-center justify-center translate-x-m50 translate-y-m50 z-20'
              }>
              x
            </button>
          </Fragment>
        )}
      </div>
    </Draggable>
  );
};

export default DragCheckBox;
const CustomCheckbox = styled.input`
  margin: 0;
  border: 0;
  box-sizing: border-box;
`;
