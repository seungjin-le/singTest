import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
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
const defaultName = ['홍', '길', '동'];

const StampTabs = ({ name, setStamps }) => {
  const [value, setValue] = useState(0);
  const [selectedFont, setSelectedFont] = useState('');
  const canvasSign = useRef(null);
  const [signImage, setSignImage] = useState('');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getDisplayName = (name) => {
    const format = name.slice(0, 3).split('');
    return format.length > 2 ? format : defaultName;
  };
  const format = getDisplayName(name);
  const StampShape = ({ className, format, onClick, id }) => (
    <div
      id={id}
      onClick={onClick}
      className={`flex flex-col items-center justify-center  mb-2 mr-2 cursor-pointer text-center leading-none `}>
      <span className={`${className} `}>{format}</span>
    </div>
  );
  const shape = (type) => {
    return type === 0
      ? 'rounded-[40px/100px] flex-col p-1'
      : type === 1
      ? 'rounded-full flex-row flex-wrap items-center justify-center flex-1 max-w-[80px] min-h-[80px] p-2 '
      : 'rounded-[0] flex-row flex-wrap items-center justify-center  flex-1 max-w-[70px] min-h-[70px] p-1  ';
  };
  const handleCanvasEnd = () => {
    setSignImage(canvasSign.current.getTrimmedCanvas().toDataURL('image/png'));
    setStamps(canvasSign.current.getTrimmedCanvas().toDataURL('image/png'));
  };
  const handleOnClickStamp = async (id) => {
    console.log(id);
    const stamp = document.getElementById(id);
    console.log(stamp);
    await html2canvas(stamp, {
      backgroundColor: null,
    }).then((canvas) => setSignImage(canvas.toDataURL('image/jpg')));

    //const imgData = canvas.toDataURL('image/jpg');
    // console.log(imgData);
    // setStamps(imgData);
    //setSignImage(imgData);
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
        className={'flex flex-row items-center flex-wrap h-auto w-full'}>
        {value !== 3 ? (
          fonts.map((font) => {
            return (
              <StampShape
                key={font}
                id={font}
                className={`border-4 font-bold border-red-600 flex  text-center p-0  z-10 text-[red] text-[30px] flex-1
              ${shape(value)} `}
                type={value}
                onClick={() => handleOnClickStamp(font)}
                format={
                  <Fragment>
                    {format.map((item, index) => (
                      <span
                        style={{ fontFamily: font }}
                        key={index}
                        className={`${
                          (value !== 0 || value !== 3) &&
                          'block w-[25px] h-[25px]'
                        }`}>
                        {item}
                      </span>
                    ))}
                    {value !== 0 && value !== 3 && (
                      <span
                        style={{ fontFamily: font }}
                        className={'block w-[25px] h-[25px]'}>
                        인
                      </span>
                    )}
                  </Fragment>
                }
              />
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
        <div className={'w-full flex flex-col items-center my-4'}>
          <div className={'text-2xl my-4'}>Stamp</div>

          <img src={signImage} alt="" />
        </div>
      </StampBox>
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
