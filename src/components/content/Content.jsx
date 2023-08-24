import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import DragaInputText from '../dragas/DragaInputText';
import DragaCheckBox from '../dragas/DragaCheckBox';
import PdfView from '../../container/pdf/PdfView';
import PdfScaleSlider from '../toolTips/PdfScaleSlider';
import DragLayer from '../../container/layout/DragLayout';

const Content = ({ stamp, onClick, setStamp }) => {
  const dropRef = useRef(null);
  const [droppedItems, setDroppedItems] = useState([]);
  const [scale, setScale] = useState(1);
  const handleOnClickDelete = useCallback((id) => {
    setDroppedItems((prevItems) =>
      prevItems
        .filter((item) => item.id !== id)
        .map((item, index) => ({ ...item, id: `${item.type}-${index}` }))
    );
  }, []);

  const handleOnChangeTooltip = useCallback(
    ({ target: { value } }, id, type) => {
      const fontSetPropsMap = {
        fontSize: 'fontSize',
        textSort: 'textAlign',
        textColor: 'color',
        textWeight: 'fontWeight',
      };

      if (fontSetPropsMap[type]) {
        setDroppedItems((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  fontSet: {
                    ...item.fontSet,
                    [fontSetPropsMap[type]]: value,
                  },
                }
              : item
          )
        );
      }
    },
    [droppedItems]
  );
  const [collect, drop] = useDrop(
    {
      accept: ['TEXTAREA', 'CHECKBOX', 'DragaInputText'],
      drop: (item, monitor) => {
        const clientOffset = monitor.getClientOffset();

        const dropTargetRect = dropRef.current.getBoundingClientRect();

        const x =
          clientOffset.x - dropTargetRect.left - window.scrollX - item.offset.x;
        const y =
          clientOffset.y - dropTargetRect.top - window.scrollY - item.offset.y;
        const check = droppedItems.findIndex(({ id }, index) => item.id === id);

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
              fontSet: {
                fontSize: '14px',
                textAlign: 'left',
                color: '#000000',
                fontWeight: '400',
              },
            },
          ]);
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
        'h-full w-full flex flex-col items-center justify-start  relative box-border overflow-hidden'
      }>
      <div
        className={
          'w-full h-full flex-col items-center justify-center overflow-y-scroll'
        }
        style={{ transform: `scale(${scale}, ${scale})` }}>
        <PdfView stamp={stamp} setStamp={setStamp} combinedRef={combinedRef}>
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
                      fontSize: item.fontSize,
                    }}
                    onDelete={handleOnClickDelete}
                    item={item}
                    setState={setDroppedItems}
                    onChange={handleOnChangeTooltip}
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
        </PdfView>
      </div>

      <PdfScaleSlider value={scale} setValue={setScale} />
    </div>
  );
};

export default memo(Content);
