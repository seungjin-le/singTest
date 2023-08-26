import React, { Fragment, useRef, useState } from 'react';

import Draggable from 'react-draggable';
import styled from 'styled-components';
import PositionLine from './PositionLine';
import DragReSizing from './DragReSizing';

const DragCheckBox = ({ item, setState, onChange, style, onDelete }) => {
  const nodeRef = useRef(null);
  const [mouseOver, setMouseOver] = useState(false);
  const [checked, setChecked] = useState('');
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
    mouseDownEvent.stopPropagation(); // 추가: 상위 요소로의 이벤트 전파를 중지합니다.

    const startSize = size;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };
    const onMouseMove = (mouseMoveEvent) => {
      mouseMoveEvent.preventDefault();

      const deltaX = mouseMoveEvent.pageX - startPosition.x;
      const deltaY = mouseMoveEvent.pageY - startPosition.y;

      const maxDelta = Math.max(Math.abs(deltaX), Math.abs(deltaY));
      const directionX = deltaX >= 0 ? 1 : -1;
      const newSize = startSize.x + directionX * maxDelta;

      setSize({
        x: Math.max(newSize, 25),
        y: Math.max(newSize, 25),
      });
    };
    const onMouseUp = () => {
      document.body.removeEventListener('mousemove', onMouseMove);
    };

    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseup', onMouseUp, { once: true });
  };

  return (
    <Fragment>
      <Draggable
        nodeRef={nodeRef}
        onDrag={(e, data) => trackPos(data)}
        onStart={handleStart}
        onStop={handleEnd}
        bounds="parent"
        defaultClassName={'z-10'}>
        <div
          ref={nodeRef}
          className="box bg-[red]"
          style={{
            opacity: Opacity ? '0.6' : '1',
            ...style,
            width: size.x,
            height: size.y,
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
            <DragReSizing
              reSizing={handlerReSizing}
              onDelete={onDelete}
              item={item}
            />
          )}
        </div>
      </Draggable>
      <PositionLine
        item={item}
        disable={mouseOver}
        size={size}
        position={position}
      />
    </Fragment>
  );
};

export default DragCheckBox;
const CustomCheckbox = styled.input`
  margin: 0;
  border: 0;
  box-sizing: border-box;
`;