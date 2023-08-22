import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

const DragaInputText = ({ style }) => {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: 'TEXTAREA',
    item: (monitor) => {
      const rect = ref.current.getBoundingClientRect();
      return {
        id: 'unique-id',
        fromNav: true,
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

  return (
    <div ref={drag} style={{ ...style }}>
      <textarea
        ref={ref}
        style={{
          border: '1px solid black',
          borderRadius: '5px',
          padding: '5px',
          resize: 'both',
        }}
      />
    </div>
  );
};

export default DragaInputText;
