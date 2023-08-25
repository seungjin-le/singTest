import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import DragaInputText from '../dragas/NavDragaInputText';
import NavDragaCheckBox from '../dragas/NavDragaCheckBox';
import PdfView from '../../container/pdf/PdfView';
import PdfScaleSlider from '../toolTips/PdfScaleSlider';
import DragLayer from '../../container/layout/DragLayout';
import DragTextArea from '../dragas/DragTextArea';
import DragCheckBox from '../dragas/DragCheckBox';

const Content = ({ stamp, onClick, setStamp }) => {
  const dropRef = useRef(null);
  const [droppedItems, setDroppedItems] = useState([]);
  const [scale, setScale] = useState(1);

  const handleOnClickDelete = useCallback(
    (id) => {
      console.log(droppedItems, id);
      setDroppedItems((prevItems) =>
        prevItems
          .filter((item) => {
            console.log(item.id !== id, item.id, id);
            return item.id !== id;
          })
          .map((item, index) => ({ ...item, id: `${item.type}-${index}` }))
      );
    },
    [droppedItems]
  );

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
        const { scrollX, scrollY } = window;
        const { top, left } = dropTargetRect;
        console.log(item.offset.width, item.offset.height);
        const x = clientOffset.x - left - scrollX - item.offset.width / 2;
        const y = clientOffset.y - top - scrollY - item.offset.height / 2;
        const check = droppedItems.findIndex(({ id }, index) => item.id === id);

        if (check === -1) {
          setDroppedItems((prev) => [
            ...prev,
            {
              ...item,
              id: `${item.type}-${droppedItems.length}`,
              offset: {
                ...item.offset,
                defaultPosition: { x: x, y: y },
                position: { x: 0, y: 0 },
              },
              fontSet: {
                fontSize: '14px',
                textAlign: 'left',
                color: '#000000',
                fontWeight: '400',
              },
            },
          ]);
        }
        // else {
        //           setDroppedItems((prev) => {
        //             return prev.map((item, index) =>
        //               index === check ? { ...item, offset: { x: x, y: y } } : item
        //             );
        //           });
        //         }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        highlighted: monitor.canDrop(),
      }),
      dropEffect: 'move',
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
        'h-full w-full flex flex-col items-center justify-start  relative box-border overflow-hidden 4444'
      }>
      <div
        className={
          'w-full h-full flex-col items-center justify-center overflow-y-scroll overflow-x-hidden'
        }
        style={{ transform: `scale(${scale}, ${scale})` }}>
        <PdfView stamp={stamp} setStamp={setStamp} combinedRef={combinedRef}>
          {droppedItems.map((item, index) => {
            console.log(item);
            switch (item.type) {
              case 'textArea':
                return (
                  <DragTextArea
                    key={index}
                    style={{
                      position: 'absolute',
                      left: item.offset.defaultPosition.x,
                      top: item.offset.defaultPosition.y,
                      transform: 'translate(0px, 0px) !important',
                    }}
                    onDelete={handleOnClickDelete}
                    item={item}
                    setState={setDroppedItems}
                    onChange={handleOnChangeTooltip}
                  />
                  // <DragaInputText
                  //   key={index}
                  //   index={index}
                  //   style={{
                  //     position: 'absolute',
                  //     left: item.offset.x,
                  //     top: item.offset.y,
                  //     fontSize: item.fontSize,
                  //   }}
                  //   onDelete={handleOnClickDelete}
                  //   item={item}
                  //   setState={setDroppedItems}
                  //   onChange={handleOnChangeTooltip}
                  // />
                );
              case 'checkBox':
                return (
                  <DragCheckBox
                    key={index}
                    style={{
                      position: 'absolute',
                      left: item.offset.defaultPosition.x,
                      top: item.offset.defaultPosition.y,
                      transform: 'translate(0px, 0px) !important',
                    }}
                    onDelete={handleOnClickDelete}
                    item={item}
                    setState={setDroppedItems}
                    onChange={handleOnChangeTooltip}
                  />
                  // <NavDragaCheckBox
                  //   key={index}
                  //   index={index}
                  //   style={{
                  //     position: 'absolute',
                  //     left: item.offset.x,
                  //     top: item.offset.y,
                  //   }}
                  //   onDelete={handleOnClickDelete}
                  //   item={item}
                  //   setState={setDroppedItems}
                  // />
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
