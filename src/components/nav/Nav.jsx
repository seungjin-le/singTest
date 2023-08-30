import React, { useRef, useState } from 'react';
import { TextField } from '@mui/material';
import DragaInputText from './NavDragaInputText';
import NavDragaCheckBox from './NavDragaCheckBox';
import StampTabs from '../tabs/StampTabs';
import NavDragaForm from './NavDragaForm';

const testData = [
  {
    type: 'admin',
    email: 'leeseungjin@naver.com',
    name: '이승진',
  },
  {
    type: 'user',
    email: 'bibibig@naver.com',
    name: '김빅빅',
  },
  {
    type: 'user',
    email: 'lebibi@naver.com',
    name: '이빅빅',
  },
  {
    type: 'user',
    email: 'Parkbibi@naver.com',
    name: '박빅빅',
  },
];

const Nav = ({ onClick }) => {
  const [name, setName] = useState('');
  const [previewImage, setPreviewImage] = useState({
    textArea: '',
    stamp: '',
    checkBox: '',
  });
  const onChange = ({ target: { value } }) => setName(value);

  return (
    <div className="w-full h-full max-w-[400px] flex flex-col items-center justify-start p-8 bg-sky-100 overflow-scroll overflow-x-hidden">
      <div className="w-full flex flex-col items-center justify-center">
        <div className={'text-3xl my-6 '}>도장</div>
        <TextField
          id="outlined-basic"
          label="이름"
          variant="outlined"
          value={name}
          onChange={onChange}
        />
        <div className="text-2xl mb-4">모양</div>
        <StampTabs name={name} />
      </div>
      {testData.map((item) => (
        <NavDragaForm
          item={item}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
        />
      ))}
      <div className={'absolute -left-full'}>
        <DragaInputText setState={setPreviewImage} />
        <NavDragaCheckBox setState={setPreviewImage} />
      </div>
    </div>
  );
};

export default Nav;
