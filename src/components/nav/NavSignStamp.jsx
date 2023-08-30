import React, { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';

const NavSignStamp = ({ type, value }) => {
  const ref = useRef(null);
  const [size, setSize] = useState({ x: 150, y: 100 });
  const [, drag] = useDrag({
    type: 'DIV',
    item: (monitor, item) => {
      const rect = ref.current.getBoundingClientRect();
      return {
        id: `stamp-`,
        type: 'stamp',
        offset: {
          defaultPosition: {
            x: monitor.getClientOffset().x - rect.left,
            y: monitor.getClientOffset().y - rect.top,
          },
          position: {
            x: 0,
            y: 0,
          },
          shapeType: type,
          value: value,
          width: size.x,
          height: size.y,
        },
      };
    },
  });
  const combinedRef = (node) => {
    drag(node);
    ref.current = node;
  };
  return (
    <div
      ref={combinedRef}
      className={'w-full h-[200px] flex items-center justify-center'}>
      {value && <img src={value} alt={'sign'} className={' max-h-[200px]'} />}
    </div>
  );
};

export default NavSignStamp;
