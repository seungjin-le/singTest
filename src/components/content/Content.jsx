import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import ImageTest from './ImageTest';
import { useDrop } from 'react-dnd';
import DragaInputText from '../dragas/DragaInputText';
const Content = ({ stamp, onClick, setStamp }) => {
  const canvasSign = useRef();
  const dropRef = useRef(null);
  const [droppedItems, setDroppedItems] = useState([]);
  const [droppedPositions, setDroppedPositions] = useState([]);
  const [{ isOver }, drop] = useDrop({
    accept: 'TEXTAREA',
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();

      const dropTargetRect = dropRef.current.getBoundingClientRect();

      const x =
        clientOffset.x - dropTargetRect.left - window.scrollX - item.offset.x;
      const y =
        clientOffset.y - dropTargetRect.top - window.scrollY - item.offset.y;

      const existingItemIndex = droppedItems.findIndex((i) => i.id === item.id);
      console.log(item.fromNav, isOver);
      console.log(existingItemIndex);
      if (existingItemIndex > -1) {
        // Update the position of the existing item
        setDroppedPositions((prev) => {
          const updatedPositions = [...prev];
          updatedPositions[existingItemIndex] = { x, y };
          return updatedPositions;
        });
      } else if (item.fromNav) {
        setDroppedItems((prev) => [...prev, item]);
        setDroppedPositions((prev) => [...prev, { x, y }]);
      } else {
        // Optionally, update the position of the existing item
        setDroppedPositions((prev) => {
          const updatedPositions = [...prev];
          updatedPositions[existingItemIndex] = { x, y };
          return updatedPositions;
        });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  const combinedRef = (node) => {
    drop(node);
    dropRef.current = node;
  };

  return (
    <div
      className={
        'h-full w-full flex flex-col items-center justify-start p-12 relative box-border'
      }
      ref={combinedRef}>
      <button className={'border-amber-50 border-2'} onClick={onClick}>
        <SignatureCanvas
          canvasProps={{
            id: 'signCanvas',
            className: 'signature-canvas',
            width: 500,
            height: 250,
          }}
          ref={canvasSign}
        />
      </button>
      {droppedPositions.map((pos, index) => (
        <DragaInputText
          key={index}
          style={{
            position: 'absolute',
            left: pos.x,
            top: pos.y,
          }}
        />
      ))}

      <ImageTest stamp={stamp} setStamp={setStamp} />
    </div>
  );
};

export default Content;
