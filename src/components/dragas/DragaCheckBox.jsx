import React, { Fragment, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';
import PostionLine from './PostionLine';

const DragaCheckBox = ({ style, index, onDelete, item, setState }) => {
  const ref = useRef(null);
  const [size, setSize] = useState({ x: 20, y: 20 });
  const [mouseOver, setMouseOver] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: 'CHECKBOX',
    item: (monitor, item) => {
      const rect = ref.current.getBoundingClientRect();
      return {
        id: `checkBox-${index}`,
        type: 'checkBox',
        offset: {
          x: monitor.getClientOffset().x - rect.left,
          y: monitor.getClientOffset().y - rect.top,
        },
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
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
        }}
        onMouseOver={() => setMouseOver(true)}
        onMouseOut={() => setMouseOver(false)}
        className={
          'relative w-auto h-auto p-3 flex items-center justify-center'
        }>
        <CustomCheckbox
          ref={combinedRef}
          type="checkbox"
          className={'checked:content-[v]'}
          style={{
            width: size.x,
            height: size.y,
          }}
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

      <PostionLine style={style} disabled={mouseOver} size={size} />
    </Fragment>
  );
};

export default DragaCheckBox;

const CustomCheckbox = styled.input``;
