import React, { Fragment, memo, useCallback, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import ToolTip from '../toolTips/ToolTip';
import DefaultPositionLine from '../dragPositionLine/DefaultPositionLine';
import DragReSizing from './DragReSizing';
import styled from 'styled-components';

const DragTextArea = ({ item, setState, onChange, style, onDelete, mode }) => {
  const nodeRef = useRef(null);
  const [mouseOver, setMouseOver] = useState(false);
  const [inputValue, setInputValue] = useState(item.value);
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

  const handlerReSizing = useCallback(
    (mouseDownEvent) => {
      mouseDownEvent.stopPropagation();
      let changeSize = {};
      const startPosition = {
        x: mouseDownEvent.pageX,
        y: mouseDownEvent.pageY,
      };

      const onMouseMove = (mouseMoveEvent) => {
        const newX = size.x - startPosition.x + mouseMoveEvent.pageX;
        const newY = size.y - startPosition.y + mouseMoveEvent.pageY;
        changeSize = { x: Math.max(newX, 100), y: Math.max(newY, 25) };
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
    },
    [item, setState]
  );
  const handleTextAreaOnChange = ({ target }) => {
    const scrollWidth = target.scrollWidth;
    const clientWidth = target.clientWidth;
    const { value } = target;

    // textarea가 꽉 찼을 때 더 이상 입력하지 못하게 하기
    if (scrollWidth > clientWidth) return;

    setInputValue(value);
  };

  const handlerTextAreaOnBlur = useCallback(
    ({ target: { value } }) => {
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
    [item, inputValue]
  );

  return (
    <Fragment>
      <Draggable
        nodeRef={nodeRef}
        onDrag={(e, data) => trackPos(data)}
        onStart={() => setOpacity(true)}
        onStop={handleEnd}
        bounds={'parent'}
        disabled={mode}
        position={position}
        defaultClassName={'z-10'}>
        <div
          ref={nodeRef}
          className="box box-border h-auto p-[1px] rounded-[5px] flex items-center justify-center"
          style={{
            opacity: Opacity ? '0.6' : '1',
            ...style,
            width: size.x,
            height: size.y,
          }}
          onMouseOver={() => setMouseOver(true)}
          onMouseOut={() => setMouseOver(false)}>
          <TextArea
            wrap="virtual"
            disabled={mode && inputValue ? true : false}
            onBlur={handlerTextAreaOnBlur}
            value={inputValue}
            onChange={handleTextAreaOnChange}
            onDoubleClick={(e) => {
              e.stopPropagation();
            }}
            style={{
              fontSize: item?.fontSet?.fontSize,
              textAlign: item?.fontSet?.textAlign,
              color: item?.fontSet?.color,
              fontWeight: item?.fontSet?.fontWeight,
              width: size.x,
              height: size.y,
              maxWidth: size.x,
            }}
          />
          {mouseOver && !mode && (
            <Fragment>
              <DragReSizing
                reSizing={handlerReSizing}
                onDelete={onDelete}
                item={item}
              />
              <ToolTip item={item} onChange={onChange} />
            </Fragment>
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

export default memo(DragTextArea);

const TextArea = styled.textarea`
  resize: none;
  padding: 2px;
  border-radius: 5px;
  border: 1px solid gray;
  width: 60px;
  height: 100%;
  z-index: 10;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.7);
  overflow: hidden;
  &:focus {
    outline: none;
  }
`;
