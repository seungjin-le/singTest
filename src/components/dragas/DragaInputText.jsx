import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { TextField } from '@mui/material';

const DragaInputText = ({ style }) => {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: 'INPUT',
    item: (monitor) => {
      const rect = ref.current.getBoundingClientRect();
      return {
        id: 'unique-id',
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
      <TextField
        ref={ref}
        id="outlined-basic"
        label="Text"
        variant="outlined"
      />
    </div>
  );
};

export default DragaInputText;
