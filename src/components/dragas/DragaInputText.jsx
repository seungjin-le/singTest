import React, { Fragment, memo, useEffect, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import PositionLine from './PositionLine';

const DragaInputText = ({ style, index, onDelete, item, setState }) => {
  const ref = useRef(null);
  const [size, setSize] = useState({ x: 200, y: 50 });
  const [mouseOver, setMouseOver] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });

  const [{ isDragging }, drag] = useDrag({
    type: 'TEXTAREA',
    item: (monitor, item) => {
      const rect = ref.current.getBoundingClientRect();
      return {
        id: `textArea-${index}`,
        type: 'textArea',
        offset: {
          x: monitor.getClientOffset().x - rect.left,
          y: monitor.getClientOffset().y - rect.top,
          width: size.x,
          height: size.y,
        },
        value: '',
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const handlerOnChange = ({ target: { value } }) => {
    setState((prev) => {
      return prev.map((data) =>
        data.id === item.id ? { ...data, value: value } : data
      );
    });
  };
  const handlerReSizing = (mouseDownEvent) => {
    const startSize = size;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

    const onMouseMove = (mouseMoveEvent) => {
      const newX = startSize.x - startPosition.x + mouseMoveEvent.pageX;
      const newY = startSize.y - startPosition.y + mouseMoveEvent.pageY;

      setSize({
        x: Math.max(newX, 100),
        y: Math.max(newY, 45),
      });
    };
    const onMouseUp = () => {
      document.body.removeEventListener('mousemove', onMouseMove);
    };

    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseup', onMouseUp, { once: true });
  };

  const handlerOnMouseDown = (mouseDownEvent) => {
    setMouseOver(true);
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

    const onBoxMove = (mouseMoveEvent) => {
      const deltaX = mouseMoveEvent.pageX - startPosition.x;
      const deltaY = mouseMoveEvent.pageY - startPosition.y;

      setDragStartPos((currentStyle) => ({
        ...currentStyle,
        left: currentStyle.left + deltaX,
        top: currentStyle.top + deltaY,
      }));
    };

    const onMouseUp = () => {
      document.body.removeEventListener('mousemove', onBoxMove);
    };

    document.body.addEventListener('mousemove', onBoxMove);
    document.body.addEventListener('mouseup', onMouseUp, { once: true });
    console.log(style);
  };
  const combinedRef = (node) => {
    drag(node);
    ref.current = node;
  };
  return (
    <Fragment>
      <div
        style={{
          ...style,
          width: size.x,
          height: size.y,
        }}
        onMouseOver={handlerOnMouseDown}
        onMouseOut={() => setMouseOver(false)}
        onMouseDown={handlerOnMouseDown}
        className={
          'w-auto h-auto flex  items-center justify-center box-border focus:bg-red-400 p-1 min-h-[45px] min-w-[100px]'
        }>
        <div className={'relative w-full h-full'}>
          <textarea
            ref={combinedRef}
            className={'resize-none p-2 rounded-[5px] w-full h-full'}
            onChange={handlerOnChange}
            value={item?.value}
          />
          {mouseOver && (
            <Fragment>
              <span
                className={
                  'absolute w-2 h-2 bg-[red] top-full translate-x-m30 translate-y-m30 rounded-full cursor-pointer z-10'
                }
                onMouseDown={handlerReSizing}
              />
              <button
                onClick={() => onDelete(item?.id)}
                className={
                  'absolute left-full top-0 px-2 bg-red-400 rounded-full flex items-center justify-center translate-x-m50 translate-y-m50 z-10'
                }>
                x
              </button>
            </Fragment>
          )}
        </div>
      </div>
      <PositionLine style={style} disable={mouseOver} size={size} />
    </Fragment>
  );
};

export default memo(DragaInputText);
