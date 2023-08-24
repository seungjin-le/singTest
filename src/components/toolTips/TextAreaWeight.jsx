import React, { useState } from 'react';
import { InputLabel, Slider } from '@mui/material';

const TextAreaWeight = ({ onChange, item }) => {
  const handlerOnChangeFontWidth = ({ target: { value } }) => {
    const event = {
      target: {
        value: value * 100,
      },
    };
    onChange(event, item?.id, 'textWeight');
  };

  return (
    <div className={'w-full px-2'}>
      <Slider
        value={item?.fontSet?.fontWeight / 100 || 4}
        onChange={handlerOnChangeFontWidth}
        valueLabelDisplay="auto"
        min={1}
        max={9}
      />
    </div>
  );
};

export default TextAreaWeight;
