import React, { Fragment, memo, useCallback, useRef, useState } from 'react';

import Draggable from 'react-draggable';
import styled from 'styled-components';
import DefaultPositionLine from '../dragPositionLine/DefaultPositionLine';
import DragReSizing from './DragReSizing';

const DragCheckBox = ({ item, setState, style, onDelete, mode }) => {
  const nodeRef = useRef(null);
  const [mouseOver, setMouseOver] = useState(false);
  const [checkBoxFocus, setCheckBoxFocus] = useState(false);
  const [showPosLine, setShowPosLine] = useState(false);
  const [position, setPosition] = useState(item.offset.position);
  const [size, setSize] = useState({
    x: item.offset.width,
    y: item.offset.height,
  });

  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
    setShowPosLine(true);
    setCheckBoxFocus(false);
  };

  const handleStart = () => {};
  const handleEnd = () => {
    setShowPosLine(false);
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
    mouseDownEvent.stopPropagation(); // 상위 요소의 드레그 이벤트 전파를 중지.
    let changeSize = {};
    setShowPosLine(true);
    const startSize = size;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };
    const onMouseMove = (mouseMoveEvent) => {
      const deltaX = mouseMoveEvent.pageX - startPosition.x;
      const deltaY = mouseMoveEvent.pageY - startPosition.y;

      const maxDelta = Math.max(Math.abs(deltaX), Math.abs(deltaY));
      const directionX = deltaX >= 0 ? 1 : -1;
      const newSize = startSize.x + directionX * maxDelta;
      changeSize = { x: Math.max(newSize, 10), y: Math.max(newSize, 10) };

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

      setShowPosLine(false);
      document.body.removeEventListener('mousemove', onMouseMove);
    };

    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseup', onMouseUp, { once: true });
  };

  const handleOnChecked = useCallback(() => {
    setState((prev) => {
      return prev.map((data) =>
        data.id === item.id
          ? {
              ...data,
              value: !data.value,
            }
          : data
      );
    });
  }, []);
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
            ...style,
            width: size.x,
            height: size.y,
          }}
          onMouseOver={() => setMouseOver(true)}
          onMouseOut={() => setMouseOver(false)}>
          <CustomCheckbox
            type="checkbox"
            checked={item.value}
            onChange={() => checkBoxFocus && handleOnChecked()}
            onClick={() => setCheckBoxFocus(true)}
            onBlur={() => setCheckBoxFocus(false)}
            $foucs={checkBoxFocus}
            $infoType={
              item?.info.type === 'admin' && mode
                ? 'rgba(255, 252, 127, 0)'
                : item?.info.type === 'admin' && !mode
                ? 'rgba(255, 255, 255, 0.7)'
                : item?.info.type === 'user' && !mode
                ? 'rgba(255, 252, 127, 0.7)'
                : 'rgba(255, 255, 255, 0.7)'
            }
            $checked={
              item?.info.type === 'admin' && mode
                ? 'rgba(255, 252, 127, 0)'
                : item?.info.type === 'admin' && !mode
                ? 'rgba(255, 255, 255, 0.7)'
                : item?.info.type === 'user' && !mode
                ? 'rgba(255, 252, 127, 0.7)'
                : 'rgba(255, 255, 255, 0.7)'
            }
            style={{
              opacity: showPosLine ? '0.6' : '1',
              width: size.x,
              height: size.y,
            }}
          />
          <span
            className={`absolute  left-[2px] ${
              item?.info.type === 'admin' && !mode
                ? 'z-[-100]'
                : item?.info.type === 'admin' && mode
                ? 'z-[100]'
                : item?.info.type === 'user' && !mode
                ? 'z-[100]'
                : 'z-[-100]'
            }`}
            style={{ width: size.x - 4, height: size.y - 1 }}
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
      {!mode && showPosLine && (
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

export default memo(DragCheckBox);

const CustomCheckbox = styled.input`
  margin: 0;
  border: none;
  box-sizing: border-box;
  box-shadow: ${({ $foucs }) => ($foucs ? '0 0 20px cornflowerblue' : 'none')};
  position: relative;
  outline: none;
  &[type='checkbox'] {
    -webkit-appearance: none;
    background: ${({ $infoType }) => $infoType};
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  &[type='checkbox']::after {
    display: flex;
    align-items: center;
    justify-content: center;
    content: 'OFF';
    position: absolute;
    top: 0;
    visibility: visible;
    height: 100%;
    width: 100%;
    line-height: 30px;
    text-align: center;
    border-radius: 4px;
    background: ${({ $infoType }) => $infoType};
    color: black;
    font-weight: 600;
    cursor: pointer;
  }
  &[type='checkbox']:checked:after {
    content: 'ON';
    //background: rgba(0, 0, 0, 0.5);
  }
`;
