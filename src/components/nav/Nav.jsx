import React, { useRef, useState } from 'react';
import { TextField } from '@mui/material';
import DragaInputText from '../dragas/NavDragaInputText';
import NavDragaCheckBox from '../dragas/NavDragaCheckBox';
import SignatureCanvas from 'react-signature-canvas';
import StampTabs from '../tabs/StampTabs';

const fonts = [
  'JSArirang',
  'SUITThin',
  'IceSotongRg',
  'kdg_Medium',
  'Somi',
  'HakgyoansimButpenB',
];
const defaultName = ['홍', '길', '동'];

const StampShape = ({ shape, className, format, onClick }) => (
  <div className="flex flex-col ">
    <span className="text-black">{shape}</span>
    <span onClick={onClick} className={className}>
      {format.map((item, idx) => (
        <span
          key={idx}
          className={`${
            shape === '원' || shape === '사각형' ? 'block w-[50%]' : ''
          }`}>
          {item}
        </span>
      ))}
      {(shape === '원' || shape === '사각형') && (
        <span className={'block w-[50%]'}>인</span>
      )}
    </span>
  </div>
);

const Nav = ({ onClick }) => {
  const [name, setName] = useState('');

  const canvasSign = useRef();

  const onChange = ({ target: { value } }) => setName(value);

  return (
    <div className="w-full h-full max-w-[400px] flex flex-col items-center justify-start p-8 bg-sky-100 overflow-scroll">
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

      <div className="mb-6">Sign</div>
      <button className="border-[red] border-2" onClick={onClick}>
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
      <div className="my-6">Input Text Area</div>
      <DragaInputText />
      <div className="my-6">Check Box</div>
      <NavDragaCheckBox />
    </div>
  );
};

export default Nav;
