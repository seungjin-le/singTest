import React, { Fragment, useCallback, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import DragReSizing from './DragReSizing';
import DefaultPositionLine from '../dragPositionLine/DefaultPositionLine';
import styled from 'styled-components';

const DragImageInput = ({
  item,
  setState,
  style,
  onDelete,
  mode,
  disabled = false,
  isDownloading,
}) => {
  const nodeRef = useRef(null);
  const [mouseOver, setMouseOver] = useState(false);
  const imageInputRef = useRef(null);
  const [moveImageInput, setMoveImageInput] = useState({ x: 0, y: 0 });
  const [showPosLine, setShowPosLine] = useState(false);
  const [position, setPosition] = useState(item.offset.position);
  const [size, setSize] = useState({
    x: item.offset.width,
    y: item.offset.height,
  });

  const trackPos = useCallback(
    (data) => {
      setPosition({ x: data.x, y: data.y });
      setShowPosLine(true);
    },
    [item]
  );

  const handleStart = useCallback(
    ({ pageX, pageY }) => {
      setMoveImageInput({ x: pageX, y: pageY });
    },
    [moveImageInput]
  );

  const handleEnd = useCallback(
    ({ clientX, clientY }) => {
      setShowPosLine(false);
      const { x, y } = moveImageInput;
      if (clientX === x && clientY === y && !item.value)
        return (imageInputRef.current.disabled = false);

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
    },
    [position, moveImageInput]
  );

  const handlerReSizing = (mouseDownEvent) => {
    // Component의 사이즈 조절중 드레그 막기
    mouseDownEvent.stopPropagation();
    // 사이즈 조정중 표시할 X축 Y축 선 보이기
    setShowPosLine(true);
    // textarea 내용의 높이와 너비를 저장

    let changeSize = {};

    // 드래그 시작 위치 저장
    const startPosition = {
      x: mouseDownEvent.pageX,
      y: mouseDownEvent.pageY,
    };

    // 드래그 중 마우스 움직임에 따라 사이즈 조정
    const onMouseMove = ({ pageX, pageY }) => {
      const newX = size.x - startPosition.x + pageX;
      const newY = size.y - startPosition.y + pageY;

      changeSize = {
        x: Math.max(newX, 25),
        y: Math.max(newY, 25),
      };
      setSize(changeSize);
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
    };

    // 드래그 종료 시 사이즈 저장
    const onMouseUp = () => {
      setShowPosLine(false);

      if (changeSize.x && changeSize.y) setSize(changeSize);

      document.body.removeEventListener('mousemove', onMouseMove);
    };

    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseup', onMouseUp, { once: true });
  };

  const handleOnAddImage = useCallback(
    ({ target: { files } }) => {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = ({ target: { result } }) => {
          setState((prev) => {
            return prev.map((data) =>
              data.id === item.id
                ? {
                    ...data,
                    value: result,
                  }
                : data
            );
          });
        };

        reader.readAsDataURL(file);
      }
    },
    [item.value]
  );

  return (
    <Fragment>
      <Draggable
        nodeRef={nodeRef}
        onDrag={(e, data) => trackPos(data)}
        onStart={handleStart}
        onStop={handleEnd}
        bounds={'parent'}
        disabled={!mode || isDownloading}
        position={position}>
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
            className={'w-full h-full'}
            style={{
              width: size.x,
              height: size.y,
            }}>
            <label
              className={`picture w-full h-full ${
                isDownloading
                  ? '!bg-inherit hover:!bg-inherit !border-none active:!border-none focus:!shadow-none'
                  : 'cursor-pointer'
              }`}
              htmlFor={`${item.id}__input`}
              tabIndex="0">
              {item.value ? (
                <img
                  src={item.value}
                  alt="Image_Input"
                  className={'h-full'}
                  onDragStart={(e) => !isDownloading && e.preventDefault()}
                />
              ) : (
                <span className="picture__image">Add Image</span>
              )}
            </label>
            <input
              disabled={isDownloading}
              type="file"
              ref={imageInputRef}
              name={`${item.id}__input`}
              id={`${item.id}__input`}
              className={'hidden select-none'}
              onChange={(e) => handleOnAddImage(e)}
              onClick={(e) => {
                if (item.value) e.preventDefault();
              }}
            />
          </InputImage>
          {!isDownloading && mouseOver && mode && (
            <DragReSizing
              reSizing={handlerReSizing}
              onDelete={onDelete}
              item={item}
            />
          )}
        </div>
      </Draggable>
      {!isDownloading && mode && showPosLine && (
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

const InputImage = styled.div`
  & * {
    user-select: none;
  }
  .picture {
    background: #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #aaa;
    border: 2px dashed currentcolor;

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
