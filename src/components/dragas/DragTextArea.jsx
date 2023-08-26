import React, { Fragment, memo, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import ToolTip from './ToolTip';
import PositionLine from './PositionLine';
import DragReSizing from './DragReSizing';

const DragTextArea = ({ item, setState, onChange, style, onDelete }) => {
  const nodeRef = useRef(null);
  const [mouseOver, setMouseOver] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ x: 200, y: 50 });
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
    mouseDownEvent.stopPropagation();
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

    const onMouseMove = (mouseMoveEvent) => {
      const newX = size.x - startPosition.x + mouseMoveEvent.pageX;
      const newY = size.y - startPosition.y + mouseMoveEvent.pageY;
      setSize({
        x: Math.max(newX, 100),
        y: Math.max(newY, 25),
      });
    };

    const onMouseUp = () => {
      setState((prev) => {
        return prev.map((data) =>
          data.id === item.id
            ? {
                ...data,
                offset: { ...data.offset, width: size.x, height: size.y },
              }
            : data
        );
      });
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
          className="box box-border h-auto p-[1px] rounded-[5px] flex items-center justify-center"
          style={{
            opacity: Opacity ? '0.6' : '1',
            ...style,
            width: size.x,
            height: size.y,
          }}
          onMouseOver={() => setMouseOver(true)}
          onMouseOut={() => setMouseOver(false)}>
          <textarea
            className={
              'resize-none p-2 rounded-[5px] w-60px h-full z-20 box-border whitespace-nowrap overflow-hidden'
            }
            value={inputValue || ''}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
            }}
            style={{
              fontSize: item?.fontSet?.fontSize,
              textAlign: item?.fontSet?.textAlign,
              color: item?.fontSet?.color,
              fontWeight: item?.fontSet?.fontWeight,
              width: size.x - 2,
              height: size.y - 2,
            }}
          />
          {mouseOver && (
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
      <PositionLine
        item={item}
        disable={mouseOver}
        size={size}
        position={position}
      />
    </Fragment>
  );
};

export default memo(DragTextArea);
