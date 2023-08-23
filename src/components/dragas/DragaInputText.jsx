import React, { Fragment, memo, useEffect, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import PostionLine from './PostionLine';

const DragaInputText = ({ style, index, onDelete, item, setState }) => {
  const ref = useRef(null);
  const [size, setSize] = useState({ x: 200, y: 50 });
  const [mouseOver, setMouseOver] = useState(false);

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
      setSize((currentSize) => ({
        x: startSize.x - startPosition.x + mouseMoveEvent.pageX,
        y: startSize.y - startPosition.y + mouseMoveEvent.pageY,
      }));
    };
    const onMouseUp = () => {
      document.body.removeEventListener('mousemove', onMouseMove);
    };

    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseup', onMouseUp, { once: true });
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
        onMouseOver={() => setMouseOver(true)}
        onMouseOut={() => setMouseOver(false)}
        className={
          'w-auto h-auto flex  items-center justify-center box-border focus:bg-red-400 p-1'
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
                  'absolute w-2 h-2 bg-[red] top-full translate-x-m50 translate-y-m50 rounded-full cursor-pointer'
                }
                onMouseDown={handlerReSizing}
              />
              <button
                onClick={() => onDelete(item?.id)}
                className={
                  'absolute left-full top-0 inline px-2 bg-red-400 rounded-full flex items-center justify-center translate-x-m50 translate-y-m50'
                }>
                x
              </button>
            </Fragment>
          )}
        </div>
      </div>
      <PostionLine style={style} disabled={mouseOver} size={size} />
    </Fragment>
  );
};

export default memo(DragaInputText);
