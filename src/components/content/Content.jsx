import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import PdfScaleSlider from '../toolTips/PdfScaleSlider';
import DragTextArea from '../dragas/DragTextArea';
import DragCheckBox from '../dragas/DragCheckBox';
import NewPdfs from '../../container/pdf/PdfView';
import DragStamp from '../dragas/DragStamp';
import { Button } from '@mui/material';

const TestData = [
  {
    id: 'textArea-0',
    type: 'textArea',
    offset: {
      defaultPosition: {
        x: 347.0104064941406,
        y: 271.54166412353516,
      },
      position: {
        x: 100,
        y: -46,
      },
      value: '',
      width: 200,
      height: 50,
      fontSet: {
        fontSize: '14px',
        textAlign: 'left',
        color: '#000000',
        fontWeight: '400',
      },
    },
    value: '1zxcvzxcvzxcfsadfasdgasdfsf',
    page: 1,
    fontSet: {
      fontSize: '14px',
      textAlign: 'left',
      color: '#000000',
      fontWeight: '400',
    },
  },
  {
    id: 'stamp-1',
    type: 'stamp',
    info: {
      name: '김빅빅',
      email: 'bibibig@naver.com',
    },
    offset: {
      defaultPosition: {
        x: 396.0104064941406,
        y: 462.54166412353516,
      },
      position: {
        x: 390,
        y: 57,
      },
      shapeType: 0,
      value: ['홍', '길', '동'],
      width: 80,
      height: 80,
      fontSet: {
        fontFamily: '',
      },
    },
    page: 1,
    fontSet: {
      fontSize: '14px',
      textAlign: 'left',
      color: '#000000',
      fontWeight: '400',
    },
  },
  {
    id: 'stamp-2',
    type: 'stamp',
    info: {
      name: '이빅빅',
      email: 'bibibig@naver.com',
    },
    offset: {
      defaultPosition: {
        x: 248.01040649414062,
        y: 345.56249237060547,
      },
      position: {
        x: 467,
        y: 464,
      },
      shapeType: 0,
      value: ['홍', '길', '동'],
      width: 80,
      height: 80,
      fontSet: {
        fontFamily: '',
      },
    },
    page: 1,
    fontSet: {
      fontSize: '14px',
      textAlign: 'left',
      color: '#000000',
      fontWeight: '400',
    },
  },
  {
    id: 'stamp-3',
    type: 'stamp',
    info: {
      name: '박빅빅',
      email: 'bibibig@naver.com',
    },
    offset: {
      defaultPosition: {
        x: 451.0104064941406,
        y: 310.56249237060547,
      },
      position: {
        x: 85,
        y: 506,
      },
      shapeType: 0,
      value: ['홍', '길', '동'],
      width: 80,
      height: 80,
      fontSet: {
        fontFamily: 'HakgyoansimButpenB',
      },
    },
    page: 2,
    fontSet: {
      fontSize: '14px',
      textAlign: 'left',
      color: '#000000',
      fontWeight: '400',
    },
  },
  {
    id: 'stamp-4',
    type: 'stamp',
    info: {
      name: '이빅빅',
      email: 'bibibig@naver.com',
    },
    offset: {
      defaultPosition: {
        x: 470.0104064941406,
        y: 406.56249237060547,
      },
      position: {
        x: 352,
        y: 133,
      },
      shapeType: 0,
      value: ['홍', '길', '동'],
      width: 80,
      height: 80,
      fontSet: {
        fontFamily: 'HakgyoansimButpenB',
      },
    },
    page: 2,
    fontSet: {
      fontSize: '14px',
      textAlign: 'left',
      color: '#000000',
      fontWeight: '400',
    },
  },
  {
    id: 'stamp-5',
    type: 'stamp',
    info: {
      name: '이빅빅',
      email: 'bibibig@naver.com',
    },
    offset: {
      defaultPosition: {
        x: 713.0104064941406,
        y: 686.5624923706055,
      },
      position: {
        x: 6,
        y: 101,
      },
      shapeType: 1,
      value: ['홍', '길', '동'],
      width: 80,
      height: 80,
      fontSet: {
        fontFamily: 'SUITThin',
      },
    },
    page: 2,
    fontSet: {
      fontSize: '14px',
      textAlign: 'left',
      color: '#000000',
      fontWeight: '400',
    },
  },
  {
    id: 'stamp-6',
    type: 'stamp',
    info: {
      name: '김빅빅',
      email: 'bibibig@naver.com',
    },
    offset: {
      defaultPosition: {
        x: 673.0104064941406,
        y: 612.5624923706055,
      },
      position: {
        x: 49,
        y: 147,
      },
      shapeType: 3,
      value:
        'data:image/png;base64,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',
      width: 150,
      height: 100,
    },
    page: 3,
    fontSet: {
      fontSize: '14px',
      textAlign: 'left',
      color: '#000000',
      fontWeight: '400',
    },
  },
  {
    id: 'stamp-7',
    type: 'stamp',
    info: {
      name: '김빅빅',
      email: 'bibibig@naver.com',
    },
    offset: {
      defaultPosition: {
        x: 550.0104064941406,
        y: 296.56249237060547,
      },
      position: {
        x: -204,
        y: 491,
      },
      shapeType: 3,
      value:
        'data:image/png;base64,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',
      width: 80,
      height: 80,
    },
    page: 3,
    fontSet: {
      fontSize: '14px',
      textAlign: 'left',
      color: '#000000',
      fontWeight: '400',
    },
  },
  {
    id: 'textArea-8',
    type: 'textArea',
    info: {
      name: '김빅빅',
      email: 'bibibig@naver.com',
    },
    offset: {
      defaultPosition: {
        x: 587.0104064941406,
        y: 545.5624923706055,
      },
      position: {
        x: 74,
        y: 202,
      },
      value: '',
      width: 100,
      height: 28,
      fontSet: {
        fontSize: '14px',
        textAlign: 'left',
        color: '#000000',
        fontWeight: '400',
      },
    },
    value: '이승진',
    page: 4,
    fontSet: {
      fontSize: '14px',
      textAlign: 'right',
      color: '#000000',
      fontWeight: '400',
    },
  },
  {
    id: 'stamp-9',
    type: 'stamp',
    info: {
      name: '김빅빅',
      email: 'bibibig@naver.com',
    },
    offset: {
      defaultPosition: {
        x: 753.0104064941406,
        y: 615.5624923706055,
      },
      position: {
        x: 11,
        y: 113,
      },
      shapeType: 2,
      value: ['이', '승', '진'],
      width: 80,
      height: 80,
      fontSet: {
        fontFamily: 'kdg_Medium',
      },
    },
    page: 4,
    fontSet: {
      fontSize: '14px',
      textAlign: 'left',
      color: '#000000',
      fontWeight: '400',
    },
  },
];

const Content = () => {
  const dropRef = useRef(null);
  const [mode, setMode] = useState(false);
  const [droppedItems, setDroppedItems] = useState([]);
  const [scale, setScale] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const handleOnClickDelete = useCallback(
    (id) => {
      setDroppedItems((prevItems) =>
        prevItems
          .filter((item) => item.id !== id)
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
  const [, drop] = useDrop(
    {
      accept: ['TEXTAREA', 'CHECKBOX', 'DIV'],
      drop: (item, monitor) => {
        const clientOffset = monitor.getClientOffset();

        const dropTargetRect = dropRef.current.getBoundingClientRect();
        const { scrollX, scrollY } = window;
        const { top, left } = dropTargetRect;

        const x = clientOffset.x - left - scrollX - item.offset.width / 2;
        const y = clientOffset.y - top - scrollY - item.offset.height / 2;
        const check = droppedItems.findIndex(({ id }, index) => item.id === id);
        if (check === -1) {
          setDroppedItems((prev) => [
            ...prev,
            {
              ...item,
              id: `${item.type}-${droppedItems.length}`,
              page: currentPage,
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
      },
    },
    [droppedItems, currentPage]
  );
  const combinedRef = (node) => {
    drop(node);
    dropRef.current = node;
  };
  console.log(droppedItems);
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
        <div className={'flex flex-row items-center justify-center py-4'}>
          <Button variant="contained" onClick={() => setMode(!mode)}>
            Mode Change
          </Button>
          <span className={'mx-4'} />
          <Button
            variant="contained"
            onClick={() =>
              setDroppedItems(droppedItems.length !== 0 ? [] : TestData)
            }>
            {droppedItems.length !== 0 ? '데이터 삭제' : '데이터 불러오기'}
          </Button>
          <div className={'ml-4 text-3xl'}>{mode ? 'User' : 'Admin'}</div>
        </div>
        <NewPdfs
          combinedRef={combinedRef}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}>
          {droppedItems.map((item, index) => {
            const defaultPosition = item.offset.defaultPosition;
            const style = {
              position: 'absolute',
              top: defaultPosition.y,
              left: defaultPosition.x,
              fontFamily: item?.offset?.fontSet?.fontFamily || '',
            };
            switch (item.type) {
              case 'textArea':
                return (
                  <DragTextArea
                    key={index}
                    style={style}
                    onDelete={handleOnClickDelete}
                    item={item}
                    setState={setDroppedItems}
                    onChange={handleOnChangeTooltip}
                    mode={mode}
                  />
                );
              case 'checkBox':
                return (
                  <DragCheckBox
                    key={index}
                    style={style}
                    onDelete={handleOnClickDelete}
                    item={item}
                    setState={setDroppedItems}
                    mode={mode}
                  />
                );
              case 'stamp':
                return (
                  <DragStamp
                    key={index}
                    style={style}
                    onDelete={handleOnClickDelete}
                    item={item}
                    setState={setDroppedItems}
                    mode={mode}
                  />
                );
              default: {
                return null;
              }
            }
          })}
        </NewPdfs>
      </div>

      <PdfScaleSlider value={scale} setValue={setScale} />
    </div>
  );
};

export default memo(Content);
