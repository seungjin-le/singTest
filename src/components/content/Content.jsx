import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import DragaInputText from '../dragas/DragaInputText';
import DragaCheckBox from '../dragas/DragaCheckBox';
import PdfView from '../../container/pdf/PdfView';
import PdfScaleSlider from '../toolTips/PdfScaleSlider';

const Content = ({ stamp, onClick, setStamp }) => {
  const dropRef = useRef(null);
  const [droppedItems, setDroppedItems] = useState([]);
  const [scale, setScale] = useState(1);
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
  const handleOnChangeTooltip = useCallback(
    ({ target: { value } }, id, type) => {
      if (type === 'fontSize') {
        setDroppedItems((prev) => {
          return prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  fontSet: {
                    ...item.fontSet,
                    fontSize: value,
                  },
                }
              : item
          );
        });
      } else if (type === 'textSort') {
        setDroppedItems((prev) => {
          return prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  fontSet: {
                    ...item.fontSet,
                    textAlign: value,
                  },
                }
              : item
          );
        });
      } else if (type === 'textColor') {
        setDroppedItems((prev) => {
          return prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  fontSet: {
                    ...item.fontSet,
                    color: value,
                  },
                }
              : item
          );
        });
      } else if (type === 'textWeight') {
        setDroppedItems((prev) => {
          return prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  fontSet: {
                    ...item.fontSet,
                    fontWeight: value,
                  },
                }
              : item
          );
        });
      }
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
  useEffect(() => {
    console.log(droppedItems);
  }, [droppedItems]);

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
