import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import ImageTest from './ImageTest';
const Content = ({ stamp, onClick, setStamp }) => {
  const canvasSign = useRef();

  return (
    <div
      className={'h-full w-full flex flex-col items-center justify-start p-12'}>
      <button className={'border-amber-50 border-2'} onClick={onClick}>
        <SignatureCanvas
          canvasProps={{
            id: 'signCanvas',
            className: 'signature-canvas',
            width: 500,
            height: 250,
          }}
          ref={canvasSign}
        />
      </button>
      <ImageTest stamp={stamp} setStamp={setStamp} />
    </div>
  );
};

export default Content;
