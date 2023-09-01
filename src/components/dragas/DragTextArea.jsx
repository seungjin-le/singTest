import React, { Fragment, memo, useCallback, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import ToolTip from '../toolTips/ToolTip';
import DefaultPositionLine from '../dragPositionLine/DefaultPositionLine';
import DragReSizing from './DragReSizing';
import styled from 'styled-components';

const DragTextArea = ({ item, setState, onChange, style, onDelete, mode }) => {
  const nodeRef = useRef(null);
  const [mouseOver, setMouseOver] = useState(false);
  const [showPosLine, setShowPosLine] = useState(false);
  const [inputValue, setInputValue] = useState(item.value);
  const [inputFocus, setInputFocus] = useState(false);
  const inputRef = useRef(null);
  const [position, setPosition] = useState(item.offset.position);
  const [size, setSize] = useState({
    x: item.offset.width || 200,
    y: item.offset.height || 50,
  });

  const [Opacity, setOpacity] = useState(false);
  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleEnd = useCallback(() => {
    const { x, y } = item.offset.position;
    setMouseOver(false);
    if (x === position.x && y === position.y) return;
    inputRef.current.blur();
    setShowPosLine(false);
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
  }, [item, position, setState]);

  const handleInputDrag = useCallback(
    (data) => {
      trackPos(data);
      const { x, y } = position;
      if (data.x === x && data.y === y) return;
      setInputFocus(false);
      setShowPosLine(true);
      setMouseOver(true);
    },
    [position]
  );

  const handleReSizing = useCallback(
    (mouseDownEvent) => {
      mouseDownEvent.stopPropagation();
      setShowPosLine(true);
      let changeSize = {};
      const startPosition = {
        x: mouseDownEvent.pageX,
        y: mouseDownEvent.pageY,
      };
      const onMouseMove = (mouseMoveEvent) => {
        console.log(mouseMoveEvent.pageX, mouseMoveEvent.pageY);
        const newX = size.x - startPosition.x + mouseMoveEvent.pageX;
        const newY = size.y - startPosition.y + mouseMoveEvent.pageY;

        const contentHeight = inputRef.current.scrollHeight;
        const clientHeight = inputRef.current.clientHeight;
        console.log(contentHeight, newY, clientHeight);

        changeSize = {
          x: Math.max(newX, 10),
          y: Math.max(
            contentHeight !== clientHeight ? contentHeight : newY,
            20
          ),
        };
        setSize({
          x: Math.max(newX, 10),
          y: changeSize.y,
        });
      };

      const onMouseUp = () => {
        setShowPosLine(false);
        setSize({ x: changeSize.x, y: changeSize.y });
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
    },
    [item, setState, size]
  );
  const handleTextAreaOnChange = ({ target }) => {
    const scrollHeight = target.scrollHeight;
    const { value } = target;

    // textarea가 꽉 찼을 때 더 이상 입력하지 못하게 막기.
    if (scrollHeight > size.y || showPosLine) return;
    setInputFocus(true);
    setInputValue(value);
  };

  const handlerTextAreaOnBlur = useCallback(
    ({ target: { value } }) => {
      setInputFocus(false);
      setState((prev) => {
        return prev.map((data) =>
          data.id === item.id
            ? {
                ...data,
                value: inputValue,
              }
            : data
        );
      });
    },
    [item, inputValue, inputFocus]
  );
  return (
    <Fragment>
      <Draggable
        nodeRef={nodeRef}
        onDrag={(e, data) => handleInputDrag(data)}
        onStop={handleEnd}
        bounds={'parent'}
        disabled={inputFocus}
        position={position}
        defaultClassName={'z-10'}>
        <div
          ref={nodeRef}
          className="box box-border p-[1px] rounded-[5px] flex items-center justify-center"
          style={{
            opacity: Opacity ? '0.6' : '1',
            ...style,
            width: size.x,
            height: size.y,
            maxHeight: size.y,
          }}
          onMouseOver={() => setMouseOver(true)}
          onMouseOut={() => setMouseOver(false)}>
          <TextArea
            ref={inputRef}
            disabled={mode}
            onBlur={handlerTextAreaOnBlur}
            value={inputValue}
            onChange={handleTextAreaOnChange}
            onFocus={() => {
              setMouseOver(true);
              setInputFocus(true);
            }}
            style={{
              fontSize: item?.fontSet?.fontSize,
              textAlign: item?.fontSet?.textAlign,
              color: item?.fontSet?.color,
              fontWeight: item?.fontSet?.fontWeight,
              width: size.x,
              height: size.y,
              maxWidth: size.x,
              maxHeight: size.y,
            }}
          />
          {(mouseOver || inputFocus) && (
            <Fragment>
              <DragReSizing
                reSizing={handleReSizing}
                onDelete={onDelete}
                item={item}
              />
              {inputFocus && <ToolTip item={item} onChange={onChange} />}
            </Fragment>
          )}
        </div>
      </Draggable>

      {showPosLine && (
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

export default memo(DragTextArea);

const TextArea = styled.textarea`
  resize: none;
  white-space: pre-wrap;
  overflow: hidden;
  overflow-wrap: break-word;
  display: block;
  z-index: 10;
  box-sizing: content-box;
  background: rgba(255, 255, 255, 0.7);
  letter-spacing: 0;
  word-break: break-all;
  outline: 1px dashed black;
  z-index: 10;
  &:focus {
    outline: none;
  }
`;
