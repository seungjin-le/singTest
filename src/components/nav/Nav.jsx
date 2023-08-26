import React, { useRef, useState } from 'react';
import { TextField } from '@mui/material';
import DragaInputText from '../dragas/NavDragaInputText';
import NavDragaCheckBox from '../dragas/NavDragaCheckBox';
import SignatureCanvas from 'react-signature-canvas';

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

const getDisplayName = (name) => {
  const format = name.slice(0, 3).split('');
  return format.length > 2 ? format : defaultName;
};

const Nav = ({ onClick }) => {
  const [name, setName] = useState('');
  const format = getDisplayName(name);
  const canvasSign = useRef();

  const onChange = ({ target: { value } }) => setName(value);

  return (
    <div className="w-full h-full max-w-[400px] flex flex-col items-center justify-start p-8 bg-sky-100 overflow-scroll">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="text-2xl mb-4">모양</div>
        <TextField
          id="outlined-basic"
          label="이름"
          variant="outlined"
          value={name}
          onChange={onChange}
        />
        <div className={'text-3xl my-6 '}>도장</div>
        <div className="w-full flex flex-row items-start justify-between text-2xl font-bold text-red-600">
          <StampShape
            shape="타원"
            className="border-4 border-red-600 rounded-[40px/100px] text-center p-2 flex flex-col z-10"
            format={format}
            onClick={onClick}
          />
          <StampShape
            shape="원"
            className="border-4 border-red-600 w-[90px] h-[90px] text-center p-2 rounded-full flex flex-row flex-wrap items-center justify-center z-10"
            format={format}
            onClick={onClick}
          />
          <StampShape
            shape="사각형"
            className="border-4 border-red-600 w-[90px] h-[90px] text-center p-2 flex flex-row flex-wrap items-center justify-center z-10"
            format={format}
            onClick={onClick}
          />
        </div>
      </div>
      <div className={'text-3xl my-6'}>Font Family</div>
      <div className="my-6 flex flex-row items-center justify-between w-full">
        {fonts.map((font) => (
          <StampShape
            key={font}
            className={`border-4 font-bold border-red-600 rounded-[40px/100px] text-center p-2 flex flex-col z-10 text-[red] text-3xl`}
            format={format.map((item) => (
              <span style={{ fontFamily: font }}>{item}</span>
            ))}
            onClick={onClick}
          />
        ))}
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
