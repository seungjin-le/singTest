import React, { useRef, useState } from 'react';
import { TextField } from '@mui/material';
import DragaInputText from '../dragas/DragaInputText';
import DragaCheckBox from '../dragas/DragaCheckBox';
import SignatureCanvas from 'react-signature-canvas';

const fonts = [
  'JSArirang',
  'SUITThin',
  'IceSotongRg',
  'kdg_Medium',
  'Somi',
  'HakgyoansimButpenB',
];

const Nav = ({ onClick }) => {
  const defaultName = ['홍', '길', '동'];
  const [name, setName] = useState('');
  const [format, setFormat] = useState([]);
  const canvasSign = useRef();
  // const [isDragging, setIsDragging] = useState(false);
  // const [position, setPosition] = useState({ x: 0, y: 0 });

  const onChange = ({ target: { value } }) => {
    setName(value);
    setFormat(value.slice(0, 3).split(''));
  };
  const [stamp, setStamp] = useState({
    shape: '',
    font: '',
  });

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
                'border-4 border-red-600 rounded-[40px/100px] text-center p-2 flex flex-col z-10'
              }>
              {format.length > 2
                ? format.map((item) => <span>{item}</span>)
                : defaultName.map((item) => <span>{item}</span>)}
            </span>
          </div>
          <div className={'flex flex-col '}>
            <span className={'text-black'}>원</span>
            <span
              onClick={onClick}
              className={
                'border-4 border-red-600 w-[80px] h-[80px] text-center p-2 rounded-full flex flex-row flex-wrap items-center justify-center z-10'
              }>
              {format.length > 2
                ? format.map((item) => <span className={'m-1'}>{item}</span>)
                : defaultName.map((item) => (
                    <span className={'m-1'}>{item}</span>
                  ))}
              <span className={'m-1'}>인</span>
            </span>
          </div>
          <div className={'flex flex-col '}>
            <span className={'text-black'}>사각형</span>

            <span
              onClick={onClick}
              className={
                'border-4 border-red-600 w-[80px] h-[80px] text-center p-3 flex flex-row flex-wrap items-center justify-center z-10'
              }>
              {format.length > 2
                ? format.map((item) => <span className={'m-1'}>{item}</span>)
                : defaultName.map((item) => (
                    <span className={'m-1'}>{item}</span>
                  ))}
              <span className={'m-1'}>인</span>
            </span>
          </div>
        </div>
      </div>

      <div className={'my-6 flex flex-row items-center justify-between w-full'}>
        {fonts.map((item) => (
          <div className={'flex flex-col row items-center justify-between'}>
            <span className={'text-black'}>타원</span>
            <span
              onClick={onClick}
              style={{ fontFamily: item }}
              className={
                'border-4 font-bold border-red-600 rounded-[40px/100px] text-center p-2 flex flex-col z-10 text-[red] text-2xl'
              }>
              {format.length > 2
                ? format.map((item) => (
                    <span style={{ fontFamily: item }}>{item}</span>
                  ))
                : defaultName.map((item) => <span>{item}</span>)}
            </span>
          </div>
        ))}
      </div>

      <div className={'mb-6'}>Sign</div>
      <button className={'border-[red] border-2'} onClick={onClick}>
        <SignatureCanvas
          canvasProps={{
            id: 'signCanvas',
            className: 'signature-canvas',
            width: 300,
            height: 150,
          }}
          ref={canvasSign}
        />
      </button>
      <div className={'my-6'}>Input Text Area</div>
      <DragaInputText />
      <div className={'my-6'}>Check Box</div>
      <DragaCheckBox />
    </div>
  );
};

export default Nav;
