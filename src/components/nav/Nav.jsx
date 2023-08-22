import React, { useState } from 'react';
import { TextField } from '@mui/material';
import DragaInputText from '../dragas/DragaInputText';

const Nav = ({ onClick }) => {
  const test = ['홍', '길', '동'];
  const test2 = ['홍', '길', '동'];
  const [name, setName] = useState('');
  const [format, setFormat] = useState([]);

  const onChange = ({ target: { value } }) => {
    setName(value);
    setFormat(value.slice(0, 3).split(''));
  };

  return (
    <div
      className={
        'w-full h-full max-w-[400px]  flex flex-col items-center justify-start p-8  bg-sky-100'
      }>
      <div className={'w-full flex flex-col items-center'}>
        <div className={'text-2xl mb-4'}>모양</div>
        <div>
          <TextField
            id="outlined-basic"
            label="이름"
            variant="outlined"
            value={name}
            onChange={onChange}
          />
        </div>
        <div
          className={
            'w-full flex flex-row items-start justify-between text-2xlt font-bold text-red-600 '
          }>
          <div className={'flex flex-col '}>
            <span className={'text-black'}>타원</span>
            <span
              onClick={onClick}
              className={
                'border-4 border-red-600 rounded-[40px/100px] text-center p-3 flex flex-col z-10'
              }>
              {format.length > 2
                ? format.map((item) => <span>{item}</span>)
                : test.map((item) => <span>{item}</span>)}
            </span>
          </div>
          <div className={'flex flex-col '}>
            <span className={'text-black'}>원</span>
            <span
              onClick={onClick}
              className={
                'border-4 border-red-600 w-[90px] h-[90px] text-center p-3 rounded-full flex flex-row flex-wrap items-center justify-center z-10'
              }>
              {format.length > 2
                ? format.map((item) => <span className={'m-1'}>{item}</span>)
                : test2.map((item) => <span className={'m-1'}>{item}</span>)}
              <span className={'m-1'}>인</span>
            </span>
          </div>
          <div className={'flex flex-col '}>
            <span className={'text-black'}>사각형</span>

            <span
              onClick={onClick}
              className={
                'border-4 border-red-600 w-[90px] h-[90px] text-center p-3 flex flex-row flex-wrap items-center justify-center z-10'
              }>
              {format.length > 2
                ? format.map((item) => <span className={'m-1'}>{item}</span>)
                : test.map((item) => <span className={'m-1'}>{item}</span>)}
              <span className={'m-1'}>인</span>
            </span>
          </div>
        </div>
      </div>

      <DragaInputText />
    </div>
  );
};

export default Nav;
