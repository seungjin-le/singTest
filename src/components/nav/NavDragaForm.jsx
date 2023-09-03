import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import AddIcon from '@mui/icons-material/Add';
import { DragPreviewImage, useDrag } from 'react-dnd';

const userItems = [
  {
    children: <RadioButtonCheckedIcon className={'mr-2'} />,
    text: '사인/도장',
    type: 'stamp',
  },
  {
    children: <TextFieldsIcon className={'mr-2'} />,
    text: '텍스트',
    type: 'textArea',
  },
  {
    children: <CheckBoxIcon className={'mr-2'} />,
    text: '체크박스',
    type: 'checkBox',
  },
];
const adminItems = [
  {
    children: <AddIcon className={'mr-2'} />,
    text: '텍스트 입력하기',
  },
  {
    children: <AddIcon className={'mr-2'} />,
    text: '체크박스 입력하기',
  },
  {
    children: <AddIcon className={'mr-2'} />,
    text: '이미지 입력하기',
  },
];

const NavDragaForm = ({ item, previewImage, setPreviewImage }) => {
  const [type, setType] = useState(false);
  const textAreaRef = useRef(null);
  const stampRef = useRef(null);
  const checkBoxRef = useRef(null);

  useEffect(() => {
    setType(item.type === 'admin');
  }, [item]);

  const [{ textAreaDragging }, textAreaDrag, textAreaPreview] = useDrag({
    type: 'TEXTAREA',
    collect: (monitor) => {
      return {
        textAreaDragging: monitor.isDragging(),
      };
    },
    item: (monitor) => {
      const rect = textAreaRef.current.getBoundingClientRect();
      return {
        id: `textArea-`,
        type: 'textArea',
        info: {
          name: item.name,
          email: item.email,
        },
        offset: {
          defaultPosition: {
            x: monitor.getClientOffset().x - rect.left,
            y: monitor.getClientOffset().y - rect.top,
          },
          position: {
            x: 0,
            y: 0,
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
      };
    },
    end: (item, monitor) => {},
  });

  const [{ checkBoxDragging }, checkBoxDrag] = useDrag({
    type: 'CHECKBOX',
    collect: (monitor) => {
      return {
        checkBoxDragging: monitor.isDragging(),
      };
    },
    item: (monitor) => {
      const rect = checkBoxRef.current.getBoundingClientRect();
      return {
        id: `checkBox-`,
        type: 'checkBox',
        info: {
          name: item.name,
          email: item.email,
        },
        offset: {
          defaultPosition: {
            x: monitor.getClientOffset().x - rect.left,
            y: monitor.getClientOffset().y - rect.top,
          },
          position: {
            x: 0,
            y: 0,
          },
          width: 25,
          height: 25,
        },
        value: '',
      };
    },
  });
  const [{ stampDragging }, drag] = useDrag({
    type: 'DIV',
    collect: (monitor) => {
      return {
        stampDragging: monitor.isDragging(),
      };
    },
    item: (monitor) => {
      const rect = stampRef.current.getBoundingClientRect();

      return {
        id: `stampMaker-`,
        type: 'stampMaker',
        info: {
          name: item?.name,
          email: item?.email,
        },
        offset: {
          defaultPosition: {
            x: monitor.getClientOffset().x - rect.left,
            y: monitor.getClientOffset().y - rect.top,
          },
          position: {
            x: 0,
            y: 0,
          },
          value: '',
          width: 50,
          height: 50,
        },
        value: '',
      };
    },
  });

  const stampCombinedRef = (node) => {
    drag(node);
    stampRef.current = node;
  };

  const textAreaCombinedRef = (node) => {
    textAreaDrag(node);
    textAreaRef.current = node;
  };
  const checkBoxCombinedRef = (node) => {
    checkBoxDrag(node);
    checkBoxRef.current = node;
  };

  const user = ({ children, text, type }, index) => {
    return (
      <ItemBox
        key={index}
        onMouseDown={(e) => (e.target.style.opacity = 0)}
        onMouseUp={(e) => (e.target.style.opacity = 1)}
        onMouseOut={(e) => (e.target.style.opacity = 1)}
        ref={
          type === 'textArea'
            ? textAreaCombinedRef
            : type === 'checkBox'
            ? checkBoxCombinedRef
            : stampCombinedRef
        }>
        {children} {text}
      </ItemBox>
    );
  };

  useEffect(() => {
    if (textAreaRef?.current && textAreaDragging)
      textAreaRef.current.style.opacity = 1;
    if (checkBoxRef?.current && checkBoxDragging)
      checkBoxRef.current.style.opacity = 1;
    if (stampRef?.current && stampDragging) stampRef.current.style.opacity = 1;
  }, [textAreaDragging, checkBoxDragging, stampDragging]);

  return (
    <div
      className={
        'flex flex-col items-center justify-between w-full p-2 px-3 border-[1px] border-[#E0E0E0] rounded-[8px] mb-8'
      }>
      <TitleBox>
        <div className={'title'}>{type ? '관리자' : '서명자'}</div>
        <div className={'subTitle'}>
          {item.name}({item.email})
        </div>
      </TitleBox>

      <div className={'flex flex-col items-center w-full'}>
        {(type ? adminItems : userItems).map((item, index) =>
          user(item, index)
        )}
      </div>
    </div>
  );
};

export default NavDragaForm;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  & > div {
    text-align: left;
    width: 100%;
    &.title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 8px;
    }
    &.subTitle {
      font-size: 16px;
      color: #828282;
      margin-bottom: 8px;
      padding-left: 8px;
    }
  }
`;

const ItemBox = styled.div`
  width: 100%;
  text-align: left;
  font-size: 18px;
  margin-bottom: 8px;
  border: 1px solid #e0e0e0;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
`;
