import React, { useState } from 'react';
import { TwitterPicker } from 'react-color';
import { Dialog, IconButton } from '@mui/material';

const COLORS = [
  '#000000',
  '#333333',
  '#4D4D4D',

  '#666666',
  '#808080',
  '#999999',

  '#B3B3B3',
  '#cccccc',
  '#FFFFFF',

  '#9F0500',
  '#D33115',
  '#F44E3B',

  '#C45100',
  '#E27300',
  '#FE9200',

  '#FB9E00',
  '#FCC400',
  '#FCDC00',

  '#808900',
  '#B0BC00',
  '#DBDF00',

  '#194D33',
  '#68BC00',
  '#A4DD00',

  '#0C797D',
  '#16A5A5',
  '#68CCCA',

  '#0062B1',
  '#009CE0',
  '#73D8FF',

  '#653294',
  '#7B64FF',
  '#AEA1FF',

  '#AB149E',
  '#FA28FF',
  '#FDA1FF',
];

const ColorPicker = ({ onChange, item }) => {
  const [open, setOpen] = useState(false);

  const handlerOnChangeColor = (color) => {
    const event = {
      target: {
        value: color.hex,
      },
    };
    //e, item?.id, 'textColor'
    onChange(event, item?.id, 'textColor');
    setOpen(false);
  };

  return (
    <span className={'className'}>
      <IconButton onClick={() => setOpen(true)}>color</IconButton>
      {open && (
        <Dialog open={open} onClose={() => setOpen(false)}>
          <TwitterPicker
            colors={COLORS}
            color={item?.fontSet?.color || '#000000'}
            onChangeComplete={handlerOnChangeColor}
          />
        </Dialog>
      )}
    </span>
  );
};

export default ColorPicker;
