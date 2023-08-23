import React, { useCallback, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import ImageTest from './ImageTest';
import { useDrop } from 'react-dnd';
import DragaInputText from '../dragas/DragaInputText';
import DragaCheckBox from '../dragas/DragaCheckBox';
import DragLayer from '../../container/layout/DragLayout';

const Content = ({ stamp, onClick, setStamp }) => {
  const canvasSign = useRef();
  const dropRef = useRef(null);
  const [droppedItems, setDroppedItems] = useState([]);

  const handleOnClickDelete = useCallback(
    (id) => {
      const newItems = droppedItems;
      setDroppedItems(
        newItems
          .filter((item) => item.id !== id)
          ?.map((item, index) => {
            return { ...item, id: `${item.type}-${index}` };
          })
      );
    },
    [droppedItems]
  );

  const [collect, drop] = useDrop(
    {
      accept: ['TEXTAREA', 'CHECKBOX'],
      drop: (item, monitor) => {
        const clientOffset = monitor.getClientOffset();

        const dropTargetRect = dropRef.current.getBoundingClientRect();

        const x =
          clientOffset.x - dropTargetRect.left - window.scrollX - item.offset.x;
        const y =
          clientOffset.y - dropTargetRect.top - window.scrollY - item.offset.y;
        const check = droppedItems.findIndex(({ id }, index) => item.id === id);
        console.log(item);
        if (check === -1) {
          setDroppedItems((prev) => [
            ...prev,
            {
              ...item,
              id: `${item.type}-${droppedItems.length}`,
              offset: {
                x: x,
                y: y,
              },
            },
          ]);
          // setDroppedPositions((prev) => [...prev, { x, y }]);
        } else {
          setDroppedItems((prev) => {
            return prev.map((item, index) =>
              index === check ? { ...item, offset: { x: x, y: y } } : item
            );
          });
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        highlighted: monitor.canDrop(),
      }),
    },
    [droppedItems]
  );
  const combinedRef = (node) => {
    drop(node);
    dropRef.current = node;
  };

  return (
    <div
      className={
        'h-full w-full flex flex-col items-center justify-start p-12 relative box-border overflow-hidden'
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
      {droppedItems.map((item, index) => {
        switch (item.type) {
          case 'textArea':
            return (
              <DragaInputText
                key={index}
                index={index}
                style={{
                  position: 'absolute',
                  left: item.offset.x,
                  top: item.offset.y,
                }}
                onDelete={handleOnClickDelete}
                item={item}
                setState={setDroppedItems}
              />
            );
          case 'checkBox':
            return (
              <DragaCheckBox
                key={index}
                index={index}
                style={{
                  position: 'absolute',
                  left: item.offset.x,
                  top: item.offset.y,
                }}
                onDelete={handleOnClickDelete}
                item={item}
                setState={setDroppedItems}
              />
            );
          default: {
            return null;
          }
        }
      })}

      <ImageTest stamp={stamp} setStamp={setStamp} />
    </div>
  );
};

export default Content;
