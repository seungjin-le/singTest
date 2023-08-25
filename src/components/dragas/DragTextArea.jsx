import React, { Fragment, memo, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import ToolTip from './ToolTip';
import PositionLine from './PositionLine';

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
        y: Math.max(newY, 45),
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
  console.log(item?.offset?.defaultPosition?.x, item?.offset?.position.x);
  return (
    <Fragment>
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
          <textarea
            className={'resize-none p-2 rounded-[5px] w-60px h-full z-20'}
            value={inputValue || ''}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            style={{
              fontSize: item?.fontSet?.fontSize,
              textAlign: item?.fontSet?.textAlign,
              color: item?.fontSet?.color,
              fontWeight: item?.fontSet?.fontWeight,
              width: size.x,
              height: size.y,
            }}
          />

          {mouseOver && (
            <Fragment>
              <ToolTip item={item} onChange={onChange} />
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
      <span
        style={{
          top: item?.offset?.defaultPosition?.y + position.y,
        }}
        className={`absolute border-[1px] border-[red] w-[100vw] h-0 left-0 border-dotted z-5`}
      />
      <span
        style={{
          top: item?.offset?.defaultPosition?.y + position.y + size?.y,
        }}
        className={`absolute border-[1px] border-[red] w-[100vw] h-0 left-0 border-dotted z-5`}
      />
      <span
        style={{
          left: item?.offset?.defaultPosition?.x + position.x,
        }}
        className={`absolute border-[1px] border-[red] w-0 h-[100vh] left-0 border-dotted z-5`}
      />
      <span
        style={{
          left: item?.offset?.defaultPosition?.x + position.x + size?.x,
        }}
        className={`absolute border-[1px] border-[red] w-0 h-[100vh] left-0 border-dotted z-5`}
      />
    </Fragment>
  );
};

export default memo(DragTextArea);
