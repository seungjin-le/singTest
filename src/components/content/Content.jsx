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
    accept: 'INPUT',
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();

      const dropTargetRect = dropRef.current.getBoundingClientRect();

      const x =
        clientOffset.x - dropTargetRect.left - window.scrollX - item.offset.x;
      const y =
        clientOffset.y - dropTargetRect.top - window.scrollY - item.offset.y;

      setDroppedPositions((prev) => [...prev, { x: x, y: y }]);
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
      <span className={'absolute w-full h-full bg-[red] top-0 left-0 -z-40'} />
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
