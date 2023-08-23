import React, { Fragment, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';

const DragaCheckBox = ({ style, index, onDelete, item, setState }) => {
  const ref = useRef(null);
  const [size, setSize] = useState({ x: 25, y: 25 });
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
      const deltaX = mouseMoveEvent.pageX - startPosition.x;
      const deltaY = mouseMoveEvent.pageY - startPosition.y;

      const maxDelta = Math.max(Math.abs(deltaX), Math.abs(deltaY));
      const directionX = deltaX >= 0 ? 1 : -1;
      const newSize = startSize.x + directionX * maxDelta;

      setSize({
        x: Math.max(newSize, 25), // Ensure X-axis width is at least 25px
        y: Math.max(newSize, 25), // Y-axis is still determined by newSize
      });
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
          'flex items-center justify-center m-0 p-0 min-w-[25px] min-h-[25px]'
        }>
        <CustomCheckbox
          ref={combinedRef}
          type="checkbox"
          className={'min-h-[25px] min-w-[25px]'}
          style={{
            width: size.x,
            height: size.y,
          }}
        />
        {mouseOver && (
          <Fragment>
            <span
              className={
                'absolute w-3 h-3 bg-[red] left-full top-full translate-x-m100 translate-y-m100 rounded-full cursor-pointer z-10'
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
      {mouseOver && (
        <Fragment>
          <span
            style={{ left: style?.left }}
            className={
              'left-line absolute left-0 top-0  h-full w-[1px] translate-x-0 border-l-[2px] border-red-600 border-dotted'
            }
          />
          <span
            style={{ left: style?.left + size.x }}
            className={
              'right-line absolute left-full top-0  h-full w-[1px] translate-x-0 border-r-[2px] border-red-600 border-dotted'
            }
          />
          <span
            style={{ top: style?.top }}
            className={
              'top-line absolute h-[1px] w-full translate-y-0 border-t-[2px] border-red-600 border-dotted'
            }
          />
          <span
            style={{ top: style?.top + size.y }}
            className={
              'bottom-line absolute h-[1px] w-full translate-y-0 border-b-[2px] border-red-600 border-dotted'
            }
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default DragaCheckBox;

const CustomCheckbox = styled.input`
  margin: 0;
  border: 0;
  box-sizing: border-box;
`;
