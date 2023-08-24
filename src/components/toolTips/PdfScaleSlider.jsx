import React, { memo } from 'react';
import { Slider, Stack } from '@mui/material';

const marks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 1.1,
    label: '1.1',
  },
  {
    value: 1.2,
    label: '1.2',
  },
  {
    value: 1.3,
    label: '1.3',
  },
  {
    value: 1.4,
    label: '1.4',
  },
  {
    value: 1.5,
    label: '1.5',
  },
  {
    value: 1.6,
    label: '1.6',
  },
  {
    value: 1.7,
    label: '1.7',
  },
  {
    value: 1.8,
    label: '1.8',
  },
  {
    value: 1.9,
    label: '1.9',
  },
  {
    value: 2,
    label: '2',
  },
];

const PdfScaleSlider = ({ value, setValue }) => {
  const handlerOnChangeFontWidth = ({ target: { value } }) => {
    setValue(value);
  };

  return (
    <div
      className={
        'w-[50px] h-auto px-2 fixed top-[10%] left-[95%] translate-x-m100 z-5'
      }>
      <Stack sx={{ height: 300 }} direction="column">
        <Slider
          value={value || 1}
          aria-label="Small steps"
          onChange={handlerOnChangeFontWidth}
          orientation="vertical"
          marks={marks}
          step={0.1}
          min={1}
          max={2}
        />
      </Stack>
    </div>
  );
};

export default memo(PdfScaleSlider);
