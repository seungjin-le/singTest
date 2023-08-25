import React, { Fragment, memo, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';

const NavDragaInputText = ({ index }) => {
  const ref = useRef(null);
  const [size, setSize] = useState({ x: 200, y: 50 });
  const [mouseOver, setMouseOver] = useState(false);

  const [, drag] = useDrag({
    type: 'TEXTAREA',
    item: (monitor, item) => {
      const rect = ref.current.getBoundingClientRect();
      console.log(monitor.getClientOffset().x, rect.left);
      console.log(
        monitor.getClientOffset().x - rect.left,
        monitor.getClientOffset().y - rect.top
      );
      return {
        id: `textArea-${index}`,
        type: 'textArea',
        offset: {
          defaultPosition: {
            x: monitor.getClientOffset().x - rect.left,
            y: monitor.getClientOffset().y - rect.top,
          },
          position: {
            x: 0,
            y: 0,
          },
          width: size.x,
          height: size.y,
          fontSet: {
            fontSize: '14px',
            textAlign: 'left',
            color: '#000000',
            fontWeight: '400',
          },
        },
        value: '',
      };
    },
  });
  const combinedRef = (node) => {
    drag(node);
    ref.current = node;
  };

  return (
    <Fragment>
      <div
        className={
          ' flex items-center justify-center box-border focus:bg-red-400 p-1 min-h-[50px] min-w-[200px] z-10 '
        }>
        <textarea
          ref={combinedRef}
          className={
            'resize-none p-2 rounded-[5px] w-[200px] h-[50px] disabled:bg-[#ffffff] cursor-pointer overflow-hidden'
          }
          disabled
        />
      </div>
    </Fragment>
  );
};

export default memo(NavDragaInputText);
