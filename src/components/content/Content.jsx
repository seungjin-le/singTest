import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import PdfScaleSlider from '../toolTips/PdfScaleSlider';
import DragTextArea from '../dragas/DragTextArea';
import DragCheckBox from '../dragas/DragCheckBox';
import PdfView from '../../container/pdf/PdfView';
import { Button } from '@mui/material';
import DragStampMaker from '../dragas/DragStampMaker';
import DragImageInput from '../dragas/DragImageInput';
import { useSignStore } from '../../stores/signStore';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router-dom';

const TestData = [
  {
    id: 'stampMaker-0',
    type: 'stampMaker',
    info: {
      name: '홍길동',
      email: 'lebibi@naver.com',
      type: 'user',
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
      name: '이순신',
      email: 'Parkbibi@naver.com',
      type: 'user',
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
      name: '이순신',
      email: 'Parkbibi@naver.com',
      type: 'user',
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
      name: '홍길동',
      email: 'lebibi@naver.com',
      type: 'user',
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
      name: '이순신',
      email: 'Parkbibi@naver.com',
      type: 'user',
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
      name: '이순신',
      email: 'Parkbibi@naver.com',
      type: 'user',
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
      name: '홍길동',
      email: 'lebibi@naver.com',
      type: 'user',
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

const Content = ({ stamp }) => {
  const dropRef = useRef(null);

  const { setUItems, getItems } = useSignStore();
  const [droppedItems, setDroppedItems] = useState(getItems());
  const [scale, setScale] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const nav = useNavigate();
  const { state } = useLocation();
  const [isDownloading, setIsDownloading] = useState(false);
  useEffect(() => {
    if (stamp && state.name) {
      setDroppedItems((prev) => {
        return prev.map((item) => ({
          ...item,
          value:
            item.type === 'stampMaker' &&
            item.page === currentPage &&
            state.name === item.info.name
              ? stamp
              : item.value,
        }));
      });
    }
  }, [stamp]);

  const handleOnClickDelete = useCallback(
    (id) => {
      setDroppedItems((items) => items.filter((item) => item.id !== id));
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

        if (check === -1) {
          setDroppedItems((prev) => [
            ...prev,
            {
              ...item,
              id: uuidv4(),
              type: item.type,
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

  const handleOnClickSave = useCallback(() => {
    setUItems(droppedItems);
  }, [droppedItems]);

  const handleOnClickPage = useCallback(
    (name = '', email = '', role = '') => {
      nav('/', {
        replace: true,
        state: {
          name,
          email,
          role,
        },
      });
    },
    [nav]
  );

  return (
    <div
      className={
        'h-full w-full flex flex-col items-center justify-start  relative box-border overflow-hidden'
      }>
      <div
        className={
          'absolute left-[10px] top-[10px] flex flex-col gap-[10px] [&>*]:text-[24px] [&>*]:rounded-[5px] [&>*]:p-[10px] [&>*]:bg-[rgba(224_242_254)] [&>*]:cursor-pointer z-[100]'
        }>
        <button
          onClick={() =>
            handleOnClickPage('이승진', 'leesungjin@naver.com', 'admin')
          }>
          관리자 접속
        </button>
        <button
          onClick={() =>
            handleOnClickPage('이순신', 'bibibig@naver.com', 'user')
          }>
          이순신 접속
        </button>
        <button
          onClick={() =>
            handleOnClickPage('홍길동', 'lebibi@naver.com', 'user')
          }>
          홍길동 접속
        </button>
        <button
          onClick={() =>
            handleOnClickPage('최배달', 'Parkbibi@naver.com', 'user')
          }>
          최배달 접속
        </button>
      </div>

      <div
        className={
          'w-full h-full flex-col items-center justify-center overflow-y-auto overflow-x-hidden'
        }
        style={{ transform: `scale(${scale}, ${scale})` }}>
        <div
          className={
            'flex flex-row items-center justify-center py-4 gap-[20px]'
          }>
          <div className={'ml-4 text-2xl flex items-center'}>
            {state.name || ''}
          </div>
          <Button
            variant="contained"
            onClick={() =>
              setDroppedItems(droppedItems.length !== 0 ? [] : TestData)
            }>
            {droppedItems.length !== 0 ? '데이터 삭제' : '데이터 불러오기'}
          </Button>
          <Button variant="contained" onClick={() => handleOnClickSave()}>
            Save
          </Button>
        </div>
        <PdfView
          combinedRef={combinedRef}
          setIsDownloading={setIsDownloading}
          isDownloading={isDownloading}
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

            const { name, email, role } = state;
            const { info } = item;

            if (
              role !== 'admin' &&
              info.type !== 'admin' &&
              info?.name !== name
            )
              return null;

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
                    mode={info.name === name || role === 'admin'}
                    isDownloading={isDownloading}
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
                    mode={info.name === name || role === 'admin'}
                    isDownloading={isDownloading}
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
                    mode={info.name === name || role === 'admin'}
                    isDownloading={isDownloading}
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
                    mode={info.name === name || role === 'admin'}
                    isDownloading={isDownloading}
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
