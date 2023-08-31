import React, { Fragment, useCallback, useRef, useState } from 'react';

import Draggable from 'react-draggable';
import styled from 'styled-components';
import DefaultPositionLine from '../dragPositionLine/DefaultPositionLine';
import DragReSizing from './DragReSizing';

const DragCheckBox = ({ item, setState, onChange, style, onDelete, mode }) => {
  const nodeRef = useRef(null);
  const [mouseOver, setMouseOver] = useState(false);
  const [checked, setChecked] = useState(!!item.value);
  const [position, setPosition] = useState(item.offset.position);
  const [size, setSize] = useState({
    x: item.offset.width,
    y: item.offset.height,
  });
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
    let changeSize = {};
    const startSize = size;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };
    const onMouseMove = (mouseMoveEvent) => {
      mouseMoveEvent.preventDefault();

      const deltaX = mouseMoveEvent.pageX - startPosition.x;
      const deltaY = mouseMoveEvent.pageY - startPosition.y;

      const maxDelta = Math.max(Math.abs(deltaX), Math.abs(deltaY));
      const directionX = deltaX >= 0 ? 1 : -1;
      const newSize = startSize.x + directionX * maxDelta;
      changeSize = { x: Math.max(newSize, 25), y: Math.max(newSize, 25) };

      setSize(changeSize);
    };
    const onMouseUp = () => {
      setState((prev) => {
        return prev.map((data) =>
          data.id === item.id
            ? {
                ...data,
                offset: {
                  ...data.offset,
                  width: changeSize.x,
                  height: changeSize.y,
                },
              }
            : data
        );
      });
      document.body.removeEventListener('mousemove', onMouseMove);
    };

    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseup', onMouseUp, { once: true });
  };
  const handleOnChecked = useCallback(
    ({ target: { checked } }) => {
      setChecked(checked);
      setState((prev) => {
        return prev.map((data) =>
          data.id === item.id
            ? {
                ...data,
                value: checked,
              }
            : data
        );
      });
    },
    [checked]
  );
  return (
    <Fragment>
      <Draggable
        nodeRef={nodeRef}
        onDrag={(e, data) => trackPos(data)}
        onStart={handleStart}
        onStop={handleEnd}
        bounds={'parent'}
        disabled={mode}
        position={position}
        defaultClassName={'z-10'}>
        <div
          ref={nodeRef}
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
            checked={checked}
            onChange={handleOnChecked}
            style={{
              width: size.x,
              height: size.y,
            }}
          />
          {mouseOver && !mode && (
            <DragReSizing
              reSizing={handlerReSizing}
              onDelete={onDelete}
              item={item}
            />
          )}
        </div>
      </Draggable>
      {!mode && (
        <DefaultPositionLine
          item={item}
          disable={mouseOver}
          size={size}
          position={position}
        />
      )}
    </Fragment>
  );
};

export default DragCheckBox;
const CustomCheckbox = styled.input`
  margin: 0;
  border: 0;
  box-sizing: border-box;
`;
