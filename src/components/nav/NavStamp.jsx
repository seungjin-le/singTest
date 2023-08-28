import React, { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';

const NavStamp = ({ style, type, value, font }) => {
  const ref = useRef(null);
  const [size, setSize] = useState({ x: 80, y: 80 });
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
          fontSet: {
            fontFamily: font,
          },
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
      className={`flex flex-col items-center justify-center  mb-2 mr-2 cursor-pointer`}>
      <span
        style={{
          fontFamily: font || '',
        }}
        className={`${style} border-4 font-bold border-red-600 flex text-center p-0  z-10 text-[red] text-3xl flex-1`}>
        {value?.map((name) => (
          <span className={`${type !== 0 && 'block w-[25px] h-[25px]'}`}>
            {name}
          </span>
        ))}
        {type !== 0 && <span className={`block w-[25px] h-[25px]`}>인</span>}
      </span>
    </div>
  );
};

export default NavStamp;
