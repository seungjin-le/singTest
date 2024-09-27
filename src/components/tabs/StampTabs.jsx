import React, { useRef, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import styled from 'styled-components';
import NavStamp from '../nav/NavStamp';
import SignatureCanvas from 'react-signature-canvas';
import NavSignStamp from '../nav/NavSignStamp';
import html2canvas from 'html2canvas';

const fonts = [
  'JSArirang',
  'SUITThin',
  'IceSotongRg',
  'kdg_Medium',
  'Somi',
  'HakgyoansimButpenB',
];

const StampTabs = ({ name, setStamps }) => {
  const [value, setValue] = useState(0);
  const canvasSign = useRef(null);
  const [signImage, setSignImage] = useState('');
  const handleChange = (event, newValue) => setValue(newValue);

  const shape = (type) => {
    return type === 0
      ? 'rounded-[55px/90px] p-1 w-[50px] h-[100px]'
      : type === 1
        ? 'rounded-full flex-wrap w-[80px] h-[80px] min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px]  grid-cols-2 p-[10px] !text-[24px]'
        : 'rounded-0 flex-wrap flex-1 w-[80px] h-[80px] min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px] grid-cols-2 p-[10px] !text-[30px]';
  };
  const handleCanvasEnd = () => {
    setSignImage(canvasSign.current.getTrimmedCanvas().toDataURL('image/png'));
    setStamps(canvasSign.current.getTrimmedCanvas().toDataURL('image/png'));
  };
  const handleOnClickStamp = async (id) => {
    const stamp = document.getElementById(id);

    await html2canvas(stamp, {
      backgroundColor: null,
      scale: 0.95,
    }).then((canvas) => setSignImage(canvas.toDataURL('image/png')));
  };

  const textFormat = (text) => {
    return text.split('').map((char, index) => (
      <div
        className={'flex items-center justify-center w-full h-full'}
        key={`${char}_${index}`}>
        {char}
      </div>
    ));
  };

  return (
    <Box className={'w-full'}>
      <StyledTabs
        className={'w-full'}
        value={value}
        onChange={handleChange}
        aria-label="stamp tabs">
        <StyledTab disableRipple label="타원" />
        <StyledTab disableRipple label="원" />
        <StyledTab disableRipple label="사각형" />
        <StyledTab disableRipple label="사인" />
      </StyledTabs>

      <div className={'text-center my-4 text-2xl'}>Font Family</div>
      <StampBox
        className={
          'flex flex-row items-center flex-wrap h-auto w-full gap-[10px]'
        }>
        {value !== 3 ? (
          fonts.map((font) => {
            return (
              <div
                key={font}
                id={font}
                style={{ fontFamily: font }}
                className={`border-4 border-solid font-bold border-red-600  z-10 text-[red] text-[24px] grid items-center justify-center p-[5px] cursor-pointer ${shape(value)}`}
                onClick={() => handleOnClickStamp(font)}>
                {textFormat(`${name}${value !== 0 && value !== 3 ? '인' : ''}`)}
              </div>
            );
          })
        ) : (
          <SignBox>
            <SignatureCanvas
              onEnd={handleCanvasEnd}
              canvasProps={{
                id: 'signCanvas',
                className: 'signature-canvas',
                height: 150,
              }}
              ref={canvasSign}
            />
          </SignBox>
        )}
      </StampBox>
      <div className={'w-full flex flex-col items-center my-4 gap-[20px]'}>
        <div className={'text-2xl'}>Stamp</div>

        <img
          src={signImage}
          alt="sign_Image"
          className={'cursor-pointer'}
          onClick={() => setStamps(signImage)}
        />
      </div>
    </Box>
  );
};

export default StampTabs;

const StyledTabs = styled(Tabs)`
  width: 100%;

  & .MuiTabs-indicator {
    display: flex;
    margin: 0 auto;
    justify-content: center;
  }
  & .MuiTabs-indicatorSpan {
  }
  & .MuiTabs-flexContainer {
    width: 100%;
  }
`;

const StyledTab = styled(Tab)`
  texttransform: none;
  flex: 1;
  color: rgba(255, 255, 255, 0.7);
  &.Mui-selected {
    color: #fff;
  }
  &.Mui-focusVisible {
    backgroundcolor: rgba(100, 95, 228, 0.32);
  }
`;

const SignBox = styled.span`
  border: 1px solid red;
  width: 100%;
  & > canvas {
    width: 100%;
  }
`;

const StampBox = styled(Box)`
  & > * {
    line-height: 0 !important;
  }
  & span {
    line-height: 0 !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
