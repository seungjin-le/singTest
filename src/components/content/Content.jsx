import React, { memo, useCallback, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import PdfScaleSlider from '../toolTips/PdfScaleSlider';
import DragTextArea from '../dragas/DragTextArea';
import DragCheckBox from '../dragas/DragCheckBox';
import PdfView from '../../container/pdf/PdfView';
import { Button } from '@mui/material';
import DragStampMaker from '../dragas/DragStampMaker';
import DragImageInput from '../dragas/DragImageInput';

const TestData = [
  {
    id: 'stampMaker-0',
    type: 'stampMaker',
    info: {
      name: '이빅빅',
      email: 'lebibi@naver.com',
    },
    offset: {
      defaultPosition: {
        x: 168,
        y: 334.5,
      },
      position: {
        x: 187,
        y: -73,
      },
      value: '',
      width: 50,
      height: 50,
    },
    value: '',
    page: 1,
    fontSet: {
      fontSize: '14px',
      textAlign: 'left',
      color: '#000000',
      fontWeight: '400',
    },
  },
  {
    id: 'textArea-1',
    type: 'textArea',
    info: {
      name: '박빅빅',
      email: 'Parkbibi@naver.com',
    },
    offset: {
      defaultPosition: {
        x: 372,
        y: 247.5,
      },
      position: {
        x: -97,
        y: 169,
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
    value: '',
    page: 1,
    fontSet: {
      fontSize: '14px',
      textAlign: 'left',
      color: '#000000',
      fontWeight: '400',
    },
  },
  {
    id: 'stampMaker-2',
    type: 'stampMaker',
    info: {
      name: '박빅빅',
      email: 'Parkbibi@naver.com',
    },
    offset: {
      defaultPosition: {
        x: 293,
        y: 276.5,
      },
      position: {
        x: -139,
        y: -12,
      },
      value: '',
      width: 50,
      height: 50,
    },
    value: '',
    page: 1,
    fontSet: {
      fontSize: '14px',
      textAlign: 'left',
      color: '#000000',
      fontWeight: '400',
    },
  },
  {
    id: 'stampMaker-3',
    type: 'stampMaker',
    info: {
      name: '이빅빅',
      email: 'lebibi@naver.com',
    },
    offset: {
      defaultPosition: {
        x: 630,
        y: 570.5,
      },
      position: {
        x: -135,
        y: 2,
      },
      value: '',
      width: 50,
      height: 50,
    },
    value: '',
    page: 2,
    fontSet: {
      fontSize: '14px',
      textAlign: 'left',
      color: '#000000',
      fontWeight: '400',
    },
  },
  {
    id: 'stampMaker-4',
    type: 'stampMaker',
    info: {
      name: '박빅빅',
      email: 'Parkbibi@naver.com',
    },
    offset: {
      defaultPosition: {
        x: 349,
        y: 663.5,
      },
      position: {
        x: 146,
        y: -37,
      },
      value: '',
      width: 50,
      height: 50,
    },
    value: '',
    page: 2,
    fontSet: {
      fontSize: '14px',
      textAlign: 'left',
      color: '#000000',
      fontWeight: '400',
    },
  },
  {
    id: 'stampMaker-5',
    type: 'stampMaker',
    info: {
      name: '박빅빅',
      email: 'Parkbibi@naver.com',
    },
    offset: {
      defaultPosition: {
        x: 598,
        y: 640.5,
      },
      position: {
        x: -146,
        y: -11,
      },
      value: '',
      width: 50,
      height: 50,
    },
    value: '',
    page: 4,
    fontSet: {
      fontSize: '14px',
      textAlign: 'left',
      color: '#000000',
      fontWeight: '400',
    },
  },
  {
    id: 'stampMaker-6',
    type: 'stampMaker',
    info: {
      name: '이빅빅',
      email: 'lebibi@naver.com',
    },
    offset: {
      defaultPosition: {
        x: 209,
        y: 620.5,
      },
      position: {
        x: 71,
        y: 8,
      },
      value: '',
      width: 50,
      height: 50,
    },
    value: '',
    page: 4,
    fontSet: {
      fontSize: '14px',
      textAlign: 'left',
      color: '#000000',
      fontWeight: '400',
    },
  },
];

const Content = ({ params }) => {
  const dropRef = useRef(null);
  const [mode, setMode] = useState(false);
  const [droppedItems, setDroppedItems] = useState([]);
  const [scale, setScale] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Dragging Component Delete
  const handleOnClickDelete = useCallback((id) => {
    setDroppedItems((items) =>
      items
        .filter((item) => item.id !== id)
        .map((item, index) => ({
          ...item,
          id: `${item.type}-${index}`,
          value: item.value,
          offset: {
            ...item.offset,
            position: { x: 0, y: 0 },
          },
        }))
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

  const [, drop] = useDrop(
    {
      accept: ['TEXTAREA', 'CHECKBOX', 'DIV', 'STAMP', 'INPUTIMAGE'],
      drop: (item, monitor) => {
        const clientOffset = monitor.getClientOffset();
        const dropTargetRect = dropRef.current.getBoundingClientRect();

        const screenLog = document.querySelector('#signNavLayout');
        const pdfContainer = document.querySelector('#pdf-container');
        const pdfViewPage = document.querySelector('.react-pdf__Page');

        const { top } = dropTargetRect;
        const x =
          clientOffset.x -
          screenLog.offsetWidth -
          (pdfContainer.offsetWidth - pdfViewPage.offsetWidth) / 2 -
          (item.type === 'stampMaker' ? 25 : 1);
        const y =
          clientOffset.y - (item.type === 'stampMaker' ? top + 25 : top);

        const check = droppedItems.findIndex(({ id }, index) => item.id === id);
        console.log(item);
        if (check === -1) {
          setDroppedItems((prev) => [
            ...prev,
            {
              ...item,
              id: `${item.type}-${droppedItems.length}`,
              page: currentPage,
              offset: {
                ...item.offset,
                defaultPosition: {
                  x:
                    x < 0
                      ? 0
                      : x > pdfViewPage.offsetWidth
                      ? pdfViewPage.offsetWidth - item.offset.width
                      : x,
                  y: y,
                },
                position: { x: 0, y: 0 },
              },
            },
          ]);
        }
      },
    },
    [droppedItems, currentPage]
  );
  const combinedRef = useCallback((node) => {
    drop(node);
    dropRef.current = node;
  }, []);
  return (
    <div
      className={
        'h-full w-full flex flex-col items-center justify-start  relative box-border overflow-hidden'
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
        <PdfView
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
            if (params?.name && item?.info?.name !== params?.name) return;
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
              case 'stampMaker':
                return (
                  <DragStampMaker
                    key={index}
                    style={style}
                    onDelete={handleOnClickDelete}
                    item={item}
                    setState={setDroppedItems}
                    mode={mode}
                  />
                );
              case 'inputImage':
                return (
                  <DragImageInput
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
        </PdfView>
      </div>

      <PdfScaleSlider value={scale} setValue={setScale} />
    </div>
  );
};

export default memo(Content);
