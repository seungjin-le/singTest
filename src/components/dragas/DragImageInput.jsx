import React, { Fragment, useCallback, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import DragReSizing from './DragReSizing';
import DefaultPositionLine from '../dragPositionLine/DefaultPositionLine';
import styled from 'styled-components';

const DragImageInput = ({ item, setState, style, onDelete, mode }) => {
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

  const handleOnAddImage = useCallback(({ target: { value } }) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      $('#blah').attr('src', e.target.result).width(150).height(200);
    };
    reader.readAsDataURL(value.files[0]);
    // setState((prev) => {
    //   return prev.map((data) =>
    //     data.id === item.id
    //       ? {
    //           ...data,
    //           value: value,
    //         }
    //       : data
    //   );
    // });
  }, []);
  console.log(item);
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
          <InputImage
            onClick={() => setCheckBoxFocus(true)}
            onBlur={() => setCheckBoxFocus(false)}>
            <label className="picture" htmlFor="picture__input" tabIndex="0">
              <span className="picture__image">Add Image</span>
            </label>
            <input
              type="file"
              name="picture__input"
              id="picture__input"
              onChange={handleOnAddImage}
            />
          </InputImage>
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

export default DragImageInput;

const InputImage = styled.span`
  #picture__input {
    display: none;
  }

  .picture {
    aspect-ratio: 16/9;
    background: #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #aaa;
    border: 2px dashed currentcolor;
    cursor: pointer;
    font-family: sans-serif;
    transition:
      color 300ms ease-in-out,
      background 300ms ease-in-out;
    outline: none;
    overflow: hidden;
  }

  .picture:hover {
    color: #777;
    background: #ccc;
  }

  .picture:active {
    border-color: turquoise;
    color: turquoise;
    background: #eee;
  }

  .picture:focus {
    color: #777;
    background: #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  .picture__img {
    max-width: 100%;
  }
`;
